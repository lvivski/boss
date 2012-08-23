var inspect = require('util').inspect;

var Token = module.exports = function Token(tag, value, lineno) {
  this.tag = tag
  this.value = value || tag
  this.lineno = lineno
}