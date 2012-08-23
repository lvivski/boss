var Selector = module.exports = function Selector(name) {
  this.name = name
}

Selector.prototype = {
  constructor: Selector
, toString: function () {
    return this.name.trim()
  }
}