var Lexer = require('./lib/lexer'),
    nodes = require('./lib/nodes');

var css = '\
.boxed-group \n\
  position: relative;\n\
  background: -webkit-linear-gradient(left, #edd 90%, #edd 60%);\n\
  padding: 3px;\n\
  border-radius: 3px;\n\
  margin:0 0 15px 0;\n\
  .inner\n\
    color:red\n\
    background:url(/sd*i&fsd/sdf.png);\n\
\n'

try {
    console.log(new Lexer(css).tokenize())
    console.log((new nodes.Dimension(500, 'ms')).operate('+', new nodes.Dimension(3, 's')))
} catch (e) {
    console.log(e.stack)
}