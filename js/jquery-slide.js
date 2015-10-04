(function(jq) {
    var roundSlide = function(o, options, data) {
        this.parent = jq("#" + o);
        this.body = jq("body");
        if (this.parent.length <= 0) {
            return false;
        }

        this.options = jq.extend({}, roundSlide.options, options);
        if (typeof(data) !== 'object') return false;
        if (typeof this.options.hotcode === 'undefined') this.options.hotcode = false;

        this.data = data || {};
        this.reset();
        //处理页面resize
        var _this = this;
        jq(window).resize(function() {
            _this.reset();
        });
    };

    var panelWidth = 1190;
    var panelHeight = 430;
    var thumbWidth = 900;
    var thumbHeight = 410;
    var thumb2Height = 390;
    var thumbMarginTop = 10;
    var thumb2MarginTop = 20;

    roundSlide.prototype = {
        reset: function(options) {
            if (typeof(options) == 'object') {
                jq.extend(this.options, options);
            }
            // if(parseInt(this.body.outerWidth())>1255 || navigator.userAgent.indexOf('iPad') !== -1){
            //  this.options.width = 1190;  
            // }else{
            //  this.options.width = 970;   
            // }
            this.total = this.data.length;
            this.pageNow = this.options.initPage;
            this.preLeft = 0;
            this.nextLeft = this.options.width - thumbWidth;
            this.preNLeft = -thumbWidth;
            this.nextNLeft = this.options.width;
            this.pageNowLeft = (this.options.width - panelWidth) / 2
            this.drawContent();
        },
        drawContent: function() {
            this.parent.css({
                width: this.options.width + "px",
                height: this.options.height + "px"
            });
            this.parent.find('[class="' + this.options.className + '"]').width(this.options.width).height(this.options.height);
            this.parent.find('.ui-slide__controls div').each(function (index, controlBtn) {
                $(controlBtn).css('top', (panelHeight - $(controlBtn).height()) / 2 + 'px');
            });
            this.parent.css({
                overflow: 'hidden'
            });
            this.initContent();
            this.bind();
            this.start();
        },
        initContent: function() {
            slidePanel = this.parent.find(".ui-slide__panel");
            slidePanel.css({
                width: '0px',
                height: '0px',
                opacity: 0,
                left: this.options.width / 2 + 'px',
                zIndex: 0,
                marginTop: '135px'
            });
            this.parent.find(".ui-slide__panel:nth-child(" + this.pageNow + ")").css({
                width: panelWidth + 'px',
                height: panelHeight + 'px',
                opacity: 1,
                left: this.pageNowLeft + 'px',
                zIndex: 3,
                marginTop: 0
            });
            this.parent.find(".ui-slide__panel:nth-child(" + this.pageNow + ") img").css({
                left: '190px'
            });
            this.parent.find(".ui-slide__panel:nth-child(" + this.pageNow + ") .elementOverlay").css({
                opacity: 0
            });
            // this.parent.find(".ui-slide__panel:nth-child("+this.pageNow+") .leftShadow").css({opacity:1});
            // this.parent.find(".ui-slide__panel:nth-child("+this.pageNow+") .rightShadow").css({opacity:1});

            var pre = this.pageNow > 1 ? this.pageNow - 1 : this.total;
            var next = this.pageNow == this.total ? 1 : this.pageNow + 1;
            this.parent.find(".ui-slide__panel:nth-child(" + pre + ")").css({
                opacity: 1,
                left: this.preLeft + 'px',
                height: thumbHeight + 'px',
                width: thumbWidth + 'px',
                zIndex: 0,
                marginTop: thumbMarginTop + 'px'
            });
            this.parent.find(".ui-slide__panel:nth-child(" + pre + ") .elementOverlay").css({
                opacity: 0.4
            });
            // this.parent.find(".ui-slide__panel:nth-child("+pre+") .leftShadow").css({opacity:0});
            // this.parent.find(".ui-slide__panel:nth-child("+pre+") .rightShadow").css({opacity:0});

            this.parent.find(".ui-slide__panel:nth-child(" + next + ")").css({
                opacity: 1,
                left: this.nextLeft + 'px',
                height: thumbHeight + 'px',
                width: thumbWidth + 'px',
                zIndex: 0,
                marginTop: thumbMarginTop + 'px'
            });
            this.parent.find(".ui-slide__panel:nth-child(" + next + ") .elementOverlay").css({
                opacity: 0.4
            });
            // this.parent.find(".ui-slide__panel:nth-child("+next+") .leftShadow").css({opacity:0});
            // this.parent.find(".ui-slide__panel:nth-child("+next+") .rightShadow").css({opacity:0});

            this.parent.find('.ui-slide__panel img').css({
                position: 'relative'
            });
        },
        bind: function() {
            this.slidePrev = this.parent.find(".ui-slide__prev");
            this.slideNext = this.parent.find(".ui-slide__next");
            this.bottonNav = this.parent.find(".jq-gallery-tabs-item");
            this.lists = this.parent.find(".ui-slide__panel");
            var _this = this;
            this.parent.mouseover(function() {
                _this.stop();
                _this.slidePrev.show();
                _this.slideNext.show();
            });
            this.parent.mouseout(function() {
                _this.start();
                //_this.slidePrev.hide();
                //_this.slideNext.hide();
            });

            _this.slidePrev.click(function() {
                _this.turn("right");
            });
            _this.slideNext.click(function() {
                _this.turn("left");
            });
            _this.bottonNav.on('mouseenter', function() {
                var ref = parseInt(this.getAttribute("ref"));
                if (_this.pageNow == ref) return false;

                if (_this.pageNow < ref) {
                    var rightAbs = ref - _this.pageNow;
                    var leftAbs = _this.pageNow + _this.total - ref;
                } else {
                    var rightAbs = _this.total - _this.pageNow + ref;
                    var leftAbs = _this.pageNow - ref;
                }
                if (leftAbs < rightAbs) {
                    dir = "right";
                } else {
                    dir = "left";
                }

                _this.turnpage(ref, dir);
                return false;
            });

            _this.lists.click(function(e) {
                var ref = parseInt(this.getAttribute("ref"));
                if (_this.pageNow == ref) {
                    return true;
                } else {
                    e.preventDefault();
                }
                if (_this.pageNow < ref) {
                    var rightAbs = ref - _this.pageNow;
                    var leftAbs = _this.pageNow + _this.total - ref;
                } else {
                    var rightAbs = _this.total - _this.pageNow + ref;
                    var leftAbs = _this.pageNow - ref;
                }
                if (leftAbs < rightAbs) {
                    dir = "right";
                } else {
                    dir = "left";
                }
                _this.turnpage(ref, dir);

            });
        },
        initBottomNav: function() {
            this.parent.find(".ui-slide__trigger").removeClass("ui-slide__trigger--active");
            this.parent.find(".ui-slide__trigger:nth-child(" + this.pageNow + ")").addClass("ui-slide__trigger--active");

            this.parent.find('.jq-gallery-tabs-item').removeClass('selected')
            this.parent.find('.jq-gallery-tabs-item:nth-child(' + this.pageNow + ')').addClass('selected')
        },
        start: function() {
            var _this = this;
            if (_this.timerId) _this.stop();
            _this.timerId = setInterval(function() {
                if (_this.options.direct == "left") {
                    _this.turn("left");
                } else {
                    _this.turn("right");
                }
            }, _this.options.delay);
        },
        stop: function() {
            clearInterval(this.timerId);
        },
        turn: function(dir) {
            var _this = this;

            if (dir == "right") {
                var page = _this.pageNow - 1;
                if (page <= 0) page = _this.total;
            } else {
                var page = _this.pageNow + 1;
                if (page > _this.total) page = 1;
            }
            _this.turnpage(page, dir);
        },
        turnpage: function(page, dir) {
            var _this = this;
            //if (_this.locked) return false;
            //_this.locked = true;
            if (_this.pageNow == page) return false;

            _this.parent.find('.ui-slide__panel img').stop(true, true).css('left', 0)

            var run = function(page, dir, t) {
                var pre = page > 1 ? page - 1 : _this.total;
                var next = page == _this.total ? 1 : page + 1;
                var preP = pre - 1 >= 1 ? pre - 1 : _this.total;
                var nextN = next + 1 > _this.total ? 1 : next + 1;
                if (pre != _this.pageNow && next != _this.pageNow) {
                    var nowpre = _this.pageNow > 1 ? _this.pageNow - 1 : _this.total;
                    var nownext = _this.pageNow == _this.total ? 1 : _this.pageNow + 1;
                    _this.parent.find(".ui-slide__panel:nth-child(" + nowpre + ")").stop(true, true).animate({
                        width: '0px',
                        height: '0px',
                        opacity: 0,
                        left: _this.options.width / 2 + 'px',
                        zIndex: 0,
                        marginTop: '135px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ")").stop(true, true).animate({
                        width: '0px',
                        height: '0px',
                        opacity: 0,
                        left: _this.options.width / 2 + 'px',
                        zIndex: 0,
                        marginTop: '135px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ") img").stop(true, true).animate({
                        left: '190px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + nownext + ")").stop(true, true).animate({
                        width: '0px',
                        height: '0px',
                        opacity: 0,
                        left: _this.options.width / 2 + 'px',
                        zIndex: 0,
                        marginTop: '135px'
                    }, t);
                }
                if (dir == 'left') {
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ")").css({
                        zIndex: 0
                    });
                    
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ") img").css({
                        left: 0
                    });

                    _this.parent.find(".ui-slide__panel:nth-child(" + pre + ") .elementOverlay").css({
                        opacity: 0.4
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + pre + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.preLeft + 'px',
                        height: thumbHeight + 'px',
                        width: thumbWidth + 'px',
                        zIndex: 2,
                        marginTop: thumbMarginTop + 'px'
                    }, t);
                    // _this.parent.find(".ui-slide__panel:nth-child("+pre+") .leftShadow").css({opacity:0});
                    // _this.parent.find(".ui-slide__panel:nth-child("+pre+") .rightShadow").css({opacity:0});


                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ")").css({
                        zIndex: 3
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.pageNowLeft + 'px',
                        height: panelHeight + 'px',
                        width: panelWidth + 'px',
                        zIndex: 3,
                        marginTop: '0'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ") img").stop(true, true).animate({
                        left: '190px'
                    }, t)
                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ") .elementOverlay").css({
                        opacity: 0
                    });
                    // _this.parent.find(".ui-slide__panel:nth-child("+page+") .leftShadow").css({opacity:1});
                    // _this.parent.find(".ui-slide__panel:nth-child("+page+") .rightShadow").css({opacity:1});

                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ")").css({
                        opacity: 0,
                        left: _this.nextNLeft + 'px',
                        height: thumb2Height + 'px',
                        width: thumbWidth + 'px',
                        zIndex: 2,
                        marginTop: thumb2MarginTop + 'px'
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.nextLeft + 'px',
                        height: thumbHeight + 'px',
                        width: thumbWidth + "px",
                        zIndex: 2,
                        marginTop: thumbMarginTop + 'px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ") .elementOverlay").css({
                        opacity: 0.4
                    });
                    // _this.parent.find(".ui-slide__panel:nth-child("+next+") .leftShadow").css({opacity:0});
                    // _this.parent.find(".ui-slide__panel:nth-child("+next+") .rightShadow").css({opacity:0});
                    _this.parent.find(".ui-slide__panel:nth-child(" + preP + ")").css({
                        zIndex: 0
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + preP + ")").stop(true, true).animate({
                        width: thumbWidth + 'px',
                        height: thumb2Height + 'px',
                        opacity: 0,
                        left: _this.preNLeft + 'px',
                        zIndex: 0,
                        marginTop: thumb2MarginTop + 'px'
                    }, t, "", function() {
                        _this.locked = false;
                    });


                } else {
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ")").css({
                        zIndex: 0
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + _this.pageNow + ") img").css({
                        left: 0
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ")").css({
                        zIndex: 2
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.nextLeft + 'px',
                        height: thumbHeight + 'px',
                        width: thumbWidth + 'px',
                        zIndex: 2,
                        marginTop: thumbMarginTop + 'px'
                    }, t);
                    
                    _this.parent.find(".ui-slide__panel:nth-child(" + next + ") .elementOverlay").css({
                        opacity: 0.4
                    });
                    // _this.parent.find(".ui-slide__panel:nth-child("+next+") .leftShadow").css({opacity:0});
                    // _this.parent.find(".ui-slide__panel:nth-child("+next+") .rightShadow").css({opacity:0});

                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ")").css({
                        zIndex: 3
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.pageNowLeft + 'px',
                        height: panelHeight + 'px',
                        width: panelWidth + 'px',
                        zIndex: 3,
                        marginTop: '0px'
                    }, t);

                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ") img").stop(true, true).animate({
                        left: '190px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + page + ") .elementOverlay").css({
                        opacity: 0
                    });
                    // _this.parent.find(".ui-slide__panel:nth-child("+page+") .leftShadow").css({opacity:1});
                    // _this.parent.find(".ui-slide__panel:nth-child("+page+") .rightShadow").css({opacity:1});

                    _this.parent.find(".ui-slide__panel:nth-child(" + pre + ")").css({
                        opacity: 0,
                        left: _this.preNLeft + 'px',
                        height: thumb2Height + 'px',
                        width: thumbWidth + 'px',
                        zIndex: 2,
                        marginTop: thumb2MarginTop + 'px'
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + pre + ")").stop(true, true).animate({
                        opacity: 1,
                        left: _this.preLeft + 'px',
                        height: thumbHeight + 'px',
                        width: thumbWidth + 'px',
                        zIndex: 2,
                        marginTop: thumbMarginTop + 'px'
                    }, t);
                    _this.parent.find(".ui-slide__panel:nth-child(" + pre + ") .elementOverlay").css({
                        opacity: 0.4
                    });
                    // _this.parent.find(".ui-slide__panel:nth-child("+pre+") .leftShadow").css({opacity:0});
                    // _this.parent.find(".ui-slide__panel:nth-child("+pre+") .rightShadow").css({opacity:0});

                    _this.parent.find(".ui-slide__panel:nth-child(" + nextN + ")").css({
                        zIndex: 0
                    });
                    _this.parent.find(".ui-slide__panel:nth-child(" + nextN + ")").stop(true, true).animate({
                        width: thumbWidth + 'px',
                        height: thumb2Height + 'px',
                        opacity: 0,
                        left: _this.nextNLeft + 'px',
                        zIndex: 0,
                        marginTop: thumb2MarginTop + 'px'
                    }, t, "", function() {
                        _this.locked = false;
                    });
                }

                _this.pageNow = page;
                _this.initBottomNav();
            };

            run(page, dir, _this.options.speed);

        }

    };

    roundSlide.options = {
        offsetPages: 3, //默认可视最大条数
        direct: "left", //滚动的方向
        initPage: 1, //默认当前显示第几条
        className: "ui-slide exp-slide-round", //最外层样式
        autoWidth: true, //默认不用设置宽
        width: 980, //最外层宽，需要使用的时候在传,默认由程序自动判断
        height: 280, //最外层高  
        delay: 5000, //滚动间隔（毫秒）
        speed: 500 //滚动速度毫秒
    };

    window.roundSlide = roundSlide;
})(jQuery);

