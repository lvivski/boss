var Ident = module.exports = function Ident(name, value) {
  this.name = name
  this.value = value || null
}

Ident.prototype = {
  constructor: Ident

, eval: function () { return this }

, toString: function (env) {
    return this.name
  }
}