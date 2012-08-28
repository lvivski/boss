var Ident = module.exports = function Ident(name, value) {
  this.name = name
  this.value = value || null
}

Ident.prototype = {
  constructor: Ident

, eval: function (env) {
    var value

    if (value = env.lookup(this.name)) {
      return value
    }

    return this
 }

, toString: function (env) {
    return this.name
  }
}