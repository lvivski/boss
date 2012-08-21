var Call = module.exports = function Call(name, args){
  this.name = name
  this.args = args
}

Call.prototype = {
  toString: function () {
    return this.name + '()'
  }
}