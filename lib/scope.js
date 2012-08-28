var Scope = module.exports = function Scope() {
  this.locals = {}
}

Scope.prototype = {
  add: function (ident) {
    this.locals[ident.name] = ident.value
  }
, lookup: function (name) {
    return this.locals[name]
  }
}


