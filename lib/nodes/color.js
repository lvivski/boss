var RGBA = require('./rgba');

var Color = module.exports = function Color(hash) {
  var single = hash.length == 3
    , r = parseInt(single ? hash[0] + hash[0] : hash.substr(0, 2), 16)
    , g = parseInt(single ? hash[1] + hash[1] : hash.substr(2, 2), 16)
    , b = parseInt(single ? hash[2] + hash[2] : hash.substr(4, 2), 16)

  return new RGBA(r, g, b, 1)
}