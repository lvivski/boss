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

, eval: function () {
    this.nodes = this.nodes.map(function (node) {
      return node.eval()
    })
    return this
  }

, toString: function (options) {
    var env = {
        buf: ''
      , compress: options.compress
      , linenos: options.linenos
      , spaces: options.indent || 2
      , indents: 1
      , stack: []
      , get indent() {
          if (this.compress) return ''
            return new Array(this.indents).join(Array(this.spaces + 1).join(' '))
        }
      }

    this.nodes.forEach(function (node) {
      var ret = node.toString(env)
      if (ret) env.buf += ret + '\n'
    })
    return env.buf
  }
}