var BinOp = module.exports = function BinOp(op, left, right) {
  this.op = op
  this.left = left
  this.right = right
}

BinOp.prototype = {
  constructor: BinOp
, toString: function () {
    return this.left.toString() + this.op.toString() + this.right.toString()
  }
}