var BinOp = module.exports = function BinOp(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinOp.prototype = {
  constructor: BinOp
, eval: function () {
    return this.left.eval().operate(this.op, this.right.eval())
  }
, toString: function () {
    return this.left.toString() + this.op.toString() + this.right.toString()
  }
}