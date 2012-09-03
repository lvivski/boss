var Expression = require('./expression')

var Arguments = module.exports = function Arguments(nodes, isList) {
  this.map = {}
  this.nodes = nodes || []
  this.isList = isList || false
}

Arguments.prototype = new Expression

Arguments.prototype.constructor = Arguments

Arguments.prototype.eval = function (env) {
  Object.keys(this.map).forEach(function (node) {
    this.map[node] = this.map[node].eval(env)
  })

  this.nodes = this.nodes.map(function (node) {
    return node.eval(env)
  })
  return this
}