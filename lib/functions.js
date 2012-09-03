var nodes = require('./nodes')

module.exports = {
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
    amount.value = -amount.value
    return adjust(color, 'saturation', amount)
  }
, lighten: function (color, amount) {
    return adjust (color, 'lightness', amount)
  }
, darken: function (color, amount) {
    amount.value = -amount.value
    return adjust (color, 'lightness', amount)
  }
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
  property = { hue: 'h', saturation: 's', lightness: 'l' }[property]
  if (!property) throw new Error('invalid adjustment property')
  var value = amount.value
  if (amount.unit === '%'){
    value = property === 'l' && value > 0
      ? (100 - hsla[property]) * value / 100
      : hsla[property] * value / 100
  }
  hsla[property] += value
  return nodes.RGBA.fromHSLA(hsla)
}