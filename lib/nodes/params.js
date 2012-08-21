var Params = module.exports = function Params() {
  this.nodes = []
}

Params.prototype = {
  get length() {
    return this.nodes.length
  }

, push: function (node) {
    this.nodes.push(node)
  }
}