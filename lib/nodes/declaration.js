var Declaration = module.exports = function Declaration(property, value) {
  this.property = property
  this.value = value
}

Declaration.prototype = {
  constructor: Declaration
, operate: function (op, other, value) {
    return this.value.operate(op, other, value)
  }
, toString: function () {
    return this.property + ':' + this.value.toString()
  }
}