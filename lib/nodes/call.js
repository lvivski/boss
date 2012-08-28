var Call = module.exports = function Call(name, args) {
  this.name = name
  this.args = args
}

Call.prototype = {
  constructor: Call

, eval: function (env) {
    this.args = this.args.eval(env)

    var fn

    if (fn = env.lookup(this.name)) {
      try {
        var args = this.args.nodes.map(function (arg) {
          return arg.nodes[0]
        })
        console.log(args)
        return fn.apply(null, args)
      } catch (e) {
          throw e
      }
    } else {
      return this
    }
  }

, toString: function (env) {
    env.isURL = this.name === 'url'
    var args = this.args.nodes.map(function (arg) {
      return arg.toString(env)
    }).join(env.compress ? ',' : ', ')
    if (env.isURL) args = '"' + args + '"'
    env.isURL = false
    return this.name + '(' + args + ')'
  }
}