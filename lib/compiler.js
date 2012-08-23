
var nodes = require('./nodes')
  , pseudoSelectors = require('./pseudoselectors')

var Compiler = module.exports = function Compiler(root, options) {
  options = options || {}
  this.root = root
  this.compress = options.compress
  this.linenos = options.linenos
  this.spaces = options['indent spaces'] || 2
  this.includeCSS = options['include css']
  this.indents = 1
  this.stack = []
}

Compiler.prototype = {
  compile: function (node) {
    node = node || this.root
    var method = 'compile' + node.constructor.name
    return this[method] ? this[method](node) : node
  }

, get indent() {
    if (this.compress) return ''
    return new Array(this.indents).join(Array(this.spaces + 1).join(' '))
  }

, compileRoot: function (block) {
    this.buf = ''
    for (var i = 0, len = block.nodes.length; i < len; ++i) {
      var node = block.nodes[i]
      var ret = this.compile(node)
      if (ret)
        this.buf += ret + '\n'
    }
    return this.buf
  }

, compileBlock: function (block) {
    var node

    if (block.hasDeclarations) {
      var arr = [this.compress ? '{' : ' {']
      ++this.indents
      for (var i = 0, len = block.nodes.length; i < len; ++i) {
        this.last = len - 1 == i
        node = block.nodes[i]
        switch (node.constructor.name.toLowerCase()) {
          case 'expression':
          case 'function':
          case 'ruleset':
          case 'dimension':
            continue
          case 'media':
          default:
            arr.push(this.compile(node))
        }
      }
      --this.indents
      arr.push(this.indent + '}')
      this.buf += arr.join(this.compress ? '' : '\n')
      this.buf += '\n'
    }

    for (var i = 0, len = block.nodes.length; i < len; ++i) {
      node = block.nodes[i]
      switch (node.constructor.name.toLowerCase()) {
        case 'ruleset':
        case 'atrule':
        case 'block':
          this.compile(node)
          break
        case 'literal':
          this.buf += this.compile(node) + '\n'
          break
      }
    }
  }

, compileAtrule: function (media) {
    this.buf += '@media ' + media.val
    this.buf += this.compress ? '{' : ' {\n'
    ++this.indents
    this.compile(media.block)
    --this.indents
    this.buf += '}' + (this.compress ? '' : '\n')
  }

, compileComment: function (comment) {
    return this.compress
      ? comment.suppress
        ? ''
        : comment.str
      : comment.str
  }

, compileFunction: function (fn) {
    return fn.name
  }

, compileLiteral: function (lit) {
    var val = lit.val.trim()
    if (!this.includeCSS) val = val.replace(/^  /gm, '')
    return val
  }

, compileRGBA: function (rgba) {
    return rgba.toString()
  }

, compileHSLA: function (hsla) {
    return hsla.toString()
  }

, compileDimension: function (dimension) {
    var unit = dimension.unit || ''
      , n = dimension.value
      , float = n != (n | 0)

    if (unit !== '%' && n === 0) return '0'
    if (float && n < 1 && n > -1) {
      return n.toString().replace('0.', '.') + unit
    }

    return n.toString() + unit
  }

, compileRuleset: function (ruleset) {
    var stack = this.stack

    stack.push(ruleset.selectors)

    if (ruleset.block.hasDeclarations) {
      var selectors = this.compileSelectors(stack)
      this.buf += selectors.join(this.compress ? ',' : ',\n')
    }

    this.compile(ruleset.block)
    stack.pop()
  }

, compileIdent: function (ident) {
    return ident.value
  }

, compileString: function (string) {
    return string.toString()
  }

,  compileCall: function (call) {
    this.isURL = 'url' == call.name
    var args = call.args.nodes.map(function (arg) {
      return this.compile(arg)
    }, this).join(this.compress ? ',' : ', ')
    if (this.isURL) args = '"' + args + '"'
    this.isURL = false
    return call.name + '(' + args + ')'
  }

, compileExpression: function (expr) {
    var buf = []
      , self = this
      , len = expr.nodes.length
      , nodes = expr.nodes.map(function (node) { return self.compile(node) })

    nodes.forEach(function (node, i) {
      var last = i == len - 1
      buf.push(node)
      if ('/' == nodes[i + 1] || '/' == node) return
      if (last) return
      buf.push(expr.isList
        ? (self.compress ? ',' : ', ')
        : (self.isURL ? '' : ' '))
    })

    return buf.join('')
  }

, compileBinOp: function (binop) {
    return this.compile(binop.eval());
  }

, compileArguments: function (args) {
    return this.visitExpression(args)
  }

, compileDeclaration: function (prop) {
    var self = this
      , val = this.compile(prop.value).trim()
    return this.indent + (prop.property)
      + (this.compress ? ':' + val : ': ' + val)
      + (this.compress
          ? (this.last ? '' : ';')
          : ';')
  }

, compileSelectors: function (arr) {
    var stack = this.stack
      , self = this
      , selectors = []
      , buf = []

    function compile(arr, i) {
      if (i) {
        arr[i].forEach(function (selector) {
          if (selector.name) {
            buf.unshift(selector.name)
            compile(arr, i - 1)
            buf.shift()
          } else {
            selectors.push(selector.name)
          }
        })
      } else {
        arr[0].forEach(function (selector) {
          var str = selector.name.trim()
          if (buf.length) {
            var cbf
            for (var i = 0, len = buf.length; i < len; ++i) {
              cbf = buf[i]
              if (~cbf.indexOf('&')) {
                if (cbf[0] === '&') {
                  if (cbf[1] !== ':' && cbf[1] !== ' ')
                    cbf = '&__' + cbf.slice(1)

                  if (~cbf.indexOf(':')) {
                    if (!~pseudoSelectors.indexOf( /:([^\( ]+)/.exec(cbf)[1]))
                      cbf = cbf.replace(/[:\(]/g, '_').slice(0, -1)
                  }
                }
                str = cbf.replace(/&/g, str).trim()
              } else {
                str += ' ' + cbf.trim()
              }
            }
          }
          selectors.push(self.indent + str.trimRight())
        })
      }
    }

    compile(arr, arr.length - 1)

    return selectors
  }
}