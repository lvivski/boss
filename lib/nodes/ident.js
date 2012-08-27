var Ident = module.exports = function Ident(name) {
  this.name = name
}

Ident.prototype = {
  constructor: Ident

, eval: function () { return this }

, toString: function (env) {
    return this.name
  }
}