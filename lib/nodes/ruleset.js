var Selector = require('./selector'),
    pseudoSelectors = require('../pseudo')

var Ruleset = module.exports = function Ruleset(selectors, block) {
  this.selectors = selectors || []
  this.block = block
}

Ruleset.prototype = {
  constructor: Ruleset

, push: function (selector) {
    this.selectors.push(selector)
  }

, toString: function (env) {
    var stack = env.stack

    stack.push(this.selectors)

    if (this.block.hasDeclarations) {
      var selectors = normalizeSelectors(stack, env)
      env.buf += selectors.join(env.compress ? ',' : ',\n')
    }

    this.block.toString(env)
    stack.pop()
  }

, eval: function (env) {
    this.block = this.block.eval(env)
    return this
  }
}

function normalizeSelectors(stack, env) {
  var selectors = []
    , buf = []

  compile(stack, stack.length - 1)

  return selectors

  function compile(arr, i) {
    if (i) {
      arr[i].forEach(function (selector) {
        if (selector.name) {
          buf.unshift(selector.name)
          compile(arr, i - 1)
          buf.shift()
        } else {
          selectors.push(selector.name)
        }
      })
    } else {
      arr[0].forEach(function (selector) {
        var str = selector.name.trim()
        if (buf.length) {
          var cbf
          for (var i = 0, len = buf.length; i < len; ++i) {
            cbf = buf[i].trim()
            if (~cbf.indexOf('&')) {
              if (cbf[0] === '&') {
                if (cbf[1] !== ':' && cbf[1] !== ' ')
                  cbf = '&__' + cbf.slice(1)

                if (~cbf.indexOf(':')) {
                  if (!~pseudoSelectors.indexOf( /:([^\( ]+)/.exec(cbf)[1]))
                    cbf = cbf.replace(/[:\(]/g, '_').slice(0, -1)
                }
              }
              str = cbf.replace(/&/g, str)
            } else {
              cbf = cbf
              str += ' ' + (/^[a-z]/i.test(cbf) ? '.' : '') + cbf
            }
          }
        }
        selectors.push(env.indent + (/^[a-z]/i.test(str) ? '.' : '') + str.trimRight())
      })
    }
  }
}

