var pseudo = require('../pseudo')
  , tags = require('../tags')

var Selector = module.exports = function Selector(segments) {
  this.segments = segments || []
}

Selector.prototype = {
  constructor: Selector

, eval: function (env) {
    for (var i = 0, len = this.segments.length, segment, ps; i < len; i++) {
      segment = this.segments[i]
      if (segment.constructor.name === 'Ident') {
        if (!~tags.indexOf(segment)) {
          if (this.segments[i - 1] === '&') {
            this.segments[i] = '__' + segment.toString()
          } else {
            this.segments[i] = '.' + segment.toString()
          }
        } else {
          this.segments[i] = segment.toString()
        }
      } else if (segment[0] === ':') {
        if ((ps = /:([^( ]+)\(/.exec(segment)) && !~pseudo.indexOf(ps[1]))
          this.segments[i] = segment.replace(/[:\(]/g, '_').slice(0, -1)

      }
    }
    return this
  }

, toString: function (env) {
    return env.compress > 4
      ? this.segments.join('').replace(/\s*([+~>])\s*/g, '$1').trim()
      : this.segments.join('').trim()
  }
}