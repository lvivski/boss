var ometajs_ = require("ometajs");

var AbstractGrammar = ometajs_.grammars.AbstractGrammar;

var BSJSParser = ometajs_.grammars.BSJSParser;

var BSJSIdentity = ometajs_.grammars.BSJSIdentity;

var BSJSTranslator = ometajs_.grammars.BSJSTranslator;

var CSSParser = function CSSParser(source) {
    AbstractGrammar.call(this, source);
};

CSSParser.grammarName = "CSSParser";

CSSParser.match = AbstractGrammar.match;

CSSParser.matchAll = AbstractGrammar.matchAll;

exports.CSSParser = CSSParser;

require("util").inherits(CSSParser, AbstractGrammar);

CSSParser.prototype["m_comment"] = function $m_comment() {
    var x;
    return this._rule("seq", false, [ "/*" ], null, this["seq"]) && this._any(function() {
        return this._atomic(function() {
            return !this._atomic(function() {
                return this._rule("seq", false, [ "*/" ], null, this["seq"]);
            }, true) && this._rule("char", false, [], null, this["char"]);
        });
    }) && (x = this._getIntermediate(), true) && this._rule("seq", false, [ "*/" ], null, this["seq"]) && this._exec("/*" + x.join("") + "*/");
};

CSSParser.prototype["m_ident"] = function $m_ident() {
    return this._atomic(function() {
        var x, z;
        return this._match("-") && this._atomic(function() {
            var x;
            return this._rule("char", false, [], null, this["char"]) && (x = this._getIntermediate(), true) && this._rule("m_nmstart", false, [ x ], null, this["m_nmstart"]) && this._exec(x);
        }) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("escape", false, [], null, this["escape"]);
                }) || this._atomic(function() {
                    var y;
                    return this._skip() && (y = this._getIntermediate(), true) && this._rule("m_nmchar", false, [ y ], null, this["m_nmchar"]) && this._exec(y);
                });
            });
        }) && (z = this._getIntermediate(), true) && this._exec("-" + x + z.join(""));
    }) || this._atomic(function() {
        var x, z;
        return this._atomic(function() {
            var x;
            return this._rule("char", false, [], null, this["char"]) && (x = this._getIntermediate(), true) && this._rule("m_nmstart", false, [ x ], null, this["m_nmstart"]) && this._exec(x);
        }) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("escape", false, [], null, this["escape"]);
                }) || this._atomic(function() {
                    var y;
                    return this._skip() && (y = this._getIntermediate(), true) && this._rule("m_nmchar", false, [ y ], null, this["m_nmchar"]) && this._exec(y);
                });
            });
        }) && (z = this._getIntermediate(), true) && this._exec(x + z.join(""));
    });
};

CSSParser.prototype["escape"] = function $escape() {
    var x;
    return this._match("\\") && this._rule("char", false, [], null, this["char"]) && (x = this._getIntermediate(), true) && this._exec("\\" + x);
};

CSSParser.prototype["m_name"] = function $m_name() {
    var xx, x;
    return this._many(function() {
        return this._atomic(function() {
            return this._skip() && (x = this._getIntermediate(), true) && this._rule("m_nmchar", false, [ x ], null, this["m_nmchar"]) && this._exec(x);
        });
    }) && (xx = this._getIntermediate(), true) && this._exec(xx.join(""));
};

CSSParser.prototype["m_name2"] = function $m_name2() {
    var xx, x;
    return this._many(function() {
        return this._atomic(function() {
            return this._skip() && (x = this._getIntermediate(), true) && this._rule("m_nmchar2", false, [ x ], null, this["m_nmchar2"]) && this._exec(x);
        });
    }) && (xx = this._getIntermediate(), true) && this._exec(xx.join(""));
};

CSSParser.prototype["m_number"] = function $m_number() {
    return this._atomic(function() {
        var x, y;
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("digit", false, [], null, this["digit"]);
            });
        }) && (x = this._getIntermediate(), true) && this._match(".") && this._many(function() {
            return this._atomic(function() {
                return this._rule("digit", false, [], null, this["digit"]);
            });
        }) && (y = this._getIntermediate(), true) && this._exec(x.join("") + "." + y.join(""));
    }) || this._atomic(function() {
        var x;
        return this._match(".") && this._many(function() {
            return this._atomic(function() {
                return this._rule("digit", false, [], null, this["digit"]);
            });
        }) && (x = this._getIntermediate(), true) && this._exec("." + x.join(""));
    }) || this._atomic(function() {
        var x;
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("digit", false, [], null, this["digit"]);
            });
        }) && (x = this._getIntermediate(), true) && this._exec(x.join(""));
    });
};

