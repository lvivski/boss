var RGBA = exports = module.exports = function RGBA(r, g, b, a) {
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

, eval: function () { return this }

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

exports.fromHSLA = function (hsla) {
    var h = hsla.h / 360
      , s = hsla.s / 100
      , l = hsla.l / 100
      , a = hsla.a
      , r, g, b

    var q = l < 0.5 ? l * (s + 1) : l + s - l * s
        , p = l * 2 - q

    r = hue(h + 1 / 3)
    g = hue(h)
    b = hue(h - 1 / 3)

    r *= 255
    g *= 255
    b *= 255

    return new RGBA(r, g, b, a)

    function hue(h) {
        if (h < 0) ++h
        if (h > 1) --h
        if (h < 1 / 6) return p + (q - p) * h * 6
        if (h < 1 / 2) return q
        if (h < 2 / 3) return p + (q - p) * (2 / 3 - h) * 6
        return p
    }
  }

