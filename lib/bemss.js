var bemss = exports
  , Parser = require('./bemss/parser').BEMSSParser
  , Transformer = require('./bemss/transformer').BEMSSTransformer
  , Translator = require('./bemss/translator').BEMSSTranslator
  , inspect = require('util').inspect
  , q = require('q')
  , fs = require('fs')

exports.run = function run(options) {
  var input = [],
      deferred = q.defer();

  options.input.on('data', function(chunk) {
    input.push(chunk);
  });

  options.input.once('end', function() {
    finish(input.join(''));
  });

  options.input.resume();

  function finish(source) {
    var ast = Parser.matchAll(fs.readFileSync(options.input.path).toString(), "stylesheet")

    ast = Transformer.match(ast, "stylesheet")

    // var css = inspect(ast, false, null)

    var css = Translator.match(ast, "stylesheet")

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