CSSParser.prototype["m_string"] = function $m_string() {
    return this._atomic(function() {
        var s;
        return this._match('"') && this._any(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("m_string_nl1", false, [], null, this["m_string_nl1"]);
                }) || this._atomic(function() {
                    return !this._atomic(function() {
                        return this._match('"');
                    }, true) && this._rule("char", false, [], null, this["char"]);
                });
            });
        }) && (s = this._getIntermediate(), true) && this._match('"') && this._exec('"' + s.join("") + '"');
    }) || this._atomic(function() {
        var s;
        return this._match("'") && this._any(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("m_string_nl2", false, [], null, this["m_string_nl2"]);
                }) || this._atomic(function() {
                    return !this._atomic(function() {
                        return this._match("'");
                    }, true) && this._rule("char", false, [], null, this["char"]);
                });
            });
        }) && (s = this._getIntermediate(), true) && this._match("'") && this._exec("'" + s.join("") + "'");
    });
};

CSSParser.prototype["m_string_nl1"] = function $m_string_nl1() {
    var x;
    return (this._match("\n") || this._match("\r") || this._atomic(function() {
        return this._rule("seq", false, [ '\\"' ], null, this["seq"]);
    })) && (x = this._getIntermediate(), true) && this._exec(x);
};

CSSParser.prototype["m_string_nl2"] = function $m_string_nl2() {
    var x;
    return (this._match("\n") || this._match("\r") || this._atomic(function() {
        return this._rule("seq", false, [ "\\'" ], null, this["seq"]);
    })) && (x = this._getIntermediate(), true) && this._exec(x);
};

CSSParser.prototype["m_nmstart"] = function $m_nmstart() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_nmstart(x);
};

CSSParser.prototype["m_unicode"] = function $m_unicode() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_unicode(x);
};

CSSParser.prototype["m_escape"] = function $m_escape() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_escape(x);
};

CSSParser.prototype["m_nmchar"] = function $m_nmchar() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_nmchar(x);
};

CSSParser.prototype["m_nmchar2"] = function $m_nmchar2() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_nmchar2(x);
};

CSSParser.prototype["m_nl"] = function $m_nl() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_nl(x);
};

CSSParser.prototype["m_w"] = function $m_w() {
    var x;
    return this._skip() && (x = this._getIntermediate(), true) && CSSParser._m_w(x);
};

CSSParser.prototype["ident"] = function $ident() {
    var x;
    return this._rule("m_ident", false, [], null, this["m_ident"]) && (x = this._getIntermediate(), true) && this._exec([ "ident", x ]);
};

CSSParser.prototype["atkeyword"] = function $atkeyword() {
    var x;
    return this._match("@") && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._exec([ "atkeyword", x ]);
};

CSSParser.prototype["string"] = function $string() {
    var x;
    return this._rule("m_string", false, [], null, this["m_string"]) && (x = this._getIntermediate(), true) && this._exec([ "string", x ]);
};

CSSParser.prototype["shash"] = function $shash() {
    var x;
    return this._match("#") && this._rule("m_name", false, [], null, this["m_name"]) && (x = this._getIntermediate(), true) && this._exec([ "shash", x ]);
};

CSSParser.prototype["vhash"] = function $vhash() {
    var x;
    return this._match("#") && this._rule("m_name2", false, [], null, this["m_name2"]) && (x = this._getIntermediate(), true) && this._exec([ "vhash", x ]);
};

CSSParser.prototype["number"] = function $number() {
    var x;
    return this._rule("m_number", false, [], null, this["m_number"]) && (x = this._getIntermediate(), true) && this._exec([ "number", x ]);
};

CSSParser.prototype["percentage"] = function $percentage() {
    var x;
    return this._rule("number", false, [], null, this["number"]) && (x = this._getIntermediate(), true) && this._match("%") && this._exec([ "percentage", x ]);
};

CSSParser.prototype["dimension"] = function $dimension() {
    var x, y;
    return this._rule("number", false, [], null, this["number"]) && (x = this._getIntermediate(), true) && this._rule("m_name2", false, [], null, this["m_name2"]) && (y = this._getIntermediate(), true) && this._exec([ "dimension", x, [ "ident", y ] ]);
};

CSSParser.prototype["cdo"] = function $cdo() {
    return this._rule("seq", false, [ "<!--" ], null, this["seq"]) && this._exec([ "cdo" ]);
};

CSSParser.prototype["cdc"] = function $cdc() {
    return this._rule("seq", false, [ "-->" ], null, this["seq"]) && this._exec([ "cdc" ]);
};

