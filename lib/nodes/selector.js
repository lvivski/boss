var pseudo = require('../pseudo')
  , tags = require('../tags')
  , Iterator = require('../iterator')
  , gen = new Iterator
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
          if (env.compress > 5) {
            segment = env.classes[segment] || (env.classes[segment] = gen.next())
          }
          if (segments[i - 1] === '&') {
            segments[i] = separators.elem + segment
          } else {
            segments[i] = '.' + segment
          }
        } else {
          segments[i] = segment
        }
      } else if (segment[0] === ':' && !pseudo[segment.split('(')[0]]) {
        segment = segment.split('(')
        var mod = segment[0].slice(1)
          , value = segment[1].slice(0, -1)
        if (env.compress > 5) {
          mod = env.classes[mod] || (env.classes[mod] = gen.next())
          value = env.classes[value] || (env.classes[value] = gen.next())
        }
        segments[i] = separators.mod + mod + separators.mod + value
      } else if (segment[0] === '.' && env.compress > 5) {
        segment = segment.slice(1).split('_').map(function (segment) {
          return segment ? env.classes[segment] || (env.classes[segment] = gen.next()) : '_'
        })
        segments[i] = '.' + segment.join('_')
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