var String = module.exports = function String(value, quote) {
  this.value = value;
  this.quote = quote || "'"
}

String.prototype = {
  constructor: String
, toString: function () {
    return this.quote + this.value + this.quote
  }
}

