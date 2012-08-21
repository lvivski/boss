var Group = module.exports = function Group() {
  this.nodes = []
}

Group.prototype = {
  push: function (selector) {
    this.nodes.push(selector)
  }

, get block() {
    return this.nodes[0].block
  }

, set block(block) {
    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      this.nodes[i].block = block
    }
  }
}