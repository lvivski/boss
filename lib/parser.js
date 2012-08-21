var Lexer = require('./lexer')
  , Token = require('./token')
  , nodes = require('./nodes')

var Parser = module.exports = function Parser(str, options) {
  var self = this
  options = options || {}
  this.tokens = new Lexer(str, options).tokenize()
  this.root = options.root || new nodes.Root
  this.stash = []
  this.parens = 0
  this.css = 0
  this.state = ['root']
  this.state.pop = function(){
    self.prevState = [].pop.call(this);
  };
};

Parser.prototype = {
  get currentState() {
    return this.state[this.state.length - 1];
  }
, parse: function () {
    var block = this.parent = this.root
    while (this.peek().tag !== 'eos') {
      if (this.accept('newline')) continue
      var statement = this.statement()
      this.accept(';')
      if (!statement) this.error('unexpected token {peek}, not allowed at the root level')
      block.push(statement)
    }
    return block
  },

  error: function(msg){
    var tag = this.peek().tag
      , val = undefined == this.peek().val
          ? ''
          : ' ' + this.peek().toString()

    if (val.trim() == tag.trim()) val = ''
    throw new Error(msg.replace('{peek}', '"' + tag + val + '"'))
  },

  accept: function(tag) {
    if (this.peek().tag === tag) {
      return this.next()
    }
  },

  expect: function(tag){
    if (tag != this.peek().tag) {
      this.error('expected "' + tag + '", got {peek}');
    }
    return this.next();
  },

  next: function () {
    var tok = this.stash.length
      ? this.stash.pop()
      : this.tokens.shift()

    nodes.lineno = tok.lineno

    return tok
  },

  peek: function () {
    return this.tokens[0]
  },

  lookahead: function (n) {
    return this.tokens[--n]
  },

  lineContains: function(tag){
    var i = 1
      , la;

    while (la = this.lookahead(i++)) {
      if (~['indent', 'outdent', 'newline'].indexOf(la.tag)) return;
      if (la.tag == tag) return true;
    }
  },

  skipWhitespace: function() {
    while (~['space', 'indent', 'outdent', 'newline'].indexOf(this.peek().tag))
      this.next();
  },
  skipNewlines: function() {
    while ('newline' == this.peek().tag)
      this.next();
  },

  skipSpaces: function() {
    while ('space' == this.peek().tag)
      this.next();
  },

  looksLikeFunctionDefinition: function(i) {
    return this.lookahead(i).tag === 'indent'
          || this.lookahead(i).tag === '{'
  },

  statement: function() {
    var tag = this.peek().tag
    return this[tag] && this[tag]() || this.error('unexpected {peek}')
  },

  selector: function() {
    var group = new nodes.Group

    do {
      this.accept('newline')
      group.push(new nodes.Selector(this.next().value))
    } while (this.accept(',') || this.accept('newline'))
    this.state.push('selector')
    group.block = this.block(group)
    this.state.pop()
    return group
  },

  atrule: function() {
    var group = new nodes.Group
    do {
      this.accept('newline')
      group.push(new nodes.Selector(this.next().value))
    } while (this.peek().tag == 'string' || this.peek().tag === 'identifier')
    this.state.push('atrule')
    group.block = this.block(group)
    this.state.pop()
    return group
  },

  block: function(node, scope) {
    var statement
      , block = this.parent = new nodes.Block(this.parent, node)

    this.accept('{')
    this.skipWhitespace()

    while (this.peek().tag !== '}') {
      if (this.accept('newline')) continue
      statement = this.statement()
      this.accept(';')
      this.skipWhitespace()
      if (!statement) this.error('unexpected token {peek} in block')
      block.push(statement)
    }

    this.expect('}')
    this.accept('outdent')
    this.skipSpaces()
    return block
  },

  identifier: function() {
    var i = 2
      , la = this.lookahead(i).tag

    while (la === 'space')
      la = this.lookahead(++i).tag

    switch (la) {
      case '-':
      case '+':
      case '/':
      case '*':
      case '%':
          switch (this.currentState) {
            case 'selector':
            case 'atrule':
              return this.property()
            default:
        }
      default:
        switch (this.currentState) {
          case 'root':
            return this.selector()
          case 'selector':
          case 'function':
          case 'atrule':
            return this.property()
          default:
            return this.id()
        }
    }
  },

  id: function () {
    var tok = this.expect('identifier')
    this.accept('space')
    return tok.value
  },

  property: function() {
    var ident = this.accept('identifier')
      , prop = new nodes.Property(ident)
      , ret = prop

    this.accept('space')
    if (this.accept(':')) this.accept('space')

    this.state.push('property')
    prop.expression = this.list()
    if (prop.expression.isEmpty) ret = ident
    this.state.pop()
    this.accept(';')

    return ret
  },

  list: function() {
    var node = this.expression()
    while (this.accept(',') || this.accept('indent')) {
      if (node.isList) {
        node.push(this.expression());
      } else {
        var list = new nodes.Expression(true);
        list.push(node);
        list.push(this.expression());
        node = list;
      }
    }
    return node;
  },

  expression: function() {
    var node
      , expression = new nodes.Expression
    this.state.push('expression')
    while (node = this.additive()) {
      if (!node) this.error('unexpected token {peek} in expression')
      expression.push(node)
    }
    this.state.pop()
    return expression
  },

  additive: function() {
    var op
      , node = this.multiplicative()
    while (op = this.accept('+') || this.accept('-')) {
      this.operand = true
      node = new nodes.BinOp(op.type, node, this.multiplicative())
      this.operand = false
    }
    return node
  },

  multiplicative: function() {
    var op
      , node = this.primary()
    while (op =
          this.accept('*')
      || this.accept('/')
      || this.accept('%')) {
      this.operand = true
      if (op === '/' && this.currentState === 'property' && !this.parens) {
        this.stash.push(new Token('literal', '/'))
        this.operand = false
        return node;
      } else {
        if (!node) this.error('illegal unary "' + op + '", missing left-hand operand')
        node = new nodes.BinOp(op.type, node, this.defined())
        this.operand = false
      }
    }
    return node
  },

  primary: function() {
    var op
      , node

    if (this.accept('(')) {
      ++this.parens;
      var expression = this.expression()
      this.expect(')')
      --this.parens
      this.accept('%') && exprression.push('%');
      return expression
    }

    switch (this.peek().tag) {
      case 'dimension':
      case 'color':
      case 'string':
      case 'literal':
        return this.next().value
      case 'identifier':
        return this.identifier()
      case 'function':
        return this.functionCall()
    }
  },

  function: function () {
    var parens = 1
      , i = 2
      , tok

    out:
    while (tok = this.lookahead(i++)) {
      switch (tok.type) {
        case 'function':
        case '(':
          ++parens;
          break;
        case ')':
          if (!--parens) break out;
          break;
        case 'eos':
          this.error('failed to find closing paren ")"');
      }
    }
    switch (this.currentState) {
      case 'expression':
        return this.functionCall()
      default:
        return this.looksLikeFunctionDefinition(i)
          ? this.functionDefinition()
          : this.expression()
    }
  },

  functionDefinition: function () {
    var name = this.expect('function').value;

    this.state.push('function params')
    this.skipWhitespace()
    var params = this.params()
    this.skipWhitespace()
    this.expect(')')
    this.state.pop()

    this.state.push('function')
    var fn = new nodes.Function(name, params)
    fn.block = this.block(fn)
    this.state.pop()
    return new nodes.Ident(name, fn)
  },

  functionCall: function () {
    var name = this.expect('function').value
    this.state.push('function arguments')
    this.parens++
    var args = this.args()
    this.expect(')')
    this.parens--
    this.state.pop()
    return new nodes.Call(name, args)
  },

  params: function() {
    var tok
      , node
      , params = new nodes.Params

    while (tok = this.accept('ident')) {
      this.accept('space')
      params.push(node = tok.val)
      if (this.accept('=')) {
        node.value = this.expression()
      }
      this.skipWhitespace()
      this.accept(',')
      this.skipWhitespace()
    }
    return params
  },

  args: function () {
    var args = new nodes.Arguments
      , keyword

    do {
      if (this.peek().tag === 'ident' && this.lookahead(2).tag === ':') {
        keyword = this.next().value
        this.expect(':')
        args.map[keyword] = this.expression()
      } else {
        args.push(this.expression())
      }
    } while (this.accept(','))

    return args
  },

  comment: function(){
    var node = this.next().value
    this.skipSpaces()
    return node
  },

  literal: function() {
    return this.expect('literal').value
  },

}
