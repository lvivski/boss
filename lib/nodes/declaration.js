var Declaration = module.exports = function Declaration(property, value) {
  this.property = property
  this.value = value
}

Declaration.prototype = {
  constructor: Declaration
, toString: function () {
    return this.property + ':' + this.value.toString()
  }
}