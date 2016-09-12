(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CardSlider"] = factory();
	else
		root["CardSlider"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/test/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../../node_modules/.0.23.1@css-loader/index.js!./../../../../../../node_modules/.4.0.2@sass-loader/index.js!./card-slider.scss", function() {
				var newContent = require("!!./../../../../../../node_modules/.0.23.1@css-loader/index.js!./../../../../../../node_modules/.4.0.2@sass-loader/index.js!./card-slider.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".card-slider {\n  overflow: hidden; }\n  .card-slider > ul {\n    position: relative;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition: -webkit-transform 0.5s;\n    transition: transform 0.5s; }\n    .card-slider > ul > li {\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n      -webkit-transition: -webkit-transform 0.5s;\n      transition: transform 0.5s;\n      position: absolute;\n      top: 0; }\n  .card-slider .card-scroll-bar {\n    background: rgba(51, 51, 51, 0.6); }\n    .card-slider .card-scroll-bar .card-bar {\n      display: block;\n      height: 2px;\n      background-color: #fff;\n      width: 20px;\n      -webkit-transform: translateZ(0);\n      transform: translateZ(0);\n      -webkit-transition: -webkit-transform 0.5s;\n      transition: transform 0.5s; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;