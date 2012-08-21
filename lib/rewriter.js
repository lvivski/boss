var Token = require('./token')

var Rewriter = module.exports = function Rewriter(tokens, options) {
  options = options || {}
  this.tokens = tokens
}

var EXPRESSION_START = ['{', 'indent']
  , EXPRESSION_END =   ['}', 'outdent']
  , LINEBREAKS = ['newline', 'indent', 'outdent']

Rewriter.prototype = {
  rewrite: function () {
    return this.addImplicitBraces()
              .findSelectors()
              .tokens
  }

, addImplicitBraces: function () {
    var stack = []
      , sameLine = true
      , tok
      ,condition = function(token, i) {
          var tag = token.tag
          if (LINEBREAKS.indexOf(tag) >= 0) sameLine = false;
          return (tag === 'newline' || tag === 'outdent') && sameLine
        }
      , action = function (token, i) {
          var tok = new Token('}', false, token.lineno)
          return this.tokens.splice(i, 0, tok)
        }


    return this.scan(function(token, i, tokens) {
      var tag = token.tag
        , last

      if (EXPRESSION_START.indexOf(tag) >= 0) {
        stack.push([(tag === 'indent' && tokens[i - 1].tag === '{' ? '{' : tag), i])
        return 1
      }

      if (EXPRESSION_END.indexOf(tag) >= 0) {
        stack.pop()
        return 1
      }

      if (!((tag === 'identifier' || tag === 'dimension') && stack.length && stack[stack.length - 1][0] !== '{'))
        return 1

      sameLine = true
      stack.push(['{'])
      tok = new Token('{', false, token.lineno)
      tokens.splice(i - 1, 0, tok)

      this.detectEnd(i + 2, condition, action)
      return 1
    })
  }

, findSelectors: function () {
  return this.scan(function(token, i, tokens) {
      if (token.tag === 'identifier'
          && (tokens[i + 1].tag === '{' || tokens[i + 2].tag === '{'))
      {
        token.tag = 'selector'
      }

      if (token.tag == 'identifier'
          && (tokens[i + 1].tag === 'space' && tokens[i + 2].tag === 'selector')) {
        token.tag = 'selector'
        token.value += ' ' + tokens[i + 2].value
        tokens.splice(i + 1, 2);
      }

      if (token.tag === 'dimension' && tokens[i + 1].tag === '{') {
        token.tag = 'selector'
        token.value = token.value.toString()
      }
      return 1
    })
}

, scan: function (block) {
    var i = 0
      , tokens = this.tokens
      , token
    while (token = tokens[i]) {
      i += block.call(this, token, i, tokens)
    }
    return this
  }
, detectEnd: function (i, condition, action) {
    var tokens = this.tokens
      , levels = 0
      , token
    while (token = tokens[i]) {
      if (levels === 0 && condition.call(this, token, i)) {
        return action.call(this, token, i)
      }
      if (!token || levels < 0) {
        return action.call(this, token, i - 1);
      }
      if (EXPRESSION_START.indexOf(token.tag) >= 0) {
        ++levels
      } else if (EXPRESSION_END.indexOf(token.tag) >= 0) {
        --levels
      }
      ++i
    }
    return i - 1
  }
}
