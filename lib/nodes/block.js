var shorthands = require('../shorthands')
  , Expression = require('./expression')

var Block = module.exports = function Block(nodes) {
  this.nodes = nodes || []
}

Block.prototype = {
  constructor: Block

, push: function (node) {
    this.nodes.push(node)
  }
, get hasDeclarations() {
    for (var i = 0, len = this.nodes.length; i < len; ++i)
      if (this.nodes[i].constructor.name === 'Declaration')
        return true
  }

, get length() {
    return this.nodes.length
  }

, eval: function (env) {
    env.block = this
    for (this.index = 0; this.index < this.nodes.length; ++this.index) {
      this.nodes[this.index] = this.nodes[this.index].eval(env)
    }

    if (env.compress > 2) {
      var nodes = {}
        , compressed
        , node
        , prop
      for (var i = 0, prop, len = this.nodes.length; i < len; ++i) {
        node = this.nodes[i]
        if (
          node.constructor.name === 'Declaration'
          && shorthands[prop = node.property.replace(/-?(top|right|bottom|left)/g, '')]
        ) {
          !nodes[prop] && (nodes[prop] = [])
          nodes[prop].push({
            index: i
          , side: shorthands[prop].indexOf(node.property)
          , value: node.value
          })
        }
      }

      for (prop in nodes) {
        if(compressed = compressProperties(nodes[prop])) {
          node = this.nodes[compressed.index]
          node.property = prop
          node.value = compressed.value
          node = node.eval(env)
          for(i in compressed.toRemove) {
            this.nodes[compressed.toRemove[i]] = null
          }
        }
      }

      this.nodes = this.nodes.filter(function (_) { return !!_ })
    }

    return this
  }

, toString: function (env) {
    var node

    if (this.hasDeclarations) {
      env.buf += env.compress > 4 ? '{' : ' {\n'
      var arr = []
      ++env.indents
      for (var i = 0, len = this.nodes.length; i < len; ++i) {
        node = this.nodes[i]
        switch (node.constructor.name) {
          case 'Expression':
          case 'Definition':
          case 'Ruleset':
          case 'Dimension':
            continue
          default:
            arr.push(node.toString(env))
        }
      }
      --env.indents
      env.compress < 4 && arr.push('')
      env.buf += arr.join(env.compress > 4 ? ';' : ';\n')
      env.buf += (env.compress == 4 ? '\n' : '') + env.indent + (env.compress > 4 ? '}' : '}\n')
    }

    for (var i = 0, len = this.nodes.length; i < len; ++i) {
      node = this.nodes[i]
      switch (node.constructor.name) {
        case 'Ruleset':
        case 'Atrule':
        case 'Block':
          node.toString(env)
          break
      }
    }
  }
}

function compressProperties(arr) {
  if (arr.length < 2) return

  var toRemove = []
    , expr = new Expression
    , index

  arr.forEach(function (node, i) {
    if (i === 0) {
      index = node.index
    } else {
      toRemove.push(node.index)
    }
    if (node.side === -1) {
      expr = node.value
      !expr.nodes[1] && expr.push(expr.nodes[0])
      !expr.nodes[2] && expr.push(expr.nodes[0])
      !expr.nodes[3] && expr.push(expr.nodes[1])
    } else {
      expr.nodes[node.side] = node.value.nodes[0]
    }
  })

  if (expr.nodes.every(function(_){ return !!_ }))
    return {
      value: expr,
      index: index,
      toRemove: toRemove
    }
}