CSSParser.prototype["s"] = function $s() {
    var xx, x;
    return this._many(function() {
        return this._atomic(function() {
            return this._skip() && (x = this._getIntermediate(), true) && this._rule("m_w", false, [ x ], null, this["m_w"]) && this._exec(x);
        });
    }) && (xx = this._getIntermediate(), true) && this._exec([ "s", xx.join("") ]);
};

CSSParser.prototype["attrselector"] = function $attrselector() {
    var x;
    return (this._atomic(function() {
        return this._rule("seq", false, [ "=" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "~=" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "^=" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "$=" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "*=" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "|=" ], null, this["seq"]);
    })) && (x = this._getIntermediate(), true) && this._exec([ "attrselector", x ]);
};

CSSParser.prototype["delim"] = function $delim() {
    return this._match(",") && this._exec([ "delim" ]);
};

CSSParser.prototype["comment"] = function $comment() {
    var x;
    return this._rule("seq", false, [ "/*" ], null, this["seq"]) && this._any(function() {
        return this._atomic(function() {
            return !this._atomic(function() {
                return this._rule("seq", false, [ "*/" ], null, this["seq"]);
            }, true) && this._rule("char", false, [], null, this["char"]);
        });
    }) && (x = this._getIntermediate(), true) && this._rule("seq", false, [ "*/" ], null, this["seq"]) && this._exec([ "comment", x.join("") ]);
};

CSSParser.prototype["sc"] = function $sc() {
    return this._atomic(function() {
        return this._rule("s", false, [], null, this["s"]);
    }) || this._atomic(function() {
        return this._rule("comment", false, [], null, this["comment"]);
    });
};

CSSParser.prototype["tset"] = function $tset() {
    return this._atomic(function() {
        return this._rule("vhash", false, [], null, this["vhash"]);
    }) || this._atomic(function() {
        return this._rule("any", false, [], null, this["any"]);
    }) || this._atomic(function() {
        return this._rule("sc", false, [], null, this["sc"]);
    }) || this._atomic(function() {
        return this._rule("operator", false, [], null, this["operator"]);
    });
};

CSSParser.prototype["stylesheet"] = function $stylesheet() {
    var x;
    return this._any(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("cdo", false, [], null, this["cdo"]);
            }) || this._atomic(function() {
                return this._rule("cdc", false, [], null, this["cdc"]);
            }) || this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            }) || this._atomic(function() {
                return this._rule("statement", false, [], null, this["statement"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "stylesheet" ], x));
};

CSSParser.prototype["statement"] = function $statement() {
    return this._atomic(function() {
        return this._rule("ruleset", false, [], null, this["ruleset"]);
    }) || this._atomic(function() {
        return this._rule("atrule", false, [], null, this["atrule"]);
    });
};

CSSParser.prototype["atruleb"] = function $atruleb() {
    var ak, ap, b;
    return this._rule("atkeyword", false, [], null, this["atkeyword"]) && (ak = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("tset", false, [], null, this["tset"]);
        });
    }) && (ap = this._getIntermediate(), true) && this._rule("block", false, [], null, this["block"]) && (b = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "atruleb", ak ], ap, [ b ]));
};

CSSParser.prototype["atrules"] = function $atrules() {
    var ak, ap;
    return this._rule("atkeyword", false, [], null, this["atkeyword"]) && (ak = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("tset", false, [], null, this["tset"]);
        });
    }) && (ap = this._getIntermediate(), true) && this._match(";") && this._exec(CSSParser.concat([ "atrules", ak ], ap));
};

CSSParser.prototype["atrulerq"] = function $atrulerq() {
    var ap;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("tset", false, [], null, this["tset"]);
        });
    }) && (ap = this._getIntermediate(), true) && this._exec([ "atrulerq" ].concat(ap));
};

CSSParser.prototype["atrulers"] = function $atrulers() {
    var s0, r, s1;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("ruleset", false, [], null, this["ruleset"]);
        });
    }) && (r = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s1 = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "atrulers" ], s0, r, s1));
};

CSSParser.prototype["atruler"] = function $atruler() {
    var ak, x, y;
    return this._rule("atkeyword", false, [], null, this["atkeyword"]) && (ak = this._getIntermediate(), true) && this._rule("atrulerq", false, [], null, this["atrulerq"]) && (x = this._getIntermediate(), true) && this._match("{") && this._rule("atrulers", false, [], null, this["atrulers"]) && (y = this._getIntermediate(), true) && this._match("}") && this._exec([ "atruler", ak, x, y ]);
};

