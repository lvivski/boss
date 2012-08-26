var Selector = require('./selector')
constructor: Ruleset

var Ruleset = module.exports = function Ruleset(selectors, block) {
  this.selectors = selectors || []
  this.block = block
}

Ruleset.prototype = {
  constructor: Ruleset
, toString: function () {
    return this.selectors.map(function (selector) {
        return selector.toString()
    }).join(',\n') + this.block.toString()
  }
, push: function (selector) {
    this.selectors.push(selector)
  }
}
