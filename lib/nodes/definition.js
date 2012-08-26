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
, toString: function () {
    return ''
  }
}