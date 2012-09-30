var Call = require('./call')
  , Arguments = require('./arguments')
  , shorthands = require('../shorthands')

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
      args = new Arguments(true)
      if (!this.value.isList) {
        args.push(this.value)
      } else {
        args.nodes = this.value.nodes
      }
      return (new Call(this.property, args)).eval(env)
    }

    this.value = this.value.eval(env)

    if (env.compress > 1)
      if (shorthands[this.property]) {
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
      + (env.compress > 4 ? ':' + val : ': ' + val)
  }
}