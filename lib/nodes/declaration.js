var Declaration = module.exports = function Declaration(property, value) {
  this.property = property
  this.value = value
}

Declaration.prototype = {
  constructor: Declaration

, eval: function (env) {
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