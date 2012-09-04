var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var CSSTranslator = function CSSTranslator(source) {
    AbstractGrammar.call(this, source);
};

CSSTranslator.grammarName = "CSSTranslator";

CSSTranslator.match = AbstractGrammar.match;

CSSTranslator.matchAll = AbstractGrammar.matchAll;

exports.CSSTranslator = CSSTranslator;

require("util").inherits(CSSTranslator, AbstractGrammar);

CSSTranslator.prototype["anys"] = function $anys() {
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("any", false, [], null, this["any"]);
        });
    });
};

CSSTranslator.prototype["before"] = function $before() {
    return this._list(function() {
        return true;
    });
};

CSSTranslator.prototype["after"] = function $after() {
    return this._list(function() {
        return true;
    });
};

CSSTranslator.prototype["any"] = function $any() {
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

CSSTranslator.prototype["ident"] = function $ident() {
    var x;
    return this._list(function() {
        return this._match("ident") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["atkeyword"] = function $atkeyword() {
    var x;
    return this._list(function() {
        return this._match("atkeyword") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec("@" + x);
};

CSSTranslator.prototype["string"] = function $string() {
    var x;
    return this._list(function() {
        return this._match("string") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["shash"] = function $shash() {
    var x;
    return this._list(function() {
        return this._match("shash") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec("#" + x);
};

CSSTranslator.prototype["vhash"] = function $vhash() {
    var x;
    return this._list(function() {
        return this._match("vhash") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec("#" + x);
};

CSSTranslator.prototype["number"] = function $number() {
    var x;
    return this._list(function() {
        return this._match("number") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["percentage"] = function $percentage() {
    var x;
    return this._list(function() {
        return this._match("percentage") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x + "%");
};

CSSTranslator.prototype["dimension"] = function $dimension() {
    var x, y;
    return this._list(function() {
        return this._match("dimension") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(x + y);
};

CSSTranslator.prototype["cdo"] = function $cdo() {
    return this._list(function() {
        return this._match("cdo");
    }) && this._exec("<!--");
};

CSSTranslator.prototype["cdc"] = function $cdc() {
    return this._list(function() {
        return this._match("cdc");
    }) && this._exec("-->");
};

CSSTranslator.prototype["decldelim"] = function $decldelim() {
    return this._list(function() {
        return this._match("decldelim");
    }) && this._exec(";");
};

CSSTranslator.prototype["s"] = function $s() {
    var x;
    return this._list(function() {
        return this._match("s") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["attrselector"] = function $attrselector() {
    var x;
    return this._list(function() {
        return this._match("attrselector") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["attrib"] = function $attrib() {
    var x;
    return this._list(function() {
        return this._match("attrib") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec("[" + x.join("") + "]");
};

CSSTranslator.prototype["nth"] = function $nth() {
    var x;
    return this._list(function() {
        return this._match("nth") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["nthselector"] = function $nthselector() {
    var x, y;
    return this._list(function() {
        return this._match("nthselector") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (y = this._getIntermediate(), true);
    }) && this._exec(":" + x + "(" + y.join("") + ")");
};

CSSTranslator.prototype["namespace"] = function $namespace() {
    return this._list(function() {
        return this._match("namespace");
    }) && this._exec("|");
};

CSSTranslator.prototype["clazz"] = function $clazz() {
    var x;
    return this._list(function() {
        return this._match("clazz") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec("." + x);
};

CSSTranslator.prototype["pseudoe"] = function $pseudoe() {
    var x;
    return this._list(function() {
        return this._match("pseudoe") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec("::" + x.join(""));
};

CSSTranslator.prototype["pseudoc"] = function $pseudoc() {
    var x;
    return this._list(function() {
        return this._match("pseudoc") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(":" + x.join(""));
};

CSSTranslator.prototype["delim"] = function $delim() {
    return this._list(function() {
        return this._match("delim");
    }) && this._exec(",");
};

CSSTranslator.prototype["stylesheet"] = function $stylesheet() {
    var x;
    return this._list(function() {
        return this._match("stylesheet") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["atruleb"] = function $atruleb() {
    var x;
    return this._list(function() {
        return this._match("atruleb") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["atrules"] = function $atrules() {
    var x;
    return this._list(function() {
        return this._match("atrules") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join("") + ";");
};

CSSTranslator.prototype["atrulerq"] = function $atrulerq() {
    var x;
    return this._list(function() {
        return this._match("atrulerq") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["atrulers"] = function $atrulers() {
    var x;
    return this._list(function() {
        return this._match("atrulers") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["atruler"] = function $atruler() {
    var x, y, z;
    return this._list(function() {
        return this._match("atruler") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (z = this._getIntermediate(), true);
    }) && this._exec(x + y + "{" + z + "}");
};

CSSTranslator.prototype["block"] = function $block() {
    var x;
    return this._list(function() {
        return this._match("block") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec("{" + x.join("") + "}");
};

CSSTranslator.prototype["ruleset"] = function $ruleset() {
    var x;
    return this._list(function() {
        return this._match("ruleset") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["combinator"] = function $combinator() {
    var x;
    return this._list(function() {
        return this._match("combinator") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["simpleselector"] = function $simpleselector() {
    var x;
    return this._list(function() {
        return this._match("simpleselector") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["selector"] = function $selector() {
    var x;
    return this._list(function() {
        return this._match("selector") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["declaration"] = function $declaration() {
    var p, v;
    return this._list(function() {
        return this._match("declaration") && this._rule("any", false, [], null, this["any"]) && (p = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (v = this._getIntermediate(), true);
    }) && this._exec(p + ":" + v);
};

CSSTranslator.prototype["property"] = function $property() {
    var x;
    return this._list(function() {
        return this._match("property") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["important"] = function $important() {
    var x;
    return this._list(function() {
        return this._match("important") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec("!" + x.join("") + "important");
};

CSSTranslator.prototype["unary"] = function $unary() {
    var x;
    return this._list(function() {
        return this._match("unary") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["operator"] = function $operator() {
    var x;
    return this._list(function() {
        return this._match("operator") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["braces"] = function $braces() {
    var x, y, z;
    return this._list(function() {
        return this._match("braces") && this._skip() && (x = this._getIntermediate(), true) && this._skip() && (y = this._getIntermediate(), true) && this._rule("anys", false, [], null, this["anys"]) && (z = this._getIntermediate(), true);
    }) && this._exec(x + z.join("") + y);
};

CSSTranslator.prototype["value"] = function $value() {
    var x;
    return this._list(function() {
        return this._match("value") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["progid"] = function $progid() {
    var x;
    return this._list(function() {
        return this._match("progid") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["filterv"] = function $filterv() {
    var x;
    return this._list(function() {
        return this._match("filterv") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["filter"] = function $filter() {
    var p, v;
    return this._list(function() {
        return this._match("filter") && this._rule("any", false, [], null, this["any"]) && (p = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (v = this._getIntermediate(), true);
    }) && this._exec(p + ":" + v);
};

CSSTranslator.prototype["comment"] = function $comment() {
    var x;
    return this._list(function() {
        return this._match("comment") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec("/*" + x + "*/");
};

CSSTranslator.prototype["uri"] = function $uri() {
    var x;
    return this._list(function() {
        return this._match("uri") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec("url(" + x.join("") + ")");
};

CSSTranslator.prototype["raw"] = function $raw() {
    var x;
    return this._list(function() {
        return this._match("raw") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(x);
};

CSSTranslator.prototype["functionBody"] = function $functionBody() {
    var x;
    return this._list(function() {
        return this._match("functionBody") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(x.join(""));
};

CSSTranslator.prototype["funktion"] = function $funktion() {
    var x, y;
    return this._list(function() {
        return this._match("funktion") && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(x + "(" + y + ")");
};

CSSTranslator.prototype["functionExpression"] = function $functionExpression() {
    var x;
    return this._list(function() {
        return this._match("functionExpression") && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec("expression(" + x + ")");
};
