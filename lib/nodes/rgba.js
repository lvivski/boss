var RGBA = module.exports = function RGBA(r, g, b, a) {
  this.r = clamp(r)
  this.g = clamp(g)
  this.b = clamp(b)
  this.a = clampAlpha(a)
}

var clamp = function (n) {
      return Math.max(0, Math.min(n.toFixed(0), 255))
    }
  , clampAlpha = function (n) {
      return Math.max(0, Math.min(n, 1))
    }
  , pad = function (n) {
      return n < 16
        ? '0' + n.toString(16)
        : n.toString(16)
    }

RGBA.prototype = {
  constructor: RGBA
, toString: function () {
    if (this.a = 1) {
      var r = pad(this.r)
        , g = pad(this.g)
        , b = pad(this.b)

      if (r[0] == r[1] && g[0] == g[1] && b[0] == b[1]) {
        return '#' + r[0] + g[0] + b[0]
      } else {
        return '#' + r + g + b
      }
    } else {
      return 'rgba('
        + this.r + ','
        + this.g + ','
        + this.b + ','
        + this.a.toFixed(3) + ')'
    }
  }
}

