var functions = require('../functions')
  , colors = require('../colors')
  , Scope = require('../scope')
  , Ident = require('./ident')
  , RGBA = require('./rgba')

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
    var env = {
      stack: []
    , lookup: function (name) {
        var stack = this.stack
          , i = stack.length
          , needle

        while (i--) {
          if (needle = stack[i].lookup(name))
            return needle
        }
        return null
      }
    , get scope () {
        return this.stack[this.stack.length - 1]
      }
    , calling: []
    }

    var scope = new Scope()

    Object.keys(colors).forEach(function (name) {
      var rgb = colors[name]
        , rgba = new RGBA(rgb[0], rgb[1], rgb[2], 1)
        , node = new Ident(name, rgba)
      scope.add(node)
    })

    Object.keys(functions).forEach(function(name){
      scope.add(new Ident(name, functions[name]))
    })

    env.stack.push(scope)

    this.nodes = this.nodes.map(function (node) {
      return node.eval(env)
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