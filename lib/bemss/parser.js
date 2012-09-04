var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var CSSParser = require("../css/parser").CSSParser;

var BEMSSParser = function BEMSSParser(source) {
    CSSParser.call(this, source);
};

BEMSSParser.grammarName = "BEMSSParser";

BEMSSParser.match = CSSParser.match;

BEMSSParser.matchAll = CSSParser.matchAll;

exports.BEMSSParser = BEMSSParser;

require("util").inherits(BEMSSParser, CSSParser);

BEMSSParser.prototype["statement"] = function $statement() {
    return this._atomic(function() {
        return this._rule("definition", false, [], null, this["definition"]);
    }) || this._atomic(function() {
        return this._rule("ruleset", false, [], null, this["ruleset"]);
    }) || this._atomic(function() {
        return this._rule("atrule", false, [], null, this["atrule"]);
    }) || this._atomic(function() {
        return this._rule("assignment", false, [], null, this["assignment"]);
    });
};

BEMSSParser.prototype["stylesheet"] = function $stylesheet() {
    var x;
    return this._any(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("cdo", false, [], null, this["cdo"]);
            }) || this._atomic(function() {
                return this._rule("cdc", false, [], null, this["cdc"]);
            }) || this._atomic(function() {
                return this._rule("statement", false, [], null, this["statement"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "stylesheet" ], x));
};

BEMSSParser.prototype["definition"] = function $definition() {
    var x, y, z;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._match("(") && this._rule("functionBody", false, [], null, this["functionBody"]) && (y = this._getIntermediate(), true) && this._match(")") && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && this._rule("block", false, [], null, this["block"]) && (z = this._getIntermediate(), true) && this._exec([ "definition", x, y, z ]);
};

BEMSSParser.prototype["string"] = function $string() {
    var x;
    return this._rule("m_string", false, [], null, this["m_string"]) && (x = this._getIntermediate(), true) && this._exec([ "string", x[0], x.slice(1, -1) ]);
};

BEMSSParser.prototype["variable"] = function $variable() {
    var x;
    return this._match("$") && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._exec([ "variable", x ]);
};

BEMSSParser.prototype["combinator"] = function $combinator() {
    var x;
    return (this._match("+") || this._match(">") || this._match("~") || this._match("&")) && (x = this._getIntermediate(), true) && this._exec([ "combinator", x ]);
};

BEMSSParser.prototype["property"] = function $property() {
    var x, s0;
    return (this._atomic(function() {
        return this._rule("ident", false, [], null, this["ident"]);
    }) || this._atomic(function() {
        return this._rule("variable", false, [], null, this["variable"]);
    })) && (x = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "property", x ], s0));
};

BEMSSParser.prototype["assignment"] = function $assignment() {
    var p, v;
    return this._rule("property", false, [], null, this["property"]) && (p = this._getIntermediate(), true) && this._match("=") && this._rule("value", false, [], null, this["value"]) && (v = this._getIntermediate(), true) && this._optional(function() {
        return this._rule("decldelim", false, [], null, this["decldelim"]);
    }) && this._exec([ "assignment", p, v ]);
};

BEMSSParser.prototype["primary"] = function $primary() {
    return this._atomic(function() {
        return this._rule("percentage", false, [], null, this["percentage"]);
    }) || this._atomic(function() {
        return this._rule("dimension", false, [], null, this["dimension"]);
    }) || this._atomic(function() {
        return this._rule("number", false, [], null, this["number"]);
    });
};

BEMSSParser.prototype["unary"] = function $unary() {
    return this._atomic(function() {
        var op, x;
        return (this._match("-") || this._match("+")) && (op = this._getIntermediate(), true) && this._rule("primary", false, [], null, this["primary"]) && (x = this._getIntermediate(), true) && this._exec([ "unary", op, x ]);
    }) || this._atomic(function() {
        return this._rule("primary", false, [], null, this["primary"]);
    });
};

BEMSSParser.prototype["multiplicative"] = function $multiplicative() {
    return this._atomic(function() {
        var x, op, y;
        return this._rule("multiplicative", false, [], null, this["multiplicative"]) && (x = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("s", false, [], null, this["s"]);
            });
        }) && (this._match("*") || this._match("/") || this._match("%")) && (op = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("s", false, [], null, this["s"]);
            });
        }) && this._rule("unary", false, [], null, this["unary"]) && (y = this._getIntermediate(), true) && this._exec([ "binary", [ "operator", op ], x, y ]);
    }) || this._atomic(function() {
        return this._rule("unary", false, [], null, this["unary"]);
    });
};

