var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var CSSTransformer = function CSSTransformer(source) {
    AbstractGrammar.call(this, source);
};

CSSTransformer.grammarName = "CSSTransformer";

CSSTransformer.match = AbstractGrammar.match;

CSSTransformer.matchAll = AbstractGrammar.matchAll;

exports.CSSTransformer = CSSTransformer;

require("util").inherits(CSSTransformer, AbstractGrammar);

CSSTransformer.prototype["anys"] = function $anys() {
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("any", false, [], null, this["any"]);
        });
    });
};

CSSTransformer.prototype["before"] = function $before() {
    return this._list(function() {
        return true;
    });
};

CSSTransformer.prototype["after"] = function $after() {
    return this._list(function() {
        return true;
    });
};

CSSTransformer.prototype["any"] = function $any() {
    return this._atomic(function() {
        return this._rule("before", false, [], null, this["before"]);
    }) || this._atomic(function() {
        return this._rule("ident", false, [], null, this["ident"]);
    }) || this._atomic(function() {
        return this._rule("atkeyword", false, [], null, this["atkeyword"]);
    }) || this._atomic(function() {
        return this._rule("string", false, [], null, this["string"]);
    }) || this._atomic(function() {
        return this._rule("shash", false, [], null, this["shash"]);
    }) || this._atomic(function() {
        return this._rule("vhash", false, [], null, this["vhash"]);
    }) || this._atomic(function() {
        return this._rule("number", false, [], null, this["number"]);
    }) || this._atomic(function() {
        return this._rule("percentage", false, [], null, this["percentage"]);
    }) || this._atomic(function() {
        return this._rule("dimension", false, [], null, this["dimension"]);
    }) || this._atomic(function() {
        return this._rule("cdo", false, [], null, this["cdo"]);
    }) || this._atomic(function() {
        return this._rule("cdc", false, [], null, this["cdc"]);
    }) || this._atomic(function() {
        return this._rule("decldelim", false, [], null, this["decldelim"]);
    }) || this._atomic(function() {
        return this._rule("s", false, [], null, this["s"]);
    }) || this._atomic(function() {
        return this._rule("attrselector", false, [], null, this["attrselector"]);
    }) || this._atomic(function() {
        return this._rule("attrib", false, [], null, this["attrib"]);
    }) || this._atomic(function() {
        return this._rule("nth", false, [], null, this["nth"]);
    }) || this._atomic(function() {
        return this._rule("nthselector", false, [], null, this["nthselector"]);
    }) || this._atomic(function() {
        return this._rule("namespace", false, [], null, this["namespace"]);
    }) || this._atomic(function() {
        return this._rule("clazz", false, [], null, this["clazz"]);
    }) || this._atomic(function() {
        return this._rule("pseudoe", false, [], null, this["pseudoe"]);
    }) || this._atomic(function() {
        return this._rule("pseudoc", false, [], null, this["pseudoc"]);
    }) || this._atomic(function() {
        return this._rule("delim", false, [], null, this["delim"]);
    }) || this._atomic(function() {
        return this._rule("stylesheet", false, [], null, this["stylesheet"]);
    }) || this._atomic(function() {
        return this._rule("atruleb", false, [], null, this["atruleb"]);
    }) || this._atomic(function() {
        return this._rule("atrules", false, [], null, this["atrules"]);
    }) || this._atomic(function() {
        return this._rule("atrulerq", false, [], null, this["atrulerq"]);
    }) || this._atomic(function() {
        return this._rule("atrulers", false, [], null, this["atrulers"]);
    }) || this._atomic(function() {
        return this._rule("atruler", false, [], null, this["atruler"]);
    }) || this._atomic(function() {
        return this._rule("block", false, [], null, this["block"]);
    }) || this._atomic(function() {
        return this._rule("ruleset", false, [], null, this["ruleset"]);
    }) || this._atomic(function() {
        return this._rule("combinator", false, [], null, this["combinator"]);
    }) || this._atomic(function() {
        return this._rule("simpleselector", false, [], null, this["simpleselector"]);
    }) || this._atomic(function() {
        return this._rule("selector", false, [], null, this["selector"]);
    }) || this._atomic(function() {
        return this._rule("declaration", false, [], null, this["declaration"]);
    }) || this._atomic(function() {
        return this._rule("property", false, [], null, this["property"]);
    }) || this._atomic(function() {
        return this._rule("important", false, [], null, this["important"]);
    }) || this._atomic(function() {
        return this._rule("unary", false, [], null, this["unary"]);
    }) || this._atomic(function() {
        return this._rule("operator", false, [], null, this["operator"]);
    }) || this._atomic(function() {
        return this._rule("braces", false, [], null, this["braces"]);
    }) || this._atomic(function() {
        return this._rule("value", false, [], null, this["value"]);
    }) || this._atomic(function() {
        return this._rule("progid", false, [], null, this["progid"]);
    }) || this._atomic(function() {
        return this._rule("filterv", false, [], null, this["filterv"]);
    }) || this._atomic(function() {
        return this._rule("filter", false, [], null, this["filter"]);
    }) || this._atomic(function() {
        return this._rule("comment", false, [], null, this["comment"]);
    }) || this._atomic(function() {
        return this._rule("uri", false, [], null, this["uri"]);
    }) || this._atomic(function() {
        return this._rule("raw", false, [], null, this["raw"]);
    }) || this._atomic(function() {
        return this._rule("functionBody", false, [], null, this["functionBody"]);
    }) || this._atomic(function() {
        return this._rule("funktion", false, [], null, this["funktion"]);
    }) || this._atomic(function() {
        return this._rule("functionExpression", false, [], null, this["functionExpression"]);
    }) || this._atomic(function() {
        return this._rule("after", false, [], null, this["after"]);
    });
};

