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

, eval: function (env) {
    this.nodes = this.nodes.map(function (node) {
      return node.eval(env)
    })
    return this
  }

, toString: function (env) {
    var node

    if (this.hasDeclarations) {
      var arr = [env.compress ? '{' : ' {']
      ++env.indents
      for (var i = 0, len = this.nodes.length; i < len; ++i) {
        env.last = len - 1 == i
        node = this.nodes[i]
        switch (node.constructor.name) {
          case 'Expression':
          case 'Function':
          case 'Ruleset':
          case 'Dimension':
            continue
          case 'Media':
          default:
            arr.push(node.toString(env))
        }
      }
      --env.indents
      arr.push(env.indent + '}')
      env.buf += arr.join(env.compress ? '' : '\n')
      env.buf += '\n'
    }

    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      node = this.nodes[i]
      switch (node.constructor.name) {
        case 'Ruleset':
        case 'Atrule':
        case 'Block':
          node.toString(env)
          break
        case 'Literal':
          env.buf += node.toString(env) + '\n'
          break
      }
    }
  }
}