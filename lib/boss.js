var boss = exports
  , Parser = require('./boss/parser').BOSSParser
  , Transformer = require('./boss/transformer').BOSSTransformer
  , Translator = require('./boss/translator').BOSSTranslator
  , inspect = require('util').inspect
  , q = require('q')
  , fs = require('fs')

var functions = require('./functions')
  , colors = require('./colors')
  , Scope = require('./scope')
  , nodes = require('./nodes')

exports.run = function run(options) {
  var input = []
    , deferred = q.defer()

  options.input.on('data', function (chunk) {
    input.push(chunk)
  })

  options.input.once('end', function () {
    finish(input.join(''))
  })

  options.input.resume()

  function finish(source) {
    var ast = Parser.matchAll(fs.readFileSync(options.input.path).toString(), "stylesheet")

    ast = Transformer.match(ast, "stylesheet")

    ast = Translator.match(ast, "stylesheet")

    var css = ast.eval(getEnv(options)).toString(getCssEnv(options))

    options.output.write(css)

    if (options.output === process.stdout) {
      options.output.write('\n')
    } else {
      options.output.end()
    }

    deferred.resolve()
  }

  return deferred.promise
};

function getEnv(options) {
  var env = {
        stack: []
      , compress: options.compress
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
        if (this.compress > 4) return ''
          return new Array(this.indents).join(Array(this.spaces + 1).join(' '))
      }
    }

  return env
}