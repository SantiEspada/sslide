"use strict";

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    return function(e, n, a) {
        return n && t(e.prototype, n), a && t(e, a), e;
    };
}(), sslide = function() {
    function t(e, n) {
        _classCallCheck(this, t), this.animating = !1, this.numOfCards = 0, this.treshold = 150, 
        this.pullDeltaX = 0, this.fadeCards = !0, this.scrollOnSlide = !0, this.shift = 1;
        var a = this;
        if (!e) throw new Error("[sslide] Parent element must be defined!");
        if (this.parent = e, this.numOfCards = this.cardsCounter = $(e).find(".sslide__card").length, 
        void 0 !== n) {
            if ("number" != typeof n) throw new Error("[sslide] this.treshold must be a number!");
            this.treshold = n;
        }
        $(e).find(".sslide__card").each(function(t, e) {
            e.dataset.index = t + 1;
        }), $(document).on("touchstart", e + " .sslide__card:not(.inactive)", function(t) {
            if (!a.animating) {
                var e = new Date().getTime(), n = !1;
                if (a.currentCard = $(this), "1" == a.currentCard.attr("data-index")) {
                    var i = t.pageX || t.originalEvent.touches[0].pageX;
                    $(document).on("touchmove", function(t) {
                        var e = (t.pageX || t.originalEvent.touches[0].pageX) - i;
                        Math.abs(e) > 25 && (n = !0, a.pullDeltaX = e, a.pullDeltaX && a.pullChange());
                    }), $(document).on("touchend", function() {
                        if ($(document).off("touchmove touchend"), a.pullDeltaX && a.release(), !n && new Date().getTime() - e < 100) {
                            var t = a.currentCard.find("a.card-wp-link");
                            t && (document.location.href = t.prop("href"));
                        }
                    });
                }
            }
        });
    }
    return _createClass(t, [ {
        key: "pullChange",
        value: function() {
            this.scrollOnSlide || $("html, body").css("overflow", "hidden"), this.animating = !0, 
            this.currentCard.css("transform", "translateX(" + this.pullDeltaX + "px)");
            Math.abs(this.pullDeltaX);
            var t = fadeCards ? 1 / this.treshold * -1 + 1 : 1;
            t = function(t) {
                return --t * t * t + 1;
            }(t), this.currentCard.css("opacity", t), this.currentCard.css("transition", "0s");
        }
    }, {
        key: "release",
        value: function() {
            if (this.scrollOnSlide || $("html, body").css("overflow", "initial"), Math.abs(this.pullDeltaX) >= this.treshold) {
                this.shift = this.shift + 1 > this.numOfCards ? 1 : this.shift + 1;
                var t = [];
                $(this.parent).find(".sslide__card").each(function(e, n) {
                    t.push(n);
                }), console.log(t);
                for (var e = 0; e < this.shift; e++) t.push(t.shift());
                t.forEach(function(t, e) {
                    return t.dataset.index = e + 1;
                });
            }
            Math.abs(this.pullDeltaX) < this.treshold && this.currentCard.attr("style", "transition: .3s;");
            var n = this;
            setTimeout(function() {
                n.currentCard.attr("style", ""), n.pullDeltaX = 0, n.animating = !1;
            }, 300);
        }
    }, {
        key: "card",
        value: function(t) {
            return $('.sslide__card[data-index:"' + t + '"]', this.parent);
        }
    } ]), t;
}();
//# sourceMappingURL=simple-slide-dist.js.map