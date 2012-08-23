var Call = module.exports = function Call(name, args) {
  this.name = name
  this.args = args
}

Call.prototype = {
  constructor: Call
, eval: function () {
    var args = this.args.nodes.map(function (arg) {
      return arg.toString()
    })

    return this.name + '(' + args.join(', ') + ')'
  }
, toString: function () {
    return this.eval().toString()
  }
}