var nodes = require('./nodes')

var functions = module.exports = {
  abs: function (n) { return math('abs', n) }
, ceil: function (n) { return math('ceil', n) }
, floor: function (n) { return math('floor', n) }
, round: function (n) {return math('round', n) }
, sin: function (n) { return math('sin', n) }
, cos: function (n) { return math('cos', n) }
, min: function (a, b) { return a < b ? a : b }
, max: function (a, b) { return a > b ? a : b }
, saturate: function (color, amount) {
    return adjust(color, 'saturation', amount)
  }
, desaturate: function (color, amount) {
    amount.value *= -1
    return adjust(color, 'saturation', amount)
  }
, lighten: function (color, amount) {
    return adjust(color, 'lightness', amount)
  }
, darken: function (color, amount) {
    amount.value *= -1
    return adjust(color, 'lightness', amount)
  }
, fadein: function (color, amount) {
    return adjust(color, 'alpha', amount)
  }
, fadeout: function (color, amount) {
    amount.value *= -1
    return adjust(color, 'alpha', amount)
  }
}

var modes = {
/*  normal: function(a, b) {
    return a
  }

, lighten: function(a, b) {
    return (b > a) ? b : a
  }

, darken: function(a, b) {
    return (b > a) ? a : b
  }

,*/ multiply: function(a, b) {
    return (a * b) / 255
  }

, average: function(a, b) {
    return (a + b) / 2
  }

, add: function(a, b) {
    return Math.min(255, a + b)
  }

, substract: function(a, b) {
    return (a + b < 255) ? 0 : a + b - 255
 }

, difference: function(a, b) {
    return Math.abs(a - b)
  }

, negation: function(a, b) {
    return 255 - Math.abs(255 - a - b)
  }

, screen: function(a, b) {
    return 255 - (((255 - a) * (255 - b)) >> 8)
  }

, exclusion: function(a, b) {
    return a + b - 2 * a * b / 255
  }

, overlay: function(a, b) {
    return b < 128
      ? (2 * a * b / 255)
      : (255 - 2 * (255 - a) * (255 - b) / 255)
  }

, softlight: function(a, b) {
    return b < 128
      ? (2 * ((a >> 1) + 64)) * (b / 255)
      : 255 - (2 * (255 - (( a >> 1) + 64)) * (255 - b) / 255)
  }

, hardlight: function(a, b) {
    return modes.overlay(b, a)
  }

, colordodge: function(a, b) {
    return b == 255 ? b : Math.min(255, ((a << 8 ) / (255 - b)))
  }

, colorburn: function(a, b) {
    return b == 0 ? b : Math.max(0, (255 - ((255 - a) << 8 ) / b))
  }

, lineardodge: function(a, b) {
    return modes.add(a, b)
  }

, linearburn: function(a, b) {
    return modes.substract(a, b)
  }

, linearlight: function(a, b) {
    return b < 128
      ? modes.linearburn(a, 2 * b)
      : modes.lineardodge(a, (2 * (b - 128)))
  }

, vividlight: function(a, b) {
    return b < 128
      ? modes.colorburn(a, 2 * b)
      : modes.colordodge(a, (2 * (b - 128)))
  }

, pinlight: function(a, b) {
    return b < 128
      ? modes.darken(a, 2 * b)
      : modes.lighten(a, (2 * (b - 128)))
  }

, hardmix: function(a, b) {
    return modes.vividlight(a, b) < 128 ? 0 : 255
  }

, reflect: function(a, b) {
    return b == 255 ? b : Math.min(255, (a * a / (255 - b)))
  }

, glow: function(a, b) {
    return modes.reflect(b, a)
  }

, phoenix: function(a, b) {
    return Math.min(a, b) - Math.max(a, b) + 255
  }
}

for (var mode in modes) {
  functions[mode] = function(fn){
    return function(color1, color2) {
      var r = fn(color1.r, color2.r)
      var g = fn(color1.g, color2.g)
      var b = fn(color1.b, color2.b)
      var a = color1.a + color2.a * (1 - color1.a)
      return new nodes.RGBA(r, g, b, a)
    }
  }(modes[mode])
}

function math (fn, n) {
  if (n instanceof nodes.Dimension) {
    var value = parseFloat(n.unit == '%' ? n.value / 100 : n.value)
    return new nodes.Dimension(Math[fn](value), n.unit)
  }
  return Math[fn](n)
}

function adjust (color, property, amount) {
  var hsla = nodes.HSLA.fromRGBA(color)
  property = {
    hue: 'h'
  , saturation: 's'
  , lightness: 'l'
  , alpha: 'a'
  }[property]
  if (!property) throw new Error('Invalid adjustment property')
  var value = amount.value
  if (amount.unit === '%'){
    value = property === 'l' && value > 0
      ? (100 - hsla[property]) * value / 100
      : hsla[property] * value / 100
  }
  hsla[property] += value
  return nodes.RGBA.fromHSLA(hsla)
}