/*  Simple sslide plugin
    based on https://codepen.io/suez/pen/MaeVBy */

class sslide{
    animating = false;
    numOfCards = 0;
    treshold = 150;
    pullDeltaX = 0;
    fadeCards = true;
    scrollOnSlide = true;
    shift = 1;
    currentCard;

    pullChange() {
        if(!this.scrollOnSlide) $('html, body').css('overflow', 'hidden');
        this.animating = true;
        this.currentCard.css('transform', 'translateX(' + this.pullDeltaX + 'px)');
        
        let absDelta = Math.abs(this.pullDeltaX);
        let opacity = fadeCards ? (1/this.treshold)*(-1)+1 : 1;
        opacity = (function (t) { return (--t)*t*t+1 })(opacity);
        this.currentCard.css('opacity', opacity);
        this.currentCard.css('transition', '0s');
    };

    release() {
        if(!this.scrollOnSlide) $('html, body').css('overflow', 'initial');
        if (Math.abs(this.pullDeltaX) >= this.treshold) {

            this.shift = (this.shift+1 > this.numOfCards) ? 1 : this.shift+1;
            let els = [];

            $(this.parent).find('.sslide__card').each((i, el) => {
                els.push(el);
            });

            console.log(els);

            for(let i = 0; i < this.shift; i++){
                els.push(els.shift());
            }

            els.forEach((el, key) => el.dataset.index = key+1);
        }

        if (Math.abs(this.pullDeltaX) < this.treshold) {
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

    constructor(parent, options){
        for(let option in options) this[option] = options[option];
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

        $(document).on('touchstart', parent + ' .sslide__card:not(.inactive)', function (e) {
            if (self.animating) return;

            let mt_start = new Date().getTime(),
                moved = false;

            self.currentCard = $(this);
            if(self.currentCard.attr('data-index') == '1'){

                let x1 = e.pageX || e.originalEvent.touches[0].pageX
                $(document).on('touchmove', function (e) {
                    let x2 = e.pageX || e.originalEvent.touches[0].pageX,
                        diff = x2-x1;
                    
                    if(Math.abs(diff) > 25){
                        moved = true;
                        self.pullDeltaX = diff;
                        self.pullDeltaX && self.pullChange();
                    }
                });
                
                $(document).on('touchend', function () {
                    $(document).off('touchmove touchend');
                    self.pullDeltaX && self.release();

                    if(!moved && (new Date().getTime()) - mt_start < 100){
                        let link_href = self.currentCard.find('a.card-wp-link');

                        if(link_href) document.location.href = link_href.prop('href');
                    }
                });
            }
        });
    }
};