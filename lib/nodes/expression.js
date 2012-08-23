var Expression = module.exports = function Expression(isList) {
  this.nodes = []
  this.isList = isList || false
}

Expression.prototype = {
  constructor: Expression
, get isEmpty() {
    return !this.nodes.length
  }

, push: function (node) {
    this.nodes.push(node)
  }

, toString: function () {
    return '(' + this.nodes.map(function (node) {
      return node.toString()
    }).join(this.isList ? ', ' : ' ') + ')'
  }
}