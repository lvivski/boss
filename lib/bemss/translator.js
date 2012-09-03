var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var CSSTranslator = require("../css/translator").CSSTranslator;

var nodes = require("../nodes");

var BEMSSTranslator = function BEMSSTranslator(source) {
    CSSTranslator.call(this, source);
};

BEMSSTranslator.grammarName = "BEMSSTranslator";

BEMSSTranslator.match = CSSTranslator.match;

BEMSSTranslator.matchAll = CSSTranslator.matchAll;

exports.BEMSSTranslator = BEMSSTranslator;

require("util").inherits(BEMSSTranslator, CSSTranslator);

BEMSSTranslator.prototype["any"] = function $any() {
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
        return this._rule("binary", false, [], null, this["binary"]);
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
        return this._rule("definition", false, [], null, this["definition"]);
    }) || this._atomic(function() {
        return this._rule("assignment", false, [], null, this["assignment"]);
    }) || this._atomic(function() {
        return this._rule("variable", false, [], null, this["variable"]);
    }) || this._atomic(function() {
        return this._rule("after", false, [], null, this["after"]);
    });
};

BEMSSTranslator.prototype["assignment"] = function $assignment() {
    var t, x, y;
    return this._list(function() {
        return this._match("assignment") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(new nodes.Ident(x, y));
};

BEMSSTranslator.prototype["vhash"] = function $vhash() {
    var t, x;
    return this._list(function() {
        return this._match("vhash") && (t = this._getIntermediate(), true) && this._skip() && (x = this._getIntermediate(), true);
    }) && this._exec(new nodes.Color(x));
};

BEMSSTranslator.prototype["dimension"] = function $dimension() {
    var t, x, y;
    return this._list(function() {
        return this._match("dimension") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(new nodes.Dimension(x, y));
};

BEMSSTranslator.prototype["percentage"] = function $percentage() {
    var t, x;
    return this._list(function() {
        return this._match("percentage") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec(new nodes.Dimension(x, "%"));
};

BEMSSTranslator.prototype["functionBody"] = function $functionBody() {
    var x;
    return this._list(function() {
        return this._match("functionBody") && this._rule("anys", false, [], null, this["anys"]) && (x = this._getIntermediate(), true);
    }) && this._exec(function() {
        return "";
    }.call(this));
};

BEMSSTranslator.prototype["funktion"] = function $funktion() {
    var t, x, y;
    return this._list(function() {
        return this._match("funktion") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(new nodes.Call(x, y));
};

BEMSSTranslator.prototype["definition"] = function $definition() {
    var t, x, y, z;
    return this._list(function() {
        return this._match("definition") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (z = this._getIntermediate(), true);
    }) && this._exec(new nodes.Definition(x, y, z));
};

BEMSSTranslator.prototype["binary"] = function $binary() {
    var t, o, x, y;
    return this._list(function() {
        return this._match("binary") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (o = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (y = this._getIntermediate(), true);
    }) && this._exec(new nodes.BinOp(o, x, y));
};

BEMSSTranslator.prototype["unary"] = function $unary() {
    var t, o, x;
    return this._list(function() {
        return this._match("unary") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (o = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec(new nodes.Dimension(o + x, y));
};

BEMSSTranslator.prototype["variable"] = function $variable() {
    var t, x;
    return this._list(function() {
        return this._match("variable") && (t = this._getIntermediate(), true) && this._rule("any", false, [], null, this["any"]) && (x = this._getIntermediate(), true);
    }) && this._exec(new nodes.Ident(x));
};
