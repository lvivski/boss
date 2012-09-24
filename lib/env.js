var functions = require('./functions')
  , colors = require('./colors')
  , Scope = require('./scope')
  , nodes = require('./nodes')


var Env = module.exports = function Env(options) {
  this.compress = options.compress || 0
  this.spaces = options.indent || 2
  this.lonenos = options.linenos

  var scope = new Scope()

  Object.keys(colors).forEach(function (name) {
    var rgb = colors[name]
      , rgba = new nodes.RGBA(rgb[0], rgb[1], rgb[2], 1)
      , node = new nodes.Ident(name, rgba)
    scope.add(node)
  })

  Object.keys(functions).forEach(function(name){
    scope.add(new nodes.Ident(name, functions[name]))
  })

  this.stack.push(scope)
}

Env.prototype = {
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

, classes: {}

, selectors: []
, buf: ''
, indents: 1
, get indent() {
    if (this.compress > 4) return ''
    return new Array(this.indents).join(Array(this.spaces + 1).join(' '))
  }
}