! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, n, o, i, r, a, s, l = "Close",
        c = "BeforeClose",
        d = "MarkupParse",
        u = "Open",
        p = "Change",
        f = ".nov",
        m = "nov-ready",
        g = "nov-removing",
        v = "nov-prevent-close",
        h = function() {},
        $ = !!window.jQuery,
        C = e(window),
        y = function(e, n) {
            t.ev.on("nov" + e + f, n)
        },
        b = function(t, n, o, i) {
            var r = document.createElement("div");
            return r.className = "nov-" + t, o && (r.innerHTML = o), i ? n && n.appendChild(r) : (r = e(r), n && r.appendTo(n)), r
        },
        w = function(n, o) {
            t.ev.triggerHandler("nov" + n, o), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(o) ? o : [o]))
        },
        I = function(n) {
            return n === s && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), s = n), t.currTemplate.closeBtn
        },
        x = function() {
            e.magnificPopup.instance || ((t = new h).init(), e.magnificPopup.instance = t)
        },
        _ = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    h.prototype = {
        constructor: h,
        init: function() {
            var n = navigator.appVersion;
            t.isIE7 = -1 !== n.indexOf("MSIE 7."), t.isIE8 = -1 !== n.indexOf("MSIE 8."), t.isLowIE = t.isIE7 || t.isIE8, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = _(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            if (o || (o = e(document.body)), !1 === n.isObj) {
                t.items = n.items.toArray(), t.index = 0;
                var r, s, l = n.items;
                for (r = 0; r < l.length; r++)
                    if ((s = l[r]).parsed && (s = s.el[0]), s === n.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) {
                t.updateItemHTML();
                return
            }
            t.types = [], a = "", n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = b("bg").on("click" + f, function() {
                t.close()
            }), t.wrap = b("wrap").attr("tabindex", -1).on("click" + f, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = b("container", t.wrap)), t.contentContainer = b("content"), t.st.preloader && (t.preloader = b("preloader", t.container, t.st.tLoading));
            var c = e.magnificPopup.modules;
            for (r = 0; r < c.length; r++) {
                var p = c[r];
                t["init" + (p = p.charAt(0).toUpperCase() + p.slice(1))].call(t)
            }
            w("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (y(d, function(e, t, n, o) {
                n.close_replaceWith = I(o.type)
            }), a += " nov-close-btn-in") : t.wrap.append(I())), t.st.alignTop && (a += " nov-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: C.scrollTop(),
                position: "absolute"
            }), !1 !== t.st.fixedBgPos && ("auto" !== t.st.fixedBgPos || t.fixedContentPos) || t.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && i.on("keyup" + f, function(e) {
                27 === e.keyCode && t.close()
            }), C.on("resize" + f, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (a += " nov-auto-cursor"), a && t.wrap.addClass(a);
            var g = t.wH = C.height(),
                v = {};
            if (t.fixedContentPos && t._hasScrollBar(g)) {
                var h = t._getScrollbarSize();
                h && (v.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : v.overflow = "hidden");
            var $ = t.st.mainClass;
            return t.isIE7 && ($ += " nov-ie7"), $ && t._addClassToMFP($), t.updateItemHTML(), w("BuildControls"), e("html").css(v), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || o), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(m), t._setFocus()) : t.bgOverlay.addClass(m), i.on("focusin" + f, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(g), w(u), n
        },
        close: function() {
            t.isOpen && (w(c), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(g), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            w(l);
            var n = g + " " + m + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : o.overflow = "", e("html").css(o)
            }
            i.off("keyup" + f + " focusin" + f), t.ev.off(f), t.wrap.attr("class", "nov-wrap").removeAttr("style"), t.bgOverlay.attr("class", "nov-bg"), t.container.attr("class", "nov-container"), t.st.showCloseBtn && (!t.st.closeBtnInside || !0 === t.currTemplate[t.currItem.type]) && t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, w("AfterClose")
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    o = window.innerHeight * n;
                t.wrap.css("height", o), t.wH = o
            } else t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), w("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var o = n.type;
            if (w("BeforeChange", [t.currItem ? t.currItem.type : "", o]), t.currItem = n, !t.currTemplate[o]) {
                var i = !!t.st[o] && t.st[o].markup;
                w("FirstMarkupParse", i), i ? t.currTemplate[o] = e(i) : t.currTemplate[o] = !0
            }
            r && r !== n.type && t.container.removeClass("nov-" + r + "-holder");
            var a = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](n, t.currTemplate[o]);
            t.appendContent(a, o), n.preloaded = !0, w(p, n), r = n.type, t.container.prepend(t.contentContainer), w("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n] ? t.content.find(".nov-close").length && t.content.find(".zmdi-close").length || t.content.append(I()) : t.content = e : t.content = "", w("BeforeAppend"), t.container.addClass("nov-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var o, i = t.items[n];
            if (i.tagName ? i = {
                    el: e(i)
                } : (o = i.type, i = {
                    data: i,
                    src: i.src
                }), i.el) {
                for (var r = t.types, a = 0; a < r.length; a++)
                    if (i.el.hasClass("nov-" + r[a])) {
                        o = r[a];
                        break
                    }
                i.src = i.el.attr("data-nov-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = o || t.st.type || "inline", i.index = n, i.parsed = !0, t.items[n] = i, w("ElementParse", i), t.items[n]
        },
        addGroup: function(e, n) {
            var o = function(o) {
                o.novEl = this, t._openClick(o, e, n)
            };
            n || (n = {});
            var i = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(i).on(i, o)) : (n.isObj = !1, n.delegate ? e.off(i).on(i, n.delegate, o) : (n.items = e, e.off(i).on(i, o)))
        },
        _openClick: function(n, o, i) {
            if ((void 0 !== i.midClick ? i.midClick : e.magnificPopup.defaults.midClick) || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
                var r = void 0 !== i.disableOn ? i.disableOn : e.magnificPopup.defaults.disableOn;
                if (r) {
                    if (e.isFunction(r)) {
                        if (!r.call(t)) return !0
                    } else if (C.width() < r) return !0
                }
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), i.el = e(n.novEl), i.delegate && (i.items = o.find(i.delegate)), t.open(i)
            }
        },
        updateStatus: function(e, o) {
            if (t.preloader) {
                n !== e && t.container.removeClass("nov-s-" + n), o || "loading" !== e || (o = t.st.tLoading);
                var i = {
                    status: e,
                    text: o
                };
                w("UpdateStatus", i), e = i.status, o = i.text, t.preloader.html(o), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("nov-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(v)) {
                var o = t.st.closeOnContentClick,
                    i = t.st.closeOnBgClick;
                if (o && i || !t.content || e(n).hasClass("nov-close") || e(n).hasClass("zmdi-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (o) return !0
                } else if (i && e.contains(document, n)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || C.height())
        },
        _setFocus: function() {},
        _onFocusIn: function(n) {
            if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target)) return t._setFocus(), !1
        },
        _parseMarkup: function(t, n, o) {
            var i;
            o.data && (n = e.extend(o.data, n)), w(d, [t, n, o]), e.each(n, function(e, n) {
                if (void 0 === n || !1 === n) return !0;
                if ((i = e.split("_")).length > 1) {
                    var o = t.find(f + "-" + i[0]);
                    if (o.length > 0) {
                        var r = i[1];
                        "replaceWith" === r ? o[0] !== n[0] && o.replaceWith(n) : "img" === r ? o.is("img") ? o.attr("src", n) : o.replaceWith('<img src="' + n + '" class="' + o.attr("class") + '" />') : o.attr(i[1], n)
                    }
                } else t.find(f + "-" + e).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return t.scrollbarSize
        }
    }, e.magnificPopup = {
        instance: null,
        proto: h.prototype,
        modules: [],
        open: function(t, n) {
            return x(), (t = t ? e.extend(!0, {}, t) : {}).isObj = !0, t.index = n || 0, this.instance.open(t)
        },
        close: function() {
            return e.magnificPopup.instance && e.magnificPopup.instance.close()
        },
        registerModule: function(t, n) {
            n.options && (e.magnificPopup.defaults[t] = n.options), e.extend(this.proto, n.proto), this.modules.push(t)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="nov-close">x</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, e.fn.magnificPopup = function(n) {
        x();
        var o = e(this);
        if ("string" == typeof n) {
            if ("open" === n) {
                var i, r = $ ? o.data("magnificPopup") : o[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                r.items ? i = r.items[a] : (i = o, r.delegate && (i = i.find(r.delegate)), i = i.eq(a)), t._openClick({
                    novEl: i
                }, o, r)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1))
        } else n = e.extend(!0, {}, n), $ ? o.data("magnificPopup", n) : o[0].magnificPopup = n, t.addGroup(o, n);
        return o
    };
    var k, E, S, P = "inline",
        T = function() {
            S && (E.after(S.addClass(k)).detach(), S = null)
        };
    e.magnificPopup.registerModule(P, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(P), y(l + "." + P, function() {
                    T()
                })
            },
            getInline: function(n, o) {
                if (T(), n.src) {
                    var i = t.st.inline,
                        r = e(n.src);
                    if (r.length) {
                        var a = r[0].parentNode;
                        a && a.tagName && (E || (E = b(k = i.hiddenClass), k = "nov-" + k), S = r.after(E).detach().removeClass(k)), t.updateStatus("ready")
                    } else t.updateStatus("error", i.tNotFound), r = e("<div>");
                    return n.inlineElement = r, r
                }
                return t.updateStatus("ready"), t._parseMarkup(o, {}, n), o
            }
        }
    });
    var z, O = "ajax",
        M = function() {
            z && o.removeClass(z)
        },
        B = function() {
            M(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "nov-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(O), z = t.st.ajax.cursor, y(l + "." + O, B), y("BeforeChange." + O, B)
            },
            getAjax: function(n) {
                z && o.addClass(z), t.updateStatus("loading");
                var i = e.extend({
                    url: n.src,
                    success: function(o, i, r) {
                        var a = {
                            data: o,
                            xhr: r
                        };
                        w("ParseAjax", a), t.appendContent(e(a.data), O), n.finished = !0, M(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(m)
                        }, 16), t.updateStatus("ready"), w("AjaxContentAdded")
                    },
                    error: function() {
                        M(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i), ""
            }
        }
    });
    var F, H, L = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var o = t.st.image.titleSrc;
        if (o) {
            if (e.isFunction(o)) return o.call(t, n);
            if (n.el) return n.el.attr(o) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="nov-figure"><div class="nov-close"></div><figure><div class="nov-img"></div><figcaption><div class="nov-bottom-bar"><div class="nov-title"></div><div class="nov-counter"></div></div></figcaption></figure></div>',
            cursor: "nov-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = t.st.image,
                    n = ".image";
                t.types.push("image"), y(u + n, function() {
                    "image" === t.currItem.type && e.cursor && o.addClass(e.cursor)
                }), y(l + n, function() {
                    e.cursor && o.removeClass(e.cursor), C.off("resize" + f)
                }), y("Resize" + n, t.resizeImage), t.isLowIE && y("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, F && clearInterval(F), e.isCheckingImgSize = !1, w("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("nov-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    o = e.img[0],
                    i = function(r) {
                        F && clearInterval(F), F = setInterval(function() {
                            if (o.naturalWidth > 0) {
                                t._onImageHasSize(e);
                                return
                            }
                            n > 200 && clearInterval(F), 3 == ++n ? i(10) : 40 === n ? i(50) : 100 === n && i(500)
                        }, r)
                    };
                i(1)
            },
            getImage: function(n, o) {
                var i = 0,
                    r = function() {
                        n && (n.img[0].complete ? (n.img.off(".novloader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, w("ImageLoadComplete")) : ++i < 200 ? setTimeout(r, 100) : a())
                    },
                    a = function() {
                        n && (n.img.off(".novloader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    s = t.st.image,
                    l = o.find(".nov-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "nov-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.novloader", r).on("error.novloader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), (c = n.img[0]).naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return (t._parseMarkup(o, {
                    title: L(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize) ? (F && clearInterval(F), n.loadError ? (o.addClass("nov-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (o.removeClass("nov-loading"), t.updateStatus("ready")), o) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, o.addClass("nov-loading"), t.findImageSize(n)), o)
            }
        }
    }), e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, n = t.st.zoom,
                    o = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var i, r, a = n.duration,
                        s = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("nov-animated-image"),
                                o = "all " + n.duration / 1e3 + "s " + n.easing,
                                i = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                r = "transition";
                            return i["-webkit-" + r] = i["-moz-" + r] = i["-o-" + r] = i[r] = o, t.css(i), t
                        },
                        d = function() {
                            t.content.css("visibility", "visible")
                        };
                    y("BuildControls" + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(i), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom())) {
                                d();
                                return
                            }(r = s(e)).css(t._getOffset()), t.wrap.append(r), i = setTimeout(function() {
                                r.css(t._getOffset(!0)), i = setTimeout(function() {
                                    d(), setTimeout(function() {
                                        r.remove(), e = r = null, w("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), y(c + o, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(i), t.st.removalDelay = a, !e) {
                                if (!(e = t._getItemToZoom())) return;
                                r = s(e)
                            }
                            r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                                r.css(t._getOffset())
                            }, 16)
                        }
                    }), y(l + o, function() {
                        t._allowZoom() && (d(), r && r.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === t.currItem.type
            },
            _getItemToZoom: function() {
                return !!t.currItem.hasSize && t.currItem.img
            },
            _getOffset: function(n) {
                var o, i = (o = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    r = parseInt(o.css("padding-top"), 10),
                    a = parseInt(o.css("padding-bottom"), 10);
                i.top -= e(window).scrollTop() - r;
                var s = {
                    width: o.width(),
                    height: ($ ? o.innerHeight() : o[0].offsetHeight) - a - r
                };
                return (void 0 === H && (H = void 0 !== document.createElement("p").style.MozTransform), H) ? s["-moz-transform"] = s.transform = "translate(" + i.left + "px," + i.top + "px)" : (s.left = i.left, s.top = i.top), s
            }
        }
    });
    var A = "iframe",
        j = function(e) {
            if (t.currTemplate[A]) {
                var n = t.currTemplate[A].find("iframe");
                n.length && (e || (n[0].src = "//about:blank"), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(A, {
        options: {
            markup: '<div class="nov-iframe-scaler"><div class="nov-close"></div><iframe class="nov-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                t.types.push(A), y("BeforeChange", function(e, t, n) {
                    t !== n && (t === A ? j() : n === A && j(!0))
                }), y(l + "." + A, function() {
                    j()
                })
            },
            getIframe: function(n, o) {
                var i = n.src,
                    r = t.st.iframe;
                e.each(r.patterns, function() {
                    if (i.indexOf(this.index) > -1) return this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1
                });
                var a = {};
                return r.srcAction && (a[r.srcAction] = i), t._parseMarkup(o, a, n), t.updateStatus("ready"), o
            }
        }
    });
    var N = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : e < 0 ? n + e : e
        },
        W = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="nov-arrow nov-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var n = t.st.gallery,
                    o = ".nov-gallery",
                    r = Boolean(e.fn.novFastClick);
                if (t.direction = !0, !n || !n.enabled) return !1;
                a += " nov-gallery", y(u + o, function() {
                    n.navigateByImgClick && t.wrap.on("click" + o, ".nov-img", function() {
                        if (t.items.length > 1) return t.next(), !1
                    }), i.on("keydown" + o, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), y("UpdateStatus" + o, function(e, n) {
                    n.text && (n.text = W(n.text, t.currItem.index, t.items.length))
                }), y(d + o, function(e, o, i, r) {
                    var a = t.items.length;
                    i.counter = a > 1 ? W(n.tCounter, r.index, a) : ""
                }), y("BuildControls" + o, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var o = n.arrowMarkup,
                            i = t.arrowLeft = e(o.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(v),
                            a = t.arrowRight = e(o.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(v),
                            s = r ? "novFastClick" : "click";
                        i[s](function() {
                            t.prev()
                        }), a[s](function() {
                            t.next()
                        }), t.isIE7 && (b("b", i[0], !1, !0), b("a", i[0], !1, !0), b("b", a[0], !1, !0), b("a", a[0], !1, !0)), t.container.append(i.add(a))
                    }
                }), y(p + o, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), y(l + o, function() {
                    i.off(o), t.wrap.off("click" + o), t.arrowLeft && r && t.arrowLeft.add(t.arrowRight).destroyNovFastClick(), t.arrowRight = t.arrowLeft = null
                })
            },
            next: function() {
                t.direction = !0, t.index = N(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = N(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    o = Math.min(n[0], t.items.length),
                    i = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? i : o); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? o : i); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = N(n), !t.items[n].preloaded) {
                    var o = t.items[n];
                    o.parsed || (o = t.parseEl(n)), w("LazyLoad", o), "image" === o.type && (o.img = e('<img class="nov-img" />').on("load.novloader", function() {
                        o.hasSize = !0
                    }).on("error.novloader", function() {
                        o.hasSize = !0, o.loadError = !0, w("LazyLoadError", o)
                    }).attr("src", o.src)), o.preloaded = !0
                }
            }
        }
    });
    var R, Z, q, D = "retina";
    e.magnificPopup.registerModule(D, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    (n = isNaN(n) ? n() : n) > 1 && (y("ImageHasSize." + D, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), y("ElementParse." + D, function(t, o) {
                        o.src = e.replaceSrc(o, n)
                    }))
                }
            }
        }
    }), R = "ontouchstart" in window, Z = function() {
        C.off("touchmove" + q + " touchend" + q)
    }, q = ".novFastClick", e.fn.novFastClick = function(t) {
        return e(this).each(function() {
            var n, o, i, r, a, s, l, c = e(this);
            R && c.on("touchstart" + q, function(e) {
                r = !1, s = 1, o = (a = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0]).clientX, i = a.clientY, C.on("touchmove" + q, function(e) {
                    s = (a = e.originalEvent ? e.originalEvent.touches : e.touches).length, (Math.abs((a = a[0]).clientX - o) > 10 || Math.abs(a.clientY - i) > 10) && (r = !0, Z())
                }).on("touchend" + q, function(e) {
                    Z(), !r && !(s > 1) && (l = !0, e.preventDefault(), clearTimeout(n), n = setTimeout(function() {
                        l = !1
                    }, 1e3), t())
                })
            }), c.on("click" + q, function() {
                l || t()
            })
        })
    }, e.fn.destroyNovFastClick = function() {
        e(this).off("touchstart" + q + " click" + q), R && C.off("touchmove" + q + " touchend" + q)
    }, x()
});