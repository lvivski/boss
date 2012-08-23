var Expression = require('./expression')

var Arguments = module.exports = function Arguments(isList) {
  this.map = {}
  this.nodes = []
  this.isList = isList || false
}

Arguments.prototype = new Expression
Arguments.prototype.constructor = Arguments