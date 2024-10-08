! function(t, e, i) {
    var n = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = i(n) : "function" == typeof define && define.amd ? define(function() {
        return e[t] = i(n)
    }) : e[t] = i(n)
}("enquire", this, function(t) {
    "use strict";

    function e(t, e) {
        for (var i = 0, n = t.length; n > i && !1 !== e(t[i], i); i++);
    }

    function i(t) {
        return "function" == typeof t
    }

    function n(t) {
        this.options = t, !t.deferSetup && this.setup()
    }

    function o(e, i) {
        this.query = e, this.isUnconditional = i, this.handlers = [], this.mql = t(e);
        var n = this;
        this.listener = function(t) {
            n.mql = t, n.assess()
        }, this.mql.addListener(this.listener)
    }

    function r() {
        if (!t) throw new Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {}, this.browserIsIncapable = !t("only all").matches
    }
    return n.prototype = {
        setup: function() {
            this.options.setup && this.options.setup(), this.initialised = !0
        },
        on: function() {
            !this.initialised && this.setup(), this.options.match && this.options.match()
        },
        off: function() {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function(t) {
            return this.options === t || this.options.match === t
        }
    }, o.prototype = {
        addHandler: function(t) {
            var e = new n(t);
            this.handlers.push(e), this.matches() && e.on()
        },
        removeHandler: function(t) {
            var i = this.handlers;
            e(i, function(e, n) {
                return e.equals(t) ? (e.destroy(), !i.splice(n, 1)) : void 0
            })
        },
        matches: function() {
            return this.mql.matches || this.isUnconditional
        },
        clear: function() {
            e(this.handlers, function(t) {
                t.destroy()
            }), this.mql.removeListener(this.listener), this.handlers.length = 0
        },
        assess: function() {
            var t = this.matches() ? "on" : "off";
            e(this.handlers, function(e) {
                e[t]()
            })
        }
    }, r.prototype = {
        register: function(t, n, r) {
            var s = this.queries,
                a = r && this.browserIsIncapable;
            return s[t] || (s[t] = new o(t, a)), i(n) && (n = {
                    match: n
                }),
                function(t) {
                    return "[object Array]" === Object.prototype.toString.apply(t)
                }(n) || (n = [n]), e(n, function(e) {
                    i(e) && (e = {
                        match: e
                    }), s[t].addHandler(e)
                }), this
        },
        unregister: function(t, e) {
            var i = this.queries[t];
            return i && (e ? i.removeHandler(e) : (i.clear(), delete this.queries[t])), this
        }
    }, new r
}),
function(t) {
    var e = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    t.zoom = function(e, i, n, o) {
        var r, s, a, l, c, d, u, p = t(e),
            f = p.css("position"),
            h = t(i);
        return p.css("position", /(absolute|fixed)/.test(f) ? f : "relative"), p.css("overflow", "hidden"), n.style.width = n.style.height = "", t(n).addClass("zoomImg").css({
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0,
            width: n.width * o,
            height: n.height * o,
            border: "none",
            maxWidth: "none",
            maxHeight: "none"
        }).appendTo(e), {
            init: function() {
                s = p.outerWidth(), r = p.outerHeight(), i === p[0] ? (l = s, a = r) : (l = h.outerWidth(), a = h.outerHeight()), c = (n.width - s) / l, d = (n.height - r) / a, u = h.offset()
            },
            move: function(t) {
                var e = t.pageX - u.left,
                    i = t.pageY - u.top;
                i = Math.max(Math.min(i, a), 0), e = Math.max(Math.min(e, l), 0), n.style.left = e * -c + "px", n.style.top = i * -d + "px"
            }
        }
    }, t.fn.zoom = function(i) {
        return this.each(function() {
            var n, o = t.extend({}, e, i || {}),
                r = o.target || this,
                s = this,
                a = t(s),
                l = t(r),
                c = document.createElement("img"),
                d = t(c),
                u = "mousemove.zoom",
                p = !1,
                f = !1;
            (o.url || ((n = a.find("img"))[0] && (o.url = n.data("src") || n.attr("src")), o.url)) && (function() {
                var t = l.css("position"),
                    e = l.css("overflow");
                a.one("zoom.destroy", function() {
                    a.off(".zoom"), l.css("position", t), l.css("overflow", e), d.remove()
                })
            }(), c.onload = function() {
                function e(e) {
                    n.init(), n.move(e), d.stop().fadeTo(t.support.opacity ? o.duration : 0, 1, !!t.isFunction(o.onZoomIn) && o.onZoomIn.call(c))
                }

                function i() {
                    d.stop().fadeTo(o.duration, 0, !!t.isFunction(o.onZoomOut) && o.onZoomOut.call(c))
                }
                var n = t.zoom(r, s, c, o.magnify);
                "grab" === o.on ? a.on("mousedown.zoom", function(o) {
                    1 === o.which && (t(document).one("mouseup.zoom", function() {
                        i(), t(document).off(u, n.move)
                    }), e(o), t(document).on(u, n.move), o.preventDefault())
                }) : "click" === o.on ? a.on("click.zoom", function(o) {
                    return p ? void 0 : (p = !0, e(o), t(document).on(u, n.move), t(document).one("click.zoom", function() {
                        i(), p = !1, t(document).off(u, n.move)
                    }), !1)
                }) : "toggle" === o.on ? a.on("click.zoom", function(t) {
                    p ? i() : e(t), p = !p
                }) : "mouseover" === o.on && (n.init(), a.on("mouseenter.zoom", e).on("mouseleave.zoom", i).on(u, n.move)), o.touch && a.on("touchstart.zoom", function(t) {
                    t.preventDefault(), f ? (f = !1, i()) : (f = !0, e(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0]))
                }).on("touchmove.zoom", function(t) {
                    t.preventDefault(), n.move(t.originalEvent.touches[0] || t.originalEvent.changedTouches[0])
                }).on("touchend.zoom", function(t) {
                    t.preventDefault(), f && (f = !1, i())
                }), t.isFunction(o.callback) && o.callback.call(c)
            }, c.src = o.url)
        })
    }, t.fn.zoom.defaults = e
}(window.jQuery),
function() {
    function t(t, e) {
        for (var i = -1, n = e.length, o = t.length; ++i < n;) t[o + i] = e[i];
        return t
    }

    function e(t, e, i) {
        for (var n = -1, o = t.length; ++n < o;) {
            var r = t[n],
                s = e(r);
            if (null != s && (a === X ? s == s : i(s, a))) var a = s,
                l = r
        }
        return l
    }

    function i(t) {
        return t && t.Object === Object ? t : null
    }

    function n(t) {
        return et[t]
    }

    function o(t) {
        var e = !1;
        if (null != t && "function" != typeof t.toString) try {
            e = !!(t + "")
        } catch (t) {}
        return e
    }

    function r(t, e) {
        return (t = "number" == typeof t || tt.test(t) ? +t : -1) > -1 && 0 == t % 1 && (null == e ? 9007199254740991 : e) > t
    }

    function s(t) {
        if (z(t) && !Dt(t)) {
            if (t instanceof a) return t;
            if (pt.call(t, "__wrapped__")) {
                var e = new a(t.__wrapped__, t.__chain__);
                return e.__actions__ = T(t.__actions__), e
            }
        }
        return new a(t)
    }

    function a(t, e) {
        this.__wrapped__ = t, this.__actions__ = [], this.__chain__ = !!e
    }

    function l(t, e, i, n) {
        var o;
        return (o = t === X) || (o = (t === (o = ut[i]) || t != t && o != o) && !pt.call(n, i)), o ? e : t
    }

    function c(t) {
        return R(t) ? _t(t) : {}
    }

    function d(t, e, i) {
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return setTimeout(function() {
            t.apply(X, i)
        }, e)
    }

    function u(t, e) {
        var i = [];
        return St(t, function(t, n, o) {
            e(t, n, o) && i.push(t)
        }), i
    }

    function p(e, i, n, o) {
        o || (o = []);
        for (var r = -1, s = e.length; ++r < s;) {
            var a = e[r];
            i > 0 && z(a) && H(a) && (n || Dt(a) || L(a)) ? i > 1 ? p(a, i - 1, n, o) : t(o, a) : n || (o[o.length] = a)
        }
        return o
    }

    function f(t, e) {
        return t && kt(t, e, K)
    }

    function h(t, e) {
        return u(e, function(e) {
            return M(t[e])
        })
    }

    function g(t, e, i, n, r) {
        return t === e || (null == t || null == e || !R(t) && !z(e) ? t != t && e != e : function(t, e, i, n, r, s) {
            var a = Dt(t),
                l = Dt(e),
                c = "[object Array]",
                d = "[object Array]";
            a || "[object Arguments]" == (c = ht.call(t)) && (c = "[object Object]"), l || "[object Arguments]" == (d = ht.call(e)) && (d = "[object Object]");
            var u = "[object Object]" == c && !o(t),
                l = "[object Object]" == d && !o(e);
            return !(d = c == d) || a || u ? 2 & r || (c = u && pt.call(t, "__wrapped__"), l = l && pt.call(e, "__wrapped__"), !c && !l) ? !!d && (s || (s = []), (c = D(s, function(e) {
                return e[0] === t
            })) && c[1] ? c[1] == e : (s.push([t, e]), e = (a ? function(t, e, i, n, o, r) {
                var s = -1,
                    a = 1 & o,
                    l = t.length,
                    c = e.length;
                if (l != c && !(2 & o && c > l)) return !1;
                for (c = !0; ++s < l;) {
                    var d = t[s],
                        u = e[s];
                    if (void 0 !== X) {
                        c = !1;
                        break
                    }
                    if (a) {
                        if (!S(e, function(t) {
                                return d === t || i(d, t, n, o, r)
                            })) {
                            c = !1;
                            break
                        }
                    } else if (d !== u && !i(d, u, n, o, r)) {
                        c = !1;
                        break
                    }
                }
                return c
            } : function(t, e, i, n, o, r) {
                var s = 2 & o,
                    a = K(t),
                    l = a.length,
                    c = K(e).length;
                if (l != c && !s) return !1;
                for (var d = l; d--;) {
                    var u = a[d];
                    if (!(s ? u in e : pt.call(e, u))) return !1
                }
                for (c = !0; ++d < l;) {
                    var u = a[d],
                        p = t[u],
                        f = e[u];
                    if (void 0 !== X || p !== f && !i(p, f, n, o, r)) {
                        c = !1;
                        break
                    }
                    s || (s = "constructor" == u)
                }
                return c && !s && (i = t.constructor, n = e.constructor, i != n && "constructor" in t && "constructor" in e && !("function" == typeof i && i instanceof i && "function" == typeof n && n instanceof n) && (c = !1)), c
            })(t, e, i, n, r, s), s.pop(), e)) : i(c ? t.value() : t, l ? e.value() : e, n, r, s) : function(t, e, i) {
                switch (i) {
                    case "[object Boolean]":
                    case "[object Date]":
                        return +t == +e;
                    case "[object Error]":
                        return t.name == e.name && t.message == e.message;
                    case "[object Number]":
                        return t != +t ? e != +e : t == +e;
                    case "[object RegExp]":
                    case "[object String]":
                        return t == e + ""
                }
                return !1
            }(t, e, c)
        }(t, e, g, i, n, r))
    }

    function m(t) {
        var e = typeof t;
        return "function" == e ? t : null == t ? Q : ("object" == e ? y : w)(t)
    }

    function v(t) {
        t = null == t ? t : Object(t);
        var e, i = [];
        for (e in t) i.push(e);
        return i
    }

    function _(t, e) {
        var i = -1,
            n = H(t) ? Array(t.length) : [];
        return St(t, function(t, o, r) {
            n[++i] = e(t, o, r)
        }), n
    }

    function y(t) {
        var e = K(t);
        return function(i) {
            var n = e.length;
            if (null == i) return !n;
            for (i = Object(i); n--;) {
                var o = e[n];
                if (!(o in i && g(t[o], i[o], X, 3))) return !1
            }
            return !0
        }
    }

    function w(t) {
        return function(e) {
            return null == e ? X : e[t]
        }
    }

    function b(t, e, i) {
        var n = -1,
            o = t.length;
        for (0 > e && (e = -e > o ? 0 : o + e), 0 > (i = i > o ? o : i) && (i += o), o = e > i ? 0 : i - e >>> 0, e >>>= 0, i = Array(o); ++n < o;) i[n] = t[n + e];
        return i
    }

    function T(t) {
        return b(t, 0, t.length)
    }

    function S(t, e) {
        var i;
        return St(t, function(t, n, o) {
            return !(i = e(t, n, o))
        }), !!i
    }

    function k(t, e, i, n) {
        i || (i = {});
        for (var o = -1, r = e.length; ++o < r;) {
            var s = e[o],
                a = n ? n(i[s], t[s], s, i, t) : t[s],
                l = i,
                c = l[s];
            pt.call(l, s) && (c === a || c != c && a != a) && (a !== X || s in l) || (l[s] = a)
        }
        return i
    }

    function C(t) {
        return j(function(e, i) {
            var n = -1,
                o = i.length,
                r = "function" == typeof(r = o > 1 ? i[o - 1] : X) ? (o--, r) : X;
            for (e = Object(e); ++n < o;) {
                var s = i[n];
                s && t(e, s, n, r)
            }
            return e
        })
    }

    function E(t, e, i) {
        if ("function" != typeof t) throw new TypeError("Expected a function");
        var n = function(t) {
            return function() {
                var e = arguments,
                    i = c(t.prototype);
                return R(e = t.apply(i, e)) ? e : i
            }
        }(t);
        return function o() {
            for (var r = -1, s = arguments.length, a = -1, l = i.length, c = Array(l + s), d = this && this !== ct && this instanceof o ? n : t; ++a < l;) c[a] = i[a];
            for (; s--;) c[a++] = arguments[++r];
            return d.apply(e, c)
        }
    }

    function A(t) {
        var e = t ? t.length : X;
        if (W(e) && (Dt(t) || F(t) || L(t))) {
            t = String;
            for (var i = -1, n = Array(e); ++i < e;) n[i] = t(i);
            e = n
        } else e = null;
        return e
    }

    function I(t) {
        var e;
        return t === (e = M(e = t && t.constructor) && e.prototype || ut)
    }

    function O(t) {
        return t ? t[0] : X
    }

    function D(t, e) {
        return function(t, e, i) {
            var n;
            return i(t, function(t, i, o) {
                return e(t, i, o) ? (n = t, !1) : void 0
            }), n
        }(t, m(e), St)
    }

    function x(t, e) {
        return St(t, "function" == typeof e ? e : Q)
    }

    function $(t, e, i) {
        return function(t, e, i, n, o) {
            return o(t, function(t, o, r) {
                i = n ? (n = !1, t) : e(i, t, o, r)
            }), i
        }(t, m(e), i, 3 > arguments.length, St)
    }

    function N(t, e) {
        var i;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return t = xt(t),
            function() {
                return 0 < --t && (i = e.apply(this, arguments)), 1 >= t && (e = X), i
            }
    }

    function j(t) {
        var e;
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return e = Tt(e === X ? t.length - 1 : xt(e), 0),
            function() {
                for (var i = arguments, n = -1, o = Tt(i.length - e, 0), r = Array(o); ++n < o;) r[n] = i[e + n];
                for (o = Array(e + 1), n = -1; ++n < e;) o[n] = i[n];
                return o[e] = r, t.apply(this, o)
            }
    }

    function P(t, e) {
        return t > e
    }

    function L(t) {
        return z(t) && H(t) && pt.call(t, "callee") && (!yt.call(t, "callee") || "[object Arguments]" == ht.call(t))
    }

    function H(t) {
        return null != t && !("function" == typeof t && M(t)) && W(Ct(t))
    }

    function M(t) {
        return "[object Function]" == (t = R(t) ? ht.call(t) : "") || "[object GeneratorFunction]" == t
    }

    function W(t) {
        return "number" == typeof t && t > -1 && 0 == t % 1 && 9007199254740991 >= t
    }

    function R(t) {
        var e = typeof t;
        return !!t && ("object" == e || "function" == e)
    }

    function z(t) {
        return !!t && "object" == typeof t
    }

    function U(t) {
        return "number" == typeof t || z(t) && "[object Number]" == ht.call(t)
    }

    function F(t) {
        return "string" == typeof t || !Dt(t) && z(t) && "[object String]" == ht.call(t)
    }

    function B(t, e) {
        return e > t
    }

    function q(t) {
        return "string" == typeof t ? t : null == t ? "" : t + ""
    }

    function K(t) {
        var e = I(t);
        if (!e && !H(t)) return bt(Object(t));
        var i, n, o = !!(n = A(t)),
            s = (n = n || []).length;
        for (i in t) !pt.call(t, i) || o && ("length" == i || r(i, s)) || e && "constructor" == i || n.push(i);
        return n
    }

    function V(t) {
        for (var e, i = -1, n = I(t), o = v(t), s = o.length, a = !!(e = A(t)), l = (e = e || []).length; ++i < s;) {
            var c = o[i];
            a && ("length" == c || r(c, l)) || "constructor" == c && (n || !pt.call(t, c)) || e.push(c)
        }
        return e
    }

    function Y(t) {
        return t ? function(t, e) {
            return _(e, function(e) {
                return t[e]
            })
        }(t, K(t)) : []
    }

    function Q(t) {
        return t
    }

    function G(e, i, n) {
        var o = K(i),
            r = h(i, o);
        null != n || R(i) && (r.length || !o.length) || (n = i, i = e, e = this, r = h(i, K(i)));
        var s = !(R(n) && "chain" in n) || n.chain,
            a = M(e);
        return St(r, function(n) {
            var o = i[n];
            e[n] = o, a && (e.prototype[n] = function() {
                var i = this.__chain__;
                if (s || i) {
                    var n = e(this.__wrapped__);
                    return (n.__actions__ = T(this.__actions__)).push({
                        func: o,
                        args: arguments,
                        thisArg: e
                    }), n.__chain__ = i, n
                }
                return o.apply(e, t([this.value()], arguments))
            })
        }), e
    }
    var X, Z = /[&<>"'`]/g,
        J = RegExp(Z.source),
        tt = /^(?:0|[1-9]\d*)$/,
        et = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;"
        },
        it = {
            function: !0,
            object: !0
        },
        nt = it[typeof exports] && exports && !exports.nodeType ? exports : X,
        ot = it[typeof module] && module && !module.nodeType ? module : X,
        rt = ot && ot.exports === nt ? nt : X,
        st = i(it[typeof self] && self),
        at = i(it[typeof window] && window),
        lt = i(it[typeof this] && this),
        ct = i(nt && ot && "object" == typeof global && global) || at !== (lt && lt.window) && at || st || lt || Function("return this")(),
        dt = Array.prototype,
        ut = Object.prototype,
        pt = ut.hasOwnProperty,
        ft = 0,
        ht = ut.toString,
        gt = ct._,
        mt = ct.Reflect,
        vt = mt ? mt.f : X,
        _t = Object.create,
        yt = ut.propertyIsEnumerable,
        wt = ct.isFinite,
        bt = Object.keys,
        Tt = Math.max,
        St = function(t, e) {
            return function(e, i) {
                if (null == e) return e;
                if (!H(e)) return t(e, i);
                for (var n = e.length, o = -1, r = Object(e); ++o < n && !1 !== i(r[o], o, r););
                return e
            }
        }(f),
        kt = function(t, e, i) {
            for (var n = -1, o = Object(t), r = (i = i(t)).length; r--;) {
                var s = i[++n];
                if (!1 === e(o[s], s, o)) break
            }
            return t
        };
    vt && !yt.call({
        valueOf: 1
    }, "valueOf") && (v = function(t) {
        t = vt(t);
        for (var e, i = []; !(e = t.next()).done;) i.push(e.value);
        return i
    });
    var Ct = w("length"),
        Et = j(function(e, i) {
            return Dt(e) || (e = null == e ? [] : [Object(e)]), p(i, 1), t(T(e), Y)
        }),
        At = j(function(t, e, i) {
            return E(t, e, i)
        }),
        It = j(function(t, e) {
            return d(t, 1, e)
        }),
        Ot = j(function(t, e, i) {
            return d(t, $t(e) || 0, i)
        }),
        Dt = Array.isArray,
        xt = Number,
        $t = Number,
        Nt = C(function(t, e) {
            k(e, K(e), t)
        }),
        jt = C(function(t, e) {
            k(e, V(e), t)
        }),
        Pt = C(function(t, e, i, n) {
            k(e, V(e), t, n)
        }),
        Lt = j(function(t) {
            return t.push(X, l), Pt.apply(X, t)
        }),
        Ht = j(function(t, e) {
            return null == t ? {} : function(t, e) {
                return t = Object(t), $(e, function(e, i) {
                    return i in t && (e[i] = t[i]), e
                }, {})
            }(t, p(e, 1))
        }),
        Mt = m;
    a.prototype = c(s.prototype), a.prototype.constructor = a, s.assignIn = jt, s.before = N, s.bind = At, s.chain = function(t) {
        return (t = s(t)).__chain__ = !0, t
    }, s.compact = function(t) {
        return u(t, Boolean)
    }, s.concat = Et, s.create = function(t, e) {
        var i = c(t);
        return e ? Nt(i, e) : i
    }, s.defaults = Lt, s.defer = It, s.delay = Ot, s.filter = function(t, e) {
        return u(t, m(e))
    }, s.flatten = function(t) {
        return t && t.length ? p(t, 1) : []
    }, s.flattenDeep = function(t) {
        return t && t.length ? p(t, 1 / 0) : []
    }, s.iteratee = Mt, s.keys = K, s.map = function(t, e) {
        return _(t, m(e))
    }, s.matches = function(t) {
        return y(Nt({}, t))
    }, s.mixin = G, s.negate = function(t) {
        if ("function" != typeof t) throw new TypeError("Expected a function");
        return function() {
            return !t.apply(this, arguments)
        }
    }, s.once = function(t) {
        return N(2, t)
    }, s.pick = Ht, s.slice = function(t, e, i) {
        var n = t ? t.length : 0;
        return i = i === X ? n : +i, n ? b(t, null == e ? 0 : +e, i) : []
    }, s.sortBy = function(t, e) {
        var i = 0;
        return e = m(e), _(_(t, function(t, n, o) {
            return {
                c: t,
                b: i++,
                a: e(t, n, o)
            }
        }).sort(function(t, e) {
            var i;
            t: {
                i = t.a;
                var n = e.a;
                if (i !== n) {
                    var o = null === i,
                        r = i === X,
                        s = i == i,
                        a = null === n,
                        l = n === X,
                        c = n == n;
                    if (i > n && !a || !s || o && !l && c || r && c) {
                        i = 1;
                        break t
                    }
                    if (n > i && !o || !c || a && !r && s || l && s) {
                        i = -1;
                        break t
                    }
                }
                i = 0
            }
            return i || t.b - e.b
        }), w("c"))
    }, s.tap = function(t, e) {
        return e(t), t
    }, s.thru = function(t, e) {
        return e(t)
    }, s.toArray = function(t) {
        return H(t) ? t.length ? T(t) : [] : Y(t)
    }, s.values = Y, s.extend = jt, G(s, s), s.clone = function(t) {
        return R(t) ? Dt(t) ? T(t) : k(t, K(t)) : t
    }, s.escape = function(t) {
        return (t = q(t)) && J.test(t) ? t.replace(Z, n) : t
    }, s.every = function(t, e, i) {
        return function(t, e) {
            var i = !0;
            return St(t, function(t, n, o) {
                return i = !!e(t, n, o)
            }), i
        }(t, m(e = i ? X : e))
    }, s.find = D, s.forEach = x, s.has = function(t, e) {
        return null != t && pt.call(t, e)
    }, s.head = O, s.identity = Q, s.indexOf = function(t, e, i) {
        var n = t ? t.length : 0;
        i = ((i = "number" == typeof i ? 0 > i ? Tt(n + i, 0) : i : 0) || 0) - 1;
        for (var o = e == e; ++i < n;) {
            var r = t[i];
            if (o ? r === e : r != r) return i
        }
        return -1
    }, s.isArguments = L, s.isArray = Dt, s.isBoolean = function(t) {
        return !0 === t || !1 === t || z(t) && "[object Boolean]" == ht.call(t)
    }, s.isDate = function(t) {
        return z(t) && "[object Date]" == ht.call(t)
    }, s.isEmpty = function(t) {
        if (H(t) && (Dt(t) || F(t) || M(t.splice) || L(t))) return !t.length;
        for (var e in t)
            if (pt.call(t, e)) return !1;
        return !0
    }, s.isEqual = function(t, e) {
        return g(t, e)
    }, s.isFinite = function(t) {
        return "number" == typeof t && wt(t)
    }, s.isFunction = M, s.isNaN = function(t) {
        return U(t) && t != +t
    }, s.isNull = function(t) {
        return null === t
    }, s.isNumber = U, s.isObject = R, s.isRegExp = function(t) {
        return R(t) && "[object RegExp]" == ht.call(t)
    }, s.isString = F, s.isUndefined = function(t) {
        return t === X
    }, s.last = function(t) {
        var e = t ? t.length : 0;
        return e ? t[e - 1] : X
    }, s.max = function(t) {
        return t && t.length ? e(t, Q, P) : X
    }, s.min = function(t) {
        return t && t.length ? e(t, Q, B) : X
    }, s.noConflict = function() {
        return ct._ === this && (ct._ = gt), this
    }, s.noop = function() {}, s.reduce = $, s.result = function(t, e, i) {
        return (e = null == t ? X : t[e]) === X && (e = i), M(e) ? e.call(t) : e
    }, s.size = function(t) {
        return null == t ? 0 : (t = H(t) ? t : K(t)).length
    }, s.some = function(t, e, i) {
        return S(t, m(e = i ? X : e))
    }, s.uniqueId = function(t) {
        var e = ++ft;
        return q(t) + e
    }, s.each = x, s.first = O, G(s, function() {
        var t = {};
        return f(s, function(e, i) {
            pt.call(s.prototype, i) || (t[i] = e)
        }), t
    }(), {
        chain: !1
    }), s.VERSION = "4.5.1", St("pop join replace reverse split push shift sort splice unshift".split(" "), function(t) {
        var e = (/^(?:replace|split)$/.test(t) ? String.prototype : dt)[t],
            i = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
            n = /^(?:pop|join|replace|shift)$/.test(t);
        s.prototype[t] = function() {
            var t = arguments;
            return n && !this.__chain__ ? e.apply(this.value(), t) : this[i](function(i) {
                return e.apply(i, t)
            })
        }
    }), s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = function() {
        return e = this.__wrapped__, $(this.__actions__, function(e, i) {
            return i.func.apply(i.thisArg, t([e], i.args))
        }, e);
        var e
    }, (at || st || {})._ = s, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return s
    }) : nt && ot ? (rt && ((ot.exports = s)._ = s), nt._ = s) : ct._ = s
}.call(this), window.mobileCheck = function() {
        var t, e = !1;
        return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
    },
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function(t) {
        "use strict";
        var e = window.Slick || {};
        (e = function() {
            var e = 0;
            return function(i, n) {
                var o, r = this;
                r.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: t(i),
                    appendDots: t(i),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, i) {
                        return t('<button type="button" />').text(i + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, r.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, t.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = t(i), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = t(i).data("slick") || {}, r.options = t.extend({}, r.defaults, n, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, void 0 !== document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = t.proxy(r.autoPlay, r), r.autoPlayClear = t.proxy(r.autoPlayClear, r), r.autoPlayIterator = t.proxy(r.autoPlayIterator, r), r.changeSlide = t.proxy(r.changeSlide, r), r.clickHandler = t.proxy(r.clickHandler, r), r.selectHandler = t.proxy(r.selectHandler, r), r.setPosition = t.proxy(r.setPosition, r), r.swipeHandler = t.proxy(r.swipeHandler, r), r.dragHandler = t.proxy(r.dragHandler, r), r.keyHandler = t.proxy(r.keyHandler, r), r.instanceUid = e++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
            }
        }()).prototype.activateADA = function() {
            this.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, e.prototype.addSlide = e.prototype.slickAdd = function(e, i, n) {
            var o = this;
            if ("boolean" == typeof i) n = i, i = null;
            else if (i < 0 || i >= o.slideCount) return !1;
            o.unload(), "number" == typeof i ? 0 === i && 0 === o.$slides.length ? t(e).appendTo(o.$slideTrack) : n ? t(e).insertBefore(o.$slides.eq(i)) : t(e).insertAfter(o.$slides.eq(i)) : !0 === n ? t(e).prependTo(o.$slideTrack) : t(e).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(e, i) {
                t(i).attr("data-slick-index", e)
            }), o.$slidesCache = o.$slides, o.reinit()
        }, e.prototype.animateHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.animate({
                    height: e
                }, t.options.speed)
            }
        }, e.prototype.animateSlide = function(e, i) {
            var n = {},
                o = this;
            o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (e = -e), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                left: e
            }, o.options.speed, o.options.easing, i) : o.$slideTrack.animate({
                top: e
            }, o.options.speed, o.options.easing, i) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), t({
                animStart: o.currentLeft
            }).animate({
                animStart: e
            }, {
                duration: o.options.speed,
                easing: o.options.easing,
                step: function(t) {
                    t = Math.ceil(t), !1 === o.options.vertical ? (n[o.animType] = "translate(" + t + "px, 0px)", o.$slideTrack.css(n)) : (n[o.animType] = "translate(0px," + t + "px)", o.$slideTrack.css(n))
                },
                complete: function() {
                    i && i.call()
                }
            })) : (o.applyTransition(), e = Math.ceil(e), !1 === o.options.vertical ? n[o.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[o.animType] = "translate3d(0px," + e + "px, 0px)", o.$slideTrack.css(n), i && setTimeout(function() {
                o.disableTransition(), i.call()
            }, o.options.speed))
        }, e.prototype.getNavTarget = function() {
            var e = this.options.asNavFor;
            return e && null !== e && (e = t(e).not(this.$slider)), e
        }, e.prototype.asNavFor = function(e) {
            var i = this.getNavTarget();
            null !== i && "object" == typeof i && i.each(function() {
                var i = t(this).slick("getSlick");
                i.unslicked || i.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function(t) {
            var e = this,
                i = {};
            !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
        }, e.prototype.autoPlay = function() {
            var t = this;
            t.autoPlayClear(), t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function() {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function() {
            var t = this,
                e = t.currentSlide + t.options.slidesToScroll;
            t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
        }, e.prototype.buildArrows = function() {
            var e = this;
            !0 === e.options.arrows && (e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, e.prototype.buildDots = function() {
            var e, i, n = this;
            if (!0 === n.options.dots) {
                for (n.$slider.addClass("slick-dotted"), i = t("<ul />").addClass(n.options.dotsClass), e = 0; e <= n.getDotCount(); e += 1) i.append(t("<li />").append(n.options.customPaging.call(this, n, e)));
                n.$dots = i.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
            }
        }, e.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, i) {
                t(i).attr("data-slick-index", e).data("originalStyling", t(i).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? t('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function() {
            var t, e, i, n, o, r, s, a = this;
            if (n = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 1) {
                for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), t = 0; t < o; t++) {
                    var l = document.createElement("div");
                    for (e = 0; e < a.options.rows; e++) {
                        var c = document.createElement("div");
                        for (i = 0; i < a.options.slidesPerRow; i++) {
                            var d = t * s + (e * a.options.slidesPerRow + i);
                            r.get(d) && c.appendChild(r.get(d))
                        }
                        l.appendChild(c)
                    }
                    n.appendChild(l)
                }
                a.$slider.empty().append(n), a.$slider.children().children().children().css({
                    width: 100 / a.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, e.prototype.checkResponsive = function(e, i) {
            var n, o, r, s = this,
                a = !1,
                l = s.$slider.width(),
                c = window.innerWidth || t(window).width();
            if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
                for (n in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(n) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[n] && (o = s.breakpoints[n]) : r > s.breakpoints[n] && (o = s.breakpoints[n]));
                null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || i) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = t.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = t.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === e && (s.currentSlide = s.options.initialSlide), s.refresh(e), a = o), e || !1 === a || s.$slider.trigger("breakpoint", [s, a])
            }
        }, e.prototype.changeSlide = function(e, i) {
            var n, o, r = this,
                s = t(e.currentTarget);
            switch (s.is("a") && e.preventDefault(), s.is("li") || (s = s.closest("li")), n = r.slideCount % r.options.slidesToScroll != 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
                case "previous":
                    o = 0 === n ? r.options.slidesToScroll : r.options.slidesToShow - n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                    break;
                case "next":
                    o = 0 === n ? r.options.slidesToScroll : n, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                    break;
                case "index":
                    var a = 0 === e.data.index ? 0 : e.data.index || s.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(a), !1, i), s.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function(t) {
            var e, i;
            if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
            else
                for (var n in e) {
                    if (t < e[n]) {
                        t = i;
                        break
                    }
                    i = e[n]
                }
            return t
        }, e.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && (t("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", t.proxy(e.interrupt, e, !0)).off("mouseleave.slick", t.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), t(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().off("click.slick", e.selectHandler), t(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), t(window).off("resize.slick.slick-" + e.instanceUid, e.resize), t("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1))
        }, e.prototype.cleanUpRows = function() {
            var t, e = this;
            e.options.rows > 1 && ((t = e.$slides.children().children()).removeAttr("style"), e.$slider.empty().append(t))
        }, e.prototype.clickHandler = function(t) {
            !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
        }, e.prototype.destroy = function(e) {
            var i = this;
            i.autoPlayClear(), i.touchObject = {}, i.cleanUpEvents(), t(".slick-cloned", i.$slider).detach(), i.$dots && i.$dots.remove(), i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()), i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()), i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                t(this).attr("style", t(this).data("originalStyling"))
            }), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides)), i.cleanUpRows(), i.$slider.removeClass("slick-slider"), i.$slider.removeClass("slick-initialized"), i.$slider.removeClass("slick-dotted"), i.unslicked = !0, e || i.$slider.trigger("destroy", [i])
        }, e.prototype.disableTransition = function(t) {
            var e = this,
                i = {};
            i[e.transitionType] = "", !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
        }, e.prototype.fadeSlide = function(t, e) {
            var i = this;
            !1 === i.cssTransitions ? (i.$slides.eq(t).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(t).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), e && setTimeout(function() {
                i.disableTransition(t), e.call()
            }, i.options.speed))
        }, e.prototype.fadeSlideOut = function(t) {
            var e = this;
            !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }))
        }, e.prototype.filterSlides = e.prototype.slickFilter = function(t) {
            var e = this;
            null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.focusHandler = function() {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
                i.stopImmediatePropagation();
                var n = t(this);
                setTimeout(function() {
                    e.options.pauseOnFocus && (e.focussed = n.is(":focus"), e.autoPlay())
                }, 0)
            })
        }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
            return this.currentSlide
        }, e.prototype.getDotCount = function() {
            var t = this,
                e = 0,
                i = 0,
                n = 0;
            if (!0 === t.options.infinite)
                if (t.slideCount <= t.options.slidesToShow) ++n;
                else
                    for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else if (!0 === t.options.centerMode) n = t.slideCount;
            else if (t.options.asNavFor)
                for (; e < t.slideCount;) ++n, e = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
            else n = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
            return n - 1
        }, e.prototype.getLeft = function(t) {
            var e, i, n, o, r = this,
                s = 0;
            return r.slideOffset = 0, i = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = i * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && t + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (t > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (t - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (t - r.slideCount)) * i * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * i * -1))) : t + r.options.slidesToShow > r.slideCount && (r.slideOffset = (t + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (t + r.options.slidesToShow - r.slideCount) * i), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), e = !1 === r.options.vertical ? t * r.slideWidth * -1 + r.slideOffset : t * i * -1 + s, !0 === r.options.variableWidth && (n = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(t) : r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow), e = !0 === r.options.rtl ? n[0] ? -1 * (r.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, !0 === r.options.centerMode && (n = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(t) : r.$slideTrack.children(".slick-slide").eq(t + r.options.slidesToShow + 1), e = !0 === r.options.rtl ? n[0] ? -1 * (r.$slideTrack.width() - n[0].offsetLeft - n.width()) : 0 : n[0] ? -1 * n[0].offsetLeft : 0, e += (r.$list.width() - n.outerWidth()) / 2)), e
        }, e.prototype.getOption = e.prototype.slickGetOption = function(t) {
            return this.options[t]
        }, e.prototype.getNavigableIndexes = function() {
            var t, e = this,
                i = 0,
                n = 0,
                o = [];
            for (!1 === e.options.infinite ? t = e.slideCount : (i = -1 * e.options.slidesToScroll, n = -1 * e.options.slidesToScroll, t = 2 * e.slideCount); i < t;) o.push(i), i = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return o
        }, e.prototype.getSlick = function() {
            return this
        }, e.prototype.getSlideCount = function() {
            var e, i, n = this;
            return i = !0 === n.options.centerMode ? n.slideWidth * Math.floor(n.options.slidesToShow / 2) : 0, !0 === n.options.swipeToSlide ? (n.$slideTrack.find(".slick-slide").each(function(o, r) {
                if (r.offsetLeft - i + t(r).outerWidth() / 2 > -1 * n.swipeLeft) return e = r, !1
            }), Math.abs(t(e).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.slickGoTo = function(t, e) {
            this.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(t)
                }
            }, e)
        }, e.prototype.init = function(e) {
            var i = this;
            t(i.$slider).hasClass("slick-initialized") || (t(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()), e && i.$slider.trigger("init", [i]), !0 === i.options.accessibility && i.initADA(), i.options.autoplay && (i.paused = !1, i.autoPlay())
        }, e.prototype.initADA = function() {
            var e = this,
                i = Math.ceil(e.slideCount / e.options.slidesToShow),
                n = e.getNavigableIndexes().filter(function(t) {
                    return t >= 0 && t < e.slideCount
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(i) {
                var o = n.indexOf(i);
                t(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + e.instanceUid + i,
                    tabindex: -1
                }), -1 !== o && t(this).attr({
                    "aria-describedby": "slick-slide-control" + e.instanceUid + o
                })
            }), e.$dots.attr("role", "tablist").find("li").each(function(o) {
                var r = n[o];
                t(this).attr({
                    role: "presentation"
                }), t(this).find("button").first().attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + o,
                    "aria-controls": "slick-slide" + e.instanceUid + r,
                    "aria-label": o + 1 + " of " + i,
                    "aria-selected": null,
                    tabindex: "-1"
                })
            }).eq(e.currentSlide).find("button").attr({
                "aria-selected": "true",
                tabindex: "0"
            }).end());
            for (var o = e.currentSlide, r = o + e.options.slidesToShow; o < r; o++) e.$slides.eq(o).attr("tabindex", 0);
            e.activateADA()
        }, e.prototype.initArrowEvents = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
        }, e.prototype.initDotEvents = function() {
            var e = this;
            !0 === e.options.dots && (t("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && t("li", e.$dots).on("mouseenter.slick", t.proxy(e.interrupt, e, !0)).on("mouseleave.slick", t.proxy(e.interrupt, e, !1))
        }, e.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)))
        }, e.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), t(document).on(e.visibilityChange, t.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), t(window).on("orientationchange.slick.slick-" + e.instanceUid, t.proxy(e.orientationChange, e)), t(window).on("resize.slick.slick-" + e.instanceUid, t.proxy(e.resize, e)), t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), t(e.setPosition)
        }, e.prototype.initUI = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
        }, e.prototype.keyHandler = function(t) {
            var e = this;
            t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "next" : "previous"
                }
            }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                data: {
                    message: !0 === e.options.rtl ? "previous" : "next"
                }
            }))
        }, e.prototype.lazyLoad = function() {
            function e(e) {
                t("img[data-lazy]", e).each(function() {
                    var e = t(this),
                        i = t(this).attr("data-lazy"),
                        n = t(this).attr("data-srcset"),
                        o = t(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                        s = document.createElement("img");
                    s.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            n && (e.attr("srcset", n), o && e.attr("sizes", o)), e.attr("src", i).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                            }), r.$slider.trigger("lazyLoaded", [r, e, i])
                        })
                    }, s.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, i])
                    }, s.src = i
                })
            }
            var i, n, o, r = this;
            if (!0 === r.options.centerMode ? !0 === r.options.infinite ? o = (n = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (n = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), o = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (n = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, o = Math.ceil(n + r.options.slidesToShow), !0 === r.options.fade && (n > 0 && n--, o <= r.slideCount && o++)), i = r.$slider.find(".slick-slide").slice(n, o), "anticipated" === r.options.lazyLoad)
                for (var s = n - 1, a = o, l = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) s < 0 && (s = r.slideCount - 1), i = (i = i.add(l.eq(s))).add(l.eq(a)), s--, a++;
            e(i), r.slideCount <= r.options.slidesToShow ? e(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? e(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && e(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
        }, e.prototype.loadSlider = function() {
            var t = this;
            t.setPosition(), t.$slideTrack.css({
                opacity: 1
            }), t.$slider.removeClass("slick-loading"), t.initUI(), "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.slickNext = function() {
            this.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, e.prototype.orientationChange = function() {
            this.checkResponsive(), this.setPosition()
        }, e.prototype.pause = e.prototype.slickPause = function() {
            this.autoPlayClear(), this.paused = !0
        }, e.prototype.play = e.prototype.slickPlay = function() {
            var t = this;
            t.autoPlay(), t.options.autoplay = !0, t.paused = !1, t.focussed = !1, t.interrupted = !1
        }, e.prototype.postSlide = function(e) {
            var i = this;
            i.unslicked || (i.$slider.trigger("afterChange", [i, e]), i.animating = !1, i.slideCount > i.options.slidesToShow && i.setPosition(), i.swipeLeft = null, i.options.autoplay && i.autoPlay(), !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange && t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()))
        }, e.prototype.prev = e.prototype.slickPrev = function() {
            this.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, e.prototype.preventDefault = function(t) {
            t.preventDefault()
        }, e.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var i, n, o, r, s, a = this,
                l = t("img[data-lazy]", a.$slider);
            l.length ? (i = l.first(), n = i.attr("data-lazy"), o = i.attr("data-srcset"), r = i.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function() {
                o && (i.attr("srcset", o), r && i.attr("sizes", r)), i.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, i, n]), a.progressiveLazyLoad()
            }, s.onerror = function() {
                e < 3 ? setTimeout(function() {
                    a.progressiveLazyLoad(e + 1)
                }, 500) : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, i, n]), a.progressiveLazyLoad())
            }, s.src = n) : a.$slider.trigger("allImagesLoaded", [a])
        }, e.prototype.refresh = function(e) {
            var i, n, o = this;
            n = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > n && (o.currentSlide = n), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), i = o.currentSlide, o.destroy(!0), t.extend(o, o.initials, {
                currentSlide: i
            }), o.init(), e || o.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, e.prototype.registerBreakpoints = function() {
            var e, i, n, o = this,
                r = o.options.responsive || null;
            if ("array" === t.type(r) && r.length) {
                for (e in o.respondTo = o.options.respondTo || "window", r)
                    if (n = o.breakpoints.length - 1, r.hasOwnProperty(e)) {
                        for (i = r[e].breakpoint; n >= 0;) o.breakpoints[n] && o.breakpoints[n] === i && o.breakpoints.splice(n, 1), n--;
                        o.breakpoints.push(i), o.breakpointSettings[i] = r[e].settings
                    }
                o.breakpoints.sort(function(t, e) {
                    return o.options.mobileFirst ? t - e : e - t
                })
            }
        }, e.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && t(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, e.prototype.resize = function() {
            var e = this;
            t(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = t(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.slickRemove = function(t, e, i) {
            var n = this;
            if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : n.slideCount - 1 : !0 === e ? --t : t, n.slideCount < 1 || t < 0 || t > n.slideCount - 1) return !1;
            n.unload(), !0 === i ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(t).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, n.reinit()
        }, e.prototype.setCSS = function(t) {
            var e, i, n = this,
                o = {};
            !0 === n.options.rtl && (t = -t), e = "left" == n.positionProp ? Math.ceil(t) + "px" : "0px", i = "top" == n.positionProp ? Math.ceil(t) + "px" : "0px", o[n.positionProp] = t, !1 === n.transformsEnabled ? n.$slideTrack.css(o) : (o = {}, !1 === n.cssTransitions ? (o[n.animType] = "translate(" + e + ", " + i + ")", n.$slideTrack.css(o)) : (o[n.animType] = "translate3d(" + e + ", " + i + ", 0px)", n.$slideTrack.css(o)))
        }, e.prototype.setDimensions = function() {
            var t = this;
            !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                padding: "0px " + t.options.centerPadding
            }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
                padding: t.options.centerPadding + " 0px"
            })), t.listWidth = t.$list.width(), t.listHeight = t.$list.height(), !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
            var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
            !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
        }, e.prototype.setFade = function() {
            var e, i = this;
            i.$slides.each(function(n, o) {
                e = i.slideWidth * n * -1, !0 === i.options.rtl ? t(o).css({
                    position: "relative",
                    right: e,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                }) : t(o).css({
                    position: "relative",
                    left: e,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0
                })
            }), i.$slides.eq(i.currentSlide).css({
                zIndex: i.options.zIndex - 1,
                opacity: 1
            })
        }, e.prototype.setHeight = function() {
            var t = this;
            if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                t.$list.css("height", e)
            }
        }, e.prototype.setOption = e.prototype.slickSetOption = function() {
            var e, i, n, o, r, s = this,
                a = !1;
            if ("object" === t.type(arguments[0]) ? (n = arguments[0], a = arguments[1], r = "multiple") : "string" === t.type(arguments[0]) && (n = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === t.type(arguments[1]) ? r = "responsive" : void 0 !== arguments[1] && (r = "single")), "single" === r) s.options[n] = o;
            else if ("multiple" === r) t.each(n, function(t, e) {
                s.options[t] = e
            });
            else if ("responsive" === r)
                for (i in o)
                    if ("array" !== t.type(s.options.responsive)) s.options.responsive = [o[i]];
                    else {
                        for (e = s.options.responsive.length - 1; e >= 0;) s.options.responsive[e].breakpoint === o[i].breakpoint && s.options.responsive.splice(e, 1), e--;
                        s.options.responsive.push(o[i])
                    }
            a && (s.unload(), s.reinit())
        }, e.prototype.setPosition = function() {
            var t = this;
            t.setDimensions(), t.setHeight(), !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(), t.$slider.trigger("setPosition", [t])
        }, e.prototype.setProps = function() {
            var t = this,
                e = document.body.style;
            t.positionProp = !0 === t.options.vertical ? "top" : "left", "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0), t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex), void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)), void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)), void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)), void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"), t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
        }, e.prototype.setSlideClasses = function(t) {
            var e, i, n, o, r = this;
            if (i = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(t).addClass("slick-current"), !0 === r.options.centerMode) {
                var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
                e = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (t >= e && t <= r.slideCount - 1 - e ? r.$slides.slice(t - e + s, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (n = r.options.slidesToShow + t, i.slice(n - e + 1 + s, n + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - r.options.slidesToShow).addClass("slick-center") : t === r.slideCount - 1 && i.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(t).addClass("slick-center")
            } else t >= 0 && t <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(t, t + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= r.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, n = !0 === r.options.infinite ? r.options.slidesToShow + t : t, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - t < r.options.slidesToShow ? i.slice(n - (r.options.slidesToShow - o), n + o).addClass("slick-active").attr("aria-hidden", "false") : i.slice(n, n + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            "ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
        }, e.prototype.setupInfinite = function() {
            var e, i, n, o = this;
            if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (i = null, o.slideCount > o.options.slidesToShow)) {
                for (n = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, e = o.slideCount; e > o.slideCount - n; e -= 1) i = e - 1, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < n + o.slideCount; e += 1) i = e, t(o.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    t(this).attr("id", "")
                })
            }
        }, e.prototype.interrupt = function(t) {
            t || this.autoPlay(), this.interrupted = t
        }, e.prototype.selectHandler = function(e) {
            var i = this,
                n = t(e.target).is(".slick-slide") ? t(e.target) : t(e.target).parents(".slick-slide"),
                o = parseInt(n.attr("data-slick-index"));
            o || (o = 0), i.slideCount <= i.options.slidesToShow ? i.slideHandler(o, !1, !0) : i.slideHandler(o)
        }, e.prototype.slideHandler = function(t, e, i) {
            var n, o, r, s, a, l = null,
                c = this;
            if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t))
                if (!1 === e && c.asNavFor(t), n = t, l = c.getLeft(n), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(s, function() {
                    c.postSlide(n)
                }) : c.postSlide(n));
                else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (n = c.currentSlide, !0 !== i ? c.animateSlide(s, function() {
                c.postSlide(n)
            }) : c.postSlide(n));
            else {
                if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = n < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + n : n >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : n - c.slideCount : n, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (a = (a = c.getNavTarget()).slick("getSlick")).slideCount <= a.options.slidesToShow && a.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(r), c.fadeSlide(o, function() {
                    c.postSlide(o)
                })) : c.postSlide(o), void c.animateHeight();
                !0 !== i ? c.animateSlide(l, function() {
                    c.postSlide(o)
                }) : c.postSlide(o)
            }
        }, e.prototype.startLoad = function() {
            var t = this;
            !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()), !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(), t.$slider.addClass("slick-loading")
        }, e.prototype.swipeDirection = function() {
            var t, e, i, n, o = this;
            return t = o.touchObject.startX - o.touchObject.curX, e = o.touchObject.startY - o.touchObject.curY, i = Math.atan2(e, t), (n = Math.round(180 * i / Math.PI)) < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? !1 === o.options.rtl ? "left" : "right" : n <= 360 && n >= 315 ? !1 === o.options.rtl ? "left" : "right" : n >= 135 && n <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? n >= 35 && n <= 135 ? "down" : "up" : "vertical"
        }, e.prototype.swipeEnd = function(t) {
            var e, i, n = this;
            if (n.dragging = !1, n.swiping = !1, n.scrolling) return n.scrolling = !1, !1;
            if (n.interrupted = !1, n.shouldClick = !(n.touchObject.swipeLength > 10), void 0 === n.touchObject.curX) return !1;
            if (!0 === n.touchObject.edgeHit && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
                switch (i = n.swipeDirection()) {
                    case "left":
                    case "down":
                        e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount(), n.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount(), n.currentDirection = 1
                }
                "vertical" != i && (n.slideHandler(e), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
            } else n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
        }, e.prototype.swipeHandler = function(t) {
            var e = this;
            if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                case "start":
                    e.swipeStart(t);
                    break;
                case "move":
                    e.swipeMove(t);
                    break;
                case "end":
                    e.swipeEnd(t)
            }
        }, e.prototype.swipeMove = function(t) {
            var e, i, n, o, r, s, a = this;
            return r = void 0 !== t.originalEvent ? t.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (e = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : t.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : t.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), i = a.swipeDirection(), void 0 !== t.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, t.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), n = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === i || a.currentSlide >= a.getDotCount() && "left" === i) && (n = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = e + n * o : a.swipeLeft = e + n * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = e + n * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
        }, e.prototype.swipeStart = function(t) {
            var e, i = this;
            if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return i.touchObject = {}, !1;
            void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]), i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX, i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY, i.dragging = !0
        }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
            var t = this;
            null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
        }, e.prototype.unload = function() {
            var e = this;
            t(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unslick = function(t) {
            var e = this;
            e.$slider.trigger("unslick", [e, t]), e.destroy()
        }, e.prototype.updateArrows = function() {
            var t = this;
            Math.floor(t.options.slidesToShow / 2), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode ? (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function() {
            var t = this;
            null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
        }, e.prototype.visibility = function() {
            var t = this;
            t.options.autoplay && (document[t.hidden] ? t.interrupted = !0 : t.interrupted = !1)
        }, t.fn.slick = function() {
            var t, i, n = this,
                o = arguments[0],
                r = Array.prototype.slice.call(arguments, 1),
                s = n.length;
            for (t = 0; t < s; t++)
                if ("object" == typeof o || void 0 === o ? n[t].slick = new e(n[t], o) : i = n[t].slick[o].apply(n[t].slick, r), void 0 !== i) return i;
            return n
        }
    }),
    function(t, e) {
        var i, n = t.jQuery || t.Cowboy || (t.Cowboy = {});
        n.throttle = i = function(t, i, o, r) {
            function s() {
                function n() {
                    l = +new Date, o.apply(s, d)
                }
                var s = this,
                    c = +new Date - l,
                    d = arguments;
                r && !a && n(), a && clearTimeout(a), r === e && c > t ? n() : !0 !== i && (a = setTimeout(r ? function() {
                    a = e
                } : n, r === e ? t - c : t))
            }
            var a, l = 0;
            return "boolean" != typeof i && (r = o, o = i, i = e), n.guid && (s.guid = o.guid = o.guid || n.guid++), s
        }, n.debounce = function(t, n, o) {
            return o === e ? i(t, n, !1) : i(t, o, !1 !== n)
        }
    }(this),
    function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery")) : "function" == typeof define && define.amd ? define(["exports", "jquery"], e) : e(t.bootstrap = {}, t.jQuery)
    }(this, function(t, e) {
        "use strict";

        function i(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        function n(t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t
        }

        function o() {
            return (o = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
                }
                return t
            }).apply(this, arguments)
        }
        for (var r, s, a, l, c, d, u, p, f, h, g, m, v, _, y, w, b, T, S = function(t) {
                var e = !1;
                var i = {
                    TRANSITION_END: "bsTransitionEnd",
                    getUID: function(t) {
                        do {
                            t += ~~(1e6 * Math.random())
                        } while (document.getElementById(t));
                        return t
                    },
                    getSelectorFromElement: function(e) {
                        var i, n = e.getAttribute("data-target");
                        n && "#" !== n || (n = e.getAttribute("href") || ""), "#" === n.charAt(0) && (i = n, n = i = "function" == typeof t.escapeSelector ? t.escapeSelector(i).substr(1) : i.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1"));
                        try {
                            return t(document).find(n).length > 0 ? n : null
                        } catch (t) {
                            return null
                        }
                    },
                    reflow: function(t) {
                        return t.offsetHeight
                    },
                    triggerTransitionEnd: function(i) {
                        t(i).trigger(e.end)
                    },
                    supportsTransitionEnd: function() {
                        return Boolean(e)
                    },
                    isElement: function(t) {
                        return (t[0] || t).nodeType
                    },
                    typeCheckConfig: function(t, e, n) {
                        for (var o in n)
                            if (Object.prototype.hasOwnProperty.call(n, o)) {
                                var r = n[o],
                                    s = e[o],
                                    a = s && i.isElement(s) ? "element" : (l = s, {}.toString.call(l).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                                if (!new RegExp(r).test(a)) throw new Error(t.toUpperCase() + ': Option "' + o + '" provided type "' + a + '" but expected type "' + r + '".')
                            }
                        var l
                    }
                };
                return e = ("undefined" == typeof window || !window.QUnit) && {
                    end: "transitionend"
                }, t.fn.emulateTransitionEnd = function(e) {
                    var n = this,
                        o = !1;
                    return t(this).one(i.TRANSITION_END, function() {
                        o = !0
                    }), setTimeout(function() {
                        o || i.triggerTransitionEnd(n)
                    }, e), this
                }, i.supportsTransitionEnd() && (t.event.special[i.TRANSITION_END] = {
                    bindType: e.end,
                    delegateType: e.end,
                    handle: function(e) {
                        if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                    }
                }), i
            }(e = e && e.hasOwnProperty("default") ? e.default : e), k = (s = "alert", l = "." + (a = "bs.alert"), c = (r = e).fn[s], d = {
                CLOSE: "close" + l,
                CLOSED: "closed" + l,
                CLICK_DATA_API: "click" + l + ".data-api"
            }, "alert", "fade", "show", u = function() {
                function t(t) {
                    this._element = t
                }
                var e = t.prototype;
                return e.close = function(t) {
                    t = t || this._element;
                    var e = this._getRootElement(t);
                    this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                }, e.dispose = function() {
                    r.removeData(this._element, a), this._element = null
                }, e._getRootElement = function(t) {
                    var e = S.getSelectorFromElement(t),
                        i = !1;
                    return e && (i = r(e)[0]), i || (i = r(t).closest(".alert")[0]), i
                }, e._triggerCloseEvent = function(t) {
                    var e = r.Event(d.CLOSE);
                    return r(t).trigger(e), e
                }, e._removeElement = function(t) {
                    var e = this;
                    r(t).removeClass("show"), S.supportsTransitionEnd() && r(t).hasClass("fade") ? r(t).one(S.TRANSITION_END, function(i) {
                        return e._destroyElement(t, i)
                    }).emulateTransitionEnd(150) : this._destroyElement(t)
                }, e._destroyElement = function(t) {
                    r(t).detach().trigger(d.CLOSED).remove()
                }, t._jQueryInterface = function(e) {
                    return this.each(function() {
                        var i = r(this),
                            n = i.data(a);
                        n || (n = new t(this), i.data(a, n)), "close" === e && n[e](this)
                    })
                }, t._handleDismiss = function(t) {
                    return function(e) {
                        e && e.preventDefault(), t.close(this)
                    }
                }, n(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }]), t
            }(), r(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', u._handleDismiss(new u)), r.fn[s] = u._jQueryInterface, r.fn[s].Constructor = u, r.fn[s].noConflict = function() {
                return r.fn[s] = c, u._jQueryInterface
            }, u), C = (f = "button", g = "." + (h = "bs.button"), m = ".data-api", v = (p = e).fn[f], _ = "active", "btn", "focus", y = '[data-toggle^="button"]', '[data-toggle="buttons"]', "input", ".active", w = ".btn", b = {
                CLICK_DATA_API: "click" + g + m,
                FOCUS_BLUR_DATA_API: "focus" + g + m + " blur" + g + m
            }, T = function() {
                function t(t) {
                    this._element = t
                }
                var e = t.prototype;
                return e.toggle = function() {
                    var t = !0,
                        e = !0,
                        i = p(this._element).closest('[data-toggle="buttons"]')[0];
                    if (i) {
                        var n = p(this._element).find("input")[0];
                        if (n) {
                            if ("radio" === n.type)
                                if (n.checked && p(this._element).hasClass(_)) t = !1;
                                else {
                                    var o = p(i).find(".active")[0];
                                    o && p(o).removeClass(_)
                                }
                            if (t) {
                                if (n.hasAttribute("disabled") || i.hasAttribute("disabled") || n.classList.contains("disabled") || i.classList.contains("disabled")) return;
                                n.checked = !p(this._element).hasClass(_), p(n).trigger("change")
                            }
                            n.focus(), e = !1
                        }
                    }
                    e && this._element.setAttribute("aria-pressed", !p(this._element).hasClass(_)), t && p(this._element).toggleClass(_)
                }, e.dispose = function() {
                    p.removeData(this._element, h), this._element = null
                }, t._jQueryInterface = function(e) {
                    return this.each(function() {
                        var i = p(this).data(h);
                        i || (i = new t(this), p(this).data(h, i)), "toggle" === e && i[e]()
                    })
                }, n(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.0.0"
                    }
                }]), t
            }(), p(document).on(b.CLICK_DATA_API, y, function(t) {
                t.preventDefault();
                var e = t.target;
                p(e).hasClass("btn") || (e = p(e).closest(w)), T._jQueryInterface.call(p(e), "toggle")
            }).on(b.FOCUS_BLUR_DATA_API, y, function(t) {
                var e = p(t.target).closest(w)[0];
                p(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
            }), p.fn[f] = T._jQueryInterface, p.fn[f].Constructor = T, p.fn[f].noConflict = function() {
                return p.fn[f] = v, T._jQueryInterface
            }, T), E = function(t) {
                var e = "carousel",
                    i = "bs.carousel",
                    r = "." + i,
                    s = t.fn[e],
                    a = {
                        interval: 5e3,
                        keyboard: !0,
                        slide: !1,
                        pause: "hover",
                        wrap: !0
                    },
                    l = {
                        interval: "(number|boolean)",
                        keyboard: "boolean",
                        slide: "(boolean|string)",
                        pause: "(string|boolean)",
                        wrap: "boolean"
                    },
                    c = "next",
                    d = "prev",
                    u = {
                        SLIDE: "slide" + r,
                        SLID: "slid" + r,
                        KEYDOWN: "keydown" + r,
                        MOUSEENTER: "mouseenter" + r,
                        MOUSELEAVE: "mouseleave" + r,
                        TOUCHEND: "touchend" + r,
                        LOAD_DATA_API: "load" + r + ".data-api",
                        CLICK_DATA_API: "click" + r + ".data-api"
                    },
                    p = "active",
                    f = {
                        ACTIVE: ".active",
                        ACTIVE_ITEM: ".active.carousel-item",
                        ITEM: ".carousel-item",
                        NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
                        INDICATORS: ".carousel-indicators",
                        DATA_SLIDE: "[data-slide], [data-slide-to]",
                        DATA_RIDE: '[data-ride="carousel"]'
                    },
                    h = function() {
                        function s(e, i) {
                            this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(f.INDICATORS)[0], this._addEventListeners()
                        }
                        var h = s.prototype;
                        return h.next = function() {
                            this._isSliding || this._slide(c)
                        }, h.nextWhenVisible = function() {
                            !document.hidden && t(this._element).is(":visible") && "hidden" !== t(this._element).css("visibility") && this.next()
                        }, h.prev = function() {
                            this._isSliding || this._slide(d)
                        }, h.pause = function(e) {
                            e || (this._isPaused = !0), t(this._element).find(f.NEXT_PREV)[0] && S.supportsTransitionEnd() && (S.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                        }, h.cycle = function(t) {
                            t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                        }, h.to = function(e) {
                            var i = this;
                            this._activeElement = t(this._element).find(f.ACTIVE_ITEM)[0];
                            var n = this._getItemIndex(this._activeElement);
                            if (!(e > this._items.length - 1 || e < 0))
                                if (this._isSliding) t(this._element).one(u.SLID, function() {
                                    return i.to(e)
                                });
                                else {
                                    if (n === e) return this.pause(), void this.cycle();
                                    var o = e > n ? c : d;
                                    this._slide(o, this._items[e])
                                }
                        }, h.dispose = function() {
                            t(this._element).off(r), t.removeData(this._element, i), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                        }, h._getConfig = function(t) {
                            return t = o({}, a, t), S.typeCheckConfig(e, t, l), t
                        }, h._addEventListeners = function() {
                            var e = this;
                            this._config.keyboard && t(this._element).on(u.KEYDOWN, function(t) {
                                return e._keydown(t)
                            }), "hover" === this._config.pause && (t(this._element).on(u.MOUSEENTER, function(t) {
                                return e.pause(t)
                            }).on(u.MOUSELEAVE, function(t) {
                                return e.cycle(t)
                            }), "ontouchstart" in document.documentElement && t(this._element).on(u.TOUCHEND, function() {
                                e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function(t) {
                                    return e.cycle(t)
                                }, 500 + e._config.interval)
                            }))
                        }, h._keydown = function(t) {
                            if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                                case 37:
                                    t.preventDefault(), this.prev();
                                    break;
                                case 39:
                                    t.preventDefault(), this.next()
                            }
                        }, h._getItemIndex = function(e) {
                            return this._items = t.makeArray(t(e).parent().find(f.ITEM)), this._items.indexOf(e)
                        }, h._getItemByDirection = function(t, e) {
                            var i = t === c,
                                n = t === d,
                                o = this._getItemIndex(e),
                                r = this._items.length - 1;
                            if ((n && 0 === o || i && o === r) && !this._config.wrap) return e;
                            var s = (o + (t === d ? -1 : 1)) % this._items.length;
                            return -1 === s ? this._items[this._items.length - 1] : this._items[s]
                        }, h._triggerSlideEvent = function(e, i) {
                            var n = this._getItemIndex(e),
                                o = this._getItemIndex(t(this._element).find(f.ACTIVE_ITEM)[0]),
                                r = t.Event(u.SLIDE, {
                                    relatedTarget: e,
                                    direction: i,
                                    from: o,
                                    to: n
                                });
                            return t(this._element).trigger(r), r
                        }, h._setActiveIndicatorElement = function(e) {
                            if (this._indicatorsElement) {
                                t(this._indicatorsElement).find(f.ACTIVE).removeClass(p);
                                var i = this._indicatorsElement.children[this._getItemIndex(e)];
                                i && t(i).addClass(p)
                            }
                        }, h._slide = function(e, i) {
                            var n, o, r, s = this,
                                a = t(this._element).find(f.ACTIVE_ITEM)[0],
                                l = this._getItemIndex(a),
                                d = i || a && this._getItemByDirection(e, a),
                                h = this._getItemIndex(d),
                                g = Boolean(this._interval);
                            if (e === c ? (n = "carousel-item-left", o = "carousel-item-next", r = "left") : (n = "carousel-item-right", o = "carousel-item-prev", r = "right"), d && t(d).hasClass(p)) this._isSliding = !1;
                            else if (!this._triggerSlideEvent(d, r).isDefaultPrevented() && a && d) {
                                this._isSliding = !0, g && this.pause(), this._setActiveIndicatorElement(d);
                                var m = t.Event(u.SLID, {
                                    relatedTarget: d,
                                    direction: r,
                                    from: l,
                                    to: h
                                });
                                S.supportsTransitionEnd() && t(this._element).hasClass("slide") ? (t(d).addClass(o), S.reflow(d), t(a).addClass(n), t(d).addClass(n), t(a).one(S.TRANSITION_END, function() {
                                    t(d).removeClass(n + " " + o).addClass(p), t(a).removeClass(p + " " + o + " " + n), s._isSliding = !1, setTimeout(function() {
                                        return t(s._element).trigger(m)
                                    }, 0)
                                }).emulateTransitionEnd(600)) : (t(a).removeClass(p), t(d).addClass(p), this._isSliding = !1, t(this._element).trigger(m)), g && this.cycle()
                            }
                        }, s._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this).data(i),
                                    r = o({}, a, t(this).data());
                                "object" == typeof e && (r = o({}, r, e));
                                var l = "string" == typeof e ? e : r.slide;
                                if (n || (n = new s(this, r), t(this).data(i, n)), "number" == typeof e) n.to(e);
                                else if ("string" == typeof l) {
                                    if (void 0 === n[l]) throw new TypeError('No method named "' + l + '"');
                                    n[l]()
                                } else r.interval && (n.pause(), n.cycle())
                            })
                        }, s._dataApiClickHandler = function(e) {
                            var n = S.getSelectorFromElement(this);
                            if (n) {
                                var r = t(n)[0];
                                if (r && t(r).hasClass("carousel")) {
                                    var a = o({}, t(r).data(), t(this).data()),
                                        l = this.getAttribute("data-slide-to");
                                    l && (a.interval = !1), s._jQueryInterface.call(t(r), a), l && t(r).data(i).to(l), e.preventDefault()
                                }
                            }
                        }, n(s, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return a
                            }
                        }]), s
                    }();
                return t(document).on(u.CLICK_DATA_API, f.DATA_SLIDE, h._dataApiClickHandler), t(window).on(u.LOAD_DATA_API, function() {
                    t(f.DATA_RIDE).each(function() {
                        var e = t(this);
                        h._jQueryInterface.call(e, e.data())
                    })
                }), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, h._jQueryInterface
                }, h
            }(e), A = function(t) {
                var e = "collapse",
                    i = "bs.collapse",
                    r = "." + i,
                    s = t.fn[e],
                    a = {
                        toggle: !0,
                        parent: ""
                    },
                    l = {
                        toggle: "boolean",
                        parent: "(string|element)"
                    },
                    c = {
                        SHOW: "show" + r,
                        SHOWN: "shown" + r,
                        HIDE: "hide" + r,
                        HIDDEN: "hidden" + r,
                        CLICK_DATA_API: "click" + r + ".data-api"
                    },
                    d = "show",
                    u = "collapse",
                    p = "collapsing",
                    f = "collapsed",
                    h = "width",
                    g = {
                        ACTIVES: ".show, .collapsing",
                        DATA_TOGGLE: '[data-toggle="collapse"]'
                    },
                    m = function() {
                        function r(e, i) {
                            this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));
                            for (var n = t(g.DATA_TOGGLE), o = 0; o < n.length; o++) {
                                var r = n[o],
                                    s = S.getSelectorFromElement(r);
                                null !== s && t(s).filter(e).length > 0 && (this._selector = s, this._triggerArray.push(r))
                            }
                            this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                        }
                        var s = r.prototype;
                        return s.toggle = function() {
                            t(this._element).hasClass(d) ? this.hide() : this.show()
                        }, s.show = function() {
                            var e, n, o = this;
                            if (!(this._isTransitioning || t(this._element).hasClass(d) || (this._parent && 0 === (e = t.makeArray(t(this._parent).find(g.ACTIVES).filter('[data-parent="' + this._config.parent + '"]'))).length && (e = null), e && (n = t(e).not(this._selector).data(i)) && n._isTransitioning))) {
                                var s = t.Event(c.SHOW);
                                if (t(this._element).trigger(s), !s.isDefaultPrevented()) {
                                    e && (r._jQueryInterface.call(t(e).not(this._selector), "hide"), n || t(e).data(i, null));
                                    var a = this._getDimension();
                                    t(this._element).removeClass(u).addClass(p), this._element.style[a] = 0, this._triggerArray.length > 0 && t(this._triggerArray).removeClass(f).attr("aria-expanded", !0), this.setTransitioning(!0);
                                    var l = function() {
                                        t(o._element).removeClass(p).addClass(u).addClass(d), o._element.style[a] = "", o.setTransitioning(!1), t(o._element).trigger(c.SHOWN)
                                    };
                                    if (S.supportsTransitionEnd()) {
                                        var h = "scroll" + (a[0].toUpperCase() + a.slice(1));
                                        t(this._element).one(S.TRANSITION_END, l).emulateTransitionEnd(600), this._element.style[a] = this._element[h] + "px"
                                    } else l()
                                }
                            }
                        }, s.hide = function() {
                            var e = this;
                            if (!this._isTransitioning && t(this._element).hasClass(d)) {
                                var i = t.Event(c.HIDE);
                                if (t(this._element).trigger(i), !i.isDefaultPrevented()) {
                                    var n = this._getDimension();
                                    if (this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", S.reflow(this._element), t(this._element).addClass(p).removeClass(u).removeClass(d), this._triggerArray.length > 0)
                                        for (var o = 0; o < this._triggerArray.length; o++) {
                                            var r = this._triggerArray[o],
                                                s = S.getSelectorFromElement(r);
                                            null !== s && (t(s).hasClass(d) || t(r).addClass(f).attr("aria-expanded", !1))
                                        }
                                    this.setTransitioning(!0);
                                    var a = function() {
                                        e.setTransitioning(!1), t(e._element).removeClass(p).addClass(u).trigger(c.HIDDEN)
                                    };
                                    this._element.style[n] = "", S.supportsTransitionEnd() ? t(this._element).one(S.TRANSITION_END, a).emulateTransitionEnd(600) : a()
                                }
                            }
                        }, s.setTransitioning = function(t) {
                            this._isTransitioning = t
                        }, s.dispose = function() {
                            t.removeData(this._element, i), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                        }, s._getConfig = function(t) {
                            return (t = o({}, a, t)).toggle = Boolean(t.toggle), S.typeCheckConfig(e, t, l), t
                        }, s._getDimension = function() {
                            return t(this._element).hasClass(h) ? h : "height"
                        }, s._getParent = function() {
                            var e = this,
                                i = null;
                            S.isElement(this._config.parent) ? (i = this._config.parent, void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = t(this._config.parent)[0];
                            var n = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                            return t(i).find(n).each(function(t, i) {
                                e._addAriaAndCollapsedClass(r._getTargetFromElement(i), [i])
                            }), i
                        }, s._addAriaAndCollapsedClass = function(e, i) {
                            if (e) {
                                var n = t(e).hasClass(d);
                                i.length > 0 && t(i).toggleClass(f, !n).attr("aria-expanded", n)
                            }
                        }, r._getTargetFromElement = function(e) {
                            var i = S.getSelectorFromElement(e);
                            return i ? t(i)[0] : null
                        }, r._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this),
                                    s = n.data(i),
                                    l = o({}, a, n.data(), "object" == typeof e && e);
                                if (!s && l.toggle && /show|hide/.test(e) && (l.toggle = !1), s || (s = new r(this, l), n.data(i, s)), "string" == typeof e) {
                                    if (void 0 === s[e]) throw new TypeError('No method named "' + e + '"');
                                    s[e]()
                                }
                            })
                        }, n(r, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return a
                            }
                        }]), r
                    }();
                return t(document).on(c.CLICK_DATA_API, g.DATA_TOGGLE, function(e) {
                    "A" === e.currentTarget.tagName && e.preventDefault();
                    var n = t(this),
                        o = S.getSelectorFromElement(this);
                    t(o).each(function() {
                        var e = t(this),
                            o = e.data(i) ? "toggle" : n.data();
                        m._jQueryInterface.call(e, o)
                    })
                }), t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, m._jQueryInterface
                }, m
            }(e), I = "undefined" != typeof window && "undefined" != typeof document, O = ["Edge", "Trident", "Firefox"], D = 0, x = 0; x < O.length; x += 1)
            if (I && navigator.userAgent.indexOf(O[x]) >= 0) {
                D = 1;
                break
            }
        var $ = I && window.Promise ? function(t) {
            var e = !1;
            return function() {
                e || (e = !0, window.Promise.resolve().then(function() {
                    e = !1, t()
                }))
            }
        } : function(t) {
            var e = !1;
            return function() {
                e || (e = !0, setTimeout(function() {
                    e = !1, t()
                }, D))
            }
        };

        function N(t) {
            return t && "[object Function]" === {}.toString.call(t)
        }

        function j(t, e) {
            if (1 !== t.nodeType) return [];
            var i = getComputedStyle(t, null);
            return e ? i[e] : i
        }

        function P(t) {
            return "HTML" === t.nodeName ? t : t.parentNode || t.host
        }

        function L(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
                case "HTML":
                case "BODY":
                    return t.ownerDocument.body;
                case "#document":
                    return t.body
            }
            var e = j(t),
                i = e.overflow,
                n = e.overflowX,
                o = e.overflowY;
            return /(auto|scroll)/.test(i + o + n) ? t : L(P(t))
        }

        function H(t) {
            var e = t && t.offsetParent,
                i = e && e.nodeName;
            return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(e.nodeName) && "static" === j(e, "position") ? H(e) : e : t ? t.ownerDocument.documentElement : document.documentElement
        }

        function M(t) {
            return null !== t.parentNode ? M(t.parentNode) : t
        }

        function W(t, e) {
            if (!(t && t.nodeType && e && e.nodeType)) return document.documentElement;
            var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING,
                n = i ? t : e,
                o = i ? e : t,
                r = document.createRange();
            r.setStart(n, 0), r.setEnd(o, 0);
            var s, a, l = r.commonAncestorContainer;
            if (t !== l && e !== l || n.contains(o)) return "BODY" === (a = (s = l).nodeName) || "HTML" !== a && H(s.firstElementChild) !== s ? H(l) : l;
            var c = M(t);
            return c.host ? W(c.host, e) : W(t, M(e).host)
        }

        function R(t) {
            var e = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
                i = t.nodeName;
            if ("BODY" === i || "HTML" === i) {
                var n = t.ownerDocument.documentElement;
                return (t.ownerDocument.scrollingElement || n)[e]
            }
            return t[e]
        }

        function z(t, e) {
            var i = "x" === e ? "Left" : "Top",
                n = "Left" === i ? "Right" : "Bottom";
            return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10)
        }
        var U = void 0,
            F = function() {
                return void 0 === U && (U = -1 !== navigator.appVersion.indexOf("MSIE 10")), U
            };

        function B(t, e, i, n) {
            return Math.max(e["offset" + t], e["scroll" + t], i["client" + t], i["offset" + t], i["scroll" + t], F() ? i["offset" + t] + n["margin" + ("Height" === t ? "Top" : "Left")] + n["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
        }

        function q() {
            var t = document.body,
                e = document.documentElement,
                i = F() && getComputedStyle(e);
            return {
                height: B("Height", t, e, i),
                width: B("Width", t, e, i)
            }
        }
        var K = function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            },
            V = function() {
                function t(t, e) {
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, i, n) {
                    return i && t(e.prototype, i), n && t(e, n), e
                }
            }(),
            Y = function(t, e, i) {
                return e in t ? Object.defineProperty(t, e, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = i, t
            },
            Q = Object.assign || function(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var i = arguments[e];
                    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
                }
                return t
            };

        function G(t) {
            return Q({}, t, {
                right: t.left + t.width,
                bottom: t.top + t.height
            })
        }

        function X(t) {
            var e = {};
            if (F()) try {
                e = t.getBoundingClientRect();
                var i = R(t, "top"),
                    n = R(t, "left");
                e.top += i, e.left += n, e.bottom += i, e.right += n
            } catch (t) {} else e = t.getBoundingClientRect();
            var o = {
                    left: e.left,
                    top: e.top,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                },
                r = "HTML" === t.nodeName ? q() : {},
                s = r.width || t.clientWidth || o.right - o.left,
                a = r.height || t.clientHeight || o.bottom - o.top,
                l = t.offsetWidth - s,
                c = t.offsetHeight - a;
            if (l || c) {
                var d = j(t);
                l -= z(d, "x"), c -= z(d, "y"), o.width -= l, o.height -= c
            }
            return G(o)
        }

        function Z(t, e) {
            var i = F(),
                n = "HTML" === e.nodeName,
                o = X(t),
                r = X(e),
                s = L(t),
                a = j(e),
                l = parseFloat(a.borderTopWidth, 10),
                c = parseFloat(a.borderLeftWidth, 10),
                d = G({
                    top: o.top - r.top - l,
                    left: o.left - r.left - c,
                    width: o.width,
                    height: o.height
                });
            if (d.marginTop = 0, d.marginLeft = 0, !i && n) {
                var u = parseFloat(a.marginTop, 10),
                    p = parseFloat(a.marginLeft, 10);
                d.top -= l - u, d.bottom -= l - u, d.left -= c - p, d.right -= c - p, d.marginTop = u, d.marginLeft = p
            }
            return (i ? e.contains(s) : e === s && "BODY" !== s.nodeName) && (d = function(t, e) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                    n = R(e, "top"),
                    o = R(e, "left"),
                    r = i ? -1 : 1;
                return t.top += n * r, t.bottom += n * r, t.left += o * r, t.right += o * r, t
            }(d, e)), d
        }

        function J(t, e, i, n) {
            var o, r, s, a, l, c, d, u = {
                    top: 0,
                    left: 0
                },
                p = W(t, e);
            if ("viewport" === n) r = (o = p).ownerDocument.documentElement, s = Z(o, r), a = Math.max(r.clientWidth, window.innerWidth || 0), l = Math.max(r.clientHeight, window.innerHeight || 0), c = R(r), d = R(r, "left"), u = G({
                top: c - s.top + s.marginTop,
                left: d - s.left + s.marginLeft,
                width: a,
                height: l
            });
            else {
                var f = void 0;
                "scrollParent" === n ? "BODY" === (f = L(P(e))).nodeName && (f = t.ownerDocument.documentElement) : f = "window" === n ? t.ownerDocument.documentElement : n;
                var h = Z(f, p);
                if ("HTML" !== f.nodeName || function t(e) {
                        var i = e.nodeName;
                        return "BODY" !== i && "HTML" !== i && ("fixed" === j(e, "position") || t(P(e)))
                    }(p)) u = h;
                else {
                    var g = q(),
                        m = g.height,
                        v = g.width;
                    u.top += h.top - h.marginTop, u.bottom = m + h.top, u.left += h.left - h.marginLeft, u.right = v + h.left
                }
            }
            return u.left += i, u.top += i, u.right -= i, u.bottom -= i, u
        }

        function tt(t, e, i, n, o) {
            var r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
            if (-1 === t.indexOf("auto")) return t;
            var s = J(i, n, r, o),
                a = {
                    top: {
                        width: s.width,
                        height: e.top - s.top
                    },
                    right: {
                        width: s.right - e.right,
                        height: s.height
                    },
                    bottom: {
                        width: s.width,
                        height: s.bottom - e.bottom
                    },
                    left: {
                        width: e.left - s.left,
                        height: s.height
                    }
                },
                l = Object.keys(a).map(function(t) {
                    return Q({
                        key: t
                    }, a[t], {
                        area: (e = a[t], e.width * e.height)
                    });
                    var e
                }).sort(function(t, e) {
                    return e.area - t.area
                }),
                c = l.filter(function(t) {
                    var e = t.width,
                        n = t.height;
                    return e >= i.clientWidth && n >= i.clientHeight
                }),
                d = c.length > 0 ? c[0].key : l[0].key,
                u = t.split("-")[1];
            return d + (u ? "-" + u : "")
        }

        function et(t, e, i) {
            return Z(i, W(e, i))
        }

        function it(t) {
            var e = getComputedStyle(t),
                i = parseFloat(e.marginTop) + parseFloat(e.marginBottom),
                n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
            return {
                width: t.offsetWidth + n,
                height: t.offsetHeight + i
            }
        }

        function nt(t) {
            var e = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return t.replace(/left|right|bottom|top/g, function(t) {
                return e[t]
            })
        }

        function ot(t, e, i) {
            i = i.split("-")[0];
            var n = it(t),
                o = {
                    width: n.width,
                    height: n.height
                },
                r = -1 !== ["right", "left"].indexOf(i),
                s = r ? "top" : "left",
                a = r ? "left" : "top",
                l = r ? "height" : "width",
                c = r ? "width" : "height";
            return o[s] = e[s] + e[l] / 2 - n[l] / 2, o[a] = i === a ? e[a] - n[c] : e[nt(a)], o
        }

        function rt(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0]
        }

        function st(t, e, i) {
            return (void 0 === i ? t : t.slice(0, function(t, e, i) {
                if (Array.prototype.findIndex) return t.findIndex(function(t) {
                    return t[e] === i
                });
                var n = rt(t, function(t) {
                    return t[e] === i
                });
                return t.indexOf(n)
            }(t, "name", i))).forEach(function(t) {
                t.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var i = t.function || t.fn;
                t.enabled && N(i) && (e.offsets.popper = G(e.offsets.popper), e.offsets.reference = G(e.offsets.reference), e = i(e, t))
            }), e
        }

        function at(t, e) {
            return t.some(function(t) {
                var i = t.name;
                return t.enabled && i === e
            })
        }

        function lt(t) {
            for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length - 1; n++) {
                var o = e[n],
                    r = o ? "" + o + i : t;
                if (void 0 !== document.body.style[r]) return r
            }
            return null
        }

        function ct(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window
        }

        function dt(t) {
            return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
        }

        function ut(t, e) {
            Object.keys(e).forEach(function(i) {
                var n = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && dt(e[i]) && (n = "px"), t.style[i] = e[i] + n
            })
        }

        function pt(t, e, i) {
            var n = rt(t, function(t) {
                    return t.name === e
                }),
                o = !!n && t.some(function(t) {
                    return t.name === i && t.enabled && t.order < n.order
                });
            if (!o) {
                var r = "`" + e + "`",
                    s = "`" + i + "`";
                console.warn(s + " modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
            }
            return o
        }
        var ft = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
            ht = ft.slice(3);

        function gt(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                i = ht.indexOf(t),
                n = ht.slice(i + 1).concat(ht.slice(0, i));
            return e ? n.reverse() : n
        }
        var mt = "flip",
            vt = "clockwise",
            _t = "counterclockwise";
        var yt = {
                placement: "bottom",
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function() {},
                onUpdate: function() {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function(t) {
                            var e = t.placement,
                                i = e.split("-")[0],
                                n = e.split("-")[1];
                            if (n) {
                                var o = t.offsets,
                                    r = o.reference,
                                    s = o.popper,
                                    a = -1 !== ["bottom", "top"].indexOf(i),
                                    l = a ? "left" : "top",
                                    c = a ? "width" : "height",
                                    d = {
                                        start: Y({}, l, r[l]),
                                        end: Y({}, l, r[l] + r[c] - s[c])
                                    };
                                t.offsets.popper = Q({}, s, d[n])
                            }
                            return t
                        }
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function(t, e) {
                            var i, n = e.offset,
                                o = t.placement,
                                r = t.offsets,
                                s = r.popper,
                                a = r.reference,
                                l = o.split("-")[0];
                            return i = dt(+n) ? [+n, 0] : function(t, e, i, n) {
                                var o = [0, 0],
                                    r = -1 !== ["right", "left"].indexOf(n),
                                    s = t.split(/(\+|\-)/).map(function(t) {
                                        return t.trim()
                                    }),
                                    a = s.indexOf(rt(s, function(t) {
                                        return -1 !== t.search(/,|\s/)
                                    }));
                                s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                                var l = /\s*,\s*|\s+/,
                                    c = -1 !== a ? [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))] : [s];
                                return (c = c.map(function(t, n) {
                                    var o = (1 === n ? !r : r) ? "height" : "width",
                                        s = !1;
                                    return t.reduce(function(t, e) {
                                        return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e, s = !0, t) : s ? (t[t.length - 1] += e, s = !1, t) : t.concat(e)
                                    }, []).map(function(t) {
                                        return function(t, e, i, n) {
                                            var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                                r = +o[1],
                                                s = o[2];
                                            if (!r) return t;
                                            if (0 === s.indexOf("%")) {
                                                var a = void 0;
                                                switch (s) {
                                                    case "%p":
                                                        a = i;
                                                        break;
                                                    case "%":
                                                    case "%r":
                                                    default:
                                                        a = n
                                                }
                                                return G(a)[e] / 100 * r
                                            }
                                            return "vh" === s || "vw" === s ? ("vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r
                                        }(t, o, e, i)
                                    })
                                })).forEach(function(t, e) {
                                    t.forEach(function(i, n) {
                                        dt(i) && (o[e] += i * ("-" === t[n - 1] ? -1 : 1))
                                    })
                                }), o
                            }(n, s, a, l), "left" === l ? (s.top += i[0], s.left -= i[1]) : "right" === l ? (s.top += i[0], s.left += i[1]) : "top" === l ? (s.left += i[0], s.top -= i[1]) : "bottom" === l && (s.left += i[0], s.top += i[1]), t.popper = s, t
                        },
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function(t, e) {
                            var i = e.boundariesElement || H(t.instance.popper);
                            t.instance.reference === i && (i = H(i));
                            var n = J(t.instance.popper, t.instance.reference, e.padding, i);
                            e.boundaries = n;
                            var o = e.priority,
                                r = t.offsets.popper,
                                s = {
                                    primary: function(t) {
                                        var i = r[t];
                                        return r[t] < n[t] && !e.escapeWithReference && (i = Math.max(r[t], n[t])), Y({}, t, i)
                                    },
                                    secondary: function(t) {
                                        var i = "right" === t ? "left" : "top",
                                            o = r[i];
                                        return r[t] > n[t] && !e.escapeWithReference && (o = Math.min(r[i], n[t] - ("right" === t ? r.width : r.height))), Y({}, i, o)
                                    }
                                };
                            return o.forEach(function(t) {
                                var e = -1 !== ["left", "top"].indexOf(t) ? "primary" : "secondary";
                                r = Q({}, r, s[e](t))
                            }), t.offsets.popper = r, t
                        },
                        priority: ["left", "right", "top", "bottom"],
                        padding: 5,
                        boundariesElement: "scrollParent"
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function(t) {
                            var e = t.offsets,
                                i = e.popper,
                                n = e.reference,
                                o = t.placement.split("-")[0],
                                r = Math.floor,
                                s = -1 !== ["top", "bottom"].indexOf(o),
                                a = s ? "right" : "bottom",
                                l = s ? "left" : "top",
                                c = s ? "width" : "height";
                            return i[a] < r(n[l]) && (t.offsets.popper[l] = r(n[l]) - i[c]), i[l] > r(n[a]) && (t.offsets.popper[l] = r(n[a])), t
                        }
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function(t, e) {
                            var i;
                            if (!pt(t.instance.modifiers, "arrow", "keepTogether")) return t;
                            var n = e.element;
                            if ("string" == typeof n) {
                                if (!(n = t.instance.popper.querySelector(n))) return t
                            } else if (!t.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), t;
                            var o = t.placement.split("-")[0],
                                r = t.offsets,
                                s = r.popper,
                                a = r.reference,
                                l = -1 !== ["left", "right"].indexOf(o),
                                c = l ? "height" : "width",
                                d = l ? "Top" : "Left",
                                u = d.toLowerCase(),
                                p = l ? "left" : "top",
                                f = l ? "bottom" : "right",
                                h = it(n)[c];
                            a[f] - h < s[u] && (t.offsets.popper[u] -= s[u] - (a[f] - h)), a[u] + h > s[f] && (t.offsets.popper[u] += a[u] + h - s[f]), t.offsets.popper = G(t.offsets.popper);
                            var g = a[u] + a[c] / 2 - h / 2,
                                m = j(t.instance.popper),
                                v = parseFloat(m["margin" + d], 10),
                                _ = parseFloat(m["border" + d + "Width"], 10),
                                y = g - t.offsets.popper[u] - v - _;
                            return y = Math.max(Math.min(s[c] - h, y), 0), t.arrowElement = n, t.offsets.arrow = (Y(i = {}, u, Math.round(y)), Y(i, p, ""), i), t
                        },
                        element: "[x-arrow]"
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function(t, e) {
                            if (at(t.instance.modifiers, "inner")) return t;
                            if (t.flipped && t.placement === t.originalPlacement) return t;
                            var i = J(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement),
                                n = t.placement.split("-")[0],
                                o = nt(n),
                                r = t.placement.split("-")[1] || "",
                                s = [];
                            switch (e.behavior) {
                                case mt:
                                    s = [n, o];
                                    break;
                                case vt:
                                    s = gt(n);
                                    break;
                                case _t:
                                    s = gt(n, !0);
                                    break;
                                default:
                                    s = e.behavior
                            }
                            return s.forEach(function(a, l) {
                                if (n !== a || s.length === l + 1) return t;
                                n = t.placement.split("-")[0], o = nt(n);
                                var c, d = t.offsets.popper,
                                    u = t.offsets.reference,
                                    p = Math.floor,
                                    f = "left" === n && p(d.right) > p(u.left) || "right" === n && p(d.left) < p(u.right) || "top" === n && p(d.bottom) > p(u.top) || "bottom" === n && p(d.top) < p(u.bottom),
                                    h = p(d.left) < p(i.left),
                                    g = p(d.right) > p(i.right),
                                    m = p(d.top) < p(i.top),
                                    v = p(d.bottom) > p(i.bottom),
                                    _ = "left" === n && h || "right" === n && g || "top" === n && m || "bottom" === n && v,
                                    y = -1 !== ["top", "bottom"].indexOf(n),
                                    w = !!e.flipVariations && (y && "start" === r && h || y && "end" === r && g || !y && "start" === r && m || !y && "end" === r && v);
                                (f || _ || w) && (t.flipped = !0, (f || _) && (n = s[l + 1]), w && (r = "end" === (c = r) ? "start" : "start" === c ? "end" : c), t.placement = n + (r ? "-" + r : ""), t.offsets.popper = Q({}, t.offsets.popper, ot(t.instance.popper, t.offsets.reference, t.placement)), t = st(t.instance.modifiers, t, "flip"))
                            }), t
                        },
                        behavior: "flip",
                        padding: 5,
                        boundariesElement: "viewport"
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function(t) {
                            var e = t.placement,
                                i = e.split("-")[0],
                                n = t.offsets,
                                o = n.popper,
                                r = n.reference,
                                s = -1 !== ["left", "right"].indexOf(i),
                                a = -1 === ["top", "left"].indexOf(i);
                            return o[s ? "left" : "top"] = r[i] - (a ? o[s ? "width" : "height"] : 0), t.placement = nt(e), t.offsets.popper = G(o), t
                        }
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function(t) {
                            if (!pt(t.instance.modifiers, "hide", "preventOverflow")) return t;
                            var e = t.offsets.reference,
                                i = rt(t.instance.modifiers, function(t) {
                                    return "preventOverflow" === t.name
                                }).boundaries;
                            if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                                if (!0 === t.hide) return t;
                                t.hide = !0, t.attributes["x-out-of-boundaries"] = ""
                            } else {
                                if (!1 === t.hide) return t;
                                t.hide = !1, t.attributes["x-out-of-boundaries"] = !1
                            }
                            return t
                        }
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function(t, e) {
                            var i = e.x,
                                n = e.y,
                                o = t.offsets.popper,
                                r = rt(t.instance.modifiers, function(t) {
                                    return "applyStyle" === t.name
                                }).gpuAcceleration;
                            void 0 !== r && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                            var s, a, l = void 0 !== r ? r : e.gpuAcceleration,
                                c = X(H(t.instance.popper)),
                                d = {
                                    position: o.position
                                },
                                u = {
                                    left: Math.floor(o.left),
                                    top: Math.floor(o.top),
                                    bottom: Math.floor(o.bottom),
                                    right: Math.floor(o.right)
                                },
                                p = "bottom" === i ? "top" : "bottom",
                                f = "right" === n ? "left" : "right",
                                h = lt("transform");
                            if (a = "bottom" === p ? -c.height + u.bottom : u.top, s = "right" === f ? -c.width + u.right : u.left, l && h) d[h] = "translate3d(" + s + "px, " + a + "px, 0)", d[p] = 0, d[f] = 0, d.willChange = "transform";
                            else {
                                var g = "bottom" === p ? -1 : 1,
                                    m = "right" === f ? -1 : 1;
                                d[p] = a * g, d[f] = s * m, d.willChange = p + ", " + f
                            }
                            var v = {
                                "x-placement": t.placement
                            };
                            return t.attributes = Q({}, v, t.attributes), t.styles = Q({}, d, t.styles), t.arrowStyles = Q({}, t.offsets.arrow, t.arrowStyles), t
                        },
                        gpuAcceleration: !0,
                        x: "bottom",
                        y: "right"
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function(t) {
                            var e, i;
                            return ut(t.instance.popper, t.styles), e = t.instance.popper, i = t.attributes, Object.keys(i).forEach(function(t) {
                                !1 !== i[t] ? e.setAttribute(t, i[t]) : e.removeAttribute(t)
                            }), t.arrowElement && Object.keys(t.arrowStyles).length && ut(t.arrowElement, t.arrowStyles), t
                        },
                        onLoad: function(t, e, i, n, o) {
                            var r = et(0, e, t),
                                s = tt(i.placement, r, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                            return e.setAttribute("x-placement", s), ut(e, {
                                position: "absolute"
                            }), i
                        },
                        gpuAcceleration: void 0
                    }
                }
            },
            wt = function() {
                function t(e, i) {
                    var n = this,
                        o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    K(this, t), this.scheduleUpdate = function() {
                        return requestAnimationFrame(n.update)
                    }, this.update = $(this.update.bind(this)), this.options = Q({}, t.Defaults, o), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = e && e.jquery ? e[0] : e, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(Q({}, t.Defaults.modifiers, o.modifiers)).forEach(function(e) {
                        n.options.modifiers[e] = Q({}, t.Defaults.modifiers[e] || {}, o.modifiers ? o.modifiers[e] : {})
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                        return Q({
                            name: t
                        }, n.options.modifiers[t])
                    }).sort(function(t, e) {
                        return t.order - e.order
                    }), this.modifiers.forEach(function(t) {
                        t.enabled && N(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state)
                    }), this.update();
                    var r = this.options.eventsEnabled;
                    r && this.enableEventListeners(), this.state.eventsEnabled = r
                }
                return V(t, [{
                    key: "update",
                    value: function() {
                        return function() {
                            if (!this.state.isDestroyed) {
                                var t = {
                                    instance: this,
                                    styles: {},
                                    arrowStyles: {},
                                    attributes: {},
                                    flipped: !1,
                                    offsets: {}
                                };
                                t.offsets.reference = et(this.state, this.popper, this.reference), t.placement = tt(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), t.originalPlacement = t.placement, t.offsets.popper = ot(this.popper, t.offsets.reference, t.placement), t.offsets.popper.position = "absolute", t = st(this.modifiers, t), this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0, this.options.onCreate(t))
                            }
                        }.call(this)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        return function() {
                            return this.state.isDestroyed = !0, at(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[lt("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                        }.call(this)
                    }
                }, {
                    key: "enableEventListeners",
                    value: function() {
                        return function() {
                            this.state.eventsEnabled || (this.state = function(t, e, i, n) {
                                i.updateBound = n, ct(t).addEventListener("resize", i.updateBound, {
                                    passive: !0
                                });
                                var o = L(t);
                                return function t(e, i, n, o) {
                                    var r = "BODY" === e.nodeName,
                                        s = r ? e.ownerDocument.defaultView : e;
                                    s.addEventListener(i, n, {
                                        passive: !0
                                    }), r || t(L(s.parentNode), i, n, o), o.push(s)
                                }(o, "scroll", i.updateBound, i.scrollParents), i.scrollElement = o, i.eventsEnabled = !0, i
                            }(this.reference, this.options, this.state, this.scheduleUpdate))
                        }.call(this)
                    }
                }, {
                    key: "disableEventListeners",
                    value: function() {
                        return function() {
                            var t, e;
                            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = (t = this.reference, e = this.state, ct(t).removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
                                t.removeEventListener("scroll", e.updateBound)
                            }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
                        }.call(this)
                    }
                }]), t
            }();
        wt.Utils = ("undefined" != typeof window ? window : global).PopperUtils, wt.placements = ft, wt.Defaults = yt;
        var bt = function(t) {
                var e = "dropdown",
                    i = "bs.dropdown",
                    r = "." + i,
                    s = t.fn[e],
                    a = new RegExp("38|40|27"),
                    l = {
                        HIDE: "hide" + r,
                        HIDDEN: "hidden" + r,
                        SHOW: "show" + r,
                        SHOWN: "shown" + r,
                        CLICK: "click" + r,
                        CLICK_DATA_API: "click" + r + ".data-api",
                        KEYDOWN_DATA_API: "keydown" + r + ".data-api",
                        KEYUP_DATA_API: "keyup" + r + ".data-api"
                    },
                    c = "disabled",
                    d = "show",
                    u = "dropup",
                    p = "dropdown-menu-right",
                    f = '[data-toggle="dropdown"]',
                    h = ".dropdown-menu",
                    g = {
                        offset: 0,
                        flip: !0,
                        boundary: "scrollParent"
                    },
                    m = {
                        offset: "(number|string|function)",
                        flip: "boolean",
                        boundary: "(string|element)"
                    },
                    v = function() {
                        function s(t, e) {
                            this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
                        }
                        var v = s.prototype;
                        return v.toggle = function() {
                            if (!this._element.disabled && !t(this._element).hasClass(c)) {
                                var e = s._getParentFromElement(this._element),
                                    i = t(this._menu).hasClass(d);
                                if (s._clearMenus(), !i) {
                                    var n = {
                                            relatedTarget: this._element
                                        },
                                        o = t.Event(l.SHOW, n);
                                    if (t(e).trigger(o), !o.isDefaultPrevented()) {
                                        if (!this._inNavbar) {
                                            if (void 0 === wt) throw new TypeError("Bootstrap dropdown require Popper.js (https://popper.js.org)");
                                            var r = this._element;
                                            t(e).hasClass(u) && (t(this._menu).hasClass("dropdown-menu-left") || t(this._menu).hasClass(p)) && (r = e), "scrollParent" !== this._config.boundary && t(e).addClass("position-static"), this._popper = new wt(r, this._menu, this._getPopperConfig())
                                        }
                                        "ontouchstart" in document.documentElement && 0 === t(e).closest(".navbar-nav").length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(d), t(e).toggleClass(d).trigger(t.Event(l.SHOWN, n))
                                    }
                                }
                            }
                        }, v.dispose = function() {
                            t.removeData(this._element, i), t(this._element).off(r), this._element = null, this._menu = null, null !== this._popper && (this._popper.destroy(), this._popper = null)
                        }, v.update = function() {
                            this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
                        }, v._addEventListeners = function() {
                            var e = this;
                            t(this._element).on(l.CLICK, function(t) {
                                t.preventDefault(), t.stopPropagation(), e.toggle()
                            })
                        }, v._getConfig = function(i) {
                            return i = o({}, this.constructor.Default, t(this._element).data(), i), S.typeCheckConfig(e, i, this.constructor.DefaultType), i
                        }, v._getMenuElement = function() {
                            if (!this._menu) {
                                var e = s._getParentFromElement(this._element);
                                this._menu = t(e).find(h)[0]
                            }
                            return this._menu
                        }, v._getPlacement = function() {
                            var e = t(this._element).parent(),
                                i = "bottom-start";
                            return e.hasClass(u) ? (i = "top-start", t(this._menu).hasClass(p) && (i = "top-end")) : e.hasClass("dropright") ? i = "right-start" : e.hasClass("dropleft") ? i = "left-start" : t(this._menu).hasClass(p) && (i = "bottom-end"), i
                        }, v._detectNavbar = function() {
                            return t(this._element).closest(".navbar").length > 0
                        }, v._getPopperConfig = function() {
                            var t = this,
                                e = {};
                            return "function" == typeof this._config.offset ? e.fn = function(e) {
                                return e.offsets = o({}, e.offsets, t._config.offset(e.offsets) || {}), e
                            } : e.offset = this._config.offset, {
                                placement: this._getPlacement(),
                                modifiers: {
                                    offset: e,
                                    flip: {
                                        enabled: this._config.flip
                                    },
                                    preventOverflow: {
                                        boundariesElement: this._config.boundary
                                    }
                                }
                            }
                        }, s._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this).data(i);
                                if (n || (n = new s(this, "object" == typeof e ? e : null), t(this).data(i, n)), "string" == typeof e) {
                                    if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                    n[e]()
                                }
                            })
                        }, s._clearMenus = function(e) {
                            if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                                for (var n = t.makeArray(t(f)), o = 0; o < n.length; o++) {
                                    var r = s._getParentFromElement(n[o]),
                                        a = t(n[o]).data(i),
                                        c = {
                                            relatedTarget: n[o]
                                        };
                                    if (a) {
                                        var u = a._menu;
                                        if (t(r).hasClass(d) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(r, e.target))) {
                                            var p = t.Event(l.HIDE, c);
                                            t(r).trigger(p), p.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[o].setAttribute("aria-expanded", "false"), t(u).removeClass(d), t(r).removeClass(d).trigger(t.Event(l.HIDDEN, c)))
                                        }
                                    }
                                }
                        }, s._getParentFromElement = function(e) {
                            var i, n = S.getSelectorFromElement(e);
                            return n && (i = t(n)[0]), i || e.parentNode
                        }, s._dataApiKeydownHandler = function(e) {
                            if ((/input|textarea/i.test(e.target.tagName) ? !(32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || t(e.target).closest(h).length)) : a.test(e.which)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !t(this).hasClass(c))) {
                                var i = s._getParentFromElement(this),
                                    n = t(i).hasClass(d);
                                if ((n || 27 === e.which && 32 === e.which) && (!n || 27 !== e.which && 32 !== e.which)) {
                                    var o = t(i).find(".dropdown-menu .dropdown-item:not(.disabled)").get();
                                    if (0 !== o.length) {
                                        var r = o.indexOf(e.target);
                                        38 === e.which && r > 0 && r--, 40 === e.which && r < o.length - 1 && r++, r < 0 && (r = 0), o[r].focus()
                                    }
                                } else {
                                    if (27 === e.which) {
                                        var l = t(i).find(f)[0];
                                        t(l).trigger("focus")
                                    }
                                    t(this).trigger("click")
                                }
                            }
                        }, n(s, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return g
                            }
                        }, {
                            key: "DefaultType",
                            get: function() {
                                return m
                            }
                        }]), s
                    }();
                return t(document).on(l.KEYDOWN_DATA_API, f, v._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, h, v._dataApiKeydownHandler).on(l.CLICK_DATA_API + " " + l.KEYUP_DATA_API, v._clearMenus).on(l.CLICK_DATA_API, f, function(e) {
                    e.preventDefault(), e.stopPropagation(), v._jQueryInterface.call(t(this), "toggle")
                }).on(l.CLICK_DATA_API, ".dropdown form", function(t) {
                    t.stopPropagation()
                }), t.fn[e] = v._jQueryInterface, t.fn[e].Constructor = v, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, v._jQueryInterface
                }, v
            }(e),
            Tt = function(t) {
                var e = "bs.modal",
                    i = "." + e,
                    r = t.fn.modal,
                    s = {
                        backdrop: !0,
                        keyboard: !0,
                        focus: !0,
                        show: !0
                    },
                    a = {
                        backdrop: "(boolean|string)",
                        keyboard: "boolean",
                        focus: "boolean",
                        show: "boolean"
                    },
                    l = {
                        HIDE: "hide" + i,
                        HIDDEN: "hidden" + i,
                        SHOW: "show" + i,
                        SHOWN: "shown" + i,
                        FOCUSIN: "focusin" + i,
                        RESIZE: "resize" + i,
                        CLICK_DISMISS: "click.dismiss" + i,
                        KEYDOWN_DISMISS: "keydown.dismiss" + i,
                        MOUSEUP_DISMISS: "mouseup.dismiss" + i,
                        MOUSEDOWN_DISMISS: "mousedown.dismiss" + i,
                        CLICK_DATA_API: "click.bs.modal.data-api"
                    },
                    c = "modal-open",
                    d = "fade",
                    u = "show",
                    p = {
                        DIALOG: ".modal-dialog",
                        DATA_TOGGLE: '[data-toggle="modal"]',
                        DATA_DISMISS: '[data-dismiss="modal"]',
                        FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                        STICKY_CONTENT: ".sticky-top",
                        NAVBAR_TOGGLER: ".navbar-toggler"
                    },
                    f = function() {
                        function r(e, i) {
                            this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(p.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                        }
                        var f = r.prototype;
                        return f.toggle = function(t) {
                            return this._isShown ? this.hide() : this.show(t)
                        }, f.show = function(e) {
                            var i = this;
                            if (!this._isTransitioning && !this._isShown) {
                                S.supportsTransitionEnd() && t(this._element).hasClass(d) && (this._isTransitioning = !0);
                                var n = t.Event(l.SHOW, {
                                    relatedTarget: e
                                });
                                t(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), t(document.body).addClass(c), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(l.CLICK_DISMISS, p.DATA_DISMISS, function(t) {
                                    return i.hide(t)
                                }), t(this._dialog).on(l.MOUSEDOWN_DISMISS, function() {
                                    t(i._element).one(l.MOUSEUP_DISMISS, function(e) {
                                        t(e.target).is(i._element) && (i._ignoreBackdropClick = !0)
                                    })
                                }), this._showBackdrop(function() {
                                    return i._showElement(e)
                                }))
                            }
                        }, f.hide = function(e) {
                            var i = this;
                            if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
                                var n = t.Event(l.HIDE);
                                if (t(this._element).trigger(n), this._isShown && !n.isDefaultPrevented()) {
                                    this._isShown = !1;
                                    var o = S.supportsTransitionEnd() && t(this._element).hasClass(d);
                                    o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), t(document).off(l.FOCUSIN), t(this._element).removeClass(u), t(this._element).off(l.CLICK_DISMISS), t(this._dialog).off(l.MOUSEDOWN_DISMISS), o ? t(this._element).one(S.TRANSITION_END, function(t) {
                                        return i._hideModal(t)
                                    }).emulateTransitionEnd(300) : this._hideModal()
                                }
                            }
                        }, f.dispose = function() {
                            t.removeData(this._element, e), t(window, document, this._element, this._backdrop).off(i), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null
                        }, f.handleUpdate = function() {
                            this._adjustDialog()
                        }, f._getConfig = function(t) {
                            return t = o({}, s, t), S.typeCheckConfig("modal", t, a), t
                        }, f._showElement = function(e) {
                            var i = this,
                                n = S.supportsTransitionEnd() && t(this._element).hasClass(d);
                            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && S.reflow(this._element), t(this._element).addClass(u), this._config.focus && this._enforceFocus();
                            var o = t.Event(l.SHOWN, {
                                    relatedTarget: e
                                }),
                                r = function() {
                                    i._config.focus && i._element.focus(), i._isTransitioning = !1, t(i._element).trigger(o)
                                };
                            n ? t(this._dialog).one(S.TRANSITION_END, r).emulateTransitionEnd(300) : r()
                        }, f._enforceFocus = function() {
                            var e = this;
                            t(document).off(l.FOCUSIN).on(l.FOCUSIN, function(i) {
                                document !== i.target && e._element !== i.target && 0 === t(e._element).has(i.target).length && e._element.focus()
                            })
                        }, f._setEscapeEvent = function() {
                            var e = this;
                            this._isShown && this._config.keyboard ? t(this._element).on(l.KEYDOWN_DISMISS, function(t) {
                                27 === t.which && (t.preventDefault(), e.hide())
                            }) : this._isShown || t(this._element).off(l.KEYDOWN_DISMISS)
                        }, f._setResizeEvent = function() {
                            var e = this;
                            this._isShown ? t(window).on(l.RESIZE, function(t) {
                                return e.handleUpdate(t)
                            }) : t(window).off(l.RESIZE)
                        }, f._hideModal = function() {
                            var e = this;
                            this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function() {
                                t(document.body).removeClass(c), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(l.HIDDEN)
                            })
                        }, f._removeBackdrop = function() {
                            this._backdrop && (t(this._backdrop).remove(), this._backdrop = null)
                        }, f._showBackdrop = function(e) {
                            var i = this,
                                n = t(this._element).hasClass(d) ? d : "";
                            if (this._isShown && this._config.backdrop) {
                                var o = S.supportsTransitionEnd() && n;
                                if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", n && t(this._backdrop).addClass(n), t(this._backdrop).appendTo(document.body), t(this._element).on(l.CLICK_DISMISS, function(t) {
                                        i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === i._config.backdrop ? i._element.focus() : i.hide())
                                    }), o && S.reflow(this._backdrop), t(this._backdrop).addClass(u), !e) return;
                                if (!o) return void e();
                                t(this._backdrop).one(S.TRANSITION_END, e).emulateTransitionEnd(150)
                            } else if (!this._isShown && this._backdrop) {
                                t(this._backdrop).removeClass(u);
                                var r = function() {
                                    i._removeBackdrop(), e && e()
                                };
                                S.supportsTransitionEnd() && t(this._element).hasClass(d) ? t(this._backdrop).one(S.TRANSITION_END, r).emulateTransitionEnd(150) : r()
                            } else e && e()
                        }, f._adjustDialog = function() {
                            var t = this._element.scrollHeight > document.documentElement.clientHeight;
                            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                        }, f._resetAdjustments = function() {
                            this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                        }, f._checkScrollbar = function() {
                            var t = document.body.getBoundingClientRect();
                            this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                        }, f._setScrollbar = function() {
                            var e = this;
                            if (this._isBodyOverflowing) {
                                t(p.FIXED_CONTENT).each(function(i, n) {
                                    var o = t(n)[0].style.paddingRight,
                                        r = t(n).css("padding-right");
                                    t(n).data("padding-right", o).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px")
                                }), t(p.STICKY_CONTENT).each(function(i, n) {
                                    var o = t(n)[0].style.marginRight,
                                        r = t(n).css("margin-right");
                                    t(n).data("margin-right", o).css("margin-right", parseFloat(r) - e._scrollbarWidth + "px")
                                }), t(p.NAVBAR_TOGGLER).each(function(i, n) {
                                    var o = t(n)[0].style.marginRight,
                                        r = t(n).css("margin-right");
                                    t(n).data("margin-right", o).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px")
                                });
                                var i = document.body.style.paddingRight,
                                    n = t("body").css("padding-right");
                                t("body").data("padding-right", i).css("padding-right", parseFloat(n) + this._scrollbarWidth + "px")
                            }
                        }, f._resetScrollbar = function() {
                            t(p.FIXED_CONTENT).each(function(e, i) {
                                var n = t(i).data("padding-right");
                                void 0 !== n && t(i).css("padding-right", n).removeData("padding-right")
                            }), t(p.STICKY_CONTENT + ", " + p.NAVBAR_TOGGLER).each(function(e, i) {
                                var n = t(i).data("margin-right");
                                void 0 !== n && t(i).css("margin-right", n).removeData("margin-right")
                            });
                            var e = t("body").data("padding-right");
                            void 0 !== e && t("body").css("padding-right", e).removeData("padding-right")
                        }, f._getScrollbarWidth = function() {
                            var t = document.createElement("div");
                            t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                            var e = t.getBoundingClientRect().width - t.clientWidth;
                            return document.body.removeChild(t), e
                        }, r._jQueryInterface = function(i, n) {
                            return this.each(function() {
                                var s = t(this).data(e),
                                    a = o({}, r.Default, t(this).data(), "object" == typeof i && i);
                                if (s || (s = new r(this, a), t(this).data(e, s)), "string" == typeof i) {
                                    if (void 0 === s[i]) throw new TypeError('No method named "' + i + '"');
                                    s[i](n)
                                } else a.show && s.show(n)
                            })
                        }, n(r, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return s
                            }
                        }]), r
                    }();
                return t(document).on(l.CLICK_DATA_API, p.DATA_TOGGLE, function(i) {
                    var n, r = this,
                        s = S.getSelectorFromElement(this);
                    s && (n = t(s)[0]);
                    var a = t(n).data(e) ? "toggle" : o({}, t(n).data(), t(this).data());
                    "A" !== this.tagName && "AREA" !== this.tagName || i.preventDefault();
                    var c = t(n).one(l.SHOW, function(e) {
                        e.isDefaultPrevented() || c.one(l.HIDDEN, function() {
                            t(r).is(":visible") && r.focus()
                        })
                    });
                    f._jQueryInterface.call(t(n), a, this)
                }), t.fn.modal = f._jQueryInterface, t.fn.modal.Constructor = f, t.fn.modal.noConflict = function() {
                    return t.fn.modal = r, f._jQueryInterface
                }, f
            }(e),
            St = function(t) {
                var e = "tooltip",
                    i = "bs.tooltip",
                    r = "." + i,
                    s = t.fn[e],
                    a = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
                    l = {
                        animation: "boolean",
                        template: "string",
                        title: "(string|element|function)",
                        trigger: "string",
                        delay: "(number|object)",
                        html: "boolean",
                        selector: "(string|boolean)",
                        placement: "(string|function)",
                        offset: "(number|string)",
                        container: "(string|element|boolean)",
                        fallbackPlacement: "(string|array)",
                        boundary: "(string|element)"
                    },
                    c = {
                        AUTO: "auto",
                        TOP: "top",
                        RIGHT: "right",
                        BOTTOM: "bottom",
                        LEFT: "left"
                    },
                    d = {
                        animation: !0,
                        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                        trigger: "hover focus",
                        title: "",
                        delay: 0,
                        html: !1,
                        selector: !1,
                        placement: "top",
                        offset: 0,
                        container: !1,
                        fallbackPlacement: "flip",
                        boundary: "scrollParent"
                    },
                    u = "show",
                    p = "out",
                    f = {
                        HIDE: "hide" + r,
                        HIDDEN: "hidden" + r,
                        SHOW: "show" + r,
                        SHOWN: "shown" + r,
                        INSERTED: "inserted" + r,
                        CLICK: "click" + r,
                        FOCUSIN: "focusin" + r,
                        FOCUSOUT: "focusout" + r,
                        MOUSEENTER: "mouseenter" + r,
                        MOUSELEAVE: "mouseleave" + r
                    },
                    h = "fade",
                    g = "show",
                    m = "hover",
                    v = "focus",
                    _ = function() {
                        function s(t, e) {
                            if (void 0 === wt) throw new TypeError("Bootstrap tooltips require Popper.js (https://popper.js.org)");
                            this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
                        }
                        var _ = s.prototype;
                        return _.enable = function() {
                            this._isEnabled = !0
                        }, _.disable = function() {
                            this._isEnabled = !1
                        }, _.toggleEnabled = function() {
                            this._isEnabled = !this._isEnabled
                        }, _.toggle = function(e) {
                            if (this._isEnabled)
                                if (e) {
                                    var i = this.constructor.DATA_KEY,
                                        n = t(e.currentTarget).data(i);
                                    n || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                                } else {
                                    if (t(this.getTipElement()).hasClass(g)) return void this._leave(null, this);
                                    this._enter(null, this)
                                }
                        }, _.dispose = function() {
                            clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
                        }, _.show = function() {
                            var e = this;
                            if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");
                            var i = t.Event(this.constructor.Event.SHOW);
                            if (this.isWithContent() && this._isEnabled) {
                                t(this.element).trigger(i);
                                var n = t.contains(this.element.ownerDocument.documentElement, this.element);
                                if (i.isDefaultPrevented() || !n) return;
                                var o = this.getTipElement(),
                                    r = S.getUID(this.constructor.NAME);
                                o.setAttribute("id", r), this.element.setAttribute("aria-describedby", r), this.setContent(), this.config.animation && t(o).addClass(h);
                                var a = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
                                    l = this._getAttachment(a);
                                this.addAttachmentClass(l);
                                var c = !1 === this.config.container ? document.body : t(this.config.container);
                                t(o).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(o).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new wt(this.element, o, {
                                    placement: l,
                                    modifiers: {
                                        offset: {
                                            offset: this.config.offset
                                        },
                                        flip: {
                                            behavior: this.config.fallbackPlacement
                                        },
                                        arrow: {
                                            element: ".arrow"
                                        },
                                        preventOverflow: {
                                            boundariesElement: this.config.boundary
                                        }
                                    },
                                    onCreate: function(t) {
                                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                                    },
                                    onUpdate: function(t) {
                                        e._handlePopperPlacementChange(t)
                                    }
                                }), t(o).addClass(g), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);
                                var d = function() {
                                    e.config.animation && e._fixTransition();
                                    var i = e._hoverState;
                                    e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), i === p && e._leave(null, e)
                                };
                                S.supportsTransitionEnd() && t(this.tip).hasClass(h) ? t(this.tip).one(S.TRANSITION_END, d).emulateTransitionEnd(s._TRANSITION_DURATION) : d()
                            }
                        }, _.hide = function(e) {
                            var i = this,
                                n = this.getTipElement(),
                                o = t.Event(this.constructor.Event.HIDE),
                                r = function() {
                                    i._hoverState !== u && n.parentNode && n.parentNode.removeChild(n), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), t(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), e && e()
                                };
                            t(this.element).trigger(o), o.isDefaultPrevented() || (t(n).removeClass(g), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger.click = !1, this._activeTrigger[v] = !1, this._activeTrigger[m] = !1, S.supportsTransitionEnd() && t(this.tip).hasClass(h) ? t(n).one(S.TRANSITION_END, r).emulateTransitionEnd(150) : r(), this._hoverState = "")
                        }, _.update = function() {
                            null !== this._popper && this._popper.scheduleUpdate()
                        }, _.isWithContent = function() {
                            return Boolean(this.getTitle())
                        }, _.addAttachmentClass = function(e) {
                            t(this.getTipElement()).addClass("bs-tooltip-" + e)
                        }, _.getTipElement = function() {
                            return this.tip = this.tip || t(this.config.template)[0], this.tip
                        }, _.setContent = function() {
                            var e = t(this.getTipElement());
                            this.setElementContent(e.find(".tooltip-inner"), this.getTitle()), e.removeClass(h + " " + g)
                        }, _.setElementContent = function(e, i) {
                            var n = this.config.html;
                            "object" == typeof i && (i.nodeType || i.jquery) ? n ? t(i).parent().is(e) || e.empty().append(i) : e.text(t(i).text()) : e[n ? "html" : "text"](i)
                        }, _.getTitle = function() {
                            var t = this.element.getAttribute("data-original-title");
                            return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t
                        }, _._getAttachment = function(t) {
                            return c[t.toUpperCase()]
                        }, _._setListeners = function() {
                            var e = this;
                            this.config.trigger.split(" ").forEach(function(i) {
                                if ("click" === i) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function(t) {
                                    return e.toggle(t)
                                });
                                else if ("manual" !== i) {
                                    var n = i === m ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                                        o = i === m ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;
                                    t(e.element).on(n, e.config.selector, function(t) {
                                        return e._enter(t)
                                    }).on(o, e.config.selector, function(t) {
                                        return e._leave(t)
                                    })
                                }
                                t(e.element).closest(".modal").on("hide.bs.modal", function() {
                                    return e.hide()
                                })
                            }), this.config.selector ? this.config = o({}, this.config, {
                                trigger: "manual",
                                selector: ""
                            }) : this._fixTitle()
                        }, _._fixTitle = function() {
                            var t = typeof this.element.getAttribute("data-original-title");
                            (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                        }, _._enter = function(e, i) {
                            var n = this.constructor.DATA_KEY;
                            (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusin" === e.type ? v : m] = !0), t(i.getTipElement()).hasClass(g) || i._hoverState === u ? i._hoverState = u : (clearTimeout(i._timeout), i._hoverState = u, i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function() {
                                i._hoverState === u && i.show()
                            }, i.config.delay.show) : i.show())
                        }, _._leave = function(e, i) {
                            var n = this.constructor.DATA_KEY;
                            (i = i || t(e.currentTarget).data(n)) || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), e && (i._activeTrigger["focusout" === e.type ? v : m] = !1), i._isWithActiveTrigger() || (clearTimeout(i._timeout), i._hoverState = p, i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function() {
                                i._hoverState === p && i.hide()
                            }, i.config.delay.hide) : i.hide())
                        }, _._isWithActiveTrigger = function() {
                            for (var t in this._activeTrigger)
                                if (this._activeTrigger[t]) return !0;
                            return !1
                        }, _._getConfig = function(i) {
                            return "number" == typeof(i = o({}, this.constructor.Default, t(this.element).data(), i)).delay && (i.delay = {
                                show: i.delay,
                                hide: i.delay
                            }), "number" == typeof i.title && (i.title = i.title.toString()), "number" == typeof i.content && (i.content = i.content.toString()), S.typeCheckConfig(e, i, this.constructor.DefaultType), i
                        }, _._getDelegateConfig = function() {
                            var t = {};
                            if (this.config)
                                for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                            return t
                        }, _._cleanTipClass = function() {
                            var e = t(this.getTipElement()),
                                i = e.attr("class").match(a);
                            null !== i && i.length > 0 && e.removeClass(i.join(""))
                        }, _._handlePopperPlacementChange = function(t) {
                            this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
                        }, _._fixTransition = function() {
                            var e = this.getTipElement(),
                                i = this.config.animation;
                            null === e.getAttribute("x-placement") && (t(e).removeClass(h), this.config.animation = !1, this.hide(), this.show(), this.config.animation = i)
                        }, s._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this).data(i),
                                    o = "object" == typeof e && e;
                                if ((n || !/dispose|hide/.test(e)) && (n || (n = new s(this, o), t(this).data(i, n)), "string" == typeof e)) {
                                    if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                    n[e]()
                                }
                            })
                        }, n(s, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return d
                            }
                        }, {
                            key: "NAME",
                            get: function() {
                                return e
                            }
                        }, {
                            key: "DATA_KEY",
                            get: function() {
                                return i
                            }
                        }, {
                            key: "Event",
                            get: function() {
                                return f
                            }
                        }, {
                            key: "EVENT_KEY",
                            get: function() {
                                return r
                            }
                        }, {
                            key: "DefaultType",
                            get: function() {
                                return l
                            }
                        }]), s
                    }();
                return t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, _._jQueryInterface
                }, _
            }(e),
            kt = function(t) {
                var e = "popover",
                    i = "bs.popover",
                    r = "." + i,
                    s = t.fn[e],
                    a = new RegExp("(^|\\s)bs-popover\\S+", "g"),
                    l = o({}, St.Default, {
                        placement: "right",
                        trigger: "click",
                        content: "",
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                    }),
                    c = o({}, St.DefaultType, {
                        content: "(string|element|function)"
                    }),
                    d = {
                        HIDE: "hide" + r,
                        HIDDEN: "hidden" + r,
                        SHOW: "show" + r,
                        SHOWN: "shown" + r,
                        INSERTED: "inserted" + r,
                        CLICK: "click" + r,
                        FOCUSIN: "focusin" + r,
                        FOCUSOUT: "focusout" + r,
                        MOUSEENTER: "mouseenter" + r,
                        MOUSELEAVE: "mouseleave" + r
                    },
                    u = function(o) {
                        var s, u;

                        function p() {
                            return o.apply(this, arguments) || this
                        }
                        u = o, (s = p).prototype = Object.create(u.prototype), s.prototype.constructor = s, s.__proto__ = u;
                        var f = p.prototype;
                        return f.isWithContent = function() {
                            return this.getTitle() || this._getContent()
                        }, f.addAttachmentClass = function(e) {
                            t(this.getTipElement()).addClass("bs-popover-" + e)
                        }, f.getTipElement = function() {
                            return this.tip = this.tip || t(this.config.template)[0], this.tip
                        }, f.setContent = function() {
                            var e = t(this.getTipElement());
                            this.setElementContent(e.find(".popover-header"), this.getTitle());
                            var i = this._getContent();
                            "function" == typeof i && (i = i.call(this.element)), this.setElementContent(e.find(".popover-body"), i), e.removeClass("fade show")
                        }, f._getContent = function() {
                            return this.element.getAttribute("data-content") || this.config.content
                        }, f._cleanTipClass = function() {
                            var e = t(this.getTipElement()),
                                i = e.attr("class").match(a);
                            null !== i && i.length > 0 && e.removeClass(i.join(""))
                        }, p._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this).data(i),
                                    o = "object" == typeof e ? e : null;
                                if ((n || !/destroy|hide/.test(e)) && (n || (n = new p(this, o), t(this).data(i, n)), "string" == typeof e)) {
                                    if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                    n[e]()
                                }
                            })
                        }, n(p, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return l
                            }
                        }, {
                            key: "NAME",
                            get: function() {
                                return e
                            }
                        }, {
                            key: "DATA_KEY",
                            get: function() {
                                return i
                            }
                        }, {
                            key: "Event",
                            get: function() {
                                return d
                            }
                        }, {
                            key: "EVENT_KEY",
                            get: function() {
                                return r
                            }
                        }, {
                            key: "DefaultType",
                            get: function() {
                                return c
                            }
                        }]), p
                    }(St);
                return t.fn[e] = u._jQueryInterface, t.fn[e].Constructor = u, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, u._jQueryInterface
                }, u
            }(e),
            Ct = function(t) {
                var e = "scrollspy",
                    i = "bs.scrollspy",
                    r = "." + i,
                    s = t.fn[e],
                    a = {
                        offset: 10,
                        method: "auto",
                        target: ""
                    },
                    l = {
                        offset: "number",
                        method: "string",
                        target: "(string|element)"
                    },
                    c = {
                        ACTIVATE: "activate" + r,
                        SCROLL: "scroll" + r,
                        LOAD_DATA_API: "load" + r + ".data-api"
                    },
                    d = "active",
                    u = {
                        DATA_SPY: '[data-spy="scroll"]',
                        ACTIVE: ".active",
                        NAV_LIST_GROUP: ".nav, .list-group",
                        NAV_LINKS: ".nav-link",
                        NAV_ITEMS: ".nav-item",
                        LIST_ITEMS: ".list-group-item",
                        DROPDOWN: ".dropdown",
                        DROPDOWN_ITEMS: ".dropdown-item",
                        DROPDOWN_TOGGLE: ".dropdown-toggle"
                    },
                    p = "position",
                    f = function() {
                        function s(e, i) {
                            var n = this;
                            this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + u.NAV_LINKS + "," + this._config.target + " " + u.LIST_ITEMS + "," + this._config.target + " " + u.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(c.SCROLL, function(t) {
                                return n._process(t)
                            }), this.refresh(), this._process()
                        }
                        var f = s.prototype;
                        return f.refresh = function() {
                            var e = this,
                                i = this._scrollElement === this._scrollElement.window ? "offset" : p,
                                n = "auto" === this._config.method ? i : this._config.method,
                                o = n === p ? this._getScrollTop() : 0;
                            this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function(e) {
                                var i, r = S.getSelectorFromElement(e);
                                if (r && (i = t(r)[0]), i) {
                                    var s = i.getBoundingClientRect();
                                    if (s.width || s.height) return [t(i)[n]().top + o, r]
                                }
                                return null
                            }).filter(function(t) {
                                return t
                            }).sort(function(t, e) {
                                return t[0] - e[0]
                            }).forEach(function(t) {
                                e._offsets.push(t[0]), e._targets.push(t[1])
                            })
                        }, f.dispose = function() {
                            t.removeData(this._element, i), t(this._scrollElement).off(r), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                        }, f._getConfig = function(i) {
                            if ("string" != typeof(i = o({}, a, i)).target) {
                                var n = t(i.target).attr("id");
                                n || (n = S.getUID(e), t(i.target).attr("id", n)), i.target = "#" + n
                            }
                            return S.typeCheckConfig(e, i, l), i
                        }, f._getScrollTop = function() {
                            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                        }, f._getScrollHeight = function() {
                            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                        }, f._getOffsetHeight = function() {
                            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                        }, f._process = function() {
                            var t = this._getScrollTop() + this._config.offset,
                                e = this._getScrollHeight(),
                                i = this._config.offset + e - this._getOffsetHeight();
                            if (this._scrollHeight !== e && this.refresh(), t >= i) {
                                var n = this._targets[this._targets.length - 1];
                                this._activeTarget !== n && this._activate(n)
                            } else {
                                if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();
                                for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                            }
                        }, f._activate = function(e) {
                            this._activeTarget = e, this._clear();
                            var i = this._selector.split(",");
                            i = i.map(function(t) {
                                return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
                            });
                            var n = t(i.join(","));
                            n.hasClass("dropdown-item") ? (n.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(d), n.addClass(d)) : (n.addClass(d), n.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS + ", " + u.LIST_ITEMS).addClass(d), n.parents(u.NAV_LIST_GROUP).prev(u.NAV_ITEMS).children(u.NAV_LINKS).addClass(d)), t(this._scrollElement).trigger(c.ACTIVATE, {
                                relatedTarget: e
                            })
                        }, f._clear = function() {
                            t(this._selector).filter(u.ACTIVE).removeClass(d)
                        }, s._jQueryInterface = function(e) {
                            return this.each(function() {
                                var n = t(this).data(i);
                                if (n || (n = new s(this, "object" == typeof e && e), t(this).data(i, n)), "string" == typeof e) {
                                    if (void 0 === n[e]) throw new TypeError('No method named "' + e + '"');
                                    n[e]()
                                }
                            })
                        }, n(s, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }, {
                            key: "Default",
                            get: function() {
                                return a
                            }
                        }]), s
                    }();
                return t(window).on(c.LOAD_DATA_API, function() {
                    for (var e = t.makeArray(t(u.DATA_SPY)), i = e.length; i--;) {
                        var n = t(e[i]);
                        f._jQueryInterface.call(n, n.data())
                    }
                }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function() {
                    return t.fn[e] = s, f._jQueryInterface
                }, f
            }(e),
            Et = function(t) {
                var e = ".bs.tab",
                    i = t.fn.tab,
                    o = {
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        CLICK_DATA_API: "click.bs.tab.data-api"
                    },
                    r = "active",
                    s = "show",
                    a = ".active",
                    l = "> li > .active",
                    c = function() {
                        function e(t) {
                            this._element = t
                        }
                        var i = e.prototype;
                        return i.show = function() {
                            var e = this;
                            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(r) || t(this._element).hasClass("disabled"))) {
                                var i, n, s = t(this._element).closest(".nav, .list-group")[0],
                                    c = S.getSelectorFromElement(this._element);
                                if (s) {
                                    var d = "UL" === s.nodeName ? l : a;
                                    n = (n = t.makeArray(t(s).find(d)))[n.length - 1]
                                }
                                var u = t.Event(o.HIDE, {
                                        relatedTarget: this._element
                                    }),
                                    p = t.Event(o.SHOW, {
                                        relatedTarget: n
                                    });
                                if (n && t(n).trigger(u), t(this._element).trigger(p), !p.isDefaultPrevented() && !u.isDefaultPrevented()) {
                                    c && (i = t(c)[0]), this._activate(this._element, s);
                                    var f = function() {
                                        var i = t.Event(o.HIDDEN, {
                                                relatedTarget: e._element
                                            }),
                                            r = t.Event(o.SHOWN, {
                                                relatedTarget: n
                                            });
                                        t(n).trigger(i), t(e._element).trigger(r)
                                    };
                                    i ? this._activate(i, i.parentNode, f) : f()
                                }
                            }
                        }, i.dispose = function() {
                            t.removeData(this._element, "bs.tab"), this._element = null
                        }, i._activate = function(e, i, n) {
                            var o = this,
                                r = ("UL" === i.nodeName ? t(i).find(l) : t(i).children(a))[0],
                                s = n && S.supportsTransitionEnd() && r && t(r).hasClass("fade"),
                                c = function() {
                                    return o._transitionComplete(e, r, n)
                                };
                            r && s ? t(r).one(S.TRANSITION_END, c).emulateTransitionEnd(150) : c()
                        }, i._transitionComplete = function(e, i, n) {
                            if (i) {
                                t(i).removeClass(s + " " + r);
                                var o = t(i.parentNode).find("> .dropdown-menu .active")[0];
                                o && t(o).removeClass(r), "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
                            }
                            if (t(e).addClass(r), "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !0), S.reflow(e), t(e).addClass(s), e.parentNode && t(e.parentNode).hasClass("dropdown-menu")) {
                                var a = t(e).closest(".dropdown")[0];
                                a && t(a).find(".dropdown-toggle").addClass(r), e.setAttribute("aria-expanded", !0)
                            }
                            n && n()
                        }, e._jQueryInterface = function(i) {
                            return this.each(function() {
                                var n = t(this),
                                    o = n.data("bs.tab");
                                if (o || (o = new e(this), n.data("bs.tab", o)), "string" == typeof i) {
                                    if (void 0 === o[i]) throw new TypeError('No method named "' + i + '"');
                                    o[i]()
                                }
                            })
                        }, n(e, null, [{
                            key: "VERSION",
                            get: function() {
                                return "4.0.0"
                            }
                        }]), e
                    }();
                return t(document).on(o.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(e) {
                    e.preventDefault(), c._jQueryInterface.call(t(this), "show")
                }), t.fn.tab = c._jQueryInterface, t.fn.tab.Constructor = c, t.fn.tab.noConflict = function() {
                    return t.fn.tab = i, c._jQueryInterface
                }, c
            }(e);
        ! function(t) {
            if (void 0 === t) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var e = t.fn.jquery.split(" ")[0].split(".");
            if (e[0] < 2 && e[1] < 9 || 1 === e[0] && 9 === e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }(e), t.Util = S, t.Alert = k, t.Button = C, t.Carousel = E, t.Collapse = A, t.Dropdown = bt, t.Modal = Tt, t.Popover = kt, t.Scrollspy = Ct, t.Tab = Et, t.Tooltip = St, Object.defineProperty(t, "__esModule", {
            value: !0
        })
    });