exports.version = '0.0.1'

exports.nodes = require('./nodes')

var Parser = exports.Parser = require('./parser')
var Compiler = exports.Compiler = require('./compiler')
var Evaluator = exports.Evaluator = require('./evaluator')

exports.render = function (str, options, cb) {
  if (typeof options === 'function')
    cb = options, options = {}
  try {
    var parser = new Parser(str, options)
      , evaluator = new Evaluator(parser.parse(), options)
      , compiler = new Compiler(evaluator.evaluate(), options)
      , css = compiler.compile()
    cb(null, css)
  } catch (e) {
    cb(e)
  }
}