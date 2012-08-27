exports.version = '0.0.1'

exports.nodes = require('./nodes')

var Parser = exports.Parser = require('./parser')

exports.render = function (str, options, cb) {
  if (typeof options === 'function')
    cb = options, options = {}
  try {
    var ast = new Parser(str, options).parse(),
        css = ast.eval().toString(options)
    cb(null, css)
  } catch (e) {
    cb(e)
  }
}