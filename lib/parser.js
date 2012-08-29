var Lexer = require('./lexer')
  , Token = require('./token')
  , nodes = require('./nodes')

var Parser = module.exports = function Parser(str) {
  this.tokens = new Lexer(str).tokenize()
  this.root = new nodes.Root
  this.stash = []
  this.parens = 0
  this.state = ['root']
}

Parser.prototype = {
  get currentState() {
    return this.state[this.state.length - 1]
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
  }

, error: function (msg) {
    var tag = this.peek().tag
      , val = undefined == this.peek().val
          ? ''
          : ' ' + this.peek().toString()

    if (val.trim() == tag.trim()) val = ''
    throw new Error(msg.replace('{peek}', '"' + tag + val + '"'))
  }

, accept: function (tag) {
    if (this.peek().tag === tag) {
      return this.next()
    }
  }

, expect: function (tag) {
    if (tag != this.peek().tag) {
      this.error('expected "' + tag + '", got {peek}')
    }
    return this.next()
  }

, next: function () {
    var tok = this.stash.length
      ? this.stash.pop()
      : this.tokens.shift()

    nodes.lineno = tok.lineno

    return tok
  }

, peek: function () {
    return this.tokens[0]
  }

, lookahead: function (n) {
    return this.tokens[--n]
  }

, lineContains: function (tag) {
    var i = 1
      , la

    while (la = this.lookahead(i++)) {
      if (~['indent', 'outdent', 'newline'].indexOf(la.tag))
        return
      if (la.tag == tag) return true
    }
  }

, skipWhitespace: function () {
    while (~['space', 'indent', 'outdent', 'newline'].indexOf(this.peek().tag))
      this.next()
  }

, skipNewlines: function () {
    while ('newline' == this.peek().tag)
      this.next()
  }

, skipSpaces: function () {
    while ('space' == this.peek().tag)
      this.next()
  }

, looksLikeDefinition: function (i) {
    return this.lookahead(i).tag === 'indent'
          || this.lookahead(i).tag === '{'
  }

, statement: function () {
    var tag = this.peek().tag
    return this[tag] && this[tag]() || this.error('unexpected {peek}')
  }

, selector: function () {
    var ruleset = new nodes.Ruleset

    do {
      this.accept('newline')
      ruleset.push(new nodes.Selector(this.next().value))
    } while (this.accept(','))

    this.state.push('selector')
    ruleset.block = this.block(ruleset)
    this.state.pop()

    return ruleset
  }

, dimension: function () {
    var ruleset = new nodes.Ruleset
    do {
      this.accept('newline')
      ruleset.push(this.next().value)
    } while (this.accept(','))

    this.state.push('selector')
    ruleset.block = this.block(ruleset)
    this.state.pop()

    return ruleset
  }

, atkeyword: function () {
    var rule = '@' + this.next().value
    while (this.peek().tag !== '{') {
      this.accept('newline')
      this.accept('indent')
      rule += this.next().toString()
    }
    var atrule = new nodes.Atrule(rule)
    this.state.push('atrule')
    atrule.block = this.block(atrule)
    this.state.pop()
    return atrule
  }

, block: function (node) {
    var statement
      , block = this.parent = new nodes.Block(this.parent, node)

    this.skipNewlines()
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
    this.parent = block.parent
    return block
  }

, ident: function () {
    var i = 2
      , la = this.lookahead(i).tag

    while (la === 'space')
      la = this.lookahead(++i).tag

    switch (la) {
      case '=':
        return this.assignment()
      case '-':
      case '+':
      case '/':
      case '*':
      case '%':
        switch (this.currentState) {
          case 'selector':
          case 'atrule':
            return this.declaration()
        }
      default:
        switch (this.currentState) {
          case 'root':
            return this.selector()
          case 'selector':
          case 'function':
          case 'atrule':
            return this.declaration()
          default:
            var tok = this.expect('ident')
            this.accept('space')
            return new nodes.Ident(tok.value)
        }
    }
  }

, declaration: function () {
    var ident = this.accept('ident').value
      , decl = new nodes.Declaration(ident)
      , ret = decl

    this.accept('space')
    if (this.accept(':')) this.accept('space')

    this.state.push('declaration')
    decl.value = this.list()
    if (decl.value.isEmpty) ret = ident
    this.state.pop()
    this.accept(';')

    return ret
  }

, list: function () {
    var node = this.expression()
    while (this.accept(',') || this.accept('indent')) {
      if (node.isList) {
        node.push(this.expression())
      } else {
        var list = new nodes.Expression(true)
        list.push(node)
        list.push(this.expression())
        node = list
      }
    }
    return node
  }

, assignment: function () {
    var name = this.expect('ident').value

    this.accept('space')
    this.expect('=')

    this.state.push('assignment')

    var expression = this.list()
      , node = new nodes.Ident(name, expression)

    this.state.pop()

    return node
  }

, expression: function () {
    var node
      , expression = new nodes.Expression
    this.state.push('expression')
    while (node = this.additive()) {
      if (!node) this.error('unexpected token {peek} in expression')
      expression.push(node)
    }
    this.state.pop()
    return expression
  }

, additive: function () {
    var op
      , node = this.multiplicative()
    while (op = this.accept('+') || this.accept('-')) {
      this.operand = true
      node = new nodes.BinOp(op.tag, node, this.multiplicative())
      this.operand = false
    }
    return node
  }

, multiplicative: function () {
    var op
      , node = this.primary()
    while (op =
          this.accept('*')
      || this.accept('/')
      || this.accept('%')) {
      this.operand = true
      if (op === '/' && this.currentState === 'declaration' && !this.parens) {
        this.stash.push(new Token('literal', '/'))
        this.operand = false
        return node
      } else {
        if (!node) this.error('illegal unary "' + op + '", missing left-hand operand')
        node = new nodes.BinOp(op.tag, node, this.primary())
        this.operand = false
      }
    }
    return node
  }

, primary: function () {
    var op
      , node

    if (this.accept('(')) {
      ++this.parens
      var expression = this.expression()
      this.expect(')')
      --this.parens
      this.accept('%') && exprression.push('%')
      return expression
    }

    switch (this.peek().tag) {
      case 'dimension':
      case 'color':
      case 'string':
      case 'literal':
        return this.next().value
      case 'ident':
        return this.ident()
      case 'function':
        return this['call']()
    }
  }

, 'function': function () {
    var parens = 1
      , i = 2
      , tok

    out:
    while (tok = this.lookahead(i++)) {
      switch (tok.tag) {
        case 'function':
        case '(':
          ++parens
          break
        case ')':
          if (!--parens) break out
          break
        case 'eos':
          this.error('failed to find closing paren ")"')
      }
    }
    switch (this.currentState) {
      case 'expression':
        return this.call()
      default:
        return this.looksLikeDefinition(i)
          ? this.definition()
          : this.expression()
    }
  }

, definition: function () {
    var name = this.expect('function').value

    this.state.push('function params')
    this.skipWhitespace()
    var params = this.params()
    this.skipWhitespace()
    this.expect(')')
    this.state.pop()

    this.state.push('function')
    var fn = new nodes.Definition(name, params)
    fn.block = this.block(fn)
    this.state.pop()
    return fn
  }

, 'call': function () {
    var name = this.expect('function').value
    this.state.push('function arguments')
    this.parens++
    var args = this.args()
    this.expect(')')
    this.parens--
    this.state.pop()
    return new nodes.Call(name, args)
  }

, params: function () {
    var tok
      , node
      , params = new nodes.Params

    while (tok = this.accept('ident')) {
      this.accept('space')
      params.push(node = tok.value)
      if (this.accept('=')) {
        node.value = this.expression()
      }
      this.skipWhitespace()
      this.accept(',')
      this.skipWhitespace()
    }
    return params
  }

, args: function () {
    var args = new nodes.Arguments
      , keyword

    do {
      if (this.peek().tag === 'ident' && this.lookahead(2).tag === '=') {
        keyword = this.next().value
        this.expect('=')
        args.map[keyword] = this.expression()
      } else {
        args.push(this.expression())
      }
    } while (this.accept(','))
    return args
  }

, comment: function () {
    var node = this.next().value
    this.skipSpaces()
    return node
  }

, literal: function () {
    return this.expect('literal').value
  }
}
