var Null = require('./null')

var Ident = module.exports = function Ident(name, value) {
  this.name = name
  this.value = value || null
}

Ident.prototype = {
  constructor: Ident

, eval: function (env) {
    var value = this.value

    if (value === null) {
      value = env.lookup(this.name)

      return value ? value.eval(env) : this
    } else {
      this.value = this.value.eval(env)
      env.scope.add(this)

      return Null
    }
 }

, toString: function (env) {
    return this.name
  }
}