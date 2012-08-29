var Call = require('./call')
  , Arguments = require('./arguments')

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
      if (!this.value.isList) {
        args = new Arguments
        args.push(this.value)
      } else {
        args = this.value
      }
      return (new Call(this.property, args)).eval(env)
    }

    this.value = this.value.eval(env)
    return this
  }

, toString: function (env) {
    var val = this.value.toString(env).trim()
    return env.indent + (this.property)
      + (env.compress ? ':' + val : ': ' + val)
      + (env.compress
          ? (env.last ? '' : ';')
          : ';')
  }
}