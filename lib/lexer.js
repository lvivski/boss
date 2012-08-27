var Token = require('./token')
  , Rewriter = require('./rewriter')
  , units = require('./units')
  , nodes = require('./nodes')
  , captures

var Lexer = module.exports = function Lexer(str) {
  this.stash = []
  this.indentStack = []
  this.lineno = 1

  this.str = str
    .replace(/\s+$/, '\n')
    .replace(/\r\n?/g, '\n')
}

Lexer.prototype = {

  match: function (type) {
    var re = {
        sep: /^;[ \t]*/
      , space: /^([ \t]+)/
      , urlchars: /^[^\(\)]+/
      , operator: /^([.]{2,3}|[~^$*|]=|[-+*\/%]=?|[,:])[ \t]*/
      , atkeyword: /^@(import|(?:-(\w+)-)?keyframes|charset|font-face|page|media)[ \t]*/
      , important: /^!important[ \t]*/
      , brace: /^([{}])[ \t]*/
      , comment: /^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?|^\/\/.*/
      , paren: /^([()])[ \t]*/
      , 'function': /^(-?[_a-zA-Z$-]*)\([ \t]*/
      , ident: /^(-?[_a-zA-Z$-]+)/
      , string: /^("[^"]*"|'[^']*')[ \t]*/
      , color: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})[ \t]*/
      , dimension: new RegExp('^(-?\\d*\\.?\\d+)(' + units.join('|') + ')?[ \\t]*')
      , selector: /^[^{\n,]+/
    }

    return re[type].exec(this.str)
  }

, tokenize: function () {
    var tok
      , tmp = this.str
      , tokens = []

    while ((tok = this.next()).tag !== 'eos') {
      tokens.push(tok)
    }

    this.str = tmp
    this.prevIndents = 0

    tokens.push(tok)

    return (new Rewriter(tokens)).rewrite()
  }

, skip: function (len) {
    this.str = this.str.substr(Array.isArray(len)
      ? len[0].length
      : len)
  }

, next: function () {
    var tok = this.stashed() || this.advance()
    switch (tok.tag) {
      case 'newline':
      case 'indent':
        ++this.lineno
        break
      case 'outdent':
        (this.prev.tag !== 'outdent') && ++this.lineno
    }

    this.prev = tok
    tok.lineno = this.lineno
    return tok
  }

, stashed: function () {
    return this.stash.shift()
  }

, advance: function () {
    return this.eos()
      || this.sep()
      || this.url()
      || this.atkeyword()
      || this.comment()
      || this.newline()
      || this.important()
      || this['function']()
      || this.brace()
      || this.paren()
      || this.color()
      || this.string()
      || this.dimension()
      || this.ident()
      || this.operator()
      || this.space()
      || this.selector()
  }

  /* Tokens */

, eos: function () {
    if (this.str.length) return
    if (this.indentStack.length) {
      this.indentStack.shift()
      return new Token('outdent')
    } else {
      return new Token('eos')
    }
  }

, sep: function () {
    if (captures = this.match('sep')) {
      this.skip(captures)
      return new Token(';')
    }
  }

, url: function () {
    if (!this.isURL) return
    if (captures = this.match('urlchars')) {
      this.skip(captures)
      return new Token('literal', captures[0])
    }
  }

, atkeyword: function () {
    if (captures = this.match('atkeyword')) {
      this.skip(captures)
      var type = captures[1]
      if (captures[2]) type = 'keyframes'
      return new Token('atkeyword', type)
    }
  }

, comment: function () {
    if (capture = this.match('comment')) {
      var lines = capture[0].split('\n').length
      this.lineno += lines
      this.skip(captures)
      return new Token('comment', new nodes.Comment(captures[0]))
    }
  }

, newline: function () {
    var re

    if (this.indentRe) {
      captures = this.indentRe.exec(this.str)
    } else {
      re = /^\n([\t]*)[ \t]*/ // tabs
      captures = re.exec(this.str)

      if (captures && !captures[1].length) {
        re = /^\n([ \t]*)/ // spaces
        captures = re.exec(this.str)
      }

      if (captures && captures[1].length)
        this.indentRe = re
    }

    if (captures) {
      var tok
        , indents = captures[1].length

      this.skip(captures)

      if (this.str[0] === ' ' || this.str[0] === '\t') {
        throw new Error('Invalid indentation. You can use tabs or spaces to indent, but not both.')
      }

      if (this.str[0] == '\n') {
        ++this.lineno
        return this.advance()
      }

      // Outdent
      if (this.indentStack.length && indents < this.indentStack[0]) {
        while (this.indentStack.length && this.indentStack[0] > indents) {
          this.stash.push(new Token('outdent'))
          this.indentStack.shift()
        }
        tok = this.stash.pop()
      // Indent
      } else if (indents && indents != this.indentStack[0]) {
        this.indentStack.unshift(indents)
        tok = new Token('indent')
      // Newline
      } else {
        tok = new Token('newline')
      }
      return tok
    }
  }

, important: function () {
    if (captures = this.match('important')) {
      this.skip(captures)
      return new Token('id', '!important')
    }
  }

, 'function': function () {
    if (captures = this.match('function')) {
      this.skip(captures)
      var name = captures[1]
      this.isURL = 'url' == name
      return new Token('function', name)
    }
  }

, brace: function () {
    if (captures = this.match('brace')) {
      this.skip(1)
      return new Token(captures[1])
    }
  }

, paren: function () {
    if (captures = this.match('paren')) {
      var paren = captures[1]
      this.skip(captures)
      if (')' == paren) this.isURL = false
      return new Token(paren)
    }
  }

, color: function () {
    if (captures = this.match('color')) {
      this.skip(captures)
      var rgb = captures[1]
        , single = rgb.length == 3
        , r = parseInt(single ? rgb[0] + rgb[0] : rgb.substr(0, 2), 16)
        , g = parseInt(single ? rgb[1] + rgb[1] : rgb.substr(2, 2), 16)
        , b = parseInt(single ? rgb[2] + rgb[2] : rgb.substr(4, 2), 16)
      return new Token('color', new nodes.RGBA(r, g, b, 1))
    }
  }

, string: function () {
    if (captures = this.match('string')) {
      var str = captures[1]
        , quote = captures[0][0]
      this.skip(captures)
      str = str.slice(1, -1).replace(/\\n/g, '\n')
      return new Token('string', new nodes.String(str, quote))
    }
  }

, dimension: function () {
    if (captures = this.match('dimension')) {
      this.skip(captures)
      return new Token('dimension', new nodes.Dimension(captures[1], captures[2]))
    }
  }

, ident: function () {
    if (captures = this.match('ident')) {
      this.skip(captures)
      return new Token('ident', captures[1])
    }
  }

, operator: function () {
    if (captures = this.match('operator')) {
      var op = captures[1]
      this.skip(captures)
      this.isURL = false
      return new Token(op)
    }
  }

, space: function () {
    if (captures = this.match('space')) {
      this.skip(captures)
      return new Token('space')
    }
  }

, selector: function () {
    if (captures = this.match('selector')) {
      var selector = captures[0]
      this.skip(captures)
      return new Token('selector', selector)
    }
  }
}