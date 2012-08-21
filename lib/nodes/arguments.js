var Expression = require('./expression')

var Arguments = module.exports = function Arguments() {
  this.map = {}
}

Arguments.prototype = new Expression
Arguments.prototype.constructor = Arguments