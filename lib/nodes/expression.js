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

, eval: function (env) {
    this.nodes = this.nodes.map(function (node) {
      return node.eval(env)
    })
    return this
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