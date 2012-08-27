var Call = module.exports = function Call(name, args) {
  this.name = name
  this.args = args
}

Call.prototype = {
  constructor: Call

, eval: function () { return this }

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