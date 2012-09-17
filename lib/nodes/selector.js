var pseudo = require('../pseudo')
  , tags = require('../tags')
  , separators = {
      elem: '__'
    , mod: '_'
    }

var Selector = module.exports = function Selector(segments) {
  this.segments = segments || []
}

Selector.prototype = {
  constructor: Selector

, eval: function (env) {
    var segments = this.segments
      , segment
    for (var i = 0, len = this.segments.length; i < len; i++) {
      segment = this.segments[i]
      if (typeof segment === 'object') {
        segment = segment.toString()
        if (!tags[segment]) {
          if (segments[i - 1] === '&') {
            segments[i] = separators.elem + segment
          } else {
            segments[i] = '.' + segment
          }
        } else {
          segments[i] = segment
        }
      } else if (segment[0] === ':') {
        if (!pseudo[segment.split('(')[0]]) {
          segments[i] = segment.replace(':', separators.mod)
                                    .replace('(', separators.mod)
                                    .slice(0, -1)
        }
      }
    }
    return this
  }

, toString: function (env) {
    return env.compress > 4
      ? this.segments.join('')
                     .replace(/\s*([+~>])\s*/g, '$1')
                     .trim()
      : this.segments.join('').trim()
  }
}