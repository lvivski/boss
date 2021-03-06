var Stylesheet = module.exports = function Stylesheet(nodes) {
  this.nodes = nodes || []
}

Stylesheet.prototype = {
  constructor: Stylesheet

, push: function (node) {
    this.nodes.push(node)
  }

, unshift: function (node) {
    this.nodes.unshift(node)
  }

, eval: function (env, defOnly) {
    env = env || {}

    if (defOnly) {
      this.nodes.forEach(function(node) {
        ~['Declaration', 'Definition'].indexOf(node.constructor.name)
        && node.eval(env)
      })
    } else {
      this.nodes = this.nodes.map(function (node) {
        return node.eval(env)
      })
    }

    return this
  }

, toString: function (env) {
    if (!env) return 'BOSS'

    this.nodes.forEach(function (node) {
      var ret = node.toString(env)
      if (ret) env.buf += ret + '\n'
    })

    return env.buf
  }
}