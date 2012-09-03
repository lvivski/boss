var Params = module.exports = function Params() {
  this.nodes = []
}

Params.prototype = {
  constructor: Params
, get length() {
    return this.nodes.length
  }

, push: function (node) {
    this.nodes.push(node)
  }
}