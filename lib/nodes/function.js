var Function = module.exports = function Function(name, params, body) {
  this.name = name
  this.params = params
  this.block = body
  if (typeof params === 'function')
    this.fn = params
}

Function.prototype = {
  get arity() {
    return this.params.length
  },

  toString: function() {
    if (this.fn)
      return this.name
        + '('
        + this.fn.toString()
          .match(/^function *\((.*?)\)/)
          .slice(1)
          .join(', ')
        + ')'

    return this.name
      + '('
      + this.params.nodes.join(', ')
      + ')'
  }
}

Function.prototype.toString = function(){
  if (this.fn) {
    return this.name
      + '('
      + this.fn.toString()
        .match(/^function *\((.*?)\)/)
        .slice(1)
        .join(', ')
      + ')';
  } else {
    return this.name
      + '('
      + this.params.nodes.join(', ')
      + ')';
  }
}