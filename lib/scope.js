var Scope = module.exports = function Scope() {
  this.locals = {}
}

Scope.prototype = {
  add: function (name, value) {
    this.locals[name.trim()] = value.trim()
  }
, lookup: function (name) {
    return this.locals[name]
  }
}


