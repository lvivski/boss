var Dimension = module.exports = function Dimension(value, unit) {
  this.value = parseFloat(value)
  this.unit = unit || ''
}

var coercion = {
    mm: {
      cm: 10
    , 'in': 25.4
    }
  , cm: {
      mm: 1 / 10
    , in: 2.54
    }
  , in: {
      mm: 1 / 25.4
    , cm: 1 / 2.54
    }
  , ms: {
      s: 1000
    }
  , s: {
      ms: 1 / 1000
    }
  , rad: {
      deg: Math.PI / 180
    }
  , deg: {
      rad: 180 / Math.PI
    }
  }

Dimension.prototype = {
  constructor: Dimension

, operate: function (op, other) {
    if ((op === '-' || op === '+') && other.unit === '%') {
      other.value = this.value * (other.value / 100)
    } else {
      other = this.coerce(other)
    }
    return new Dimension( calc(op, this.value, other.value)
                        , this.unit || other.unit )
  }

, coerce: function (other) {
    if (other instanceof Dimension) {
      var multiplier = coercion[this.unit] && coercion[this.unit][other.unit] || 1
      return new Dimension(other.value * multiplier, this.unit || other.unit)
    }
    return new Dimension(parseFloat(other), this.unit)
  }

, eval: function () { return this }

, toString: function (env) {
    env = env || {}

    var unit = this.unit
      , n = this.value

    if (env.compress > 0) {
      var isFloat = n != (n | 0)

      if (unit !== '%' && n === 0)
        return '0'

      if (isFloat && n < 1 && n > -1) {
        return n.toString().replace('0.', '.') + unit
      }
    }

    return n.toString() + unit
  }
}

function calc(op, a, b) {
  switch (op) {
    case '+': return a + b
    case '-': return a - b
    case '*': return a * b
    case '/': return a / b
  }
}
