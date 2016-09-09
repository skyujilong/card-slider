"use strict";
require('./scss/card-slider.scss');

function CardSlider($el) {
    var method, _self = this,
        _clzName = 'card-slider',
        itemWidth, itemSpace, activeNum;
    this.$el = $el;
    this.$el.addClass(_clzName);
    this.$elLiList = $el.children('ul').children('li');
    itemWidth = this.$elLiList.eq(0).width();
    method = {
        init: function() {
            this.initSpace();
            this.initPos(0);
            this.bindEvent();
        },
        bindEvent: function() {
            _self.$elLiList.on('swipeLeft', function() {
                if (activeNum == _self.$elLiList.length - 1) {
                    return;
                }
                activeNum++;
                $el.children('ul').css({
                    'transform': 'translateX(' + -itemSpace * (activeNum) + 'px)'
                });
                Array.prototype.forEach.call(_self.$elLiList, function(item, index) {
                    var _val = (90 - 90 / _self.$elLiList.length * Math.abs(activeNum - index)) * Math.PI / 180;
                    var scale = Math.sin(_val);
                    var zIndex = $(item).css('zIndex');
                    if (activeNum == index) {
                        $(item).css({
                            'transform-origin': 'center center',
                            '-webkit-transform': 'scale(1)',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else if (activeNum > index) {
                        $(item).css({
                            'transform-origin': 'left center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 1
                        });
                    } else {
                        $(item).css({
                            'transform-origin': 'right center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    }
                });
            });

            _self.$elLiList.on('swipeRight', function() {
                if (activeNum == 0) {
                    return;
                }
                activeNum--;
                $el.children('ul').css({
                    'transform': 'translateX(' + -itemSpace * (activeNum) + 'px)'
                });
                Array.prototype.forEach.call(_self.$elLiList, function(item, index) {
                    var _val = (90 - 90 / _self.$elLiList.length * Math.abs(activeNum - index)) * Math.PI / 180;
                    var scale = Math.sin(_val);
                    var zIndex = $(item).css('zIndex');
                    if (activeNum == index) {
                        $(item).css({
                            'transform-origin': 'center center',
                            '-webkit-transform': 'scale(1)',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else if (activeNum > index) {
                        $(item).css({
                            'transform-origin': 'left center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else {
                        $(item).css({
                            'transform-origin': 'right center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 1
                        });
                    }
                });
            });
        },
        initPos: function(i) {
            activeNum = i;
            Array.prototype.forEach.call(_self.$elLiList, function(item, index) {
                var left = (_self.$el.width() - itemWidth) / 2;
                var _val = (90 - 90 / _self.$elLiList.length * index) * Math.PI / 180;
                var scale = Math.sin(_val);

                $(item).css({
                    'left': left + index * itemSpace,
                    'z-index': _self.$elLiList.length - index + 100,
                    '-ms-transform': 'scale(' + scale + ')',
                    '-o-transform': 'scale(' + scale + ')',
                    '-moz-transform': 'scale(' + scale + ')',
                    '-webkit-transform': 'scale(' + scale + ')',
                    '-ms-transform-origin': 'right center',
                    '-o-transform-origin': 'right center',
                    '-webkit-transform-origin': 'right center',
                    '-moz-transform-origin': 'right center',
                    'transform-origin': 'right center'
                });
            });
        },
        initSpace: function() {
            var width = _self.$el.width();
            var length = _self.$elLiList.length;
            itemSpace = Math.floor((width - itemWidth) / 2 / length);
        }
    }
    method.init();
}



module.exports = CardSlider;
