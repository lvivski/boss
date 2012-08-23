var Atrule = module.exports = function Atrule(name, block) {
  this.name = name
  this.block = block
}

Atrule.prototype = {
  constructor: Atrule
, toString: function () {
    return this.name
  }
}