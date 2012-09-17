var Iterator = module.exports = function Iterator(start) {
  this.index = start || 0
  this.chars = []
  for(var i = 0, a = 'a'.charCodeAt(0); i < 26; i++) {
    this.chars.push(String.fromCharCode(a+i))
  }
}

Iterator.prototype = {
  alpha: function (i) {
    var r = this.chars[--i % 26]
      , n = Math.floor(i / 26)
    return n == 0 ? r : this.alpha(n) + r
  }

, next: function () {
    return this.alpha(++this.index)
  }
}