CSSParser.prototype["atrule"] = function $atrule() {
    return this._atomic(function() {
        return this._rule("atruler", false, [], null, this["atruler"]);
    }) || this._atomic(function() {
        return this._rule("atruleb", false, [], null, this["atruleb"]);
    }) || this._atomic(function() {
        return this._rule("atrules", false, [], null, this["atrules"]);
    });
};

CSSParser.prototype["blockdecl"] = function $blockdecl() {
    return this._atomic(function() {
        var s0, x, y, s1;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && (this._atomic(function() {
            return this._rule("filter", false, [], null, this["filter"]);
        }) || this._atomic(function() {
            return this._rule("declaration", false, [], null, this["declaration"]);
        })) && (x = this._getIntermediate(), true) && this._rule("decldelim", false, [], null, this["decldelim"]) && (y = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._exec(CSSParser.concat(s0, [ x ], [ y ], s1));
    }) || this._atomic(function() {
        var s0, x, s1;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && (this._atomic(function() {
            return this._rule("filter", false, [], null, this["filter"]);
        }) || this._atomic(function() {
            return this._rule("declaration", false, [], null, this["declaration"]);
        })) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._exec(CSSParser.concat(s0, [ x ], s1));
    }) || this._atomic(function() {
        var s0, x, s1;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._rule("decldelim", false, [], null, this["decldelim"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._exec(CSSParser.concat(s0, [ x ], s1));
    }) || this._atomic(function() {
        var s0;
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._exec(s0);
    });
};

CSSParser.prototype["decldelim"] = function $decldelim() {
    return this._match(";") && this._exec([ "decldelim" ]);
};

CSSParser.prototype["block"] = function $block() {
    var x;
    return this._match("{") && this._any(function() {
        return this._atomic(function() {
            return this._rule("blockdecl", false, [], null, this["blockdecl"]);
        });
    }) && (x = this._getIntermediate(), true) && this._match("}") && this._exec(CSSParser.concatContent([ "block" ], x));
};

CSSParser.prototype["ruleset"] = function $ruleset() {
    var x, y;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("selector", false, [], null, this["selector"]);
        });
    }) && (x = this._getIntermediate(), true) && this._rule("block", false, [], null, this["block"]) && (y = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "ruleset" ], x, [ y ]));
};

CSSParser.prototype["combinator"] = function $combinator() {
    var x;
    return (this._match("+") || this._match(">") || this._match("~")) && (x = this._getIntermediate(), true) && this._exec([ "combinator", x ]);
};

CSSParser.prototype["attrib"] = function $attrib() {
    return this._atomic(function() {
        var s0, x, s1, a, s2, y, s3;
        return this._match("[") && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._rule("attrselector", false, [], null, this["attrselector"]) && (a = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s2 = this._getIntermediate(), true) && (this._atomic(function() {
            return this._rule("ident", false, [], null, this["ident"]);
        }) || this._atomic(function() {
            return this._rule("string", false, [], null, this["string"]);
        })) && (y = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s3 = this._getIntermediate(), true) && this._match("]") && this._exec(CSSParser.concat([ "attrib" ], s0, [ x ], s1, [ a ], s2, [ y ], s3));
    }) || this._atomic(function() {
        var s0, x, s1;
        return this._match("[") && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._match("]") && this._exec(CSSParser.concat([ "attrib" ], s0, [ x ], s1));
    });
};

CSSParser.prototype["clazz"] = function $clazz() {
    var i;
    return this._match(".") && this._rule("ident", false, [], null, this["ident"]) && (i = this._getIntermediate(), true) && this._exec([ "clazz", i ]);
};

CSSParser.prototype["pseudoe"] = function $pseudoe() {
    var x;
    return this._rule("seq", false, [ "::" ], null, this["seq"]) && this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._exec([ "pseudoe", x ]);
};

CSSParser.prototype["pseudoc"] = function $pseudoc() {
    var x;
    return this._match(":") && (this._atomic(function() {
        return this._rule("funktion", false, [], null, this["funktion"]);
    }) || this._atomic(function() {
        return this._rule("ident", false, [], null, this["ident"]);
    })) && (x = this._getIntermediate(), true) && this._exec([ "pseudoc", x ]);
};

CSSParser.prototype["pseudo"] = function $pseudo() {
    return this._atomic(function() {
        return this._rule("pseudoe", false, [], null, this["pseudoe"]);
    }) || this._atomic(function() {
        return this._rule("pseudoc", false, [], null, this["pseudoc"]);
    });
};

CSSParser.prototype["nthf"] = function $nthf() {
    var x, y;
    return this._match(":") && this._rule("seq", false, [ "nth-" ], null, this["seq"]) && (x = this._getIntermediate(), true) && (this._atomic(function() {
        return this._rule("seq", false, [ "child" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "last-child" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "of-type" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "last-of-type" ], null, this["seq"]);
    })) && (y = this._getIntermediate(), true) && this._exec(x + y);
};

