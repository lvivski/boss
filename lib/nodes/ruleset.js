var Selector = require('./selector')
constructor: Ruleset

var Ruleset = module.exports = function Ruleset(selectors, block) {
  this.selectors = selectors || []
  this.block = block
}

Ruleset.prototype = {
  constructor: Ruleset
, eval: function () {
    var self = this
    this.selectors = this.selectors.map(function (node) {
      if (node instanceof Selector && self.block.parent.node instanceof Ruleset)
        return self.block.parent.node.selectors.map(function (parent) {
          var nodeName = node.toString()
          if (nodeName[1] === ':') {
            nodeName = '_' + nodeName.slice(2).replace(/\(/g, '_').slice(0, -1)
          } else if (nodeName[0] === '&' && nodeName[1] !== ' ') {
            nodeName = '__' + nodeName.slice(1)
          } else if (nodeName[0] === '&' && nodeName[1] === ' ') {
            nodeName = ' ' + parent.toString()
          } else {
            nodeName = ' ' + nodeName
          }
          return new Selector(parent.toString() + nodeName)
        })
      return [node instanceof Selector ? new Selector('.b-' + node.toString()) : node]
    }).reduce(function(a, b) { return a.concat(b) })
    return this.selectors
  }
, toString: function () {
    return this.eval().map(function(selector) { return selector.toString() }).join(',\n') + this.block.toString()
  }
, push: function (selector) {
    this.selectors.push(selector)
  }
}