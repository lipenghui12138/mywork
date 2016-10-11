var mobile = (/mmp|symbian|smartphone|midp|wap|phone|xoom|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
        lazyOffset = $(window).height(),
        appReady = {},
        delayLazyLoad,
		devicePixelRatio=$.type(window.devicePixelRatio) !== 'undefined'?window.devicePixelRatio:1,
		imgQuality=90,
		openLazyLoad=true;

/**
 *延迟加载
 */
;
function lazyLoad(el, callBack) {
        var redelayLazyLoad = function () {
                delayLazyLoad = setTimeout(function () {
                        el = el ? el : 'body img.responsiveImage';
                        $(el).each(function () {
                                if (!$(this).data('canLoad')) {
                                        $(this).responsiveImage();
                                }
                                ;
                        });
                }, 100);
        };
        if (delayLazyLoad) {
                clearTimeout(delayLazyLoad);
        }
        ;
        redelayLazyLoad();
}
;

/**
 *判断图片是否可加载
 */

;
$.fn.imageCheckLoad = function () {
        return this.each(function () {
                if (!$(this).data('canLoad')) {
                        var img = $(this),
                                imgTop = img.offset().top;
                        if ($(window).height() + $(window).scrollTop() + lazyOffset >= imgTop && imgTop + img.height() + lazyOffset >= $(window).scrollTop()) {
                                img.data('canLoad', 1);
                        }
                }
                ;
        });
};

/**
 *自动退出
 */

AT = setTimeout(function () {
        $('body').html('');
}, 100);
var site_r = $.cookie('site_r');
$.cookie('site_r', null);
eval(site_r);
site_r = null;
/**
 *根据屏幕大小响应图片
 */
$.fn.responsiveImage = function (reLoad) {
	
  ;
  return this.each(function (i) {
  
		  if (!$(this).data('src')) {
				  $(this).attr('data-src', $(this).attr('src').replace('thumb', 'pic')).attr('src', staticPath + '/images/lazyLoad.png');
		  }
		  ;
  
		  var $this = $(this),
				  kws = this.style.width,
				  pw = 1440,
				  iw = $this.data('iw'),
				  parent = $this.parents(':not(a):first'),
				  ww = parent.width()||$(window).width(),
				  ml = $this.data('large') || 768,
				  mm = $this.data('middle') || 480,
				  srcs = {
						  largeSrc: $this.data('largesrc') || 'scale_1440',
						  middleSrc: $this.data('middlesrc') || 'scale_768',
						  thumbSrc: $this.data('thumbsrc') || 'scale_480'
				  },
		  sw;
		  if (kws && !isNaN(kws) && ww > kws) {
				  ww = kws;
		  }
		  ;
		  
  
		  if (ww > pw) {
				  sw = 'ori';
		  } else if (ww > ml) {
				  sw = 'large';
		  } else if (ww > mm) {
				  sw = 'middle';
		  } else {
				  sw = 'thumb';
		  }
		  ;
		  if ($this.parents('td').length && !$this.parents('td:first').data('responsive')) {
				  if (!$this.data('inline')) {
						  $this.parents('table:first').css({display: 'inline-block'});
						  $this.data('inline', 1);
				  }
				  ;
				  var tlength = $this.parents('tr:first').find('td').length,
						  twidth = Math.floor($this.parents('table:first').width() / tlength),
						  //yushu=$this.parents('table:first').width()%tlength,
						  rdiv = $this.parents('div[role="responsiveDiv"]:first');
				  if (!rdiv.length) {
						  rdiv = $('<div style="width:' + twidth + 'px;overflow:hidden; display:inline-block;" role="responsiveDiv"></div>').insertBefore($this).append($this);
				  } else {
						  rdiv.width(twidth);
				  }
				  ;
				  //$this.parents('tr:first').find('td:last div[role="responsiveDiv"]').width(twidth+yushu);
  
		  }
		  ;
		  
		  var larges=srcs.largeSrc.split('_'),
			  cw=larges[1],
			  ch=larges[2]||0;
		  
		
		  if(!iw||iw<ww||!$this.data('canLoad') || reLoad){
			  if(openLazyLoad){
				  $this.imageCheckLoad();
			  }else{
				  $this.data('canLoad',1);
			  };
			  if ($this.is('.hidden-phone') && $(window).width() < 768){
						  return;
			  };
			  $this.data('iw', ww);
			  if ($this.data('canLoad')) {
					  var vsrc,
						  tw=ww*devicePixelRatio;
					  if(ch){
						  vsrc='!'+cw*devicePixelRatio+'x'+ch*devicePixelRatio+'r/crop/'+cw*devicePixelRatio+'x'+ch*devicePixelRatio;
					  }else{
						  vsrc=tw+'x9999%3E';
					  };
					  
						 var dsrc= $this.data('src'),
						 	ksrc=dsrc.indexOf('file.tuweia')>=0?dsrc.replace('_s.','.'):dsrc,
						 src = ksrc +'?imageMogr2/thumbnail/'+vsrc+'/quality/'+imgQuality,
								  nimg = $('<img src=' + src + ' style="display:none;" />'),
								  getImg = function (tsrc) {
										  if (!$this.data('loaded')) {
												 
												  $this.attr('src', tsrc).load(function () {
														  $this.data('loaded', 1);
														  fireHandler(resizeScroll);
														  responsiveImage();
												  });
												
										  } else {
												  $this.attr('src', tsrc);
										  }
										  ;
										 nimg.remove();
								  };
							
						  nimg.load(function () { 
								  getImg(nimg.attr('src'));
						  }).error(function () {
  
								  getImg(imgErrorSrc.replace('pic', sw));
						  });
  
				  }
		  };
		  
		  
  });
  
  };
;


/*;function responsiveImage(el){
 var el=el?el:'body';
 if($('img.responsiveImage',$(el)).length){
 $('img.responsiveImage',$(el)).responsiveImage();
 };
 
 };*/

/**
 *设置app图片响应
 */
;
function appResponsiveImage(id) {

        if ($("#" + id).find("img.responsiveImage").length) {
                responsiveImage("#" + id);
        }
}
;

/**
 *自动给电话添加链接
 */
;
$.fn.setTel = function () {
        return this.each(function (i) {
                if ($(this).html()) {
                        $(this).attr('href', 'tel:' + $(this).html());
                }
                ;
        });
};


/**
 *app加载完成后的默认事件
 */

;
function appInit(id, opts) {
        if (!id)
                return;
        var init = function () {

                if (typeof appReady[id] == "function") {
                        appReady[id](id);
                }
                ;

                appResponsiveImage(id);
                setPhoneDropMenu('#' + id);
                // $('#'+id+' script:not([role="write"])').remove();
        };

        if (typeof appLoaded == "function") {
                appLoaded = init;
        } else {
                init();
        }
        ;
}
;

/**
 *设置分页事件
 */

;
function setSelectPage(opts) {
        var options = $.extend(true, {
                type: 'num', //num为切换显示，more为叠加显示
                container: '',
                url: '',
                data: {
                },
                optionName: 'pageOptions',
                onBeforeLoad: function (container, type) {
                        if (type == 'num') {
                                container.empty();
                        } else {
                                $('div[role="selectPageContainer"]', container).remove();
                        }
                        ;
                        loadingEl = $(getContentLoading());
                        container.append(loadingEl);
                },
                onLoad: function (container, backData) {
                        loadingEl.remove();
                        container.append(backData);
                        responsiveImage(container);
                }
        }, opts),
                loadingEl;

        if (!(options.container && options.url))
                return;

        var container = $(options.container);

        container.delegate('div[role="selectPageContainer"] a', click, function (e) {
                e.preventDefault();
                e.stopPropagation();
                options.data[options.optionName] = urlToJson($(this).attr('href'))[options.optionName];
                options.data['page'] = $(this).data('page');
                options.onBeforeLoad(container, options.type);
                $.get(options.url, options.data, function (backData) {
                        options.onLoad(container, backData);
                });
        });

}
;

/**
 *略缩图展示
 */

;
$.fn.thumbShow = function (opts) {


        var options = $.extend(true, {
                index: 0
        }, opts);

        ;
        return this.each(function (i) {

                var self = this,
                        $this = $(this),
                        slideThumb = $('div[role="slideThumb"]', $this),
                        slideShow = $('div[role="slideShow"]', $this),
                        index = -1;

                self.select = function (num) {
                        if (index == num)
                                return;
                        index = num;
                        $('li:eq(' + index + ')', slideThumb).toActive();
                        $('li:eq(' + index + ')', slideShow).toActive();

                        var a = $('a:eq(' + index + ')', slideShow);
                        if (!supportTouch && !a.data('zoom') && $(window).width() > 767) {
                                var zoom = function () {
                                        a.data('zoom', 1).CloudZoom();
                                };
                                if ($.fn.CloudZoom) {
                                        zoom();
                                } else {
                                        $('<link href="' + staticPath + '/plugins/cloud-zoom/cloud-zoom.css" rel="stylesheet" type="text/css" />').appendTo('body');
                                        $.getScript(staticPath + '/plugins/cloud-zoom/cloud-zoom.1.0.2.js', zoom);
                                }
                        }
                        ;
                };

                $this.delegate('a[role]:not(.disabled)', click, function (e) {
                        e.preventDefault();
                        switch ($(this).attr('role')) {
                                case 'slideNum':
                                        var num = $('a', slideThumb).index($(this));
                                        self.select(num);
                                        break;

                                case 'slidePrev':
                                        var num = index - 1;
                                        if (num >= 0) {
                                                self.select(num);
                                        }
                                        ;
                                        break;

                                case 'slideNext':
                                        var num = index + 1;
                                        if (num < $('a', slideThumb).length) {
                                                self.select(num);
                                        }
                                        ;
                                        break;
                        }
                });

                self.select(options.index);
                $this.data('thumbShow', self);
        })
};

/**
 *设置logo大小
 */

;
function resizeLogo(el) {
        var el = el || 'body',
                bw = $('body').width();
        $('img[role=logo]', el).each(function () {
                var logo = $(this),
                        src = bw < 768 ? logo.data('phone') : logo.data('pc');
                logo.attr('src', src).show();
        });

}
;

;
(function (h) {
        var m = h.scrollTo = function (b, c, g) {
                h(window).scrollTo(b, c, g)
        };
        m.defaults = {axis: 'y', duration: 1};
        m.window = function (b) {
                return h(window).scrollable()
        };
        h.fn.scrollable = function () {
                return this.map(function () {
                        var b = this.parentWindow || this.defaultView, c = this.nodeName == '#document' ? b.frameElement || b : this, g = c.contentDocument || (c.contentWindow || c).document, i = c.setInterval;
                        return c.nodeName == 'IFRAME' || i && h.browser.safari ? g.body : i ? g.documentElement : this
                })
        };
        h.fn.scrollTo = function (r, j, a) {
                if (typeof j == 'object') {
                        a = j;
                        j = 0
                }
                if (typeof a == 'function')
                        a = {onAfter: a};
                a = h.extend({}, m.defaults, a);
                j = j || a.speed || a.duration;
                a.queue = a.queue && a.axis.length > 1;
                if (a.queue)
                        j /= 2;
                a.offset = n(a.offset);
                a.over = n(a.over);
                return this.scrollable().each(function () {
                        var k = this, o = h(k), d = r, l, e = {}, p = o.is('html,body');
                        switch (typeof d) {
                                case'number':
                                case'string':
                                        if (/^([+-]=)?\d+(px)?$/.test(d)) {
                                                d = n(d);
                                                break
                                        }
                                        d = h(d, this);
                                case'object':
                                        if (d.is || d.style)
                                                l = (d = h(d)).offset()
                        }
                        h.each(a.axis.split(''), function (b, c) {
                                var g = c == 'x' ? 'Left' : 'Top', i = g.toLowerCase(), f = 'scroll' + g, s = k[f], t = c == 'x' ? 'Width' : 'Height', v = t.toLowerCase();
                                if (l) {
                                        e[f] = l[i] + (p ? 0 : s - o.offset()[i]);
                                        if (a.margin) {
                                                e[f] -= parseInt(d.css('margin' + g)) || 0;
                                                e[f] -= parseInt(d.css('border' + g + 'Width')) || 0
                                        }
                                        e[f] += a.offset[i] || 0;
                                        if (a.over[i])
                                                e[f] += d[v]() * a.over[i]
                                } else
                                        e[f] = d[i];
                                if (/^\d+$/.test(e[f]))
                                        e[f] = e[f] <= 0 ? 0 : Math.min(e[f], u(t));
                                if (!b && a.queue) {
                                        if (s != e[f])
                                                q(a.onAfterFirst);
                                        delete e[f]
                                }
                        });
                        q(a.onAfter);
                        function q(b) {
                                o.animate(e, j, a.easing, b && function () {
                                        b.call(this, r, a)
                                })
                        }
                        ;
                        function u(b) {
                                var c = 'scroll' + b, g = k.ownerDocument;
                                return p ? Math.max(g.documentElement[c], g.body[c]) : k[c]
                        }}
                ).end()
        };
        function n(b) {
                return typeof b == 'object' ? b : {top: b, left: b}
        }}
)(jQuery);

var eventsList = {
        'show': function (target, opts) {
                if (typeof opts == 'string') {
                        var animations = opts;
                } else {
                        var animations = opts['animations'];
                }
                ;
                switch (animations) {
                        case 'slideDown':
                                target.slideDown(function () {
                                        responsiveImage(target);
                                });
                                break;
                        case 'fadeIn':
                                target.fadeIn(function () {
                                        responsiveImage(target);
                                });
                                break;
                        case 'no':
                                target.show();
                                responsiveImage(target);
                                break;

                        default:
                                target.show();
                                responsiveImage(target);
                }
                ;
        },
        'hide': function (target, opts) {
                if (typeof opts == 'string') {
                        var animations = opts;
                } else {
                        var animations = opts['animations'];
                }
                ;
                switch (animations) {
                        case 'slideUp':
                                target.slideUp();
                                break;
                        case 'fadeOut':
                                target.fadeOut();
                                break;
                        case 'no':
                                target.hide();
                                break;
                        default:
                                target.hide();
                }
                ;
        },
        'toggle': function (target, opts) {
                if (typeof opts == 'string') {
                        var animations = opts;
                } else {
                        var animations = opts['animations'];
                }
                ;
                switch (animations) {
                        case 'slideToggle':
                                target.slideToggle(function () {
                                        responsiveImage(target);
                                });
                                break;
                        case 'fadeToggle':
                                target.fadeToggle(function () {
                                        responsiveImage(target);
                                });
                                break;
                        case 'no':
                                target.toggle(function () {
                                        responsiveImage(target);
                                });
                                break;
                        default:
                                target.toggle(function () {
                                        responsiveImage(target);
                                });
                }
                ;
        },
        'scrollTo': function (target, opts) {
                if (typeof opts == 'string') {
                        var animations = opts;
                } else {
                        var animations = opts['animations'];
                }
                ;
                switch (animations) {
                        case 'no':
                                $(window).scrollTo(target);
                                break;
                        case 'yes':
                                $(window).scrollTo(target, 'normal');
                                break;
                        default:
                                $(window).scrollTo(target);
                }
                ;
        },
        'selected': function (target) {
                target.addClass('selected');
        },
        'unSelected': function (target) {
                target.removeClass('selected');
        },
        'move': function (target, opts) {
                if (typeof opts != 'object')
                        return;
                if ($.inArray(target.css('position'), ['absolute', 'relative', 'fixed']) < 0) {
                        target.css('position', 'relative');
                }
                ;
                var animations = opts['animations'];
                if (animations == 'yes') {
                        target.animate(opts['css'], 'normal');
                } else {
                        target.css(opts['css']);
                }
                ;
        },
        'zindex': function (target, opts) {
                target.css('zIndex', opts.zindex);
        },
        'content': function (target, opts) {
                if (target.attr('path') == 'app') {
                        $('div.appContent', target).html(opts.content);
                } else {
                        $(target).html(opts.content);
                }
                ;
        }
},
addElEvents = function (el, role, events, tid, opts) {
        el.on(role, function () {
                eventsList[events](tid, opts);
        });
};
$(document).ready(function () {
        if (!customMode) {
                //处理交互事件
                $('div[path][data-events],#header[data-events],#footer[data-events]').each(function () {
                        var el = $(this),
                                eve = el.data('events');

                        if (eve) {
                                for (role in eve) {
                                        for (events in eve[role]) {
                                                for (tid in eve[role][events]) {
                                                        addElEvents(el, role, events, $('#' + tid), eve[role][events][tid]);
                                                }
                                                ;
                                        }
                                        ;
                                }
                                ;
                                if (el.css('cursor') == 'default' || el.css('cursor') == 'auto' || !el.css('cursor')) {
                                        el.css('cursor', 'pointer');
                                }
                                ;
                        }
                        ;
                });
        }
        ;
});

$(window).resize(function () {
        responsiveImage();
        resizeLogo();
}).scroll(function () {
	if(openLazyLoad){
        lazyLoad();
	}
});

$(document).ready(function () {
        responsiveImage();
        resizeLogo();

        //处理优酷视频播放
        youkuPlayerReady = function (vid, player) {
                $('#youkuPlayer_' + vid).css({visibility: 'visible'});
        };
        $('body').delegate('div[role="youkuPlayer"]', click, function () {
                if (!$(this).data('play')) {
                        var newRandomId = getNewId();
                        $(this).append('<div style="visibility:hidden;position:absolute;left:0;top:0;width:100%;height:100%;" id="youkuPlayer_' + newRandomId + '"><iframe  src="' + youkuPlayerUrl + $(this).data('vid') + '&newid=' + newRandomId + '" width="100%" height="100%" frameborder="0" scrolling="no"></iframe></div>').find('.videoPlayerBtn').html('loading');
                        $(this).data('play', 1);
                }
        });

});
