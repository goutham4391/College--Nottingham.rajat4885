/*!
 * jQuery Cycle2; version: 2.1.6 build: 20141007
 * http://jquery.malsup.com/cycle2/
 * Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 */
! function(e) {
    "use strict";

    function t(e) {
        return (e || "").toLowerCase()
    }
    var n = "2.1.6";
    e.fn.cycle = function(n) {
        var i;
        return 0 !== this.length || e.isReady ? this.each(function() {
            var i, r, o, a, s = e(this),
                l = e.fn.cycle.log;
            if (!s.data("cycle.opts")) {
                (s.data("cycle-log") === !1 || n && n.log === !1 || r && r.log === !1) && (l = e.noop), l("--c2 init--"), i = s.data();
                for (var c in i) i.hasOwnProperty(c) && /^cycle[A-Z]+/.test(c) && (a = i[c], o = c.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), l(o + ":", a, "(" + typeof a + ")"), i[o] = a);
                r = e.extend({}, e.fn.cycle.defaults, i, n || {}), r.timeoutId = 0, r.paused = r.paused || !1, r.container = s, r._maxZ = r.maxZ, r.API = e.extend({
                    _container: s
                }, e.fn.cycle.API), r.API.log = l, r.API.trigger = function(e, t) {
                    return r.container.trigger(e, t), r.API
                }, s.data("cycle.opts", r), s.data("cycle.API", r.API), r.API.trigger("cycle-bootstrap", [r, r.API]), r.API.addInitialSlides(), r.API.preInitSlideshow(), r.slides.length && r.API.initSlideshow()
            }
        }) : (i = {
            s: this.selector,
            c: this.context
        }, e.fn.cycle.log("requeuing slideshow (dom not ready)"), e(function() {
            e(i.s, i.c).cycle(n)
        }), this)
    }, e.fn.cycle.API = {
        opts: function() {
            return this._container.data("cycle.opts")
        },
        addInitialSlides: function() {
            var t = this.opts(),
                n = t.slides;
            t.slideCount = 0, t.slides = e(), n = n.jquery ? n : t.container.find(n), t.random && n.sort(function() {
                return Math.random() - .5
            }), t.API.add(n)
        },
        preInitSlideshow: function() {
            var t = this.opts();
            t.API.trigger("cycle-pre-initialize", [t]);
            var n = e.fn.cycle.transitions[t.fx];
            n && e.isFunction(n.preInit) && n.preInit(t), t._preInitialized = !0
        },
        postInitSlideshow: function() {
            var t = this.opts();
            t.API.trigger("cycle-post-initialize", [t]);
            var n = e.fn.cycle.transitions[t.fx];
            n && e.isFunction(n.postInit) && n.postInit(t)
        },
        initSlideshow: function() {
            var t, n = this.opts(),
                i = n.container;
            n.API.calcFirstSlide(), "static" == n.container.css("position") && n.container.css("position", "relative"), e(n.slides[n.currSlide]).css({
                opacity: 1,
                display: "block",
                visibility: "visible"
            }), n.API.stackSlides(n.slides[n.currSlide], n.slides[n.nextSlide], !n.reverse), n.pauseOnHover && (n.pauseOnHover !== !0 && (i = e(n.pauseOnHover)), i.hover(function() {
                n.API.pause(!0)
            }, function() {
                n.API.resume(!0)
            })), n.timeout && (t = n.API.getSlideOpts(n.currSlide), n.API.queueTransition(t, t.timeout + n.delay)), n._initialized = !0, n.API.updateView(!0), n.API.trigger("cycle-initialized", [n]), n.API.postInitSlideshow()
        },
        pause: function(e) {
            var t = this.opts(),
                n = t.API.getSlideOpts(),
                i = t.hoverPaused || t.paused;
            e ? t.hoverPaused = !0 : t.paused = !0, i || (t.container.addClass("cycle-paused"), t.API.trigger("cycle-paused", [t]).log("cycle-paused"), n.timeout && (clearTimeout(t.timeoutId), t.timeoutId = 0))
        },
        resume: function(e) {
            var t = this.opts(),
                n = !t.hoverPaused && !t.paused;
            e ? t.hoverPaused = !1 : t.paused = !1, n || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"))
        },
        add: function(t, n) {
            var i, r = this.opts(),
                o = r.slideCount,
                a = !1;
            "string" == e.type(t) && (t = e.trim(t)), e(t).each(function(t) {
                var i, o = e(this);
                n ? r.container.prepend(o) : r.container.append(o), r.slideCount++, i = r.API.buildSlideOpts(o), n ? r.slides = e(o).add(r.slides) : r.slides = r.slides.add(o), r.API.initSlide(i, o, --r._maxZ), o.data("cycle.opts", i), r.API.trigger("cycle-slide-added", [r, i, o])
            }), r.API.updateView(!0), a = r._preInitialized && o < 2 && r.slideCount >= 1, a && (r._initialized ? r.timeout && (i = r.slides.length, r.nextSlide = r.reverse ? i - 1 : 1, r.timeoutId || r.API.queueTransition(r)) : r.API.initSlideshow())
        },
        calcFirstSlide: function() {
            var e, t = this.opts();
            e = parseInt(t.startingSlide || 0, 10), (e >= t.slides.length || e < 0) && (e = 0), t.currSlide = e, t.reverse ? (t.nextSlide = e - 1, t.nextSlide < 0 && (t.nextSlide = t.slides.length - 1)) : (t.nextSlide = e + 1, t.nextSlide == t.slides.length && (t.nextSlide = 0))
        },
        calcNextSlide: function() {
            var e, t = this.opts();
            t.reverse ? (e = t.nextSlide - 1 < 0, t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1, t.currSlide = e ? 0 : t.nextSlide + 1) : (e = t.nextSlide + 1 == t.slides.length, t.nextSlide = e ? 0 : t.nextSlide + 1, t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1)
        },
        calcTx: function(t, n) {
            var i, r = t;
            return r._tempFx ? i = e.fn.cycle.transitions[r._tempFx] : n && r.manualFx && (i = e.fn.cycle.transitions[r.manualFx]), i || (i = e.fn.cycle.transitions[r.fx]), r._tempFx = null, this.opts()._tempFx = null, i || (i = e.fn.cycle.transitions.fade, r.API.log('Transition "' + r.fx + '" not found.  Using fade.')), i
        },
        prepareTx: function(e, t) {
            var n, i, r, o, a, s = this.opts();
            return s.slideCount < 2 ? void(s.timeoutId = 0) : (!e || s.busy && !s.manualTrump || (s.API.stopTransition(), s.busy = !1, clearTimeout(s.timeoutId), s.timeoutId = 0), void(s.busy || (0 !== s.timeoutId || e) && (i = s.slides[s.currSlide], r = s.slides[s.nextSlide], o = s.API.getSlideOpts(s.nextSlide), a = s.API.calcTx(o, e), s._tx = a, e && void 0 !== o.manualSpeed && (o.speed = o.manualSpeed), s.nextSlide != s.currSlide && (e || !s.paused && !s.hoverPaused && s.timeout) ? (s.API.trigger("cycle-before", [o, i, r, t]), a.before && a.before(o, i, r, t), n = function() {
                s.busy = !1, s.container.data("cycle.opts") && (a.after && a.after(o, i, r, t), s.API.trigger("cycle-after", [o, i, r, t]), s.API.queueTransition(o), s.API.updateView(!0))
            }, s.busy = !0, a.transition ? a.transition(o, i, r, t, n) : s.API.doTransition(o, i, r, t, n), s.API.calcNextSlide(), s.API.updateView()) : s.API.queueTransition(o))))
        },
        doTransition: function(t, n, i, r, o) {
            var a = t,
                s = e(n),
                l = e(i),
                c = function() {
                    l.animate(a.animIn || {
                        opacity: 1
                    }, a.speed, a.easeIn || a.easing, o)
                };
            l.css(a.cssBefore || {}), s.animate(a.animOut || {}, a.speed, a.easeOut || a.easing, function() {
                s.css(a.cssAfter || {}), a.sync || c()
            }), a.sync && c()
        },
        queueTransition: function(t, n) {
            var i = this.opts(),
                r = void 0 !== n ? n : t.timeout;
            return 0 === i.nextSlide && 0 === --i.loop ? (i.API.log("terminating; loop=0"), i.timeout = 0, r ? setTimeout(function() {
                i.API.trigger("cycle-finished", [i])
            }, r) : i.API.trigger("cycle-finished", [i]), void(i.nextSlide = i.currSlide)) : void 0 !== i.continueAuto && (i.continueAuto === !1 || e.isFunction(i.continueAuto) && i.continueAuto() === !1) ? (i.API.log("terminating automatic transitions"), i.timeout = 0, void(i.timeoutId && clearTimeout(i.timeoutId))) : void(r && (i._lastQueue = e.now(), void 0 === n && (i._remainingTimeout = t.timeout), i.paused || i.hoverPaused || (i.timeoutId = setTimeout(function() {
                i.API.prepareTx(!1, !i.reverse)
            }, r))))
        },
        stopTransition: function() {
            var e = this.opts();
            e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e)
        },
        advanceSlide: function(e) {
            var t = this.opts();
            return clearTimeout(t.timeoutId), t.timeoutId = 0, t.nextSlide = t.currSlide + e, t.nextSlide < 0 ? t.nextSlide = t.slides.length - 1 : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, e >= 0), !1
        },
        buildSlideOpts: function(n) {
            var i, r, o = this.opts(),
                a = n.data() || {};
            for (var s in a) a.hasOwnProperty(s) && /^cycle[A-Z]+/.test(s) && (i = a[s], r = s.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), o.API.log("[" + (o.slideCount - 1) + "]", r + ":", i, "(" + typeof i + ")"), a[r] = i);
            a = e.extend({}, e.fn.cycle.defaults, o, a), a.slideNum = o.slideCount;
            try {
                delete a.API, delete a.slideCount, delete a.currSlide, delete a.nextSlide, delete a.slides
            } catch (l) {}
            return a
        },
        getSlideOpts: function(t) {
            var n = this.opts();
            void 0 === t && (t = n.currSlide);
            var i = n.slides[t],
                r = e(i).data("cycle.opts");
            return e.extend({}, n, r)
        },
        initSlide: function(t, n, i) {
            var r = this.opts();
            n.css(t.slideCss || {}), i > 0 && n.css("zIndex", i), isNaN(t.speed) && (t.speed = e.fx.speeds[t.speed] || e.fx.speeds._default), t.sync || (t.speed = t.speed / 2), n.addClass(r.slideClass)
        },
        updateView: function(e, t, n) {
            var i = this.opts();
            if (i._initialized) {
                var r = i.API.getSlideOpts(),
                    o = i.slides[i.currSlide];
                !e && t !== !0 && (i.API.trigger("cycle-update-view-before", [i, r, o]), i.updateView < 0) || (i.slideActiveClass && i.slides.removeClass(i.slideActiveClass).eq(i.currSlide).addClass(i.slideActiveClass), e && i.hideNonActive && i.slides.filter(":not(." + i.slideActiveClass + ")").css("visibility", "hidden"), 0 === i.updateView && setTimeout(function() {
                    i.API.trigger("cycle-update-view", [i, r, o, e])
                }, r.speed / (i.sync ? 2 : 1)), 0 !== i.updateView && i.API.trigger("cycle-update-view", [i, r, o, e]), e && i.API.trigger("cycle-update-view-after", [i, r, o]))
            }
        },
        getComponent: function(t) {
            var n = this.opts(),
                i = n[t];
            return "string" == typeof i ? /^\s*[\>|\+|~]/.test(i) ? n.container.find(i) : e(i) : i.jquery ? i : e(i)
        },
        stackSlides: function(t, n, i) {
            var r = this.opts();
            t || (t = r.slides[r.currSlide], n = r.slides[r.nextSlide], i = !r.reverse), e(t).css("zIndex", r.maxZ);
            var o, a = r.maxZ - 2,
                s = r.slideCount;
            if (i) {
                for (o = r.currSlide + 1; o < s; o++) e(r.slides[o]).css("zIndex", a--);
                for (o = 0; o < r.currSlide; o++) e(r.slides[o]).css("zIndex", a--)
            } else {
                for (o = r.currSlide - 1; o >= 0; o--) e(r.slides[o]).css("zIndex", a--);
                for (o = s - 1; o > r.currSlide; o--) e(r.slides[o]).css("zIndex", a--)
            }
            e(n).css("zIndex", r.maxZ - 1)
        },
        getSlideIndex: function(e) {
            return this.opts().slides.index(e)
        }
    }, e.fn.cycle.log = function() {
        window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
    }, e.fn.cycle.version = function() {
        return "Cycle2: " + n
    }, e.fn.cycle.transitions = {
        custom: {},
        none: {
            before: function(e, t, n, i) {
                e.API.stackSlides(n, t, i), e.cssBefore = {
                    opacity: 1,
                    visibility: "visible",
                    display: "none"
                }
            }
        },
        fade: {
            before: function(t, n, i, r) {
                var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                t.API.stackSlides(n, i, r), t.cssBefore = e.extend(o, {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                }), t.animIn = {
                    opacity: 1
                }, t.animOut = {
                    opacity: 0,
                    display: "none"
                }
            }
        },
        fadeout: {
            before: function(t, n, i, r) {
                var o = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                t.API.stackSlides(n, i, r), t.cssBefore = e.extend(o, {
                    opacity: 1,
                    visibility: "visible",
                    display: "block"
                }), t.animOut = {
                    opacity: 0,
                    display: "none"
                }
            }
        },
        scrollHorz: {
            before: function(e, t, n, i) {
                i = !i, e.API.stackSlides(t, n, i);
                var r = e.container.css("overflow", "hidden").width();
                e.cssBefore = {
                    left: i ? r : -r,
                    top: 0,
                    opacity: 1,
                    visibility: "visible",
                    display: "block"
                }, e.cssAfter = {
                    zIndex: e._maxZ - 2,
                    left: 0
                }, e.animIn = {
                    left: 0
                }, e.animOut = {
                    left: i ? -r : r
                }
            }
        }
    }, e.fn.cycle.defaults = {
        allowWrap: !0,
        autoSelector: ".cycle[data-cycle-auto-init!=false]",
        delay: 0,
        easing: null,
        fx: "fade",
        hideNonActive: !0,
        loop: 0,
        manualFx: void 0,
        manualSpeed: void 0,
        manualTrump: !0,
        maxZ: 100,
        pauseOnHover: !1,
        reverse: !1,
        slideActiveClass: "cycle-slide-active",
        slideClass: "cycle-slide",
        nextSlideClass: "next-slide",
        slideCss: {
            position: "absolute",
            top: 0,
            left: 0
        },
        slides: "img",
        speed: 500,
        startingSlide: 0,
        sync: !0,
        timeout: 8e3,
        updateView: 0
    }, e(document).ready(function() {
        e(e.fn.cycle.defaults.autoSelector).cycle()
    })
}(jQuery), /*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(e) {
    "use strict";

    function t(t, i) {
        var r, o, a, s = i.autoHeight;
        if ("container" == s) o = e(i.slides[i.currSlide]).outerHeight(), i.container.height(o);
        else if (i._autoHeightRatio) i.container.height(i.container.width() / i._autoHeightRatio);
        else if ("calc" === s || "number" == e.type(s) && s >= 0) {
            if (a = "calc" === s ? n(t, i) : s >= i.slides.length ? 0 : s, a == i._sentinelIndex) return;
            i._sentinelIndex = a, i._sentinel && i._sentinel.remove(), r = e(i.slides[a].cloneNode(!0)), r.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), r.css({
                position: "static",
                visibility: "hidden",
                display: "block"
            }).prependTo(i.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), r.find("*").css("visibility", "hidden"), i._sentinel = r
        }
    }

    function n(t, n) {
        var i = 0,
            r = -1;
        return n.slides.each(function(t) {
            var n = e(this).height();
            n > r && (r = n, i = t)
        }), i
    }

    function i(t, n, i, r, o) {
        var a = e(r).outerHeight();
        n.container.animate({
            height: a
        }, n.autoHeightSpeed, n.autoHeightEasing)
    }

    function r(n, o) {
        o._autoHeightOnResize && (e(window).off("resize orientationchange", o._autoHeightOnResize), o._autoHeightOnResize = null), o.container.off("cycle-slide-added cycle-slide-removed", t), o.container.off("cycle-destroyed", r), o.container.off("cycle-before", i), o._sentinel && (o._sentinel.remove(), o._sentinel = null)
    }
    e.extend(e.fn.cycle.defaults, {
        autoHeight: 0,
        autoHeightSpeed: 250,
        autoHeightEasing: null
    }), e(document).on("cycle-initialized", function(n, o) {
        function a() {
            t(n, o)
        }
        var s, l = o.autoHeight,
            c = e.type(l),
            u = null;
        "string" !== c && "number" !== c || (o.container.on("cycle-slide-added cycle-slide-removed", t), o.container.on("cycle-destroyed", r), "container" == l ? o.container.on("cycle-before", i) : "string" === c && /\d+\:\d+/.test(l) && (s = l.match(/(\d+)\:(\d+)/), s = s[1] / s[2], o._autoHeightRatio = s), "number" !== c && (o._autoHeightOnResize = function() {
            clearTimeout(u), u = setTimeout(a, 50)
        }, e(window).on("resize orientationchange", o._autoHeightOnResize)), setTimeout(a, 30))
    })
}(jQuery), /*! caption plugin for Cycle2;  version: 20130306 */
function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        caption: "> .cycle-caption",
        captionTemplate: "{{slideNum}} / {{slideCount}}",
        overlay: "> .cycle-overlay",
        overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
        captionModule: "caption"
    }), e(document).on("cycle-update-view", function(t, n, i, r) {
        if ("caption" === n.captionModule) {
            e.each(["caption", "overlay"], function() {
                var e = this,
                    t = i[e + "Template"],
                    o = n.API.getComponent(e);
                o.length && t ? (o.html(n.API.tmpl(t, i, n, r)), o.show()) : o.hide()
            })
        }
    }), e(document).on("cycle-destroyed", function(t, n) {
        var i;
        e.each(["caption", "overlay"], function() {
            var e = this,
                t = n[e + "Template"];
            n[e] && t && (i = n.API.getComponent("caption"), i.empty())
        })
    })
}(jQuery), /*! command plugin for Cycle2;  version: 20140415 */
function(e) {
    "use strict";
    var t = e.fn.cycle;
    e.fn.cycle = function(n) {
        var i, r, o, a = e.makeArray(arguments);
        return "number" == e.type(n) ? this.cycle("goto", n) : "string" == e.type(n) ? this.each(function() {
            var s;
            return i = n, o = e(this).data("cycle.opts"), void 0 === o ? void t.log('slideshow must be initialized before sending commands; "' + i + '" ignored') : (i = "goto" == i ? "jump" : i, r = o.API[i], e.isFunction(r) ? (s = e.makeArray(a), s.shift(), r.apply(o.API, s)) : void t.log("unknown command: ", i))
        }) : t.apply(this, arguments)
    }, e.extend(e.fn.cycle, t), e.extend(t.API, {
        next: function() {
            var e = this.opts();
            if (!e.busy || e.manualTrump) {
                var t = e.reverse ? -1 : 1;
                e.allowWrap === !1 && e.currSlide + t >= e.slideCount || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
            }
        },
        prev: function() {
            var e = this.opts();
            if (!e.busy || e.manualTrump) {
                var t = e.reverse ? 1 : -1;
                e.allowWrap === !1 && e.currSlide + t < 0 || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"))
            }
        },
        destroy: function() {
            this.stop();
            var t = this.opts(),
                n = e.isFunction(e._data) ? e._data : e.noop;
            clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stop(), t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"), t.container.removeData(), n(t.container[0], "parsedAttrs", !1), t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.removeAttr("style"), t.slides.removeClass(t.slideActiveClass)), t.slides.each(function() {
                var i = e(this);
                i.removeData(), i.removeClass(t.slideClass), n(this, "parsedAttrs", !1)
            })
        },
        jump: function(e, t) {
            var n, i = this.opts();
            if (!i.busy || i.manualTrump) {
                var r = parseInt(e, 10);
                if (isNaN(r) || r < 0 || r >= i.slides.length) return void i.API.log("goto: invalid slide index: " + r);
                if (r == i.currSlide) return void i.API.log("goto: skipping, already on slide", r);
                i.nextSlide = r, clearTimeout(i.timeoutId), i.timeoutId = 0, i.API.log("goto: ", r, " (zero-index)"), n = i.currSlide < i.nextSlide, i._tempFx = t, i.API.prepareTx(!0, n)
            }
        },
        stop: function() {
            var t = this.opts(),
                n = t.container;
            clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stopTransition(), t.pauseOnHover && (t.pauseOnHover !== !0 && (n = e(t.pauseOnHover)), n.off("mouseenter mouseleave")), t.API.trigger("cycle-stopped", [t]).log("cycle-stopped")
        },
        reinit: function() {
            var e = this.opts();
            e.API.destroy(), e.container.cycle()
        },
        remove: function(t) {
            for (var n, i, r = this.opts(), o = [], a = 1, s = 0; s < r.slides.length; s++) n = r.slides[s], s == t ? i = n : (o.push(n), e(n).data("cycle.opts").slideNum = a, a++);
            i && (r.slides = e(o), r.slideCount--, e(i).remove(), t == r.currSlide ? r.API.advanceSlide(1) : t < r.currSlide ? r.currSlide-- : r.currSlide++, r.API.trigger("cycle-slide-removed", [r, t, i]).log("cycle-slide-removed"), r.API.updateView())
        }
    }), e(document).on("click.cycle", "[data-cycle-cmd]", function(t) {
        t.preventDefault();
        var n = e(this),
            i = n.data("cycle-cmd"),
            r = n.data("cycle-context") || ".cycle-slideshow";
        e(r).cycle(i, n.data("cycle-arg"))
    })
}(jQuery), /*! hash plugin for Cycle2;  version: 20130905 */
function(e) {
    "use strict";

    function t(t, n) {
        var i;
        return t._hashFence ? void(t._hashFence = !1) : (i = window.location.hash.substring(1), void t.slides.each(function(r) {
            if (e(this).data("cycle-hash") == i) {
                if (n === !0) t.startingSlide = r;
                else {
                    var o = t.currSlide < r;
                    t.nextSlide = r, t.API.prepareTx(!0, o)
                }
                return !1
            }
        }))
    }
    e(document).on("cycle-pre-initialize", function(n, i) {
        t(i, !0), i._onHashChange = function() {
            t(i, !1)
        }, e(window).on("hashchange", i._onHashChange)
    }), e(document).on("cycle-update-view", function(e, t, n) {
        n.hash && "#" + n.hash != window.location.hash && (t._hashFence = !0, window.location.hash = n.hash)
    }), e(document).on("cycle-destroyed", function(t, n) {
        n._onHashChange && e(window).off("hashchange", n._onHashChange)
    })
}(jQuery), /*! loader plugin for Cycle2;  version: 20131121 */
function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        loader: !1
    }), e(document).on("cycle-bootstrap", function(t, n) {
        function i(t, i) {
            function o(t) {
                var o;
                "wait" == n.loader ? (s.push(t), 0 === c && (s.sort(a), r.apply(n.API, [s, i]), n.container.removeClass("cycle-loading"))) : (o = e(n.slides[n.currSlide]), r.apply(n.API, [t, i]), o.show(), n.container.removeClass("cycle-loading"))
            }

            function a(e, t) {
                return e.data("index") - t.data("index")
            }
            var s = [];
            if ("string" == e.type(t)) t = e.trim(t);
            else if ("array" === e.type(t))
                for (var l = 0; l < t.length; l++) t[l] = e(t[l])[0];
            t = e(t);
            var c = t.length;
            c && (t.css("visibility", "hidden").appendTo("body").each(function(t) {
                function a() {
                    0 === --l && (--c, o(u))
                }
                var l = 0,
                    u = e(this),
                    d = u.is("img") ? u : u.find("img");
                return u.data("index", t), d = d.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'), d.length ? (l = d.length, void d.each(function() {
                    this.complete ? a() : e(this).load(function() {
                        a()
                    }).on("error", function() {
                        0 === --l && (n.API.log("slide skipped; img not loaded:", this.src), 0 === --c && "wait" == n.loader && r.apply(n.API, [s, i]))
                    })
                })) : (--c, void s.push(u))
            }), c && n.container.addClass("cycle-loading"))
        }
        var r;
        n.loader && (r = n.API.add, n.API.add = i)
    })
}(jQuery), /*! pager plugin for Cycle2;  version: 20140415 */
function(e) {
    "use strict";

    function t(t, n, i) {
        var r, o = t.API.getComponent("pager");
        o.each(function() {
            var o = e(this);
            if (n.pagerTemplate) {
                var a = t.API.tmpl(n.pagerTemplate, n, t, i[0]);
                r = e(a).appendTo(o)
            } else r = o.children().eq(t.slideCount - 1);
            r.on(t.pagerEvent, function(e) {
                t.pagerEventBubble || e.preventDefault(), t.API.page(o, e.currentTarget)
            })
        })
    }

    function n(e, t) {
        var n = this.opts();
        if (!n.busy || n.manualTrump) {
            var i = e.children().index(t),
                r = i,
                o = n.currSlide < r;
            n.currSlide != r && (n.nextSlide = r, n._tempFx = n.pagerFx, n.API.prepareTx(!0, o), n.API.trigger("cycle-pager-activated", [n, e, t]))
        }
    }
    e.extend(e.fn.cycle.defaults, {
        pager: "> .cycle-pager",
        pagerActiveClass: "cycle-pager-active",
        pagerEvent: "click.cycle",
        pagerEventBubble: void 0,
        pagerTemplate: '<span aria-label="slide {{slideNum}}">&bull;</span>'
    }), e(document).on("cycle-bootstrap", function(e, n, i) {
        i.buildPagerLink = t
    }), e(document).on("cycle-slide-added", function(e, t, i, r) {
        t.pager && (t.API.buildPagerLink(t, i, r), t.API.page = n)
    }), e(document).on("cycle-slide-removed", function(t, n, i, r) {
        if (n.pager) {
            var o = n.API.getComponent("pager");
            o.each(function() {
                var t = e(this);
                e(t.children()[i]).remove()
            })
        }
    }), e(document).on("cycle-update-view", function(t, n, i) {
        var r;
        n.pager && (r = n.API.getComponent("pager"), r.each(function() {
            e(this).children().removeClass(n.pagerActiveClass).eq(n.currSlide).addClass(n.pagerActiveClass)
        }))
    }), e(document).on("cycle-destroyed", function(e, t) {
        var n = t.API.getComponent("pager");
        n && (n.children().off(t.pagerEvent), t.pagerTemplate && n.empty())
    })
}(jQuery), /*! prevnext plugin for Cycle2;  version: 20140408 */
function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        next: "> .cycle-next",
        nextEvent: "click.cycle",
        disabledClass: "disabled",
        prev: "> .cycle-prev",
        prevEvent: "click.cycle",
        swipe: !1
    }), e(document).on("cycle-initialized", function(e, t) {
        if (t.API.getComponent("next").on(t.nextEvent, function(e) {
                e.preventDefault(), t.API.next()
            }), t.API.getComponent("prev").on(t.prevEvent, function(e) {
                e.preventDefault(), t.API.prev()
            }), t.swipe) {
            var n = t.swipeVert ? "swipeUp.cycle" : "swipeLeft.cycle swipeleft.cycle",
                i = t.swipeVert ? "swipeDown.cycle" : "swipeRight.cycle swiperight.cycle";
            t.container.on(n, function(e) {
                t._tempFx = t.swipeFx, t.API.next()
            }), t.container.on(i, function() {
                t._tempFx = t.swipeFx, t.API.prev()
            })
        }
    }), e(document).on("cycle-update-view", function(e, t, n, i) {
        if (!t.allowWrap) {
            var r = t.disabledClass,
                o = t.API.getComponent("next"),
                a = t.API.getComponent("prev"),
                s = t._prevBoundry || 0,
                l = void 0 !== t._nextBoundry ? t._nextBoundry : t.slideCount - 1;
            t.currSlide == l ? o.addClass(r).prop("disabled", !0) : o.removeClass(r).prop("disabled", !1), t.currSlide === s ? a.addClass(r).prop("disabled", !0) : a.removeClass(r).prop("disabled", !1)
        }
    }), e(document).on("cycle-destroyed", function(e, t) {
        t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
    })
}(jQuery), /*! progressive loader plugin for Cycle2;  version: 20130315 */
function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        progressive: !1
    }), e(document).on("cycle-pre-initialize", function(t, n) {
        if (n.progressive) {
            var i, r, o = n.API,
                a = o.next,
                s = o.prev,
                l = o.prepareTx,
                c = e.type(n.progressive);
            if ("array" == c) i = n.progressive;
            else if (e.isFunction(n.progressive)) i = n.progressive(n);
            else if ("string" == c) {
                if (r = e(n.progressive), i = e.trim(r.html()), !i) return;
                if (/^(\[)/.test(i)) try {
                    i = e.parseJSON(i)
                } catch (u) {
                    return void o.log("error parsing progressive slides", u)
                } else i = i.split(new RegExp(r.data("cycle-split") || "\n")), i[i.length - 1] || i.pop()
            }
            l && (o.prepareTx = function(e, t) {
                var r, o;
                return e || 0 === i.length ? void l.apply(n.API, [e, t]) : void(t && n.currSlide == n.slideCount - 1 ? (o = i[0], i = i.slice(1), n.container.one("cycle-slide-added", function(e, t) {
                    setTimeout(function() {
                        t.API.advanceSlide(1)
                    }, 50)
                }), n.API.add(o)) : t || 0 !== n.currSlide ? l.apply(n.API, [e, t]) : (r = i.length - 1, o = i[r], i = i.slice(0, r), n.container.one("cycle-slide-added", function(e, t) {
                    setTimeout(function() {
                        t.currSlide = 1, t.API.advanceSlide(-1)
                    }, 50)
                }), n.API.add(o, !0)))
            }), a && (o.next = function() {
                var e = this.opts();
                if (i.length && e.currSlide == e.slideCount - 1) {
                    var t = i[0];
                    i = i.slice(1), e.container.one("cycle-slide-added", function(e, t) {
                        a.apply(t.API), t.container.removeClass("cycle-loading")
                    }), e.container.addClass("cycle-loading"), e.API.add(t)
                } else a.apply(e.API)
            }), s && (o.prev = function() {
                var e = this.opts();
                if (i.length && 0 === e.currSlide) {
                    var t = i.length - 1,
                        n = i[t];
                    i = i.slice(0, t), e.container.one("cycle-slide-added", function(e, t) {
                        t.currSlide = 1, t.API.advanceSlide(-1), t.container.removeClass("cycle-loading")
                    }), e.container.addClass("cycle-loading"), e.API.add(n, !0)
                } else s.apply(e.API)
            })
        }
    })
}(jQuery), /*! tmpl plugin for Cycle2;  version: 20121227 */
function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        tmplRegex: "{{((.)?.*?)}}"
    }), e.extend(e.fn.cycle.API, {
        tmpl: function(t, n) {
            var i = new RegExp(n.tmplRegex || e.fn.cycle.defaults.tmplRegex, "g"),
                r = e.makeArray(arguments);
            return r.shift(), t.replace(i, function(t, n) {
                var i, o, a, s, l = n.split(".");
                for (i = 0; i < r.length; i++)
                    if (a = r[i]) {
                        if (l.length > 1)
                            for (s = a, o = 0; o < l.length; o++) a = s, s = s[l[o]] || n;
                        else s = a[n];
                        if (e.isFunction(s)) return s.apply(a, r);
                        if (void 0 !== s && null !== s && s != n) return s
                    }
                return n
            })
        }
    })
}(jQuery), /* Plugin for Cycle2; Copyright (c) 2012 M. Alsup; v20141007 */ ! function(e) {
    "use strict";
    e.event.special.swipe = e.event.special.swipe || {
        scrollSupressionThreshold: 10,
        durationThreshold: 1e3,
        horizontalDistanceThreshold: 30,
        verticalDistanceThreshold: 75,
        setup: function() {
            var t = e(this);
            t.bind("touchstart", function(n) {
                function i(t) {
                    if (a) {
                        var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t;
                        r = {
                            time: (new Date).getTime(),
                            coords: [n.pageX, n.pageY]
                        }, Math.abs(a.coords[0] - r.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                    }
                }
                var r, o = n.originalEvent.touches ? n.originalEvent.touches[0] : n,
                    a = {
                        time: (new Date).getTime(),
                        coords: [o.pageX, o.pageY],
                        origin: e(n.target)
                    };
                t.bind("touchmove", i).one("touchend", function() {
                    t.unbind("touchmove", i), a && r && r.time - a.time < e.event.special.swipe.durationThreshold && Math.abs(a.coords[0] - r.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(a.coords[1] - r.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && a.origin.trigger("swipe").trigger(a.coords[0] > r.coords[0] ? "swipeleft" : "swiperight"), a = r = void 0
                })
            })
        }
    }, e.event.special.swipeleft = e.event.special.swipeleft || {
        setup: function() {
            e(this).bind("swipe", e.noop)
        }
    }, e.event.special.swiperight = e.event.special.swiperight || e.event.special.swipeleft
}(jQuery),

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
    var t, n, i, r, o, a, s = "Close",
        l = "BeforeClose",
        c = "AfterClose",
        u = "BeforeAppend",
        d = "MarkupParse",
        f = "Open",
        p = "Change",
        h = "mfp",
        g = "." + h,
        m = "mfp-ready",
        v = "mfp-removing",
        y = "mfp-prevent-close",
        x = function() {},
        b = !!window.jQuery,
        w = e(window),
        C = function(e, n) {
            t.ev.on(h + e + g, n)
        },
        F = function(t, n, i, r) {
            var o = document.createElement("div");
            return o.className = "mfp-" + t, i && (o.innerHTML = i), r ? n && n.appendChild(o) : (o = e(o), n && o.appendTo(n)), o
        },
        A = function(n, i) {
            t.ev.triggerHandler(h + n, i), t.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), t.st.callbacks[n] && t.st.callbacks[n].apply(t, e.isArray(i) ? i : [i]))
        },
        S = function(n) {
            return n === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = n), t.currTemplate.closeBtn
        },
        I = function() {
            e.magnificPopup.instance || (t = new x, t.init(), e.magnificPopup.instance = t)
        },
        k = function() {
            var e = document.createElement("p").style,
                t = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== e.transition) return !0;
            for (; t.length;)
                if (t.pop() + "Transition" in e) return !0;
            return !1
        };
    x.prototype = {
        constructor: x,
        init: function() {
            var n = navigator.appVersion;
            t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(n), t.isIOS = /iphone|ipad|ipod/gi.test(n), t.supportsTransition = k(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), i = e(document), t.popupsCache = {}
        },
        open: function(n) {
            var r;
            if (n.isObj === !1) {
                t.items = n.items.toArray(), t.index = 0;
                var a, s = n.items;
                for (r = 0; r < s.length; r++)
                    if (a = s[r], a.parsed && (a = a.el[0]), a === n.el[0]) {
                        t.index = r;
                        break
                    }
            } else t.items = e.isArray(n.items) ? n.items : [n.items], t.index = n.index || 0;
            if (t.isOpen) return void t.updateItemHTML();
            t.types = [], o = "", n.mainEl && n.mainEl.length ? t.ev = n.mainEl.eq(0) : t.ev = i, n.key ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}), t.currTemplate = t.popupsCache[n.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, n), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = F("bg").on("click" + g, function() {
                t.close()
            }), t.wrap = F("wrap").attr("tabindex", -1).on("click" + g, function(e) {
                t._checkIfClose(e.target) && t.close()
            }), t.container = F("container", t.wrap)), t.contentContainer = F("content"), t.st.preloader && (t.preloader = F("preloader", t.container, t.st.tLoading));
            var l = e.magnificPopup.modules;
            for (r = 0; r < l.length; r++) {
                var c = l[r];
                c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
            }
            A("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (C(d, function(e, t, n, i) {
                n.close_replaceWith = S(i.type)
            }), o += " mfp-close-btn-in") : t.wrap.append(S())), t.st.alignTop && (o += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
                overflow: t.st.overflowY,
                overflowX: "hidden",
                overflowY: t.st.overflowY
            }) : t.wrap.css({
                top: w.scrollTop(),
                position: "absolute"
            }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
                height: i.height(),
                position: "absolute"
            }), t.st.enableEscapeKey && i.on("keyup" + g, function(e) {
                27 === e.keyCode && t.close()
            }), w.on("resize" + g, function() {
                t.updateSize()
            }), t.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && t.wrap.addClass(o);
            var u = t.wH = w.height(),
                p = {};
            if (t.fixedContentPos && t._hasScrollBar(u)) {
                var h = t._getScrollbarSize();
                h && (p.marginRight = h)
            }
            t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : p.overflow = "hidden");
            var v = t.st.mainClass;
            return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), A("BuildControls"), e("html").css(p), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
                t.content ? (t._addClassToMFP(m), t._setFocus()) : t.bgOverlay.addClass(m), i.on("focusin" + g, t._onFocusIn)
            }, 16), t.isOpen = !0, t.updateSize(u), A(f), n
        },
        close: function() {
            t.isOpen && (A(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function() {
                t._close()
            }, t.st.removalDelay)) : t._close())
        },
        _close: function() {
            A(s);
            var n = v + " " + m + " ";
            if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (n += t.st.mainClass + " "), t._removeClassFromMFP(n), t.fixedContentPos) {
                var r = {
                    marginRight: ""
                };
                t.isIE7 ? e("body, html").css("overflow", "") : r.overflow = "", e("html").css(r)
            }
            i.off("keyup" + g + " focusin" + g), t.ev.off(g), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, A(c)
        },
        updateSize: function(e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * n;
                t.wrap.css("height", i), t.wH = i
            } else t.wH = e || w.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), A("Resize")
        },
        updateItemHTML: function() {
            var n = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), n.parsed || (n = t.parseEl(t.index));
            var i = n.type;
            if (A("BeforeChange", [t.currItem ? t.currItem.type : "", i]), t.currItem = n, !t.currTemplate[i]) {
                var o = !!t.st[i] && t.st[i].markup;
                A("FirstMarkupParse", o), o ? t.currTemplate[i] = e(o) : t.currTemplate[i] = !0
            }
            r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
            var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, t.currTemplate[i]);
            t.appendContent(a, i), n.preloaded = !0, A(p, n), r = n.type, t.container.prepend(t.contentContainer), A("AfterChange")
        },
        appendContent: function(e, n) {
            t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[n] === !0 ? t.content.find(".mfp-close").length || t.content.append(S()) : t.content = e : t.content = "", A(u), t.container.addClass("mfp-" + n + "-holder"), t.contentContainer.append(t.content)
        },
        parseEl: function(n) {
            var i, r = t.items[n];
            if (r.tagName ? r = {
                    el: e(r)
                } : (i = r.type, r = {
                    data: r,
                    src: r.src
                }), r.el) {
                for (var o = t.types, a = 0; a < o.length; a++)
                    if (r.el.hasClass("mfp-" + o[a])) {
                        i = o[a];
                        break
                    }
                r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"))
            }
            return r.type = i || t.st.type || "inline", r.index = n, r.parsed = !0, t.items[n] = r, A("ElementParse", r), t.items[n]
        },
        addGroup: function(e, n) {
            var i = function(i) {
                i.mfpEl = this, t._openClick(i, e, n)
            };
            n || (n = {});
            var r = "click.magnificPopup";
            n.mainEl = e, n.items ? (n.isObj = !0, e.off(r).on(r, i)) : (n.isObj = !1, n.delegate ? e.off(r).on(r, n.delegate, i) : (n.items = e, e.off(r).on(r, i)))
        },
        _openClick: function(n, i, r) {
            var o = void 0 !== r.midClick ? r.midClick : e.magnificPopup.defaults.midClick;
            if (o || !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)) {
                var a = void 0 !== r.disableOn ? r.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0
                    } else if (w.width() < a) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()), r.el = e(n.mfpEl), r.delegate && (r.items = i.find(r.delegate)), t.open(r)
            }
        },
        updateStatus: function(e, i) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n), i || "loading" !== e || (i = t.st.tLoading);
                var r = {
                    status: e,
                    text: i
                };
                A("UpdateStatus", r), e = r.status, i = r.text, t.preloader.html(i), t.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), t.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(n) {
            if (!e(n).hasClass(y)) {
                var i = t.st.closeOnContentClick,
                    r = t.st.closeOnBgClick;
                if (i && r) return !0;
                if (!t.content || e(n).hasClass("mfp-close") || t.preloader && n === t.preloader[0]) return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (i) return !0
                } else if (r && e.contains(document, n)) return !0;
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
            return (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || w.height())
        },
        _setFocus: function() {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
        },
        _onFocusIn: function(n) {
            return n.target === t.wrap[0] || e.contains(t.wrap[0], n.target) ? void 0 : (t._setFocus(), !1)
        },
        _parseMarkup: function(t, n, i) {
            var r;
            i.data && (n = e.extend(i.data, n)), A(d, [t, n, i]), e.each(n, function(n, i) {
                if (void 0 === i || i === !1) return !0;
                if (r = n.split("_"), r.length > 1) {
                    var o = t.find(g + "-" + r[0]);
                    if (o.length > 0) {
                        var a = r[1];
                        "replaceWith" === a ? o[0] !== i[0] && o.replaceWith(i) : "img" === a ? o.is("img") ? o.attr("src", i) : o.replaceWith(e("<img>").attr("src", i).attr("class", o.attr("class"))) : o.attr(r[1], i)
                    }
                } else t.find(g + "-" + n).html(i)
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
        proto: x.prototype,
        modules: [],
        open: function(t, n) {
            return I(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = n || 0, this.instance.open(t)
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
            closeMarkup: '<button title="%title%" aria-label="Close (Esc)" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, e.fn.magnificPopup = function(n) {
        I();
        var i = e(this);
        if ("string" == typeof n)
            if ("open" === n) {
                var r, o = b ? i.data("magnificPopup") : i[0].magnificPopup,
                    a = parseInt(arguments[1], 10) || 0;
                o.items ? r = o.items[a] : (r = i, o.delegate && (r = r.find(o.delegate)), r = r.eq(a)), t._openClick({
                    mfpEl: r
                }, i, o)
            } else t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
        else n = e.extend(!0, {}, n), b ? i.data("magnificPopup", n) : i[0].magnificPopup = n, t.addGroup(i, n);
        return i
    };
    var T, _, P, E = "inline",
        B = function() {
            P && (_.after(P.addClass(T)).detach(), P = null)
        };
    e.magnificPopup.registerModule(E, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                t.types.push(E), C(s + "." + E, function() {
                    B()
                })
            },
            getInline: function(n, i) {
                if (B(), n.src) {
                    var r = t.st.inline,
                        o = e(n.src);
                    if (o.length) {
                        var a = o[0].parentNode;
                        a && a.tagName && (_ || (T = r.hiddenClass, _ = F(T), T = "mfp-" + T), P = o.after(_).detach().removeClass(T)), t.updateStatus("ready")
                    } else t.updateStatus("error", r.tNotFound), o = e("<div>");
                    return n.inlineElement = o, o
                }
                return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i
            }
        }
    });
    var $, N = "ajax",
        M = function() {
            $ && e(document.body).removeClass($)
        },
        D = function() {
            M(), t.req && t.req.abort()
        };
    e.magnificPopup.registerModule(N, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                t.types.push(N), $ = t.st.ajax.cursor, C(s + "." + N, D), C("BeforeChange." + N, D)
            },
            getAjax: function(n) {
                $ && e(document.body).addClass($), t.updateStatus("loading");
                var i = e.extend({
                    url: n.src,
                    success: function(i, r, o) {
                        var a = {
                            data: i,
                            xhr: o
                        };
                        A("ParseAjax", a), t.appendContent(e(a.data), N), n.finished = !0, M(), t._setFocus(), setTimeout(function() {
                            t.wrap.addClass(m)
                        }, 16), t.updateStatus("ready"), A("AjaxContentAdded")
                    },
                    error: function() {
                        M(), n.finished = n.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", n.src))
                    }
                }, t.st.ajax.settings);
                return t.req = e.ajax(i), ""
            }
        }
    });
    var O, z = function(n) {
        if (n.data && void 0 !== n.data.title) return n.data.title;
        var i = t.st.image.titleSrc;
        if (i) {
            if (e.isFunction(i)) return i.call(t, n);
            if (n.el) return n.el.attr(i) || ""
        }
        return ""
    };
    e.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var n = t.st.image,
                    i = ".image";
                t.types.push("image"), C(f + i, function() {
                    "image" === t.currItem.type && n.cursor && e(document.body).addClass(n.cursor)
                }), C(s + i, function() {
                    n.cursor && e(document.body).removeClass(n.cursor), w.off("resize" + g)
                }), C("Resize" + i, t.resizeImage), t.isLowIE && C("AfterChange", t.resizeImage)
            },
            resizeImage: function() {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE && (n = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - n)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, O && clearInterval(O), e.isCheckingImgSize = !1, A("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(e) {
                var n = 0,
                    i = e.img[0],
                    r = function(o) {
                        O && clearInterval(O), O = setInterval(function() {
                            return i.naturalWidth > 0 ? void t._onImageHasSize(e) : (n > 200 && clearInterval(O), n++, void(3 === n ? r(10) : 40 === n ? r(50) : 100 === n && r(500)))
                        }, o)
                    };
                r(1)
            },
            getImage: function(n, i) {
                var r = 0,
                    o = function() {
                        n && (n.img[0].complete ? (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, A("ImageLoadComplete")) : (r++, 200 > r ? setTimeout(o, 100) : a()))
                    },
                    a = function() {
                        n && (n.img.off(".mfploader"), n === t.currItem && (t._onImageHasSize(n), t.updateStatus("error", s.tError.replace("%url%", n.src))), n.hasSize = !0, n.loaded = !0, n.loadError = !0)
                    },
                    s = t.st.image,
                    l = i.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", n.el && n.el.find("img").length && (c.alt = n.el.find("img").attr("alt")), n.img = e(c).on("load.mfploader", o).on("error.mfploader", a), c.src = n.src, l.is("img") && (n.img = n.img.clone()), c = n.img[0], c.naturalWidth > 0 ? n.hasSize = !0 : c.width || (n.hasSize = !1)
                }
                return t._parseMarkup(i, {
                    title: z(n),
                    img_replaceWith: n.img
                }, n), t.resizeImage(), n.hasSize ? (O && clearInterval(O), n.loadError ? (i.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", n.src))) : (i.removeClass("mfp-loading"), t.updateStatus("ready")), i) : (t.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, i.addClass("mfp-loading"), t.findImageSize(n)), i)
            }
        }
    });
    var j, L = function() {
        return void 0 === j && (j = void 0 !== document.createElement("p").style.MozTransform), j
    };
    e.magnificPopup.registerModule("zoom", {
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
                    i = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var r, o, a = n.duration,
                        c = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                r = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                o = "transition";
                            return r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[o] = i, t.css(r), t
                        },
                        u = function() {
                            t.content.css("visibility", "visible")
                        };
                    C("BuildControls" + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(r), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void u();
                            o = c(e), o.css(t._getOffset()), t.wrap.append(o), r = setTimeout(function() {
                                o.css(t._getOffset(!0)), r = setTimeout(function() {
                                    u(), setTimeout(function() {
                                        o.remove(), e = o = null, A("ZoomAnimationEnded")
                                    }, 16)
                                }, a)
                            }, 16)
                        }
                    }), C(l + i, function() {
                        if (t._allowZoom()) {
                            if (clearTimeout(r), t.st.removalDelay = a, !e) {
                                if (e = t._getItemToZoom(), !e) return;
                                o = c(e)
                            }
                            o.css(t._getOffset(!0)), t.wrap.append(o), t.content.css("visibility", "hidden"), setTimeout(function() {
                                o.css(t._getOffset())
                            }, 16)
                        }
                    }), C(s + i, function() {
                        t._allowZoom() && (u(), o && o.remove(), e = null)
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
                var i;
                i = n ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
                var r = i.offset(),
                    o = parseInt(i.css("padding-top"), 10),
                    a = parseInt(i.css("padding-bottom"), 10);
                r.top -= e(window).scrollTop() - o;
                var s = {
                    width: i.width(),
                    height: (b ? i.innerHeight() : i[0].offsetHeight) - a - o
                };
                return L() ? s["-moz-transform"] = s.transform = "translate(" + r.left + "px," + r.top + "px)" : (s.left = r.left, s.top = r.top), s
            }
        }
    });
    var q = "iframe",
        H = "//about:blank",
        R = function(e) {
            if (t.currTemplate[q]) {
                var n = t.currTemplate[q].find("iframe");
                n.length && (e || (n[0].src = H), t.isIE8 && n.css("display", e ? "block" : "none"))
            }
        };
    e.magnificPopup.registerModule(q, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
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
                t.types.push(q), C("BeforeChange", function(e, t, n) {
                    t !== n && (t === q ? R() : n === q && R(!0))
                }), C(s + "." + q, function() {
                    R()
                })
            },
            getIframe: function(n, i) {
                var r = n.src,
                    o = t.st.iframe;
                e.each(o.patterns, function() {
                    return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)), r = this.src.replace("%id%", r), !1) : void 0
                });
                var a = {};
                return o.srcAction && (a[o.srcAction] = r), t._parseMarkup(i, a, n), t.updateStatus("ready"), i
            }
        }
    });
    var V = function(e) {
            var n = t.items.length;
            return e > n - 1 ? e - n : 0 > e ? n + e : e
        },
        U = function(e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n)
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
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
                    r = ".mfp-gallery";
                return t.direction = !0, !(!n || !n.enabled) && (o += " mfp-gallery", C(f + r, function() {
                    n.navigateByImgClick && t.wrap.on("click" + r, ".mfp-img", function() {
                        return t.items.length > 1 ? (t.next(), !1) : void 0
                    }), i.on("keydown" + r, function(e) {
                        37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
                    })
                }), C("UpdateStatus" + r, function(e, n) {
                    n.text && (n.text = U(n.text, t.currItem.index, t.items.length))
                }), C(d + r, function(e, i, r, o) {
                    var a = t.items.length;
                    r.counter = a > 1 ? U(n.tCounter, o.index, a) : ""
                }), C("BuildControls" + r, function() {
                    if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                        var i = n.arrowMarkup,
                            r = t.arrowLeft = e(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y),
                            o = t.arrowRight = e(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y);
                        r.click(function() {
                            t.prev()
                        }), o.click(function() {
                            t.next()
                        }), t.container.append(r.add(o))
                    }
                }), C(p + r, function() {
                    t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
                        t.preloadNearbyImages(), t._preloadTimeout = null
                    }, 16)
                }), void C(s + r, function() {
                    i.off(r), t.wrap.off("click" + r), t.arrowRight = t.arrowLeft = null
                }))
            },
            next: function() {
                t.direction = !0, t.index = V(t.index + 1), t.updateItemHTML()
            },
            prev: function() {
                t.direction = !1, t.index = V(t.index - 1), t.updateItemHTML()
            },
            goTo: function(e) {
                t.direction = e >= t.index, t.index = e, t.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, n = t.st.gallery.preload,
                    i = Math.min(n[0], t.items.length),
                    r = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? r : i); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? i : r); e++) t._preloadItem(t.index - e)
            },
            _preloadItem: function(n) {
                if (n = V(n), !t.items[n].preloaded) {
                    var i = t.items[n];
                    i.parsed || (i = t.parseEl(n)), A("LazyLoad", i), "image" === i.type && (i.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
                        i.hasSize = !0
                    }).on("error.mfploader", function() {
                        i.hasSize = !0, i.loadError = !0, A("LazyLoadError", i)
                    }).attr("src", i.src)), i.preloaded = !0
                }
            }
        }
    });
    var W = "retina";
    e.magnificPopup.registerModule(W, {
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
                    n = isNaN(n) ? n() : n, n > 1 && (C("ImageHasSize." + W, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), C("ElementParse." + W, function(t, i) {
                        i.src = e.replaceSrc(i, n)
                    }))
                }
            }
        }
    }), I()
}),
/*!
 *  #### Twitter Post Fetcher v17.0.0 ####
 *  Coded by Jason Mayes 2015. A present to all the developers out there.
 *  www.jasonmayes.com
 *  Please keep this disclaimer with my code if you use it. Thanks. :-)
 *  Got feedback or questions, ask here:
 *  http://www.jasonmayes.com/projects/twitterApi/
 *  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
 *  Updates will be posted to this site.
 */
