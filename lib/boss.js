var boss = exports
  , Parser = require('./boss/parser').BOSSParser
  , Transformer = require('./boss/transformer').BOSSTransformer
  , Translator = require('./boss/translator').BOSSTranslator
  , inspect = require('util').inspect
  , q = require('q')
  , fs = require('fs')

var Env = require('./env')

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

  function parse(source) {
    var ast = Parser.matchAll(source, "stylesheet")

        ast = Transformer.match(ast, "stylesheet")

    return Translator.match(ast, "stylesheet")
  }

  function finish(source) {
    mixin(options.mixin).then(function(mixin){
      var env = new Env(options)

      mixin && mixin.eval(env)

      var ast = parse(source)

      var css = ast.eval(env)
                   .toString(env)

      options.output.write(css)

      if (options.output === process.stdout) {
        options.output.write('\n')
      } else {
        options.output.end()
      }

      deferred.resolve()
    })
  }

  function mixin(filename) {
    var deferred = q.defer()

    if (!filename) {
      deferred.resolve(false)
    } else {
      fs.readFile(filename, 'utf-8', function (err, source) {
        if (err) {
          deferred.reject(new Error(err))
        } else {
          deferred.resolve(parse(source))
        }
      })
    }

    return deferred.promise
  }

  return deferred.promise
}