CSSTransformer.prototype["ident"] = function $ident() {
    var t, x;
    return this._list(function() {
        return this._match("ident") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["atkeyword"] = function $atkeyword() {
    var t, x;
    return this._list(function() {
        return this._match("atkeyword") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["string"] = function $string() {
    var t, x;
    return this._list(function() {
        return this._match("string") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["shash"] = function $shash() {
    var t, x;
    return this._list(function() {
        return this._match("shash") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["vhash"] = function $vhash() {
    var t, x;
    return this._list(function() {
        return this._match("vhash") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["number"] = function $number() {
    var t, x;
    return this._list(function() {
        return this._match("number") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["percentage"] = function $percentage() {
    var t, x;
    return this._list(function() {
        return this._match("percentage") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["dimension"] = function $dimension() {
    var t, x, y;
    return this._list(function() {
        return this._match("dimension") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec([ t, x, y ]);
};

CSSTransformer.prototype["cdo"] = function $cdo() {
    var t;
    return this._list(function() {
        return this._match("cdo") && (t = this._getIntermediate(), true);
    }) && this._exec([ t ]);
};

CSSTransformer.prototype["cdc"] = function $cdc() {
    var t;
    return this._list(function() {
        return this._match("cdc") && (t = this._getIntermediate(), true);
    }) && this._exec([ t ]);
};

CSSTransformer.prototype["decldelim"] = function $decldelim() {
    var t;
    return this._list(function() {
        return this._match("decldelim") && (t = this._getIntermediate(), true);
    }) && this._exec([ t ]);
};

CSSTransformer.prototype["s"] = function $s() {
    var t, x;
    return this._list(function() {
        return this._match("s") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["attrselector"] = function $attrselector() {
    var t, x;
    return this._list(function() {
        return this._match("attrselector") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["attrib"] = function $attrib() {
    var t, x;
    return this._list(function() {
        return this._match("attrib") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["nth"] = function $nth() {
    var t, x;
    return this._list(function() {
        return this._match("nth") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["nthselector"] = function $nthselector() {
    var t, x, y;
    return this._list(function() {
        return this._match("nthselector") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (y = this._getIntermediate(), true);
    }) && this._exec([ t, x ].concat(y));
};

CSSTransformer.prototype["namespace"] = function $namespace() {
    var t;
    return this._list(function() {
        return this._match("namespace") && (t = this._getIntermediate(), true);
    }) && this._exec([ t ]);
};

CSSTransformer.prototype["clazz"] = function $clazz() {
    var t, x;
    return this._list(function() {
        return this._match("clazz") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["pseudoe"] = function $pseudoe() {
    var t, x;
    return this._list(function() {
        return this._match("pseudoe") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["pseudoc"] = function $pseudoc() {
    var t, x;
    return this._list(function() {
        return this._match("pseudoc") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["delim"] = function $delim() {
    var t;
    return this._list(function() {
        return this._match("delim") && (t = this._getIntermediate(), true);
    }) && this._exec([ t ]);
};

CSSTransformer.prototype["stylesheet"] = function $stylesheet() {
    var t, x;
    return this._list(function() {
        return this._match("stylesheet") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["atruleb"] = function $atruleb() {
    var t, x;
    return this._list(function() {
        return this._match("atruleb") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["atrules"] = function $atrules() {
    var t, x;
    return this._list(function() {
        return this._match("atrules") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["atrulerq"] = function $atrulerq() {
    var t, x;
    return this._list(function() {
        return this._match("atrulerq") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["atrulers"] = function $atrulers() {
    var t, x;
    return this._list(function() {
        return this._match("atrulers") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["atruler"] = function $atruler() {
    var t, x;
    return this._list(function() {
        return this._match("atruler") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["block"] = function $block() {
    var t, x;
    return this._list(function() {
        return this._match("block") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["ruleset"] = function $ruleset() {
    var t, x;
    return this._list(function() {
        return this._match("ruleset") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["combinator"] = function $combinator() {
    var t, x;
    return this._list(function() {
        return this._match("combinator") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["simpleselector"] = function $simpleselector() {
    var t, x;
    return this._list(function() {
        return this._match("simpleselector") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["selector"] = function $selector() {
    var t, x;
    return this._list(function() {
        return this._match("selector") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["declaration"] = function $declaration() {
    var t, p, v;
    return this._list(function() {
        return this._match("declaration") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (p = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (v = this._getIntermediate(), true);
    }) && this._exec([ t, p, v ]);
};

CSSTransformer.prototype["property"] = function $property() {
    var t, x;
    return this._list(function() {
        return this._match("property") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["important"] = function $important() {
    var t, x;
    return this._list(function() {
        return this._match("important") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["unary"] = function $unary() {
    var t, x;
    return this._list(function() {
        return this._match("unary") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["operator"] = function $operator() {
    var t, x;
    return this._list(function() {
        return this._match("operator") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["braces"] = function $braces() {
    var t, x, y, z;
    return this._list(function() {
        return this._match("braces") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true) && this._skip() && (y = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (z = this._getIntermediate(), true);
    }) && this._exec([ t, x, y ].concat(z));
};

CSSTransformer.prototype["value"] = function $value() {
    var t, x;
    return this._list(function() {
        return this._match("value") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["progid"] = function $progid() {
    var t, x;
    return this._list(function() {
        return this._match("progid") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["filterv"] = function $filterv() {
    var t, x;
    return this._list(function() {
        return this._match("filterv") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["filter"] = function $filter() {
    var t, p, v;
    return this._list(function() {
        return this._match("filter") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (p = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (v = this._getIntermediate(), true);
    }) && this._exec([ t, p, v ]);
};

CSSTransformer.prototype["comment"] = function $comment() {
    var t, x;
    return this._list(function() {
        return this._match("comment") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["uri"] = function $uri() {
    var t, x;
    return this._list(function() {
        return this._match("uri") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["raw"] = function $raw() {
    var t, x;
    return this._list(function() {
        return this._match("raw") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};

CSSTransformer.prototype["functionBody"] = function $functionBody() {
    var t, x;
    return this._list(function() {
        return this._match("functionBody") && (t = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec([ t ].concat(x));
};

CSSTransformer.prototype["funktion"] = function $funktion() {
    var t, x, y;
    return this._list(function() {
        return this._match("funktion") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec([ t, x, y ]);
};

CSSTransformer.prototype["functionExpression"] = function $functionExpression() {
    var t, x;
    return this._list(function() {
        return this._match("functionExpression") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec([ t, x ]);
};