CSSParser.prototype["nth"] = function $nth() {
    return this._atomic(function() {
        var x;
        return this._many(function() {
            return this._atomic(function() {
                return this._atomic(function() {
                    return this._rule("digit", false, [], null, this["digit"]);
                }) || this._match("n");
            });
        }) && (x = this._getIntermediate(), true) && this._exec([ "nth", x.join("") ]);
    }) || this._atomic(function() {
        var x;
        return (this._atomic(function() {
            return this._rule("seq", false, [ "even" ], null, this["seq"]);
        }) || this._atomic(function() {
            return this._rule("seq", false, [ "odd" ], null, this["seq"]);
        })) && (x = this._getIntermediate(), true) && this._exec([ "nth", x ]);
    });
};

CSSParser.prototype["nthselector"] = function $nthselector() {
    var x, y;
    return this._rule("nthf", false, [], null, this["nthf"]) && (x = this._getIntermediate(), true) && this._match("(") && this._any(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            }) || this._atomic(function() {
                return this._rule("unary", false, [], null, this["unary"]);
            }) || this._atomic(function() {
                return this._rule("nth", false, [], null, this["nth"]);
            });
        });
    }) && (y = this._getIntermediate(), true) && this._match(")") && this._exec([ "nthselector", [ "ident", x ] ].concat(y));
};

CSSParser.prototype["namespace"] = function $namespace() {
    return this._match("|") && this._exec([ "namespace" ]);
};

CSSParser.prototype["simpleselector"] = function $simpleselector() {
    var x;
    return this._many(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("nthselector", false, [], null, this["nthselector"]);
            }) || this._atomic(function() {
                return this._rule("combinator", false, [], null, this["combinator"]);
            }) || this._atomic(function() {
                return this._rule("attrib", false, [], null, this["attrib"]);
            }) || this._atomic(function() {
                return this._rule("pseudo", false, [], null, this["pseudo"]);
            }) || this._atomic(function() {
                return this._rule("clazz", false, [], null, this["clazz"]);
            }) || this._atomic(function() {
                return this._rule("shash", false, [], null, this["shash"]);
            }) || this._atomic(function() {
                return this._rule("any", false, [], null, this["any"]);
            }) || this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            }) || this._atomic(function() {
                return this._rule("namespace", false, [], null, this["namespace"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(CSSParser.concatContent([ "simpleselector" ], [ x ]));
};

CSSParser.prototype["selector"] = function $selector() {
    var x;
    return this._many(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("simpleselector", false, [], null, this["simpleselector"]);
            }) || this._atomic(function() {
                return this._rule("delim", false, [], null, this["delim"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "selector" ], x));
};

CSSParser.prototype["declaration"] = function $declaration() {
    var x, y;
    return this._rule("property", false, [], null, this["property"]) && (x = this._getIntermediate(), true) && this._match(":") && this._rule("value", false, [], null, this["value"]) && (y = this._getIntermediate(), true) && this._exec([ "declaration", x, y ]);
};

CSSParser.prototype["filterp"] = function $filterp() {
    var t, s0;
    return (this._atomic(function() {
        return this._rule("seq", false, [ "-filter" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "_filter" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "*filter" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "-ms-filter" ], null, this["seq"]);
    }) || this._atomic(function() {
        return this._rule("seq", false, [ "filter" ], null, this["seq"]);
    })) && (t = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "property", [ "ident", t ] ], s0));
};

CSSParser.prototype["progid"] = function $progid() {
    var s0, x, y, z, s1;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._rule("seq", false, [ "progid:DXImageTransform.Microsoft." ], null, this["seq"]) && (x = this._getIntermediate(), true) && this._many(function() {
        return this._atomic(function() {
            return this._rule("letter", false, [], null, this["letter"]);
        });
    }) && (y = this._getIntermediate(), true) && this._match("(") && this._many(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("m_string", false, [], null, this["m_string"]);
            }) || this._atomic(function() {
                return this._rule("m_comment", false, [], null, this["m_comment"]);
            }) || this._atomic(function() {
                return !this._atomic(function() {
                    return this._match(")");
                }, true) && this._rule("char", false, [], null, this["char"]);
            });
        });
    }) && (z = this._getIntermediate(), true) && this._match(")") && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s1 = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "progid" ], s0, [ [ "raw", x + y.join("") + "(" + z.join("") + ")" ] ], s1));
};

