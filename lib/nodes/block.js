var Property = require('./property')

var Block = module.exports = function Block(parent, node) {
  this.nodes = []
  this.parent = parent
  this.node = node
}

Block.prototype = {
  push: function (node) {
    this.nodes.push(node)
  }

, get hasProperties() {
    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      if (this.nodes[i] instanceof Property) {
        return true
      }
    }
  }

, get isEmpty() {
    return !this.nodes.length
  }
}