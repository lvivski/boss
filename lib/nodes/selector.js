var Selector = module.exports = function Selector(name) {
  this.name = name
}

Selector.prototype = {
  constructor: Selector

, eval: function () { return this }

, toString: function (env) {
    return env.compress
      ? this.name.replace(/\s*([+>~])\s*/g, '$1').trim()
      : this.name.trim()
  }
}