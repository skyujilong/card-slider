!function(t){function r(n){if(i[n])return i[n].exports;var e=i[n]={exports:{},id:n,loaded:!1};return t[n].call(e.exports,e,e.exports,r),e.loaded=!0,e.exports}var i={};return r.m=t,r.c=i,r.p="./",r(0)}([function(t,exports,r){"use strict";r(1),$(document).ready(function(){var t=r(6);setTimeout(function(){var r=new t($("#demo"));r.on("change",function(t){console.log(t)})},300),console.log("log...........!!!!"),console.log("hello world!!")})},function(t,exports){},,,,,function(t,exports,r){"use strict";function i(t,r){var i,n,e,s,a=this,o="card-slider",c={},l={};r=r||{bar:!0},this.events={change:[]},this.$el=t,this.$el.addClass(o),this.$elLiList=t.children("ul").children("li"),n=this.$elLiList.eq(0).width(),i={init:function(){this.initSpace(),this.initPos(0),r&&r.bar&&this.initBar(),this.bindEvent()},toRun:function(){var r=this,i=r.checkDir(l.x,c.x,l.y,c.y);if("left2right"===i){if(0==s)return;s--,r.activeNumChange(s),t.children("ul").css({"-webkit-transform":"translateX("+-e*s+"px)",transform:"translateX("+-e*s+"px)"}),Array.prototype.forEach.call(a.$elLiList,function(t,r){var i=(90-90/a.$elLiList.length*Math.abs(s-r))*Math.PI/180,n=Math.sin(i),e=$(t).css("zIndex");s==r?$(t).css({"-webkit-transform-origin":"center center","transform-origin":"center center","-webkit-transform":"scale(1)",transform:"scale("+n+")",zIndex:e-0+1}):s>r?$(t).css({"-webkit-transform-origin":"left center","transform-origin":"left center","-webkit-transform":"scale("+n+")",transform:"scale("+n+")",zIndex:e-0+1}):$(t).css({"-webkit-transform-origin":"right center","transform-origin":"right center","-webkit-transform":"scale("+n+")",transform:"scale("+n+")",zIndex:e-1})})}else if("right2left"===i){if(s==a.$elLiList.length-1)return;s++,r.activeNumChange(s),t.children("ul").css({"-webkit-transform":"translateX("+-e*s+"px)",transform:"translateX("+-e*s+"px)"}),Array.prototype.forEach.call(a.$elLiList,function(t,r){var i=(90-90/a.$elLiList.length*Math.abs(s-r))*Math.PI/180,n=Math.sin(i),e=$(t).css("zIndex");s==r?$(t).css({"-webkit-transform-origin":"center center","transform-origin":"center center","-webkit-transform":"scale(1)",transform:"scale("+n+")",zIndex:e-0+1}):s>r?$(t).css({"-webkit-transform-origin":"left center","transform-origin":"left center","-webkit-transform":"scale("+n+")",transform:"scale("+n+")",zIndex:e-1}):$(t).css({"-webkit-transform-origin":"right center","transform-origin":"right center","-webkit-transform":"scale("+n+")",transform:"scale("+n+")",zIndex:e-0+1})})}},bindEvent:function(){function t(t,r){clearTimeout(t.timmer),t.timmer=setTimeout(function(){t.call(r)},50)}var r=this;a.$elLiList.on("touchstart",function(t){var r=t.touches[0];c.x=r.pageX,c.y=r.pageY}),a.$elLiList.on("touchmove",function(i){var n=i.touches[0];l.x=n.pageX,l.y=n.pageY,t(r.toRun,r)})},initPos:function(t){s=t,Array.prototype.forEach.call(a.$elLiList,function(t,r){var i=(a.$el.width()-n)/2,s=(90-90/a.$elLiList.length*r)*Math.PI/180,o=Math.sin(s);$(t).css({left:i+r*e,"z-index":a.$elLiList.length-r+100,"-ms-transform":"scale("+o+")","-o-transform":"scale("+o+")","-moz-transform":"scale("+o+")","-webkit-transform":"scale("+o+")",transform:"scale("+o+")","-ms-transform-origin":"right center","-o-transform-origin":"right center","-webkit-transform-origin":"right center","-moz-transform-origin":"right center","transform-origin":"right center"})})},activeNumChange:function(t){r.bar&&this.initBarPos(),this.noti("change",t)},initSpace:function(){var t=a.$el.width(),r=a.$elLiList.length;e=(t-n)/2/(r-1)},initBar:function(){t.append('<div class="card-scroll-bar"><i class="card-bar"></i></div>'),this.$bar=t.find(".card-scroll-bar"),this.$barBtn=t.find(".card-bar"),this.$barWidth=this.$bar.width(),this.$barBtnWidth=this.$barWidth/a.$elLiList.length,this.$barBtn.css({width:this.$barBtnWidth+"px"}),this.initBarPos()},initBarPos:function(){this.$barBtn.css({"-webkit-transform":"translateX("+this.$barBtnWidth*s+"px)",transform:"translateX("+this.$barBtnWidth*s+"px)"})},noti:function(){var t=Array.prototype.slice.call(arguments,0,1)[0],r=Array.prototype.slice.call(arguments,1);Array.prototype.forEach.call(a.events[t],function(t){t.cb.apply(t.scope||null,r)})},checkDir:function(t,r,i,n){var e=t-r,s=i-n;return Math.abs(e)>Math.abs(s)&&e>0?"left2right":Math.abs(e)>Math.abs(s)&&e<0?"right2left":Math.abs(s)>Math.abs(e)&&s>0?"top2bottom":Math.abs(s)>Math.abs(e)&&s<0?"bottom2top":void 0}},i.init()}r(7),i.prototype.on=function(t,r,i){this.events[t]&&this.events[t].push({cb:r,scope:i})},t.exports=i},function(t,exports){}]);