var Atrule = module.exports = function Atrule(name, block) {
  this.name = name.trim()
  this.block = block
}

Atrule.prototype = {
  constructor: Atrule

, eval: function (env) {
    this.block = this.block && this.block.eval(env)
    return this
  }

, toString: function (env) {
    env.buf += this.name
    if (this.block) {
      env.buf += env.compress > 4 ? '{' : ' {\n'
      ++env.indents
      this.block.toString(env)
      --env.indents
      env.buf += '}' + (env.compress > 4 ? '' : '\n')
    } else {
      env.buf += env.compress > 4 ? ';' : ';\n'
    }
  }
}