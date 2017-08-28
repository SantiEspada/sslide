/*  Simple sslide plugin
    based on https://codepen.io/suez/pen/MaeVBy */

class sslide{
    animating = false;
    numOfCards = 0;
    treshold = 150;
    pullDeltaX = 0;
    shift = 1;
    currentCard;

    pullChange() {
        this.animating = true;
        this.currentCard.css('transform', 'translateX(' + this.pullDeltaX + 'px)');
        
        var absDelta = Math.abs(this.pullDeltaX);
        var opacity = (absDelta/this.treshold)*(-1)+1;
        opacity = (function (t) { return (--t)*t*t+1 })(opacity);
        this.currentCard.css('opacity', opacity);
        this.currentCard.css('transition', '0s');
    };

    release() {
        if (Math.abs(this.pullDeltaX) >= this.treshold) {
            /* tarjeta descartada */
            console.log('card discarded');

            this.shift = (this.shift+1 > this.numOfCards) ? 1 : this.shift+1;
            let els = [];

            $(this.parent).find('.sslide__card').each((i, el) => {
                els.push(el);
            });

            console.log(els);

            for(var i = 0; i < this.shift; i++){
                els.push(els.shift());
            }

            els.forEach((el, key) => el.dataset.index = key+1);
        }

        if (Math.abs(this.pullDeltaX) < this.treshold) {
            /* tarjeta vuelve */
            this.currentCard.attr('style', 'transition: .3s;');
        }

        let self = this;
        setTimeout(function () {
            self.currentCard.attr('style', '');

            self.pullDeltaX = 0;
            self.animating = false;
        }, 300);
    };

    card(n){
        return $(`.sslide__card[data-index:"${n}"]`, this.parent);
    }

    constructor(parent, treshold){
        let self = this;

        if(parent){
            this.parent = parent;
            this.numOfCards = this.cardsCounter = $(parent).find('.sslide__card').length;
        } else {
            throw new Error('[sslide] Parent element must be defined!');
        }

        if(typeof treshold != 'undefined'){
            if(typeof treshold != 'number'){
                throw new Error('[sslide] this.treshold must be a number!');
            } else {
                this.treshold = treshold;
            }
        }

        $(parent).find('.sslide__card').each((i, el) => {
            el.dataset.index = i+1;
        });

        $(document).on('mousedown touchstart', parent + ' .sslide__card:not(.inactive)', function (e) {
            if (self.animating) return;

            self.currentCard = $(this);
            var startX = e.pageX || e.originalEvent.touches[0].pageX;

            $(document).on('mousemove touchmove', function (e) {
                var x = e.pageX || e.originalEvent.touches[0].pageX;
                self.pullDeltaX = (x - startX);
                if (!self.pullDeltaX) return;
                self.pullChange();
            });

            $(document).on('mouseup touchend', function () {
                $(document).off('mousemove touchmove mouseup touchend');
                console.log(self.pullDeltaX, self.treshold);
                if (!self.pullDeltaX) return; // prevents from rapindex click events
                self.release();
            });
        });
    }
};