CSSParser.prototype["filterv"] = function $filterv() {
    var x;
    return this._many(function() {
        return this._atomic(function() {
            return this._rule("progid", false, [], null, this["progid"]);
        });
    }) && (x = this._getIntermediate(), true) && this._exec([ "filterv" ].concat(x));
};

CSSParser.prototype["filter"] = function $filter() {
    var x, y;
    return this._rule("filterp", false, [], null, this["filterp"]) && (x = this._getIntermediate(), true) && this._match(":") && this._rule("filterv", false, [], null, this["filterv"]) && (y = this._getIntermediate(), true) && this._exec([ "filter", x, y ]);
};

CSSParser.prototype["property"] = function $property() {
    var x, s0;
    return this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "property", x ], s0));
};

CSSParser.prototype["important"] = function $important() {
    var s0;
    return this._match("!") && this._any(function() {
        return this._atomic(function() {
            return this._rule("sc", false, [], null, this["sc"]);
        });
    }) && (s0 = this._getIntermediate(), true) && this._rule("seq", false, [ "important" ], null, this["seq"]) && this._exec([ "important" ].concat(s0));
};

CSSParser.prototype["unary"] = function $unary() {
    var x;
    return (this._match("-") || this._match("+")) && (x = this._getIntermediate(), true) && this._exec([ "unary", x ]);
};

CSSParser.prototype["operator"] = function $operator() {
    var x;
    return (this._match("/") || this._match(",") || this._match(":") || this._match("=")) && (x = this._getIntermediate(), true) && this._exec([ "operator", x ]);
};

CSSParser.prototype["uri"] = function $uri() {
    return this._atomic(function() {
        var s0, x, s1;
        return this._rule("seq", false, [ "url(" ], null, this["seq"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._rule("string", false, [], null, this["string"]) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s1 = this._getIntermediate(), true) && this._match(")") && this._exec(CSSParser.concat([ "uri" ], s0, [ x ], s1));
    }) || this._atomic(function() {
        var s0, x, s1;
        return this._rule("seq", false, [ "url(" ], null, this["seq"]) && this._any(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            });
        }) && (s0 = this._getIntermediate(), true) && this._any(function() {
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
        }) && (s1 = this._getIntermediate(), true) && this._match(")") && this._exec(CSSParser.concat([ "uri" ], s0, [ [ "raw", x.join("") ] ], s1));
    });
};

