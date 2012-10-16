var Parser = require('./parser').BOSSParser
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
  return Parser.matchAll(source, "stylesheet")
}

function partial(filename) {
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
  partial(options.partial).then(function (partial) {
    var env = new Env(options)

    partial && partial.eval(env, true)

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
