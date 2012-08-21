var Expression = module.exports = function Expression(isList) {
  this.nodes = []
  this.isList = isList
}

Expression.prototype = {
  get isEmpty() {
    return !this.nodes.length
  }

, operate: function (op, other, value) {
    return this.nodes[0] && this.nodes[0].operate(op, other, value) || null;
  }

, push: function (node) {
    this.nodes.push(node)
  }

, toString: function () {
    return '(' + this.nodes.map(function(node){
      return node.toString()
    }).join(this.isList ? ', ' : ' ') + ')'
  }
}