var Declaration = require('./declaration')

var Block = module.exports = function Block(parent, node) {
  this.nodes = []
  this.parent = parent
  this.node = node
}

Block.prototype = {
  constructor: Block
, push: function (node) {
    this.nodes.push(node)
  }
, get hasDeclarations() {
    return this.nodes.filter(function (node) {
      return node instanceof Declaration
    }).length
  }

, get isEmpty() {
    return !this.nodes.length
  }

, toString: function () {
    return '{\n' + this.nodes.map(function(node){
      return node.toString()
    }).join(';\n') + '}'
  }
}