var Selector = module.exports = function Selector(name) {
  this.name = name
}

Selector.prototype = {
  constructor: Selector

, eval: function () { return this }

, toString: function () {
    return this.name.trim()
  }
}