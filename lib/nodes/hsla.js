var HSLA = exports = module.exports = function HSLA(h,s,l,a) {
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

exports.fromRGBA = function (rgba) {
    var r = rgba.r / 255
      , g = rgba.g / 255
      , b = rgba.b / 255
      , a = rgba.a

    var min = Math.min(r,g,b)
      , max = Math.max(r,g,b)
      , l = (max + min) / 2
      , d = max - min
      , h, s

    switch (max) {
      case min: h = 0; break
      case r: h = 60 * (g-b) / d; break
      case g: h = 60 * (b-r) / d + 120; break
      case b: h = 60 * (r-g) / d + 240; break
    }

    if (max == min) {
      s = 0
    } else if (l < 0.5) {
      s = d / (2 * l)
    } else {
      s = d / (2 - 2 * l)
    }

    h %= 360
    s *= 100
    l *= 100

    return new HSLA(h, s, l, a)
  }