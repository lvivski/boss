var inspect = require('util').inspect;

var Token = module.exports = function Token(type, val) {
  this.type = type
  val && (this.val = val)
}

Token.prototype = {
  inspect: function () {
    var val = ' ' + inspect(this.val, false, 3, true);
    return '[Token:' + this.lineno + ' '
      + '\x1b[32m' + this.type + '\x1b[0m'
      + (this.val ? val : '') + ']'
  }
, toString: function () {
    return (!this.val
      ? this.type
      : this.val).toString()
  }
}
