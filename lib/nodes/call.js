var Call = module.exports = function Call(name, args) {
  this.name = name
  this.args = args
}

Call.prototype = {
  constructor: Call
, toString: function () {
    var args = this.args.nodes.map(function (arg) {
      return arg.toString()
    })
    return this.name + '(' + args.join(', ') + ')'
  }
}