CSSParser.prototype["value"] = function $value() {
    var x;
    return this._many(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("sc", false, [], null, this["sc"]);
            }) || this._atomic(function() {
                return this._rule("vhash", false, [], null, this["vhash"]);
            }) || this._atomic(function() {
                return this._rule("any", false, [], null, this["any"]);
            }) || this._atomic(function() {
                return this._rule("block", false, [], null, this["block"]);
            }) || this._atomic(function() {
                return this._rule("atkeyword", false, [], null, this["atkeyword"]);
            }) || this._atomic(function() {
                return this._rule("operator", false, [], null, this["operator"]);
            }) || this._atomic(function() {
                return this._rule("important", false, [], null, this["important"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(CSSParser.concat([ "value" ], x));
};

CSSParser.prototype["funktion"] = function $funktion() {
    var x, y;
    return this._rule("ident", false, [], null, this["ident"]) && (x = this._getIntermediate(), true) && this._match("(") && this._rule("functionBody", false, [], null, this["functionBody"]) && (y = this._getIntermediate(), true) && this._match(")") && this._exec([ "funktion", x, y ]);
};

CSSParser.prototype["functionBody"] = function $functionBody() {
    var x;
    return this._any(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("tset", false, [], null, this["tset"]);
            }) || this._atomic(function() {
                return this._rule("clazz", false, [], null, this["clazz"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec([ "functionBody" ].concat(x));
};

CSSParser.prototype["braces"] = function $braces() {
    return this._atomic(function() {
        var x;
        return this._match("(") && this._any(function() {
            return this._atomic(function() {
                return this._rule("tset", false, [], null, this["tset"]);
            });
        }) && (x = this._getIntermediate(), true) && this._match(")") && this._exec(CSSParser.concat([ "braces", "(", ")" ], x));
    }) || this._atomic(function() {
        var x;
        return this._match("[") && this._any(function() {
            return this._atomic(function() {
                return this._rule("tset", false, [], null, this["tset"]);
            });
        }) && (x = this._getIntermediate(), true) && this._match("]") && this._exec(CSSParser.concat([ "braces", "[", "]" ], x));
    });
};

CSSParser.prototype["jsLT"] = function $jsLT() {
    return this._match("\n") || this._match("\r");
};

CSSParser.prototype["jsComment"] = function $jsComment() {
    return this._atomic(function() {
        return this._rule("jsMLComment", false, [], null, this["jsMLComment"]);
    }) || this._atomic(function() {
        return this._rule("jsSLComment", false, [], null, this["jsSLComment"]);
    });
};

CSSParser.prototype["jsMLComment"] = function $jsMLComment() {
    var x;
    return this._seq("/*") && this._any(function() {
        return this._atomic(function() {
            return !this._atomic(function() {
                return this._seq("*/");
            }, true) && this._rule("char", false, [], null, this["char"]);
        });
    }) && (x = this._getIntermediate(), true) && this._seq("*/") && this._exec("/*" + x.join("") + "*/");
};

CSSParser.prototype["jsSLComment"] = function $jsSLComment() {
    var x;
    return this._seq("//") && this._any(function() {
        return this._atomic(function() {
            return !this._atomic(function() {
                return this._rule("jsLT", false, [], null, this["jsLT"]);
            }, true) && this._rule("char", false, [], null, this["char"]);
        });
    }) && (x = this._getIntermediate(), true) && this._exec("//" + x.join(""));
};

CSSParser.prototype["jsString"] = function $jsString() {
    return this._atomic(function() {
        var x;
        return this._match('"') && this._any(function() {
            return this._atomic(function() {
                return this._rule("jsDSChar", false, [], null, this["jsDSChar"]);
            });
        }) && (x = this._getIntermediate(), true) && this._match('"') && this._exec('"' + x.join("") + '"');
    }) || this._atomic(function() {
        var x;
        return this._match("'") && this._any(function() {
            return this._atomic(function() {
                return this._rule("jsSSChar", false, [], null, this["jsSSChar"]);
            });
        }) && (x = this._getIntermediate(), true) && this._match("'") && this._exec("'" + x.join("") + "'");
    });
};

CSSParser.prototype["jsDSChar"] = function $jsDSChar() {
    return this._atomic(function() {
        return !this._atomic(function() {
            return this._match('"');
        }, true) && !this._atomic(function() {
            return this._match("\\");
        }, true) && !this._atomic(function() {
            return this._rule("jsLT", false, [], null, this["jsLT"]);
        }, true) && this._rule("char", false, [], null, this["char"]);
    }) || this._atomic(function() {
        return this._rule("jsEscapeChar", false, [], null, this["jsEscapeChar"]);
    }) || this._atomic(function() {
        return this._rule("jsLineContinuation", false, [], null, this["jsLineContinuation"]);
    });
};

CSSParser.prototype["jsSSChar"] = function $jsSSChar() {
    return this._atomic(function() {
        return !this._atomic(function() {
            return this._match("'");
        }, true) && !this._atomic(function() {
            return this._match("\\");
        }, true) && !this._atomic(function() {
            return this._rule("jsLT", false, [], null, this["jsLT"]);
        }, true) && this._rule("char", false, [], null, this["char"]);
    }) || this._atomic(function() {
        return this._rule("jsEscapeChar", false, [], null, this["jsEscapeChar"]);
    }) || this._atomic(function() {
        return this._rule("jsLineContinuation", false, [], null, this["jsLineContinuation"]);
    });
};

CSSParser.prototype["jsLineContinuation"] = function $jsLineContinuation() {
    var x;
    return this._match("\\") && this._any(function() {
        return this._atomic(function() {
            return this._rule("jsLT", false, [], null, this["jsLT"]);
        });
    }) && (x = this._getIntermediate(), true) && this._exec("\\" + x.join(""));
};

CSSParser.prototype["jsEscapeChar"] = function $jsEscapeChar() {
    var x;
    return this._match("\\") && this._rule("char", false, [], null, this["char"]) && (x = this._getIntermediate(), true) && this._exec("\\" + x);
};

CSSParser.prototype["jsInBraceChar"] = function $jsInBraceChar() {
    var x;
    return !this._atomic(function() {
        return this._match("(");
    }, true) && !this._atomic(function() {
        return this._match(")");
    }, true) && this._rule("char", false, [], null, this["char"]) && (x = this._getIntermediate(), true) && this._exec(x);
};

CSSParser.prototype["jsBracesContent"] = function $jsBracesContent() {
    var x;
    return this._many(function() {
        return this._atomic(function() {
            return this._atomic(function() {
                return this._rule("jsComment", false, [], null, this["jsComment"]);
            }) || this._atomic(function() {
                return this._rule("jsString", false, [], null, this["jsString"]);
            }) || this._atomic(function() {
                return this._rule("jsEscapeChar", false, [], null, this["jsEscapeChar"]);
            }) || this._atomic(function() {
                return this._rule("jsInBraceChar", false, [], null, this["jsInBraceChar"]);
            });
        });
    }) && (x = this._getIntermediate(), true) && this._exec(x.join(""));
};

CSSParser.prototype["functionExpressionBody"] = function $functionExpressionBody() {
    var y, z;
    return this._atomic(function() {
        var x, xx;
        return this._match("(") && this._any(function() {
            return this._atomic(function() {
                return this._rule("jsBracesContent", false, [], null, this["jsBracesContent"]);
            });
        }) && (x = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("functionExpressionBody", false, [], null, this["functionExpressionBody"]) && (y = this._getIntermediate(), true) && this._any(function() {
                    return this._atomic(function() {
                        return this._rule("jsBracesContent", false, [], null, this["jsBracesContent"]);
                    });
                }) && (z = this._getIntermediate(), true) && this._exec(y + z.join(""));
            });
        }) && (xx = this._getIntermediate(), true) && this._match(")") && this._exec("(" + x.join("") + xx.join("") + ")");
    }) || this._atomic(function() {
        var x, y, z;
        return this._any(function() {
            return this._atomic(function() {
                return this._rule("jsBracesContent", false, [], null, this["jsBracesContent"]);
            });
        }) && (x = this._getIntermediate(), true) && this._rule("functionExpressionBody", false, [], null, this["functionExpressionBody"]) && (y = this._getIntermediate(), true) && this._any(function() {
            return this._atomic(function() {
                return this._rule("jsBracesContent", false, [], null, this["jsBracesContent"]);
            });
        }) && (z = this._getIntermediate(), true) && this._exec(x.join("") + y + z.join(""));
    }) || this._atomic(function() {
        var x;
        return this._many(function() {
            return this._atomic(function() {
                return this._rule("jsBracesContent", false, [], null, this["jsBracesContent"]);
            });
        }) && (x = this._getIntermediate(), true) && this._exec(x.join(""));
    });
};

CSSParser.prototype["functionExpression"] = function $functionExpression() {
    var x;
    return this._seq("expression(") && this._any(function() {
        return this._atomic(function() {
            return this._rule("functionExpressionBody", false, [], null, this["functionExpressionBody"]);
        });
    }) && (x = this._getIntermediate(), true) && this._match(")") && this._exec([ "functionExpression", x.join("") ]);
};

CSSParser.prototype["any"] = function $any() {
    return this._atomic(function() {
        return this._rule("braces", false, [], null, this["braces"]);
    }) || this._atomic(function() {
        return this._rule("string", false, [], null, this["string"]);
    }) || this._atomic(function() {
        return this._rule("percentage", false, [], null, this["percentage"]);
    }) || this._atomic(function() {
        return this._rule("dimension", false, [], null, this["dimension"]);
    }) || this._atomic(function() {
        return this._rule("number", false, [], null, this["number"]);
    }) || this._atomic(function() {
        return this._rule("uri", false, [], null, this["uri"]);
    }) || this._atomic(function() {
        return this._rule("functionExpression", false, [], null, this["functionExpression"]);
    }) || this._atomic(function() {
        return this._rule("funktion", false, [], null, this["funktion"]);
    }) || this._atomic(function() {
        return this._rule("ident", false, [], null, this["ident"]);
    }) || this._atomic(function() {
        return this._rule("unary", false, [], null, this["unary"]);
    });
};

CSSParser.concatContent = function(x, y) {
    y.forEach(function(e) {
        x = x.concat(e);
    });
    return x;
};

CSSParser.concat = function() {
    var x = [];
    for (var i in arguments) {
        x = x.concat(arguments[i]);
    }
    return x;
};

CSSParser._m_nmstart = function(x) {
    return /^[_a-zA-Z\*]+$/.test(x) || this._m_escape(x);
};

CSSParser._m_unicode = function(x) {
    return /^\\[0-9a-fA-F]{1,6}(\r\n|[ \n\r\t\f])?$/.test(x);
};

CSSParser._m_escape = function(x) {
    return this._m_unicode(x) || /^\\[^\n\r\f0-9a-fA-F]+$/.test(x);
};

CSSParser._m_nmchar = function(x) {
    return /^[_a-zA-Z0-9\-]+$/.test(x) || this._m_escape(x);
};

CSSParser._m_nmchar2 = function(x) {
    return /^[a-zA-Z0-9]+$/.test(x) || this._m_escape(x);
};

CSSParser._m_nl = function(x) {
    return /^[\n\r\f]+$/.test(x);
};

CSSParser._m_w = function(x) {
    return /^[ \t\r\n\f]+$/.test(x);
};
