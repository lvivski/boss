var inspect = require('util').inspect;

var Token = module.exports = function Token(tag, value, lineno) {
  this.tag = tag
  value && (this.value = value)
  lineno && (this.lineno = lineno)
}

Token.prototype = {
  inspect: function () {
    var value = ' ' + inspect(this.value, false, 3, true);
    return '[Token:' + this.lineno + ' '
      + '\x1b[32m' + this.tag + '\x1b[0m'
      + (this.value ? value : '') + ']'
  }
, toString: function () {
    return (!this.value
      ? this.tag
      : this.value).toString()
  }
}
