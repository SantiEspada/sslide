"use strict";

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var _createClass = function() {
    function t(t, e) {
        for (var s = 0; s < e.length; s++) {
            var n = e[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, s, n) {
        return s && t(e.prototype, s), n && t(e, n), e;
    };
}(), sslide = function() {
    function t(e, s) {
        _classCallCheck(this, t), this.animating = !1, this.numOfCards = 0, this.treshold = 150, 
        this.pullDeltaX = 0, this.shift = 1;
        var n = this;
        if (!e) throw new Error("[sslide] Parent element must be defined!");
        if (this.parent = e, this.numOfCards = this.cardsCounter = $(e).find(".sslide__card").length, 
        void 0 !== s) {
            if ("number" != typeof s) throw new Error("[sslide] this.treshold must be a number!");
            this.treshold = s;
        }
        $(e).find(".sslide__card").each(function(t, e) {
            e.dataset.index = t + 1;
        }), $(document).on("mousedown touchstart", e + " .sslide__card:not(.inactive)", function(t) {
            if (!n.animating) {
                n.currentCard = $(this);
                var e = t.pageX || t.originalEvent.touches[0].pageX;
                $(document).on("mousemove touchmove", function(t) {
                    var s = t.pageX || t.originalEvent.touches[0].pageX;
                    n.pullDeltaX = s - e, n.pullDeltaX && n.pullChange();
                }), $(document).on("mouseup touchend", function() {
                    $(document).off("mousemove touchmove mouseup touchend"), console.log(n.pullDeltaX, n.treshold), 
                    n.pullDeltaX && n.release();
                });
            }
        });
    }
    return _createClass(t, [ {
        key: "pullChange",
        value: function() {
            this.animating = !0, this.currentCard.css("transform", "translateX(" + this.pullDeltaX + "px)");
            var t = Math.abs(this.pullDeltaX) / this.treshold * -1 + 1;
            t = function(t) {
                return --t * t * t + 1;
            }(t), this.currentCard.css("opacity", t), this.currentCard.css("transition", "0s");
        }
    }, {
        key: "release",
        value: function() {
            if (Math.abs(this.pullDeltaX) >= this.treshold) {
                console.log("card discarded"), this.shift = this.shift + 1 > this.numOfCards ? 1 : this.shift + 1;
                var t = [];
                $(this.parent).find(".sslide__card").each(function(e, s) {
                    t.push(s);
                }), console.log(t);
                for (var e = 0; e < this.shift; e++) t.push(t.shift());
                t.forEach(function(t, e) {
                    return t.dataset.index = e + 1;
                });
            }
            Math.abs(this.pullDeltaX) < this.treshold && this.currentCard.attr("style", "transition: .3s;");
            var s = this;
            setTimeout(function() {
                s.currentCard.attr("style", ""), s.pullDeltaX = 0, s.animating = !1;
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