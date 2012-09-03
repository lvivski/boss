var Scope = require('../scope')
  , Ident = require('./ident')
  , Null = require('./null')

var Call = module.exports = function Call(name, args) {
  this.name = name
  this.args = args
}

var hasOwnProperty = Object.prototype.hasOwnProperty

Call.prototype = {
  constructor: Call

, eval: function (env) {
    this.args = this.args.eval(env)

    var fn

    if (fn = env.lookup(this.name)) {
      try {

        if (hasOwnProperty.call(fn, 'params')) // user defined mixin
          return this.mixin(fn, env)

        return this.bif(fn, env)

      } catch (e) {
        throw e
      }
    } else {
      return this
    }
  }

, toString: function (env) {
    /*env.isURL = this.name === 'url'
    var args = this.args.nodes.map(function (arg) {
      return arg.toString(env)
    }).join(env.compress ? ',' : ', ')
    if (env.isURL) args = '"' + args + '"'
    env.isURL = false
    return this.name + '(' + args + ')'*/
    return this.name + '(' + this.args + ')'
  }

, mixin: function (fn, env) {
    var scope = new Scope
      , i = 0
      , args = this.args
      , block = env.block

    env.calling.push(fn.name)
    env.stack.push(scope)

    fn.params.nodes.forEach(function (node) {
      var arg = args.map[node.name] || args.nodes[i++]
      scope.add(new Ident(node, arg))
    })

    var mixin = fn.block.nodes.map(function (node) { return node.eval(env) } )
      , len = block.nodes.length
      , head = block.nodes.slice(0, block.index)
      , tail = block.nodes.slice(block.index + 1, len)

    block.nodes = head.concat(mixin).concat(tail)
    block.index += mixin.length - 1

    env.stack.pop()
    env.calling.pop()

    return Null
  }

, bif: function (fn, env) {
    var args = this.args.nodes.map(function (arg) {
      return arg.nodes[0].nodes ? arg.nodes[0].nodes[0] : arg.nodes[0]
    })

    return fn.apply(null, args)
  }
}