"use strict";
require('./scss/card-slider.scss');

function CardSlider($el, opt) {
    var method, _self = this,
        _clzName = 'card-slider',
        itemWidth, itemSpace, activeNum, startPos = {},
        endPos = {};
    opt = opt || {
        bar: true
    };
    this.events = {
        'change': []
    };
    this.$el = $el;
    this.$el.addClass(_clzName);
    this.$elLiList = $el.children('ul').children('li');
    itemWidth = this.$elLiList.eq(0).width();
    method = {
        init: function() {
            this.initSpace();
            this.initPos(0);
            if (opt && opt.bar) {
                this.initBar();
            }
            this.bindEvent();

        },
        toRun: function() {
            var tThis = this;
            var dir = tThis.checkDir(endPos.x, startPos.x, endPos.y, startPos.y);
            if (dir === 'left2right') {
                //向右滑动
                if (activeNum == 0) {
                    return;
                }
                activeNum--;
                tThis.activeNumChange(activeNum);
                $el.children('ul').css({
                    '-webkit-transform' : 'translateX(' + -itemSpace * (activeNum) + 'px)',
                    'transform': 'translateX(' + -itemSpace * (activeNum) + 'px)'
                });
                Array.prototype.forEach.call(_self.$elLiList, function(item, index) {
                    var _val = (90 - 90 / _self.$elLiList.length * Math.abs(activeNum - index)) * Math.PI / 180;
                    var scale = Math.sin(_val);
                    var zIndex = $(item).css('zIndex');
                    if (activeNum == index) {
                        $(item).css({
                            '-webkit-transform-origin': 'center center',
                            'transform-origin': 'center center',
                            '-webkit-transform': 'scale(1)',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else if (activeNum > index) {
                        $(item).css({
                            '-webkit-transform-origin': 'left center',
                            'transform-origin': 'left center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else {
                        $(item).css({
                            '-webkit-transform-origin': 'right center',
                            'transform-origin': 'right center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 1
                        });
                    }
                });
            } else if (dir === 'right2left') {
                //向左滑动
                if (activeNum == _self.$elLiList.length - 1) {
                    return;
                }
                activeNum++;
                tThis.activeNumChange(activeNum);
                $el.children('ul').css({
                    '-webkit-transform': 'translateX(' + -itemSpace * (activeNum) + 'px)',
                    'transform': 'translateX(' + -itemSpace * (activeNum) + 'px)'
                });
                Array.prototype.forEach.call(_self.$elLiList, function(item, index) {
                    var _val = (90 - 90 / _self.$elLiList.length * Math.abs(activeNum - index)) * Math.PI / 180;
                    var scale = Math.sin(_val);
                    var zIndex = $(item).css('zIndex');
                    if (activeNum == index) {
                        $(item).css({
                            '-webkit-transform-origin': 'center center',
                            'transform-origin': 'center center',
                            '-webkit-transform': 'scale(1)',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    } else if (activeNum > index) {
                        $(item).css({
                            '-webkit-transform-origin': 'left center',
                            'transform-origin': 'left center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 1
                        });
                    } else {
                        $(item).css({
                            '-webkit-transform-origin': 'right center',
                            'transform-origin': 'right center',
                            '-webkit-transform': 'scale(' + scale + ')',
                            'transform': 'scale(' + scale + ')',
                            'zIndex': zIndex - 0 + 1
                        });
                    }
                });
            }
        },
        bindEvent: function() {
            var tThis = this;
            _self.$elLiList.on('touchstart', function(e) {
                var touch = e.touches[0];
                startPos.x = touch.pageX;
                startPos.y = touch.pageY;
            });
            _self.$elLiList.on('touchmove', function(e) {
                var touch = e.touches[0],
                    dir;
                endPos.x = touch.pageX;
                endPos.y = touch.pageY;
                throttle(tThis.toRun,tThis);
            });

            function throttle(cb, context) {
                clearTimeout(cb.timmer);
                cb.timmer = setTimeout(function() {
                    cb.call(context);
                }, 50);
            }
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
                    'transform': 'scale(' + scale + ')',
                    '-ms-transform-origin': 'right center',
                    '-o-transform-origin': 'right center',
                    '-webkit-transform-origin': 'right center',
                    '-moz-transform-origin': 'right center',
                    'transform-origin': 'right center'
                });
            });
        },
        activeNumChange: function(num) {
            //TODO activeNumChange
            if (opt.bar) {
                this.initBarPos();
            }
            this.noti('change', num);
        },
        initSpace: function() {
            var width = _self.$el.width();
            var length = _self.$elLiList.length;
            itemSpace = (width - itemWidth) / 2 / (length - 1);
        },
        initBar: function() {
            $el.append('<div class="card-scroll-bar"><i class="card-bar"></i></div>');
            this.$bar = $el.find('.card-scroll-bar');
            this.$barBtn = $el.find('.card-bar');
            this.$barWidth = this.$bar.width();
            this.$barBtnWidth = this.$barWidth / _self.$elLiList.length;
            this.$barBtn.css({
                width: this.$barBtnWidth + 'px'
            });
            this.initBarPos();
        },
        initBarPos: function() {
            this.$barBtn.css({
                '-webkit-transform': 'translateX(' + this.$barBtnWidth * (activeNum) + 'px)',
                'transform': 'translateX(' + this.$barBtnWidth * (activeNum) + 'px)',
            });
        },
        noti: function() {
            var name = Array.prototype.slice.call(arguments, 0, 1)[0];
            var args = Array.prototype.slice.call(arguments, 1);
            Array.prototype.forEach.call(_self.events[name], function(item) {
                item.cb.apply(item.scope || null, args);
            });
        },
        /**
         * 获取手指滑动的方向
         * @param moveEndX
         * @param startX
         * @param moveEndY
         * @param startY
         * @returns {*}
         */
        checkDir: function(moveEndX, startX, moveEndY, startY) {
            var X = moveEndX - startX;
            var Y = moveEndY - startY;
            if (Math.abs(X) > Math.abs(Y) && X > 0) {
                return "left2right";
            } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
                return "right2left";
            } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
                return "top2bottom";
            } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
                return "bottom2top";
            }
        }
    }
    method.init();
}

CardSlider.prototype.on = function(name, cb, scope) {
    if (this.events[name]) {
        this.events[name].push({
            cb: cb,
            scope: scope
        });
    }
};

module.exports = CardSlider;
