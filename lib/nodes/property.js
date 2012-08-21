var Property = module.exports = function Property(segs, expr) {
  this.segments = segs
  this.expression = expr
}

Property.prototype = {
  operate: function (op, other, value) {
    return this.expresssion.operate(op, othe, value)
  }
, toString: function () {
    return 'property(' + this.segments.join('') + ', ' + this.expression + ')';
  }
}