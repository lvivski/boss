var Ident = require('./ident')
  , Null = require('./null')

var Definition = module.exports = function Definition(name, params, body, js) {
  this.name = name
  this.params = params
  this.block = body
}

Definition.prototype = {
  constructor: Definition
, get arity() {
    return this.params.length
  }

, eval: function (env) {
    env.scope.add(new Ident(this.name, this))
    return Null
  }

, toString: function () {
    return ''
  }
}