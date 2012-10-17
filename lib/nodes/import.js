var Stylesheet = require('./stylesheet')
  , fs = require('fs')
  , dirname = require('path').dirname
  , resolve = require('path').resolve

var Import = module.exports = function Import(path) {
  this.path = path
}

Import.prototype = {
  constructor: Import

, eval: function (env) {
    var path = this.path.value
    if (~path.indexOf('.css')) {
      return this
    } else {
      path = resolve(dirname(env.path), path)
      
      var str = fs.readFileSync(path, 'utf8')
        , parse = require('../boss').parse
        , stylesheet = parse(str)
      
      return stylesheet.eval(env)
    }
  }

, toString: function (env) {
    return '@import ' + this.path.toString(env) + ';';
  }
}