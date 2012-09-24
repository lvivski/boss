var Iterator = module.exports = function Iterator(start) {
  this.index = start || 0
}

var chars = 'abcdefghijklmnopqrstuvwxyz'

Iterator.prototype = {
  next: function () {
    return alpha(++this.index)
  }
}

function alpha(i) {
  var r = chars[--i % 26]
    , n = Math.floor(i / 26)
  return n == 0 ? r : alpha(n) + r
}