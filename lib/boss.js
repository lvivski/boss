var Parser = exports.Parser = require('./boss/parser').BOSSParser

var Transformer = exports.Transformer = require('./boss/transformer').BOSSTransformer

var Translator = exports.Translator = require('./boss/translator').BOSSTranslator

var inspect = require('util').inspect
  , q = require('q')
  , fs = require('fs')
  , Env = require('./env')

exports.run = function run(options) {
  var input = []
    , deferred = q.defer()

  options.input.on('data', function (chunk) {
    input.push(chunk)
  })

  options.input.once('end', function () {
    finish(input.join(''), options)
  })

  options.input.resume()

  return deferred.promise
}

var parse = exports.parse = function parse(source) {
  var ast = Parser.matchAll(source, "stylesheet")
      ast = Transformer.match(ast, "stylesheet")
  return Translator.match(ast, "stylesheet")
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

function finish(source, options) {
  mixin(options.mixin).then(function (mixin) {
    var env = new Env(options)

    mixin && mixin.eval(env, true)

    var ast = parse(source)
      , css = ast.eval(env)
                 .toString(env)

    options.output.write(css)

    if (options.output === process.stdout) {
      options.output.write('\n')
    } else {
      options.output.end()
    }

    if (options.compress > 5) {
      console.log('\n')
      console.log(JSON.stringify(env.classes))
    }

    deferred.resolve()
  })
}
