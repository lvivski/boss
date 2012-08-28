var BinOp = module.exports = function BinOp(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinOp.prototype = {
  constructor: BinOp

, eval: function (env) {
    var left = this.left.eval(env)
      , right = this.right.eval(env)
    return left.operate(this.op, right).eval(env)
  }
, toString: function () {
    return ''
  }
}