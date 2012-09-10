var Call = require('./call')
  , Arguments = require('./arguments')
  , shortSizes = require('../shorthands').sizes

var Declaration = module.exports = function Declaration(property, value) {
  this.property = property
  this.value = value
}

Declaration.prototype = {
  constructor: Declaration

, eval: function (env) {
    var fn, args

    if (env.calling.indexOf(this.property) < 0
        && (fn = env.lookup(this.property))
        && (typeof fn === 'function' || fn.block)
    ) {
      return (new Call(this.property, new Arguments(this.value.isList, this.value.nodes))).eval(env)
    }

    this.value = this.value.eval(env)

    if (env.compress)
      if (~shortSizes.indexOf(this.property)) {
        var values = this.value
        if (values.length >= 3 && values.get(1) === values.get(3))
          values.pop()
        if (values.get(0) === values.get(2))
          values.pop()
        if (values.length === 2 && values.get(0) === values.get(1))
          values.pop()
      }

    return this
  }

, toString: function (env) {
    var val = this.value.toString(env).trim()
    return env.indent + (this.property)
      + (env.compress ? ':' + val : ': ' + val)
  }
}