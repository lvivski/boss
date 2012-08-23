var HSLA = module.exports = function HSLA(h,s,l,a) {
  this.h = clampDegrees(h)
  this.s = clampPercentage(s)
  this.l = clampPercentage(l)
  this.a = clampAlpha(a)
}

var clampDegrees = function (n) {
      n = n % 360
      return n >= 0 ? n : 360 + n
    }
  , clampPercentage = function (n) {
      return Math.max(0, Math.min(n, 100))
    }
  , clampAlpha = function (n) {
      return Math.max(0, Math.min(n, 1))
    }

HSLA.prototype = {
  constructor: HSLA
, eval: function () { return this }
, toString: function () {
    return 'hsla('
      + this.h + ','
      + this.s.toFixed(0) + ','
      + this.l.toFixed(0) + ','
      + this.a + ')'
  }
}