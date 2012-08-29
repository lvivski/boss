exports.version = '0.0.1'

var nodes = exports.nodes = require('./nodes')

var Parser = exports.Parser = require('./parser')

var functions = require('./functions')
  , colors = require('./colors')
  , Scope = require('./scope')

exports.render = function (str, options, cb) {
  if (typeof options === 'function')
    cb = options, options = {}
  try {
    var ast = new Parser(str, options).parse(),
        css = ast.eval(getEnv()).toString(getCssEnv(options))
    cb(null, css)
  } catch (e) {
    cb(e)
  }
}

function getEnv() {
  var env = {
        stack: []
      , lookup: function (name) {
          var stack = this.stack
            , i = stack.length
            , needle

          while (i--) {
            if (needle = stack[i].lookup(name))
              return needle
          }
          return null
        }
      , get scope () {
          return this.stack[this.stack.length - 1]
        }
      , calling: []
      }
    , scope = new Scope()

  Object.keys(colors).forEach(function (name) {
    var rgb = colors[name]
      , rgba = new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1)
      , node = new nodes.Ident(name, rgba)
    scope.add(node)
  })

  Object.keys(functions).forEach(function(name){
    scope.add(new nodes.Ident(name, functions[name]))
  })

  env.stack.push(scope)

  return env
}

function getCssEnv(options) {
  var env = {
      buf: ''
    , compress: options.compress
    , linenos: options.linenos
    , spaces: options.indent || 2
    , indents: 1
    , stack: []
    , get indent() {
        if (this.compress) return ''
          return new Array(this.indents).join(Array(this.spaces + 1).join(' '))
      }
    }

  return env
}