function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : t()
}(this, function() {
    function e(e) {
        if (null === g) {
            for (var t = e.length, n = 0, i = document.getElementById(o), r = "<ul>"; n < t;) r += "<li>" + e[n] + "</li>", n++;
            r += "</ul>", i.innerHTML = r
        } else g(e)
    }

    function t(e) {
        return e.replace(/<b[^>]*>(.*?)<\/b>/gi, function(e, t) {
            return t
        }).replace(/class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function n(e) {
        for (var t = e.getElementsByTagName("a"), n = t.length - 1; n >= 0; n--) t[n].setAttribute("target", "_blank")
    }

    function i(e, t) {
        for (var n = [], i = new RegExp("(^| )" + t + "( |$)"), r = e.getElementsByTagName("*"), o = 0, a = r.length; o < a; o++) i.test(r[o].className) && n.push(r[o]);
        return n
    }

    function r(e) {
        if (void 0 !== e && e.innerHTML.indexOf("data-srcset") >= 0) {
            var t = e.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
            return decodeURIComponent(t).split('"')[1]
        }
    }
    var o = "",
        a = 20,
        s = !0,
        l = [],
        c = !1,
        u = !0,
        d = !0,
        f = null,
        p = !0,
        h = !0,
        g = null,
        m = !0,
        v = !1,
        y = !0,
        x = "en",
        b = !0,
        w = !1,
        C = null,
        F = {
            fetch: function(e) {
                if (void 0 === e.maxTweets && (e.maxTweets = 20), void 0 === e.enableLinks && (e.enableLinks = !0), void 0 === e.showUser && (e.showUser = !0), void 0 === e.showTime && (e.showTime = !0), void 0 === e.dateFunction && (e.dateFunction = "default"), void 0 === e.showRetweet && (e.showRetweet = !0), void 0 === e.customCallback && (e.customCallback = null), void 0 === e.showInteraction && (e.showInteraction = !0), void 0 === e.showImages && (e.showImages = !1), void 0 === e.linksInNewWindow && (e.linksInNewWindow = !0), void 0 === e.showPermalinks && (e.showPermalinks = !0), void 0 === e.dataOnly && (e.dataOnly = !1), c) l.push(e);
                else {
                    c = !0, o = e.domId, a = e.maxTweets, s = e.enableLinks, d = e.showUser, u = e.showTime, h = e.showRetweet, f = e.dateFunction, g = e.customCallback, m = e.showInteraction, v = e.showImages, y = e.linksInNewWindow, b = e.showPermalinks, w = e.dataOnly;
                    var t = document.getElementsByTagName("head")[0];
                    null !== C && t.removeChild(C), C = document.createElement("script"), C.type = "text/javascript", void 0 !== e.list ? C.src = "https://syndication.twitter.com/timeline/list?callback=__twttrf.callback&dnt=false&list_slug=" + e.list.listSlug + "&screen_name=" + e.list.screenName + "&suppress_response_codes=true&lang=" + (e.lang || x) + "&rnd=" + Math.random() : void 0 !== e.profile ? C.src = "https://syndication.twitter.com/timeline/profile?callback=__twttrf.callback&dnt=false&screen_name=" + e.profile.screenName + "&suppress_response_codes=true&lang=" + (e.lang || x) + "&rnd=" + Math.random() : void 0 !== e.likes ? C.src = "https://syndication.twitter.com/timeline/likes?callback=__twttrf.callback&dnt=false&screen_name=" + e.likes.screenName + "&suppress_response_codes=true&lang=" + (e.lang || x) + "&rnd=" + Math.random() : C.src = "https://cdn.syndication.twimg.com/widgets/timelines/" + e.id + "?&lang=" + (e.lang || x) + "&callback=__twttrf.callback&suppress_response_codes=true&rnd=" + Math.random(), t.appendChild(C)
                }
            },
            callback: function(o) {
                function g(e) {
                    var t = e.getElementsByTagName("img")[0];
                    return t.src = t.getAttribute("data-src-2x"), e
                }
                if (void 0 === o || void 0 === o.body) return c = !1, void(l.length > 0 && (F.fetch(l[0]), l.splice(0, 1)));
                o.body = o.body.replace(/(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g, ""), v || (o.body = o.body.replace(/(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g, "")), d || (o.body = o.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, ""));
                var x = document.createElement("div");
                x.innerHTML = o.body, "undefined" == typeof x.getElementsByClassName && (p = !1);
                var C = [],
                    A = [],
                    S = [],
                    I = [],
                    k = [],
                    T = [],
                    _ = [],
                    P = 0;
                if (p)
                    for (var E = x.getElementsByClassName("timeline-Tweet"); P < E.length;) E[P].getElementsByClassName("timeline-Tweet-retweetCredit").length > 0 ? k.push(!0) : k.push(!1), (!k[P] || k[P] && h) && (C.push(E[P].getElementsByClassName("timeline-Tweet-text")[0]), T.push(E[P].getAttribute("data-tweet-id")), d && A.push(g(E[P].getElementsByClassName("timeline-Tweet-author")[0])), S.push(E[P].getElementsByClassName("dt-updated")[0]), _.push(E[P].getElementsByClassName("timeline-Tweet-timestamp")[0]), void 0 !== E[P].getElementsByClassName("timeline-Tweet-media")[0] ? I.push(E[P].getElementsByClassName("timeline-Tweet-media")[0]) : I.push(void 0)), P++;
                else
                    for (var E = i(x, "timeline-Tweet"); P < E.length;) i(E[P], "timeline-Tweet-retweetCredit").length > 0 ? k.push(!0) : k.push(!1), (!k[P] || k[P] && h) && (C.push(i(E[P], "timeline-Tweet-text")[0]), T.push(E[P].getAttribute("data-tweet-id")), d && A.push(g(i(E[P], "timeline-Tweet-author")[0])), S.push(i(E[P], "dt-updated")[0]), _.push(i(E[P], "timeline-Tweet-timestamp")[0]), void 0 !== i(E[P], "timeline-Tweet-media")[0] ? I.push(i(E[P], "timeline-Tweet-media")[0]) : I.push(void 0)), P++;
                C.length > a && (C.splice(a, C.length - a), A.splice(a, A.length - a), S.splice(a, S.length - a), k.splice(a, k.length - a), I.splice(a, I.length - a), _.splice(a, _.length - a));
                var B = [],
                    P = C.length,
                    $ = 0;
                if (w)
                    for (; $ < P;) B.push({
                        tweet: C[$].innerHTML,
                        author: A[$] ? A[$].innerHTML : "Unknown Author",
                        time: S[$].textContent,
                        timestamp: S[$].getAttribute("datetime").replace("+0000", "Z").replace(/([\+\-])(\d\d)(\d\d)/, "$1$2:$3"),
                        image: r(I[$]),
                        rt: k[$],
                        tid: T[$],
                        permalinkURL: void 0 === _[$] ? "" : _[$].href
                    }), $++;
                else
                    for (; $ < P;) {
                        if ("string" != typeof f) {
                            var N = S[$].getAttribute("datetime"),
                                M = new Date(S[$].getAttribute("datetime").replace(/-/g, "/").replace("T", " ").split("+")[0]),
                                D = f(M, N);
                            if (S[$].setAttribute("aria-label", D), C[$].textContent)
                                if (p) S[$].textContent = D;
                                else {
                                    var O = document.createElement("p"),
                                        z = document.createTextNode(D);
                                    O.appendChild(z), O.setAttribute("aria-label", D), S[$] = O
                                } else S[$].textContent = D
                        }
                        var j = "";
                        s ? (y && (n(C[$]), d && n(A[$])), d && (j += '<div class="user">' + t(A[$].innerHTML) + "</div>"), j += '<p class="tweet">' + t(C[$].innerHTML) + "</p>", u && (j += b ? '<p class="timePosted"><a href="' + _[$] + '">' + S[$].getAttribute("aria-label") + "</a></p>" : '<p class="timePosted">' + S[$].getAttribute("aria-label") + "</p>")) : C[$].textContent ? (d && (j += '<p class="user">' + A[$].textContent + "</p>"), j += '<p class="tweet">' + C[$].textContent + "</p>", u && (j += '<p class="timePosted">' + S[$].textContent + "</p>")) : (d && (j += '<p class="user">' + A[$].textContent + "</p>"), j += '<p class="tweet">' + C[$].textContent + "</p>", u && (j += '<p class="timePosted">' + S[$].textContent + "</p>")), m && (j += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + T[$] + '" class="twitter_reply_icon"' + (y ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + T[$] + '" class="twitter_retweet_icon"' + (y ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + T[$] + '" class="twitter_fav_icon"' + (y ? ' target="_blank">' : ">") + "Favorite</a></p>"), v && void 0 !== I[$] && void 0 !== r(I[$]) && (j += '<div class="media"><img src="' + r(I[$]) + '" alt="Image from tweet" /></div>'), v ? B.push(j) : !v && C[$].textContent.length && B.push(j), $++
                    }
                e(B), c = !1, l.length > 0 && (F.fetch(l[0]), l.splice(0, 1))
            }
        };
    return window.__twttrf = F, window.twitterFetcher = F, F
}),
/*
 *  Vide - v0.5.1
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
! function(e, t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : e.jQuery)
}(this, function(e) {
    "use strict";

    function t(e) {
        var t, n, i, r, o, a, s, l = {};
        for (o = e.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), s = 0, a = o.length; s < a && (n = o[s], n.search(/^(http|https|ftp):\/\//) === -1 && n.search(":") !== -1); s++) t = n.indexOf(":"), i = n.substring(0, t), r = n.substring(t + 1), r || (r = void 0), "string" == typeof r && (r = "true" === r || "false" !== r && r), "string" == typeof r && (r = isNaN(r) ? r : +r), l[i] = r;
        return null == i && null == r ? e : l
    }

    function n(e) {
        e = "" + e;
        var t, n, i, r = e.split(/\s+/),
            o = "50%",
            a = "50%";
        for (i = 0, t = r.length; i < t; i++) n = r[i], "left" === n ? o = "0%" : "right" === n ? o = "100%" : "top" === n ? a = "0%" : "bottom" === n ? a = "100%" : "center" === n ? 0 === i ? o = "50%" : a = "50%" : 0 === i ? o = n : a = n;
        return {
            x: o,
            y: a
        }
    }

    function i(t, n) {
        var i = function() {
            n(this.src)
        };
        e('<img src="' + t + '.jpg">').on("load", i)
    }

    function r(n, i, r) {
        if (this.$element = e(n), "string" == typeof i && (i = t(i)), r ? "string" == typeof r && (r = t(r)) : r = {}, "string" == typeof i) i = i.replace(/\.\w*$/, "");
        else if ("object" == typeof i)
            for (var o in i) i.hasOwnProperty(o) && (i[o] = i[o].replace(/\.\w*$/, ""));
        this.settings = e.extend({}, a, r), this.path = i;
        try {
            this.init()
        } catch (l) {
            if (l.message !== s) throw l
        }
    }
    var o = "vide",
        a = {
            volume: 1,
            playbackRate: 1,
            muted: !0,
            loop: 0,
            autoplay: !0,
            position: "50% 50%",
            posterType: "detect",
            resizing: !0,
            bgColor: "transparent",
            className: "vid-container bg-fallback"
        },
        s = "Not implemented";
    r.prototype.init = function() {
        var t, r, o = this,
            a = o.path,
            l = a,
            c = "",
            u = o.$element,
            d = o.settings,
            f = n(d.position),
            p = d.posterType;
        r = o.$wrapper = e("<div>").addClass(d.className).css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-color": d.bgColor,
            "background-repeat": "no-repeat",
            "background-position": f.x + " " + f.y
        }), "object" == typeof a && (a.poster ? l = a.poster : a.mp4 ? l = a.mp4 : a.webm ? l = a.webm : a.ogv && (l = a.ogv)), "detect" === p ? i(l, function(e) {
            r.css("background-image", "url(" + e + ")")
        }) : "none" !== p && r.css("background-image", "url(" + l + "." + p + ")"), "static" === u.css("position") && u.css("position", "relative"), u.append(r), "object" == typeof a ? (a.mp4 && (c += '<source src="' + a.mp4 + '.mp4" type="video/mp4">'), t = o.$video = e("<video>" + c + "</video>")) : t = o.$video = e('<video><source src="' + a + '.mp4" type="video/mp4"></video>');
        try {
            t.prop({
                autoplay: d.autoplay,
                loop: d.loop,
                volume: d.volume,
                muted: d.muted,
                defaultMuted: d.muted,
                playbackRate: d.playbackRate,
                defaultPlaybackRate: d.playbackRate
            })
        } catch (h) {
            throw new Error(s)
        }
        t.css({
            margin: "auto",
            position: "absolute",
            top: f.y,
            left: f.x,
            "-webkit-transform": "translate(-" + f.x + ", -" + f.y + ")",
            "-ms-transform": "translate(-" + f.x + ", -" + f.y + ")",
            "-moz-transform": "translate(-" + f.x + ", -" + f.y + ")",
            transform: "translate(-" + f.x + ", -" + f.y + ")",
            opacity: 0
        }).one("canplaythrough.vide", function() {
            o.resize()
        }).one("playing.vide", function() {
            t.css({
                opacity: 1
            }), r.css("background-image", "none")
        }), u.on("resize.vide", function() {
            d.resizing && o.resize()
        }), r.append(t)
    }, r.prototype.getVideoObject = function() {
        return this.$video[0]
    }, r.prototype.resize = function() {
        if (this.$video) {
            var e = this.$wrapper,
                t = this.$video,
                n = t[0],
                i = n.videoHeight,
                r = n.videoWidth,
                o = e.height(),
                a = e.width();
            a / r > o / i ? t.css({
                width: a + 2,
                height: "auto"
            }) : t.css({
                width: "auto",
                height: o + 2
            })
        }
    }, r.prototype.destroy = function() {
        delete e[o].lookup[this.index], this.$video && this.$video.off(o), this.$element.off(o).removeData(o), this.$wrapper.remove()
    }, e[o] = {
        lookup: []
    }, e.fn[o] = function(t, n) {
        var i;
        return this.each(function() {
            i = e.data(this, o), i && i.destroy(), i = new r(this, t, n), i.index = e[o].lookup.push(i) - 1, e.data(this, o, i)
        }), this
    }, e(document).ready(function() {
        var t = e(window);
        t.on("resize.vide", function() {
            for (var t, n = e[o].lookup.length, i = 0; i < n; i++) t = e[o].lookup[i], t && t.settings.resizing && t.resize()
        }), t.on("unload.vide", function() {
            return !1
        }), e(document).find("[data-vide-bg]").each(function(t, n) {
            var i = e(n),
                r = i.data("vide-options"),
                a = i.data("vide-bg");
            i[o](a, r)
        })
    })
});
/*!
 * Name: Atlas
 * Author: Zengenti Ltd
 * Author URI: http://zengenti.com
 * Description: A modern front-end framework
 * Version: 0.0.1
 */
var Notts = function() {
    "use strict";
    var e;
    return {
        settings: function() {
            this.$window = $(window), this.$offcanvasWrap = $(".offcanvas-wrap"), this.$offcanvasTrigger = $(".js-offcanvas-toggle"), this.$navParent = $(".nav__parent"), this.$searchToggle = $(".js-search-toggle"), this.$searchContainer = $(".search-container"), this.$searchOverlay = $(".search-container-overlay"), this.$skipTo = $(".skip-to-content"), this.$navParent = $(".nav__parent"), this.$timer = $("#timer"), this.$timer2 = $("#timer2"), this.$slideshow = $(".banner"), this.$slideshow2 = $(".sub-carousel__main"), this.$htmlVideo = $(".vid-container"), this.mqSmall = window.matchMedia("(min-width: 641px)"), this.mqMed = window.matchMedia("(min-width: 1025px)"), this.video = null, this.vidInstance = null, this.timeout = null, this.moveLeft = "move-left", this.activePanel = "is-open", this.circleLoop = "M26,4c12.1,0,22,9.9,22,22s-9.8,21.9-22,21.9S4,38,4,25.9S13.9,4,26,4", this.oldIE = !1
        },
        init: function() {
            e = new this.settings, this.checkIE(), this.cloneNav(), e.oldIE || (this.heightEqualizer(), e.$timer.length && this.svgTimer(), e.$timer2.length && this.svgTimer2(), this.twitterFeedConfig()), this.popupVideoConfig(), this.carouselClone(), this.fadeCarousel(), this.hideMobileVideo(), this.searchFocus(), this.bindUIActions(), this.bindWindowActions()
        },
        checkIE: function() {
            $("html").is(".no-eventlistener") && (e.oldIE = !0)
        },
        getWrapper: function() {
            return $(".offcanvas-wrap")
        },
        toggle: function(e, t, n) {
            n = n || this.getWrapper(), n.is("." + t) ? Notts.hide("#" + e, t, n) : Notts.show("#" + e, t, n)
        },
        show: function(t, n, i) {
            i = i || this.getWrapper(), i.addClass(n), $(t).addClass(e.activePanel)
        },
        hide: function(t, n, i) {
            i = i || this.getWrapper(), i.removeClass(n), $(t).removeClass(e.activePanel)
        },
        cloneNav: function() {
            $("#main-nav").clone().appendTo(".offcanvas-panel").removeClass("nav--inline").addClass("nav--stacked"), $("#selector-nav").clone().appendTo(".offcanvas-panel").removeClass("nav--inline").addClass("nav--stacked")
        },
        navDropdown: function(t) {
            e.$navParent.not(t).each(function() {
                var e = $(this);
                e.hasClass("nav__parent--open") && e.removeClass("nav__parent--open").children(".nav__sub").slideUp(250)
            }), e.$searchToggle.hasClass("js-search-toggle--open") && e.mqMed.matches ? (e.$searchToggle.removeClass("js-search-toggle--open"), $(".search-container-overlay").fadeOut(300), e.$searchContainer.delay(300).slideUp(250), $(t).toggleClass("nav__parent--open").children(".nav__sub").delay(600).slideToggle(250)) : $(t).toggleClass("nav__parent--open").children(".nav__sub").slideToggle(250)
        },
        searchToggle: function() {
            e.$navParent.hasClass("nav__parent--open") && e.$navParent.removeClass("nav__parent--open").children(".nav__sub").slideUp(250), e.$searchToggle.hasClass("js-search-toggle--open") ? (e.$searchToggle.removeClass("js-search-toggle--open"), e.$offcanvasWrap.removeClass("search-open"), $(".search-container-overlay").fadeOut(300), e.$searchContainer.delay(300).slideUp(250)) : (e.$searchToggle.addClass("js-search-toggle--open"), e.$offcanvasWrap.addClass("search-open"), e.mqSmall.matches ? e.$searchContainer.slideDown(250) : e.$searchContainer.show(), $(".sys_searchbox").focus(), $(".search-container-overlay").delay(200).fadeIn(500))
        },
        searchFocus: function() {
            var e = $("input[type=text]");
            e.focus(function() {
                $(this).val("").attr("autocomplete", "off")
            }).blur(function() {
                var e = $(this);
                "" == e.val() && $(this).val("Search")
            })
        },
        searchOverlay: function() {
            e.$searchToggle.hasClass("js-search-toggle--open") && (e.$searchToggle.removeClass("js-search-toggle--open"), e.$searchOverlay.fadeOut(300), e.$searchContainer.delay(300).slideUp(250))
        },
        scrollToId: function(e) {
            var t = $(e);
            $("html,body").animate({
                scrollTop: t.offset().top
            }, 250)
        },
        svgTimer: function() {
            function t() {
                Snap.animate(0, n, function(t) {
                    r.attr({
                        path: Snap.path.getSubpath(e.circleLoop, 0, t),
                        strokeWidth: 3
                    })
                }, 8e3, mina.easeInOut, function() {
                    setTimeout(function() {
                        r.attr({
                            path: Snap.path.getSubpath(e.circleLoop, 0, 0),
                            strokeWidth: 0
                        })
                    }, 1e3)
                })
            }
            var n = Snap.path.getTotalLength(e.circleLoop),
                i = Snap("#timer"),
                r = i.path({
                    path: Snap.path.getSubpath(e.circleLoop, 0, 0),
                    stroke: "#fff",
                    fillOpacity: 0,
                    strokeWidth: 0
                });
            t(), e.$slideshow.on("cycle-initialized cycle-after", function() {
                e.$slideshow.is(".cycle-paused") || t()
            }), e.$slideshow.on("cycle-paused", function() {
                e.$timer.hide()
            }), e.$slideshow.on("cycle-resumed", function() {
                e.$timer.show(), t()
            })
        },
        svgTimer2: function() {
            function t() {
                Snap.animate(0, n, function(t) {
                    r.attr({
                        path: Snap.path.getSubpath(e.circleLoop, 0, t),
                        strokeWidth: 3
                    })
                }, 8e3, mina.easeInOut, function() {
                    setTimeout(function() {
                        r.attr({
                            path: Snap.path.getSubpath(e.circleLoop, 0, 0),
                            strokeWidth: 0
                        })
                    }, 1e3)
                })
            }
            var n = Snap.path.getTotalLength(e.circleLoop),
                i = Snap("#timer2"),
                r = i.path({
                    path: Snap.path.getSubpath(e.circleLoop, 0, 0),
                    stroke: "#1A296B",
                    fillOpacity: 0,
                    strokeWidth: 0
                });
            t(), e.$timer2.hide(), e.$slideshow2.on("cycle-initialized cycle-after", function() {
                t()
            }), e.$slideshow2.on("cycle-paused", function() {
                e.$timer2.hide()
            }), e.$slideshow2.on("cycle-resumed", function() {
                e.$timer2.show(), t()
            })
        },
        heightEqualizer: function() {
            function t(e) {
                if (e.matches)
                    for (var t = 0; t < c.length; t++) n(c[t])
            }

            function n(e) {
                function t(e) {
                    o = document.querySelectorAll(e), a = Array.prototype.slice.call(o);
                    var t = [];
                    s = a.length;
                    for (var n = 0; n < s; n++) t.push(a[n].clientHeight);
                    for (l = Math.max.apply(Math, t), n = 0; n < s; n++) a[n].style.minHeight = l + "px"
                }
                t(e)
            }

            function i(e, t, n) {
                null != e && "undefined" != typeof e && (e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n)
            }

            function r() {
                setTimeout(function() {
                    for (var e = 0; e < c.length; e++) {
                        var n = [];
                        n = document.querySelectorAll(c[e]);
                        for (var i = 0; i < n.length; i++) n[i].style.removeProperty ? n[i].style.removeProperty("min-height") : n[i].style.removeAttribute("min-height")
                    }
                    t(d)
                }, u)
            }
            var o = [],
                a = [],
                s = "",
                l = "",
                c = [".mh1", ".mh2", ".mh3", ".mh4"],
                u = "200";
            if (matchMedia) {
                var d = e.mqSmall;
                d.addListener(t), t(d)
            }
            i(window, "resize", r), r()
        },
        popupVideoConfig: function() {
            $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
                disableOn: 700,
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 160,
                preloader: !1,
                fixedContentPos: !1
            })
        },
        twitterFeedConfig: function() {
            var e = {
                profile: {
                    screenName: "UniofNottingham"
                },
                domId: "twitter-fetch",
                maxTweets: 1,
                enableLinks: !0,
                showUser: !1,
                showTime: !1,
                showImages: !1,
                showInteraction: !1,
                lang: "en"
            };
            twitterFetcher.fetch(e), window.twttr = function(e, t, n) {
                var i, r = e.getElementsByTagName(t)[0],
                    o = window.twttr || {};
                return e.getElementById(n) ? o : (i = e.createElement(t), i.id = n, i.src = "https://platform.twitter.com/widgets.js", r.parentNode.insertBefore(i, r), o._e = [], o.ready = function(e) {
                    o._e.push(e)
                }, o)
            }(document, "script", "twitter-wjs")
        },
        carouselClone: function() {
            $(".sub-carousel__main .slide img").clone().appendTo(".preview-cycle"), $(".preview-cycle").addClass("cycle").cycle(), $(".pause-cycle").cycle("pause")
        },
        fadeCarousel: function() {
            var t = 7e3;
            $(".sub-carousel__main .slide__text:not(:first)").hide(), e.$slideshow2.on("cycle-initialized cycle-after", function() {
                function n() {
                    e.timeout = setTimeout(function() {
                        r.fadeOut()
                    }, t)
                }
                var i = $(this).find(".cycle-slide-active"),
                    r = i.children(".slide__text");
                r.fadeIn(), n()
            }), e.$slideshow2.on("cycle-paused", function() {
                clearTimeout(e.timeout)
            }), e.$slideshow2.on("cycle-resumed", function() {
                function n() {
                    e.timeout = setTimeout(function() {
                        r.fadeOut()
                    }, t)
                }
                var i = $(this).find(".cycle-slide-active"),
                    r = i.children(".slide__text");
                r.fadeIn(), n()
            }), e.$slideshow2.on("cycle-next", function() {
                $(".sub-carousel__main .slide__text").fadeOut(), clearTimeout(e.timeout)
            }), e.$slideshow2.on("cycle-prev", function() {
                $(".sub-carousel__main .slide__text").fadeOut(), clearTimeout(e.timeout)
            })
        },
        pauseCarousel: function(t) {
            var n = $("#controls");
            ".banner" !== t && (n = $("#controls2")), $(t).is(".cycle-paused") ? ($(t).cycle("resume"), e.mqSmall.matches && e.$htmlVideo.each(function() {
                e.video = $(this).children("video"), e.video[0].play()
            }), $(n).find(".icon-play-button").hide(), $(n).find(".icon-slider-pause").show()) : ($(t).cycle("pause"), e.mqSmall.matches && e.$htmlVideo.each(function() {
                e.video = $(this).children("video"), e.video[0].pause()
            }), $(n).find(".icon-slider-pause").hide(), $(n).find(".icon-play-button").show())
        },
        hideMobileVideo: function() {
            e.mqSmall.matches || (e.$htmlVideo.hide(), e.oldIE || Notts.setFallbackImg())
        },
        setFallbackImg: function() {
            $(".vid-bg").each(function() {
                if ($(this)[0].hasAttribute("data-vide-bg")) {
                    var e = $(this).data("vide-bg") + ".jpg";
                    $(this).css("background-image", "url(" + e + ")")
                }
            })
        },
        removeFallbackImg: function() {
            $(".vid-bg").each(function() {
                $(this)[0].hasAttribute("data-vide-bg") && $(this).css("background-image", "none")
            })
        },
        bindUIActions: function() {
            e.$skipTo.on("click", function() {
                Notts.scrollToId("#main")
            }), $(".nav__parent").on("click", function() {
                Notts.navDropdown(this)
            }), $(".nav__parent > a").on("click", function(e) {
                e.preventDefault()
            }), e.$searchToggle.on("click", function(e) {
                Notts.searchToggle(), e.preventDefault()
            }), e.$searchOverlay.on("click", function(e) {
                Notts.searchOverlay(), e.preventDefault()
            }), $("#pause").on("click", function(e) {
                Notts.pauseCarousel(".banner"), e.preventDefault()
            }), $("#pause2").on("click", function(e) {
                Notts.pauseCarousel(".sub-carousel-cycle"), e.preventDefault()
            }), e.$offcanvasTrigger.on("click", function(e) {
                e.preventDefault();
                var t = $(this);
                t.addClass("js-offcanvas-toggle--active").attr({
                    "aria-expanded": "false" === t.attr("aria-expanded")
                }), Notts.toggle(t.data("panel"), t.data("position"))
            }), $(".js-offcanvas-exit").on("click", function(t) {
                t.preventDefault(), $(".js-offcanvas-toggle").removeClass("js-offcanvas-toggle--active"), e.$offcanvasTrigger.attr({
                    "aria-expanded": !1
                }), Notts.hide("." + e.activePanel, e.moveLeft, Notts.getWrapper())
            })
        },
        bindWindowActions: function() {
            if (e.$timer2.length) {
                var t = $(".sub-carousel").offset().top,
                    n = null,
                    i = 0;
                e.$window.scroll(function() {
                    n || (n = setTimeout(function() {
                        clearTimeout(n), n = null, $(window).scrollTop() >= t && 0 == i && ($("#pause2").click(), i = 1)
                    }, 250))
                })
            }
            e.$window.resize(function() {
                e.mqSmall.matches || e.oldIE ? (e.$htmlVideo.show(), Notts.removeFallbackImg()) : (e.$htmlVideo.hide(), Notts.setFallbackImg())
            })
        }
    }
}(jQuery);
$(document).ready(function() {
    Notts.init()
});
//# sourceMappingURL=app.min.js.map