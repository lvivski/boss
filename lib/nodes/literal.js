var Literal = module.exports = function Literal(value) {
  this.value = value.trim()
}

Literal.prototype = {
  constructor: Literal

, eval: function () { return this }

, toString: function (env) {
    return this.value
  }
}