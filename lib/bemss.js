exports.version = '0.0.1'

exports.nodes = require('./nodes')

var Parser = exports.Parser = require('./parser')
var Compiler = exports.Compiler = require('./compiler')

exports.render = function (str, options, cb) {
  if (typeof options === 'function')
    cb = options, options = {}
  try {
    var parser = new Parser(str)
      , compiler = new Compiler(parser.parse(), options)
      , css = compiler.compile()

    cb(null, css)
  } catch (e) {
    cb(e)
  }
}