BEMSSParser.prototype["additive"] = function $additive() {
    return this._atomic(function() {
        var x, op, y;
        return this._rule("additive", false, [], null, this["additive"]) && (x = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("s", false, [], null, this["s"]);
            });
        }) && (this._match("+") || this._match("-")) && (op = this._getIntermediate(), true) && this._many(function() {
            return this._atomic(function() {
                return this._rule("s", false, [], null, this["s"]);
            });
        }) && this._rule("multiplicative", false, [], null, this["multiplicative"]) && (y = this._getIntermediate(), true) && this._exec([ "binary", [ "operator", op ], x, y ]);
    }) || this._atomic(function() {
        return this._rule("multiplicative", false, [], null, this["multiplicative"]);
    });
};

BEMSSParser.prototype["expression"] = function $expression() {
    return this._rule("additive", false, [], null, this["additive"]);
};

BEMSSParser.prototype["nthselector"] = function $nthselector() {
    var x, y;
    return this._rule("nthf", false, [], null, this["nthf"]) && (x = this._getIntermediate(), true) && this._match("(") && this._any(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            }) || this._atomic(function() {
                var op;
                return (this._match("+") || this._match("-")) && (op = this._getIntermediate(), true) && this._exec([ "operator", op ]);
            }) || this._atomic(function() {
                return this._rule("nth", false, [], null, this["nth"]);
            });
        });
    }) && (y = this._getIntermediate(), true) && this._match(")") && this._exec([ "nthselector", [ "ident", x ] ].concat(y));
};

BEMSSParser.prototype["blockdecl"] = function $blockdecl() {
    return this._atomic(function() {
        var x;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (this._atomic(function() {
            return this._rule("filter", false, [], null, this["filter"]);
        }) || this._atomic(function() {
            return this._rule("declaration", false, [], null, this["declaration"]);
        })) && (x = this._getIntermediate(), true) && this._optional(function() {
            return this._rule("decldelim", false, [], null, this["decldelim"]);
        }) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._exec([ x ]);
    }) || this._atomic(function() {
        var x;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._rule("decldelim", false, [], null, this["decldelim"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        });
    }) || this._atomic(function() {
        var x;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._rule("ruleset", false, [], null, this["ruleset"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._exec([ x ]);
    }) || this._atomic(function() {
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        });
    });
};

BEMSSParser.prototype["uri"] = function $uri() {
    return this._atomic(function() {
        var x;
        return this._rule("seq", false, [ "url(" ], null, this["seq"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._rule("string", false, [], null, this["string"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._match(")") && this._exec(CSSParser.concat([ "uri" ], [ x ]));
    }) || this._atomic(function() {
        var x;
        return this._rule("seq", false, [ "url(" ], null, this["seq"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._any(function() {
            return this._atomic(function() {
                return !this._atomic(function() {
                    return this._match(")");
                }, true) && !this._atomic(function() {
                    return this._rule("m_w", false, [], null, this["m_w"]);
                }, true) && this._rule("char", false, [], null, this["char"]);
            });
        }) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && this._match(")") && this._exec(CSSParser.concat([ "uri" ], [ [ "raw", x.join("") ] ]));
    });
};

BEMSSParser.prototype["any"] = function $any() {
    return this._atomic(function() {
        return this._rule("braces", false, [], null, this["braces"]);
    }) || this._atomic(function() {
        return this._rule("string", false, [], null, this["string"]);
    }) || this._atomic(function() {
        return this._rule("expression", false, [], null, this["expression"]);
    }) || this._atomic(function() {
        return this._rule("uri", false, [], null, this["uri"]);
    }) || this._atomic(function() {
        return this._rule("functionExpression", false, [], null, this["functionExpression"]);
    }) || this._atomic(function() {
        return this._rule("funktion", false, [], null, this["funktion"]);
    }) || this._atomic(function() {
        return this._rule("ident", false, [], null, this["ident"]);
    }) || this._atomic(function() {
        return this._rule("variable", false, [], null, this["variable"]);
    });
};
