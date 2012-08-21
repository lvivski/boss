var Parser = require('./lib/parser')
  , nodes = require('./lib/nodes')
  , inspect = require('util').inspect

var css = '\
@-webkit-keyframes \'sdf\'\n\
  0% {\n\
    -webkit-linear-gradient: sef;\n\
  }\n\
\n\
.boxed-group .tyty > tyty,\n\
.sdf, \n\
sdfsdf\n\
  position : relative;\n\
  background : -webkit-linear-gradient(left, #edd 90%, #edd 60%);\n\
  padding : color 3px;\n\
  border-radius : 3px\n\
  margin :0 0 15px 0;\n\
  &:ntg(sdf),\n\
  & sfg sfd \n\
  \n\
  \n\
  \n\
  \n\
  {\n\
    color :red\n\
    background : url(/sd*i&fsd/sdf.png),\n\
                #fff;\n\
              }\n\
\n'

try {
    var parser = new Parser(css);
    var ast = parser.parse();

    console.log(inspect(ast, false, null))
} catch (e) {
    console.log(e.stack)
}