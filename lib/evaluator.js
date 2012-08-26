
var nodes = require('./nodes')

var Evaluator = module.exports = function Evaluator(rootNode, options) {
  options = options || {}
  this.rootNode = rootNode
}

Evaluator.prototype = {
  evaluate: function (node) {
    node = node || this.rootNode
    var method = node.constructor.name.toLowerCase()
    return this[method] ? this[method](node) : node
  }

, root: function (root) {
    root.nodes = root.nodes.map(function (node) {
      return this.evaluate(node)
    }, this)
    return root
  }

, ruleset: function (ruleset) {
    ruleset.block = this.evaluate(ruleset.block)
    return ruleset
  }

, block: function (block) {
    block.nodes = block.nodes.map(function (node) {
      return this.evaluate(node)
    }, this)
    return block
  }

, declaration: function (decl) {
    decl.value = this.evaluate(decl.value)
    return decl
  }

, expression: function (expr) {
    expr.nodes = expr.nodes.map(function (node) {
      return this.evaluate(node)
    }, this)
    return expr
  }

, binop: function (binop) {
    var op = binop.op
      , left = this.evaluate(binop.left)
      , right = this.evaluate(binop.right)
    return this.evaluate(left.operate(op, right))
  }
}