! function() {
    var e = function(e) {
            var t = {
                exports: {}
            };
            return e.call(t.exports, t, t.exports), t.exports
        },
        t = function() {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var r = t[i];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, i, r) {
                return i && e(t.prototype, i), r && e(t, r), t
            }
        }(),
        i = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        r = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        },
        o = function e(t, i, r) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, i);
            if (void 0 === o) {
                var n = Object.getPrototypeOf(t);
                return null === n ? void 0 : e(n, i, r)
            }
            if ("value" in o) return o.value;
            var s = o.get;
            return void 0 !== s ? s.call(r) : void 0
        },
        n = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        },
        s = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        },
        a = e((function(e, r) {
            "use strict";

            function o(e) {
                !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1] ? window.open(e, "adminBarWindow") : window.location.assign(e)
            }

            function n() {
                window.location.reload()
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.redirectToUrl = o, r.refreshPage = n;
            var s = function() {
                function e(t) {
                    var r = t.targetNode,
                        o = t.iframeRoot,
                        n = t.iframeSrc,
                        s = t.permanentDomain;
                    i(this, e), this.targetNode = r, this.iframeRoot = o, this.iframeSrc = n, this.permanentDomain = s
                }
                return t(e, [{
                    key: "createIframe",
                    value: function(e, t) {
                        this.iframe = document.createElement("iframe"), this.iframe.setAttribute("title", e), this.iframe.setAttribute("id", t), this.iframe.setAttribute("src", this.iframeSrc), this.iframe.setAttribute("sandbox", "allow-same-origin allow-scripts"), this.iframe.setAttribute("style", this.loadingStyles), this.targetNode.appendChild(this.iframe), this.target = this.iframe.contentWindow
                    }
                }], [{
                    key: "convertStylesObjectToString",
                    value: function(e) {
                        return Object.keys(e).map((function(t) {
                            return t + ": " + e[t] + ";"
                        })).join(" ")
                    }
                }, {
                    key: "returnObjectValues",
                    value: function(e) {
                        return Object.keys(e).map((function(t) {
                            return e[t]
                        }))
                    }
                }]), e
            }();
            r.default = s
        }));
    e((function(e, E) {
        "use strict";
        Object.defineProperty(E, "__esModule", {
            value: !0
        });
        var l = function(e) {
            function s(e) {
                var t = e.targetNode,
                    r = e.iframeRoot,
                    o = e.iframeSrc,
                    a = e.previewToken,
                    E = e.themeStoreId,
                    l = e.permanentDomain;
                i(this, s);
                var h = n(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, {
                    targetNode: t,
                    iframeRoot: r,
                    iframeSrc: o,
                    permanentDomain: l
                }));
                return h.POST_MESSAGE_EVENTS = {
                    OPEN_MODAL: "open_modal",
                    CLOSE_MODAL: "close_modal",
                    OPEN_POPOVER: "open_popover",
                    CLOSE_POPOVER: "close_popover",
                    HIDE_IFRAME: "hide_iframe",
                    COPY_SHARE_LINK: "copy_share_link",
                    SET_IFRAME_HEIGHT: "set_iframe_height",
                    CUSTOMIZE_THEME: "customize_theme",
                    PURCHASE_THEME: "purchase_theme",
                    EXIT_PREVIEW: "exit_preview",
                    TEMPLATE_EDITOR_REFRESH_PAGE: '{"key":"pageRefresh"}'
                }, h.previewToken = a, h.themeStoreId = E, h.htmlNode = document.querySelector("html"), h.loadingStyles = s.convertStylesObjectToString({
                    display: "none"
                }), h.defaultStyles = s.convertStylesObjectToString({
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    "z-index": 2147483647,
                    width: "100%",
                    height: h.height + "px",
                    border: "none",
                    "box-shadow": "0 -1px 3px rgba(0, 0, 0, 0.2)",
                    overflow: "hidden",
                    transform: "translateY(0)",
                    transition: "transform 300ms"
                }), h.modalOpenStyles = s.convertStylesObjectToString({
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    "z-index": 21474836472,
                    width: "100%",
                    height: "100vh",
                    border: "none"
                }), h
            }
            return r(s, e), t(s, [{
                key: "init",
                value: function() {
                    var e = this;
                    o(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "createIframe", this).call(this, "Preview Bar", "preview-bar-iframe"), this.iframe.contentWindow.addEventListener("DOMContentLoaded", (function() {
                        e.iframe.setAttribute("style", e.defaultStyles)
                    })), this._postMessageBuffer = this.postMessageBuffer.bind(this), window.addEventListener("message", this._postMessageBuffer)
                }
            }, {
                key: "teardown",
                value: function() {
                    window.removeEventListener("message", this._postMessageBuffer)
                }
            }, {
                key: "postMessageBuffer",
                value: function(e) {
                    var t = e.data.message || e.data,
                        i = e.data.height || 60,
                        r = e.data.url,
                        o = e.origin;
                    !t || s.returnObjectValues(this.POST_MESSAGE_EVENTS).indexOf(t) < 0 || t === this.POST_MESSAGE_EVENTS.TEMPLATE_EDITOR_REFRESH_PAGE && o !== "https://" + this.permanentDomain || t !== this.POST_MESSAGE_EVENTS.TEMPLATE_EDITOR_REFRESH_PAGE && o !== this.iframeRoot || (t !== this.POST_MESSAGE_EVENTS.TEMPLATE_EDITOR_REFRESH_PAGE && this.postTrekkieData(t), this.postMessageHandler(t, i, r, o))
                }
            }, {
                key: "postMessageHandler",
                value: function(e, t, i, r) {
                    switch (e) {
                        case this.POST_MESSAGE_EVENTS.OPEN_MODAL:
                            this.iframe.setAttribute("style", this.modalOpenStyles), this.sendPostMessage("modal_opened", r);
                            break;
                        case this.POST_MESSAGE_EVENTS.CLOSE_MODAL:
                            this.iframe.setAttribute("style", this.defaultStyles), this.iframe.style.height = this.height + "px", this.sendPostMessage("modal_closed", r);
                            break;
                        case this.POST_MESSAGE_EVENTS.OPEN_POPOVER:
                            this.iframe.setAttribute("style", this.modalOpenStyles), this.sendPostMessage("popover_opened", r);
                            break;
                        case this.POST_MESSAGE_EVENTS.CLOSE_POPOVER:
                            this.iframe.setAttribute("style", this.defaultStyles), this.iframe.style.height = this.height + "px", this.sendPostMessage("popover_closed", r);
                            break;
                        case this.POST_MESSAGE_EVENTS.HIDE_IFRAME:
                            this.hideIframe();
                            break;
                        case this.POST_MESSAGE_EVENTS.EXIT_PREVIEW:
                            (0, a.redirectToUrl)(i, !1);
                            break;
                        case this.POST_MESSAGE_EVENTS.CUSTOMIZE_THEME:
                        case this.POST_MESSAGE_EVENTS.PURCHASE_THEME:
                            (0, a.redirectToUrl)(i);
                            break;
                        case this.POST_MESSAGE_EVENTS.SET_IFRAME_HEIGHT:
                            this.height = t, this.iframe.style.height = t + "px", this.htmlNode.style.paddingBottom = t + "px";
                            break;
                        case this.POST_MESSAGE_EVENTS.TEMPLATE_EDITOR_REFRESH_PAGE:
                            (0, a.refreshPage)()
                    }
                }
            }, {
                key: "sendPostMessage",
                value: function(e, t) {
                    this.target.postMessage(e, t)
                }
            }, {
                key: "hideIframe",
                value: function() {
                    this.iframe.setAttribute("style", "display: none"), this.htmlNode.style.paddingBottom = "0"
                }
            }, {
                key: "postTrekkieData",
                value: function(e) {
                    window.trekkie && window.trekkie.track("theme_sharing", {
                        action: e,
                        token: this.previewToken,
                        themeStoreId: this.themeStoreId
                    })
                }
            }]), s
        }(s(a).default);
        E.default = l, Shopify.PreviewBarInjector = null != E.default ? E.default : E
    }))
}("undefined" != typeof global ? global : "undefined" != typeof window && window);