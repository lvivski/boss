# DEPRECATED

use [Styl](https://github.com/visionmedia/styl) instead

------------

```
 ___  ___  ____ ___
| . \/   \/  _/  _/
| . \| | |\_  \_  \
|___/\___//___/___/
 style like a boss
```

## BOSS

BOSS is the dynamic stylesheet language. It supports both regular CSS syntax and nested syntax.
But the main feature is nested rules expanding according to [BEM](http://bem.github.com/bem-method/pages/beginning/beginning.en.html):
* `&:mod(value)` becomes `_mod_value`
* `&elem` becomes `__elem`
* `block` expandes as a nested block

### Example

Input:
```css
button-color = saturate(#401010, 10);

border-radius(radius) {
  -webkit-border-radius: radius;
  -moz-border-radius: radius;
  border-radius: radius;
}

background-gradient(start, stop) {
  background: -webkit-linear-gradient(start, stop);
  background: -moz-linear-gradient(start, stop);
  background: linear-gradient(start, stop);
}

block {
  background-gradient: lighten(#000, 50%) 0%, darken(#fff, 30%) 100%;
  font: 13px/1.7 'Helvetica Neue', Helvetica, Arial, sans-serif
  &:mod(value) {
    padding: 0px 2px + 10px
  }
  &elem {
    background: url(some/image/url.png), #fff;
    border-radius: 10px 5px;
    &:elem-mod(value) {
      color: darken(white, 50%)
    }
  }
  &:hover {
    color: red
  }
  sub-block {
    margin: 1em + 10% -2px;
    color: slateblue
  }
}
```

Output:
```css
.block {
  background: -webkit-linear-gradient(#808080 0%, #b3b3b3 100%);
  background: -moz-linear-gradient(#808080 0%, #b3b3b3 100%);
  background: linear-gradient(#808080 0%, #b3b3b3 100%);
  font: 13px/1.7 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
.block_mod_value {
  padding: 0px 12px;
}
.block__elem {
  background: url(some/image/url.png), #fff;
  -webkit-border-radius: 10px 5px;
  -moz-border-radius: 10px 5px;
  border-radius: 10px 5px;
}
.block__elem_elem-mod_value {
  color: #808080;
}
.block:hover {
  color: #f00;
}
.block .sub-block {
  margin: 1.1em -2px;
  color: #6a5acd;
}
```

### Usage
```bash
$ npm install -g boss
$ boss --help

Usage:
  boss [OPTIONS] [ARGS]


Options:
  -h, --help : Help
  -v, --version : Version
  -i INPUT, --input=INPUT : Input file (default: stdin)
  -c LEVEL, --compress=LEVEL : Compression level (default: 0)
  -o OUTPUT, --output=OUTPUT : Output file (default: stdout)
  -p FILE, --partial=FILE : Partial file
```

### N.B.
There are 6 levels of compression now:
  1. remove units near zero values (if not a percentage) and a zero in `0.n` values
  2. compress sizes declaration, `margin: 0 10px 0 10px` will become `margin: 0 10px`
  3. compress long form of sizes shorthands `*-{top,right,bottom,left}`, etc
  4. remove newlines after comma in selector and last semicolon in a block
  5. remove all newlines and unnecessary spaces
  6. minify classnames (experimental)

Compression levels are accumulative, so level 3 will also have level 2 and 1 compressions

Compressed declarations are: `margin`, `padding`, `border-width`, `border-radius`, `-webkit-border-radius`, `-moz-border-radius`, — and their long forms.

### Thanks

Sergey Kryzhanovsky ([afelix](http://github.com/afelix)) for initial parser implementation

Kristoffer Walker ([kixxauth](http://github.com/kixxauth)) for providing npm registry name

## License

(The MIT License)

Copyright (c) 2012 Yehor Lvivski <lvivski@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
