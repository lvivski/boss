var Compiler = require('./lib/compiler')
  , Parser = require('./lib/parser')
  , Lexer = require('./lib/lexer')
  , nodes = require('./lib/nodes')
  , inspect = require('util').inspect

var css = '\
block\n\
  background -webkit-linear-gradient(left, #edd 90%, #edd 60%)\n\
  &:mod(value)\n\
    padding 0px 2px + 10px 0 0\n\
  &elem\n\
    padding 0px 2em + 10% 0px -2px\n\
    background url(some/image/url.png), #fff\n\
    &:elem-mod(value)\n\
      color #ffffff\n\
  &:hover\n\
    color red\n\
\n'

try {
    // var lexer = new Lexer(css)
    // console.log(lexer.tokenize())
    var parser = new Parser(css);
    //console.log(inspect(parser.parse(), false, null))
    // console.log(parser.parse().toString())
    var compiler = new Compiler(parser.parse())
    // compiler.compile()
    console.log(compiler.compile())

} catch (e) {
    console.log(e.stack)
}