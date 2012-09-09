var Expression = module.exports = function Expression(isList, nodes) {
  this.nodes = nodes || []
  this.isList = isList || false
}

Expression.prototype = {
  constructor: Expression

, get length() {
    return this.nodes.length
  }

, push: function (node) {
    this.nodes.push(node)
  }

, eval: function (env) {
    this.nodes = this.nodes.map(function (node) {
      return node.eval(env)
    })
    return this
  }

, operate: function (op, other) {
    var nodes = this.nodes.map(function(node, idx){
          return node.operate(op, other[idx])
        })
      , expr = new Expression(false, nodes)

    return expr
  }

, toString: function (env) {
    var buf = []
      , len = this.nodes.length
      , nodes = this.nodes.map(function (node) {
          return node.toString(env)
        })
      , self = this

    nodes.forEach(function (node, i) {
      var last = i == len - 1
      buf.push(node)
      if ('/' == nodes[i + 1] || '/' == node) return
      if (last) return
      buf.push(self.isList
        ? (env.compress ? ',' : ', ')
        : (env.isURL ? '' : ' '))
    })

    return buf.join('')
  }
}