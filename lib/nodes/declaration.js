var Declaration = module.exports = function Declaration(property, value) {
  this.property = property
  this.value = value
}

Declaration.prototype = {
  constructor: Declaration

, eval: function () {
    this.value = this.value.eval()
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