var Root = module.exports = function Root() {
  this.nodes = []
}

Root.prototype = {
  constructor: Root
, push: function (node) {
    this.nodes.push(node)
  }
, unshift: function (node) {
    this.nodes.unshift(node)
  }
, toString: function () {
    return '[Root]'
  }
}