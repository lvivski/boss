var Atrule = module.exports = function Atrule(name, block) {
  this.name = name
  this.block = block
}

Atrule.prototype = {
  constructor: Atrule

, eval: function () {
    return this
  }

, toString: function (env) {
    env.buf += '@' + this.name
    env.buf += env.compress ? '{' : ' {\n'
    ++env.indents
    this.block.toString(env)
    --env.indents
    env.buf += '}' + (env.compress ? '' : '\n')
  }
}