"object" != typeof JSON && (JSON = {}),
    function() {
        "use strict";

        function f(e) {
            return e < 10 ? "0" + e : e
        }

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var a, r, n, o, i, s = gap,
                u = t[e];
            switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u) {
                case "string":
                    return quote(u);
                case "number":
                    return isFinite(u) ? String(u) : "null";
                case "boolean":
                case "null":
                    return String(u);
                case "object":
                    if (!u) return "null";
                    if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(u)) {
                        for (o = u.length, a = 0; a < o; a += 1) i[a] = str(a, u) || "null";
                        return n = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + s + "]" : "[" + i.join(",") + "]", gap = s, n
                    }
                    if (rep && "object" == typeof rep)
                        for (o = rep.length, a = 0; a < o; a += 1) "string" == typeof rep[a] && ((n = str(r = rep[a], u)) && i.push(quote(r) + (gap ? ": " : ":") + n));
                    else
                        for (r in u) Object.prototype.hasOwnProperty.call(u, r) && ((n = str(r, u)) && i.push(quote(r) + (gap ? ": " : ":") + n));
                    return n = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + s + "}" : "{" + i.join(",") + "}", gap = s, n
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "  ": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function(e, t, a) {
            var r;
            if (indent = gap = "", "number" == typeof a)
                for (r = 0; r < a; r += 1) indent += " ";
            else "string" == typeof a && (indent = a);
            if (!(rep = t) || "function" == typeof t || "object" == typeof t && "number" == typeof t.length) return str("", {
                "": e
            });
            throw new Error("JSON.stringify")
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var a, r, n = e[t];
                if (n && "object" == typeof n)
                    for (a in n) Object.prototype.hasOwnProperty.call(n, a) && (void 0 !== (r = walk(n, a)) ? n[a] = r : delete n[a]);
                return reviver.call(e, t, n)
            }
            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(),
    function(e) {
        "use strict";
        var t = e.History = e.History || {},
            r = e.jQuery;
        if (void 0 !== t.Adapter) throw new Error("History.js Adapter has already been loaded...");
        t.Adapter = {
            bind: function(e, t, a) {
                r(e).bind(t, a)
            },
            trigger: function(e, t, a) {
                r(e).trigger(t, a)
            },
            extractEventData: function(e, t, a) {
                return t && t.originalEvent && t.originalEvent[e] || a && a[e] || void 0
            },
            onDomLoad: function(e) {
                r(e)
            }
        }, void 0 !== t.init && t.init()
    }(window),
    function(c) {
        "use strict";
        var e = c.document,
            t = c.setTimeout || t,
            a = c.clearTimeout || a,
            s = c.setInterval || s,
            d = c.History = c.History || {};
        if (void 0 !== d.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
        d.initHtml4 = function() {
            if (void 0 !== d.initHtml4.initialized) return !1;
            d.initHtml4.initialized = !0, d.enabled = !0, d.savedHashes = [], d.isLastHash = function(e) {
                return e === d.getHashByIndex()
            }, d.isHashEqual = function(e, t) {
                return (e = encodeURIComponent(e).replace(/%25/g, "%")) === (t = encodeURIComponent(t).replace(/%25/g, "%"))
            }, d.saveHash = function(e) {
                return !d.isLastHash(e) && (d.savedHashes.push(e), !0)
            }, d.getHashByIndex = function(e) {
                return void 0 === e ? d.savedHashes[d.savedHashes.length - 1] : e < 0 ? d.savedHashes[d.savedHashes.length + e] : d.savedHashes[e]
            }, d.discardedHashes = {}, d.discardedStates = {}, d.discardState = function(e, t, a) {
                var r, n = d.getHashByState(e);
                return r = {
                    discardedState: e,
                    backState: a,
                    forwardState: t
                }, d.discardedStates[n] = r, !0
            }, d.discardHash = function(e, t, a) {
                var r = {
                    discardedHash: e,
                    backState: a,
                    forwardState: t
                };
                return d.discardedHashes[e] = r, !0
            }, d.discardedState = function(e) {
                var t = d.getHashByState(e);
                return d.discardedStates[t] || !1
            }, d.discardedHash = function(e) {
                return d.discardedHashes[e] || !1
            }, d.recycleState = function(e) {
                var t = d.getHashByState(e);
                return d.discardedState(e) && delete d.discardedStates[t], !0
            }, d.emulated.hashChange && (d.hashChangeInit = function() {
                d.checkerFunction = null;
                var a, r, n, o = "",
                    i = Boolean(d.getHash());
                return d.isInternetExplorer() ? ("historyjs-iframe", (a = e.createElement("iframe")).setAttribute("id", "historyjs-iframe"), a.setAttribute("src", "#"), a.style.display = "none", e.body.appendChild(a), a.contentWindow.document.open(), a.contentWindow.document.close(), r = "", n = !1, d.checkerFunction = function() {
                    if (n) return !1;
                    n = !0;
                    var e = d.getHash(),
                        t = d.getHash(a.contentWindow.document);
                    return e !== o ? (t !== (o = e) && (r = t = e, a.contentWindow.document.open(), a.contentWindow.document.close(), a.contentWindow.document.location.hash = d.escapeHash(e)), d.Adapter.trigger(c, "hashchange")) : t !== r && (r = t, i && "" === t ? d.back() : d.setHash(t, !1)), !(n = !1)
                }) : d.checkerFunction = function() {
                    var e = d.getHash() || "";
                    return e !== o && (o = e, d.Adapter.trigger(c, "hashchange")), !0
                }, d.intervalList.push(s(d.checkerFunction, d.options.hashChangeInterval)), !0
            }, d.Adapter.onDomLoad(d.hashChangeInit)), d.emulated.pushState && (d.onHashChange = function(e) {
                var t, a = e && e.newURL || d.getLocationHref(),
                    r = d.getHashByUrl(a),
                    n = null;
                return d.isLastHash(r) ? (d.busy(!1), !1) : (d.doubleCheckComplete(), d.saveHash(r), r && d.isTraditionalAnchor(r) ? (d.Adapter.trigger(c, "anchorchange"), d.busy(!1), !1) : (n = d.extractState(d.getFullUrl(r || d.getLocationHref()), !0), d.isLastSavedState(n) ? (d.busy(!1), !1) : (d.getHashByState(n), (t = d.discardedState(n)) ? (d.getHashByIndex(-2) === d.getHashByState(t.forwardState) ? d.back(!1) : d.forward(!1), !1) : (d.pushState(n.data, n.title, encodeURI(n.url), !1), !0))))
            }, d.Adapter.bind(c, "hashchange", d.onHashChange), d.pushState = function(e, t, a, r) {
                if (a = encodeURI(a).replace(/%25/g, "%"), d.getHashByUrl(a)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (!1 !== r && d.busy()) return d.pushQueue({
                    scope: d,
                    callback: d.pushState,
                    args: arguments,
                    queue: r
                }), !1;
                d.busy(!0);
                var n = d.createStateObject(e, t, a),
                    o = d.getHashByState(n),
                    i = d.getState(!1),
                    s = d.getHashByState(i),
                    u = d.getHash(),
                    l = d.expectedStateId == n.id;
                return d.storeState(n), d.expectedStateId = n.id, d.recycleState(n), d.setTitle(n), o === s ? (d.busy(!1), !1) : (d.saveState(n), l || d.Adapter.trigger(c, "statechange"), d.isHashEqual(o, u) || d.isHashEqual(o, d.getShortUrl(d.getLocationHref())) || d.setHash(o, !1), d.busy(!1), !0)
            }, d.replaceState = function(e, t, a, r) {
                if (a = encodeURI(a).replace(/%25/g, "%"), d.getHashByUrl(a)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
                if (!1 !== r && d.busy()) return d.pushQueue({
                    scope: d,
                    callback: d.replaceState,
                    args: arguments,
                    queue: r
                }), !1;
                d.busy(!0);
                var n = d.createStateObject(e, t, a),
                    o = d.getHashByState(n),
                    i = d.getState(!1),
                    s = d.getHashByState(i),
                    u = d.getStateByIndex(-2);
                return d.discardState(i, n, u), o === s ? (d.storeState(n), d.expectedStateId = n.id, d.recycleState(n), d.setTitle(n), d.saveState(n), d.Adapter.trigger(c, "statechange"), d.busy(!1)) : d.pushState(n.data, n.title, n.url, !1), !0
            }), d.emulated.pushState && d.getHash() && !d.emulated.hashChange && d.Adapter.onDomLoad(function() {
                d.Adapter.trigger(c, "hashchange")
            })
        }, void 0 !== d.init && d.init()
    }(window),
    function(i, a) {
        "use strict";
        var s = i.console || a,
            u = i.document,
            r = i.navigator,
            n = !1,
            o = i.setTimeout,
            l = i.clearTimeout,
            c = i.setInterval,
            d = i.clearInterval,
            p = i.JSON,
            h = i.alert,
            g = i.History = i.History || {},
            f = i.history;
        try {
            (n = i.sessionStorage).setItem("TEST", "1"), n.removeItem("TEST")
        } catch (e) {
            n = !1
        }
        if (p.stringify = p.stringify || p.encode, p.parse = p.parse || p.decode, void 0 !== g.init) throw new Error("History.js Core has already been loaded...");
        g.init = function(e) {
            return void 0 !== g.Adapter && (void 0 !== g.initCore && g.initCore(), void 0 !== g.initHtml4 && g.initHtml4(), !0)
        }, g.initCore = function(e) {
            if (void 0 !== g.initCore.initialized) return !1;
            if (g.initCore.initialized = !0, g.options = g.options || {}, g.options.hashChangeInterval = g.options.hashChangeInterval || 100, g.options.safariPollInterval = g.options.safariPollInterval || 500, g.options.doubleCheckInterval = g.options.doubleCheckInterval || 500, g.options.disableSuid = g.options.disableSuid || !1, g.options.storeInterval = g.options.storeInterval || 1e3, g.options.busyDelay = g.options.busyDelay || 250, g.options.debug = g.options.debug || !1, g.options.initialTitle = g.options.initialTitle || u.title, g.options.html4Mode = g.options.html4Mode || !1, g.options.delayInit = g.options.delayInit || !1, g.intervalList = [], g.clearAllIntervals = function() {
                    var e, t = g.intervalList;
                    if (null != t) {
                        for (e = 0; e < t.length; e++) d(t[e]);
                        g.intervalList = null
                    }
                }, g.debug = function() {
                    g.options.debug && g.log.apply(g, arguments)
                }, g.log = function() {
                    var e, t, a, r, n, o = void 0 !== s && void 0 !== s.log && void 0 !== s.log.apply,
                        i = u.getElementById("log");
                    for (o ? (e = (r = Array.prototype.slice.call(arguments)).shift(), void 0 !== s.debug ? s.debug.apply(s, [e, r]) : s.log.apply(s, [e, r])) : e = "\n" + arguments[0] + "\n", t = 1, a = arguments.length; t < a; ++t) {
                        if ("object" == typeof(n = arguments[t]) && void 0 !== p) try {
                            n = p.stringify(n)
                        } catch (e) {}
                        e += "\n" + n + "\n"
                    }
                    return i ? (i.value += e + "\n-----\n", i.scrollTop = i.scrollHeight - i.clientHeight) : o || h(e), !0
                }, g.getInternetExplorerMajorVersion = function() {
                    return g.getInternetExplorerMajorVersion.cached = void 0 !== g.getInternetExplorerMajorVersion.cached ? g.getInternetExplorerMajorVersion.cached : function() {
                        for (var e = 3, t = u.createElement("div"), a = t.getElementsByTagName("i");
                            (t.innerHTML = "\x3c!--[if gt IE " + ++e + "]><i></i><![endif]--\x3e") && a[0];);
                        return 4 < e && e
                    }()
                }, g.isInternetExplorer = function() {
                    return g.isInternetExplorer.cached = void 0 !== g.isInternetExplorer.cached ? g.isInternetExplorer.cached : Boolean(g.getInternetExplorerMajorVersion())
                }, g.options.html4Mode ? g.emulated = {
                    pushState: !0,
                    hashChange: !0
                } : g.emulated = {
                    pushState: !Boolean(i.history && i.history.pushState && i.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(r.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(r.userAgent)),
                    hashChange: Boolean(!("onhashchange" in i || "onhashchange" in u) || g.isInternetExplorer() && g.getInternetExplorerMajorVersion() < 8)
                }, g.enabled = !g.emulated.pushState, g.bugs = {
                    setHash: Boolean(!g.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
                    safariPoll: Boolean(!g.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
                    ieDoubleCheck: Boolean(g.isInternetExplorer() && g.getInternetExplorerMajorVersion() < 8),
                    hashEscape: Boolean(g.isInternetExplorer() && g.getInternetExplorerMajorVersion() < 7)
                }, g.isEmptyObject = function(e) {
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                }, g.cloneObject = function(e) {
                    var t;
                    return e ? (t = p.stringify(e), p.parse(t)) : {}
                }, g.getRootUrl = function() {
                    var e = u.location.protocol + "//" + (u.location.hostname || u.location.host);
                    return u.location.port && (e += ":" + u.location.port), e += "/"
                }, g.getBaseHref = function() {
                    var e = u.getElementsByTagName("base"),
                        t = "";
                    return 1 === e.length && (t = e[0].href.replace(/[^\/]+$/, "")), (t = t.replace(/\/+$/, "")) && (t += "/"), t
                }, g.getBaseUrl = function() {
                    return g.getBaseHref() || g.getBasePageUrl() || g.getRootUrl()
                }, g.getPageUrl = function() {
                    return ((g.getState(!1, !1) || {}).url || g.getLocationHref()).replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, a) {
                        return /\./.test(e) ? e : e + "/"
                    })
                }, g.getBasePageUrl = function() {
                    return g.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, a) {
                        return /[^\/]$/.test(e) ? "" : e
                    }).replace(/\/+$/, "") + "/"
                }, g.getFullUrl = function(e, t) {
                    var a = e,
                        r = e.substring(0, 1);
                    return t = void 0 === t || t, /[a-z]+\:\/\//.test(e) || (a = "/" === r ? g.getRootUrl() + e.replace(/^\/+/, "") : "#" === r ? g.getPageUrl().replace(/#.*/, "") + e : "?" === r ? g.getPageUrl().replace(/[\?#].*/, "") + e : t ? g.getBaseUrl() + e.replace(/^(\.\/)+/, "") : g.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), a.replace(/\#$/, "")
                }, g.getShortUrl = function(e) {
                    var t = e,
                        a = g.getBaseUrl(),
                        r = g.getRootUrl();
                    return g.emulated.pushState && (t = t.replace(a, "")), t = t.replace(r, "/"), g.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
                }, g.getLocationHref = function(e) {
                    return (e = e || u).URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : -1 == e.URL.indexOf("#") && -1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
                }, g.store = {}, g.idToState = g.idToState || {}, g.stateToId = g.stateToId || {}, g.urlToId = g.urlToId || {}, g.storedStates = g.storedStates || [], g.savedStates = g.savedStates || [], g.normalizeStore = function() {
                    g.store.idToState = g.store.idToState || {}, g.store.urlToId = g.store.urlToId || {}, g.store.stateToId = g.store.stateToId || {}
                }, g.getState = function(e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var a = g.getLastSavedState();
                    return !a && t && (a = g.createStateObject()), e && ((a = g.cloneObject(a)).url = a.cleanUrl || a.url), a
                }, g.getIdByState = function(e) {
                    var t, a = g.extractId(e.url);
                    if (!a)
                        if (t = g.getStateString(e), void 0 !== g.stateToId[t]) a = g.stateToId[t];
                        else if (void 0 !== g.store.stateToId[t]) a = g.store.stateToId[t];
                    else {
                        for (; a = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), void 0 !== g.idToState[a] || void 0 !== g.store.idToState[a];);
                        g.stateToId[t] = a, g.idToState[a] = e
                    }
                    return a
                }, g.normalizeState = function(e) {
                    var t, a;
                    return e && "object" == typeof e || (e = {}), void 0 !== e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), (t = {
                        normalized: !0
                    }).title = e.title || "", t.url = g.getFullUrl(e.url ? e.url : g.getLocationHref()), t.hash = g.getShortUrl(t.url), t.data = g.cloneObject(e.data), t.id = g.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, a = !g.isEmptyObject(t.data), (t.title || a) && !0 !== g.options.disableSuid && (t.hash = g.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = g.getFullUrl(t.hash), (g.emulated.pushState || g.bugs.safariPoll) && g.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
                }, g.createStateObject = function(e, t, a) {
                    var r = {
                        data: e,
                        title: t,
                        url: a
                    };
                    return r = g.normalizeState(r)
                }, g.getStateById = function(e) {
                    return e = String(e), g.idToState[e] || g.store.idToState[e] || a
                }, g.getStateString = function(e) {
                    var t;
                    return t = {
                        data: g.normalizeState(e).data,
                        title: e.title,
                        url: e.url
                    }, p.stringify(t)
                }, g.getStateId = function(e) {
                    return g.normalizeState(e).id
                }, g.getHashByState = function(e) {
                    return g.normalizeState(e).hash
                }, g.extractId = function(e) {
                    var t, a;
                    return a = -1 != e.indexOf("#") ? e.split("#")[0] : e, (t = /(.*)\&_suid=([0-9]+)$/.exec(a)) && t[1] || e, (t ? String(t[2] || "") : "") || !1
                }, g.isTraditionalAnchor = function(e) {
                    return !/[\/\?\.]/.test(e)
                }, g.extractState = function(e, t) {
                    var a, r, n = null;
                    return t = t || !1, (a = g.extractId(e)) && (n = g.getStateById(a)), n || (r = g.getFullUrl(e), (a = g.getIdByUrl(r) || !1) && (n = g.getStateById(a)), n || !t || g.isTraditionalAnchor(e) || (n = g.createStateObject(null, null, r))), n
                }, g.getIdByUrl = function(e) {
                    return g.urlToId[e] || g.store.urlToId[e] || a
                }, g.getLastSavedState = function() {
                    return g.savedStates[g.savedStates.length - 1] || a
                }, g.getLastStoredState = function() {
                    return g.storedStates[g.storedStates.length - 1] || a
                }, g.hasUrlDuplicate = function(e) {
                    var t;
                    return (t = g.extractState(e.url)) && t.id !== e.id
                }, g.storeState = function(e) {
                    return g.urlToId[e.url] = e.id, g.storedStates.push(g.cloneObject(e)), e
                }, g.isLastSavedState = function(e) {
                    var t = !1;
                    return g.savedStates.length && (t = e.id === g.getLastSavedState().id), t
                }, g.saveState = function(e) {
                    return !g.isLastSavedState(e) && (g.savedStates.push(g.cloneObject(e)), !0)
                }, g.getStateByIndex = function(e) {
                    return void 0 === e ? g.savedStates[g.savedStates.length - 1] : e < 0 ? g.savedStates[g.savedStates.length + e] : g.savedStates[e]
                }, g.getCurrentIndex = function() {
                    return g.savedStates.length < 1 ? 0 : g.savedStates.length - 1
                }, g.getHash = function(e) {
                    var t = g.getLocationHref(e);
                    return g.getHashByUrl(t)
                }, g.unescapeHash = function(e) {
                    var t = g.normalizeHash(e);
                    return t = decodeURIComponent(t)
                }, g.normalizeHash = function(e) {
                    return e.replace(/[^#]*#/, "").replace(/#.*/, "")
                }, g.setHash = function(e, t) {
                    var a, r;
                    return !1 !== t && g.busy() ? (g.pushQueue({
                        scope: g,
                        callback: g.setHash,
                        args: arguments,
                        queue: t
                    }), !1) : (g.busy(!0), (a = g.extractState(e, !0)) && !g.emulated.pushState ? g.pushState(a.data, a.title, a.url, !1) : g.getHash() !== e && (g.bugs.setHash ? (r = g.getPageUrl(), g.pushState(null, null, r + "#" + e, !1)) : u.location.hash = e), g)
                }, g.escapeHash = function(e) {
                    var t = g.normalizeHash(e);
                    return t = i.encodeURIComponent(t), g.bugs.hashEscape || (t = t.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), t
                }, g.getHashByUrl = function(e) {
                    var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
                    return t = g.unescapeHash(t)
                }, g.setTitle = function(e) {
                    var t, a = e.title;
                    a || (t = g.getStateByIndex(0)) && t.url === e.url && (a = t.title || g.options.initialTitle);
                    try {
                        u.getElementsByTagName("title")[0].innerHTML = a.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
                    } catch (e) {}
                    return u.title = a, g
                }, g.queues = [], g.busy = function(e) {
                    if (void 0 !== e ? g.busy.flag = e : void 0 === g.busy.flag && (g.busy.flag = !1), !g.busy.flag) {
                        l(g.busy.timeout);
                        var r = function() {
                            var e, t, a;
                            if (!g.busy.flag)
                                for (e = g.queues.length - 1; 0 <= e; --e) 0 !== (t = g.queues[e]).length && (a = t.shift(), g.fireQueueItem(a), g.busy.timeout = o(r, g.options.busyDelay))
                        };
                        g.busy.timeout = o(r, g.options.busyDelay)
                    }
                    return g.busy.flag
                }, g.busy.flag = !1, g.fireQueueItem = function(e) {
                    return e.callback.apply(e.scope || g, e.args || [])
                }, g.pushQueue = function(e) {
                    return g.queues[e.queue || 0] = g.queues[e.queue || 0] || [], g.queues[e.queue || 0].push(e), g
                }, g.queue = function(e, t) {
                    return "function" == typeof e && (e = {
                        callback: e
                    }), void 0 !== t && (e.queue = t), g.busy() ? g.pushQueue(e) : g.fireQueueItem(e), g
                }, g.clearQueue = function() {
                    return g.busy.flag = !1, g.queues = [], g
                }, g.stateChanged = !1, g.doubleChecker = !1, g.doubleCheckComplete = function() {
                    return g.stateChanged = !0, g.doubleCheckClear(), g
                }, g.doubleCheckClear = function() {
                    return g.doubleChecker && (l(g.doubleChecker), g.doubleChecker = !1), g
                }, g.doubleCheck = function(e) {
                    return g.stateChanged = !1, g.doubleCheckClear(), g.bugs.ieDoubleCheck && (g.doubleChecker = o(function() {
                        return g.doubleCheckClear(), g.stateChanged || e(), !0
                    }, g.options.doubleCheckInterval)), g
                }, g.safariStatePoll = function() {
                    var e = g.extractState(g.getLocationHref());
                    if (!g.isLastSavedState(e)) return e || g.createStateObject(), g.Adapter.trigger(i, "popstate"), g
                }, g.back = function(e) {
                    return !1 !== e && g.busy() ? (g.pushQueue({
                        scope: g,
                        callback: g.back,
                        args: arguments,
                        queue: e
                    }), !1) : (g.busy(!0), g.doubleCheck(function() {
                        g.back(!1)
                    }), f.go(-1), !0)
                }, g.forward = function(e) {
                    return !1 !== e && g.busy() ? (g.pushQueue({
                        scope: g,
                        callback: g.forward,
                        args: arguments,
                        queue: e
                    }), !1) : (g.busy(!0), g.doubleCheck(function() {
                        g.forward(!1)
                    }), f.go(1), !0)
                }, g.go = function(e, t) {
                    var a;
                    if (0 < e)
                        for (a = 1; a <= e; ++a) g.forward(t);
                    else {
                        if (!(e < 0)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
                        for (a = -1; e <= a; --a) g.back(t)
                    }
                    return g
                }, g.emulated.pushState) {
                var t = function() {};
                g.pushState = g.pushState || t, g.replaceState = g.replaceState || t
            } else g.onPopState = function(e, t) {
                var a, r, n = !1,
                    o = !1;
                return g.doubleCheckComplete(), (a = g.getHash()) ? ((r = g.extractState(a || g.getLocationHref(), !0)) ? g.replaceState(r.data, r.title, r.url, !1) : (g.Adapter.trigger(i, "anchorchange"), g.busy(!1)), g.expectedStateId = !1) : (o = (o = (n = g.Adapter.extractEventData("state", e, t) || !1) ? g.getStateById(n) : g.expectedStateId ? g.getStateById(g.expectedStateId) : g.extractState(g.getLocationHref())) || g.createStateObject(null, null, g.getLocationHref()), g.expectedStateId = !1, g.isLastSavedState(o) ? (g.busy(!1), !1) : (g.storeState(o), g.saveState(o), g.setTitle(o), g.Adapter.trigger(i, "statechange"), g.busy(!1), !0))
            }, g.Adapter.bind(i, "popstate", g.onPopState), g.pushState = function(e, t, a, r) {
                if (g.getHashByUrl(a) && g.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (!1 !== r && g.busy()) return g.pushQueue({
                    scope: g,
                    callback: g.pushState,
                    args: arguments,
                    queue: r
                }), !1;
                g.busy(!0);
                var n = g.createStateObject(e, t, a);
                return g.isLastSavedState(n) ? g.busy(!1) : (g.storeState(n), g.expectedStateId = n.id, f.pushState(n.id, n.title, n.url), g.Adapter.trigger(i, "popstate")), !0
            }, g.replaceState = function(e, t, a, r) {
                if (g.getHashByUrl(a) && g.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (!1 !== r && g.busy()) return g.pushQueue({
                    scope: g,
                    callback: g.replaceState,
                    args: arguments,
                    queue: r
                }), !1;
                g.busy(!0);
                var n = g.createStateObject(e, t, a);
                return g.isLastSavedState(n) ? g.busy(!1) : (g.storeState(n), g.expectedStateId = n.id, f.replaceState(n.id, n.title, n.url), g.Adapter.trigger(i, "popstate")), !0
            };
            if (n) {
                try {
                    g.store = p.parse(n.getItem("History.store")) || {}
                } catch (e) {
                    g.store = {}
                }
                g.normalizeStore()
            } else g.store = {}, g.normalizeStore();
            g.Adapter.bind(i, "unload", g.clearAllIntervals), g.saveState(g.storeState(g.extractState(g.getLocationHref(), !0))), n && (g.onUnload = function() {
                var t, e, a;
                try {
                    t = p.parse(n.getItem("History.store")) || {}
                } catch (e) {
                    t = {}
                }
                for (e in t.idToState = t.idToState || {}, t.urlToId = t.urlToId || {}, t.stateToId = t.stateToId || {}, g.idToState) g.idToState.hasOwnProperty(e) && (t.idToState[e] = g.idToState[e]);
                for (e in g.urlToId) g.urlToId.hasOwnProperty(e) && (t.urlToId[e] = g.urlToId[e]);
                for (e in g.stateToId) g.stateToId.hasOwnProperty(e) && (t.stateToId[e] = g.stateToId[e]);
                g.store = t, g.normalizeStore(), a = p.stringify(t);
                try {
                    n.setItem("History.store", a)
                } catch (e) {
                    if (e.code !== DOMException.QUOTA_EXCEEDED_ERR) throw e;
                    n.length && (n.removeItem("History.store"), n.setItem("History.store", a))
                }
            }, g.intervalList.push(c(g.onUnload, g.options.storeInterval)), g.Adapter.bind(i, "beforeunload", g.onUnload), g.Adapter.bind(i, "unload", g.onUnload)), g.emulated.pushState || (g.bugs.safariPoll && g.intervalList.push(c(g.safariStatePoll, g.options.safariPollInterval)), "Apple Computer, Inc." !== r.vendor && "Mozilla" !== (r.appCodeName || "") || (g.Adapter.bind(i, "hashchange", function() {
                g.Adapter.trigger(i, "popstate")
            }), g.getHash() && g.Adapter.onDomLoad(function() {
                g.Adapter.trigger(i, "hashchange")
            })))
        }, g.options && g.options.delayInit || g.init()
    }(window);