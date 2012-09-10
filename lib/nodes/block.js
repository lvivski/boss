var Block = module.exports = function Block(nodes) {
  this.nodes = nodes || []
}

Block.prototype = {
  constructor: Block

, push: function (node) {
    this.nodes.push(node)
  }
, get hasDeclarations() {
    for (var i = 0, len = this.nodes.length; i < len; ++i)
      if (this.nodes[i].constructor.name === 'Declaration')
        return true
  }

, get length() {
    return this.nodes.length
  }

, eval: function (env) {
    env.block = this
    for (this.index = 0; this.index < this.nodes.length; ++this.index) {
      this.nodes[this.index] = this.nodes[this.index].eval(env)
    }
    return this
  }

, toString: function (env) {
    var node

    if (this.hasDeclarations) {
      env.buf += env.compress ? '{' : ' {\n'
      var arr = []
      ++env.indents
      for (var i = 0, len = this.nodes.length; i < len; ++i) {
        node = this.nodes[i]
        switch (node.constructor.name) {
          case 'Expression':
          case 'Definition':
          case 'Ruleset':
          case 'Dimension':
            continue
          default:
            arr.push(node.toString(env))
        }
      }
      --env.indents
      !env.compress && arr.push('')
      env.buf += arr.join(env.compress ? ';' : ';\n')
      env.buf += env.indent + (env.compress ? '}' : '}\n')
    }

    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      node = this.nodes[i]
      switch (node.constructor.name) {
        case 'Ruleset':
        case 'Atrule':
        case 'Block':
          node.toString(env)
          break
      }
    }
  }
}