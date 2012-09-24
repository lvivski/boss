var Comment = module.exports = function Comment(value) {
  this.value = value
}

Comment.prototype = {
  constructor: Comment

, eval: function () { return this }

, toString: function (env) {
    return env.compress > 4
      ? ''
      : '/* ' + this.value + ' */'
  }
}