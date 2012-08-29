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

, eval: function (env) {
    env = env || {}

    this.nodes = this.nodes.map(function (node) {
      return node.eval(env)
    })

    return this
  }

, toString: function (env) {
    env = env || {}

    this.nodes.forEach(function (node) {
      var ret = node.toString(env)
      if (ret) env.buf += ret + '\n'
    })

    return env.buf
  }
}