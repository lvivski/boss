var BinOp = module.exports = function BinOp(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinOp.prototype = {
  constructor: BinOp

, eval: function () {
  var left = this.left.eval()
      right = this.right.eval()
    return left.operate(this.op, right).eval()
  }
, toString: function () {
    return ''
  }
}