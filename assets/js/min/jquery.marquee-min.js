!function(t){t.fn.marquee=function(e){return this.each(function(){var a=t.extend({},t.fn.marquee.defaults,e),r=t(this),n,i,s,o,u,d=3,p="animation-play-state",l=!1,f=function(t,e,a){for(var r=["webkit","moz","MS","o",""],n=0;n<r.length;n++)r[n]||(e=e.toLowerCase()),t.addEventListener(r[n]+e,a,!1)},c=function(t){var e=[];for(var a in t)t.hasOwnProperty(a)&&e.push(a+":"+t[a]);return e.push(),"{"+e.join(",")+"}"},m=function(){r.timer=setTimeout(B,a.delayBeforeStart)},g={pause:function(){l&&a.allowCss3Support?n.css(p,"paused"):t.fn.pause&&n.pause(),r.data("runningStatus","paused"),r.trigger("paused")},resume:function(){l&&a.allowCss3Support?n.css(p,"running"):t.fn.resume&&n.resume(),r.data("runningStatus","resumed"),r.trigger("resumed")},toggle:function(){g["resumed"==r.data("runningStatus")?"pause":"resume"]()},destroy:function(){clearTimeout(r.timer),r.find("*").addBack().unbind(),r.html(r.find(".js-marquee:first").html())}};if("string"!=typeof e){var h;t.each(a,function(t,e){if(void 0!==(h=r.attr("data-"+t))){switch(h){case"true":h=!0;break;case"false":h=!1;break}a[t]=h}}),a.speed&&(a.duration=parseInt(r.width(),10)/a.speed*1e3),o="up"==a.direction||"down"==a.direction,a.gap=a.duplicated?parseInt(a.gap):0,r.wrapInner('<div class="js-marquee"></div>');var v=r.find(".js-marquee").css({"margin-right":a.gap,float:"left"});if(a.duplicated&&v.clone(!0).appendTo(r),r.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),n=r.find(".js-marquee-wrapper"),o){var b=r.height();n.removeAttr("style"),r.height(b),r.find(".js-marquee").css({float:"none","margin-bottom":a.gap,"margin-right":0}),a.duplicated&&r.find(".js-marquee:last").css({"margin-bottom":0});var y=r.find(".js-marquee:first").height()+a.gap;a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(y,10)+parseInt(b,10))/parseInt(b,10)*a.duration,a.duration=parseInt(y,10)/parseInt(b,10)*a.duration):a.duration=(parseInt(y,10)+parseInt(b,10))/parseInt(b,10)*a.duration}else u=r.find(".js-marquee:first").width()+a.gap,i=r.width(),a.startVisible&&!a.duplicated?(a._completeDuration=(parseInt(u,10)+parseInt(i,10))/parseInt(i,10)*a.duration,a.duration=parseInt(u,10)/parseInt(i,10)*a.duration):a.duration=(parseInt(u,10)+parseInt(i,10))/parseInt(i,10)*a.duration;if(a.duplicated&&(a.duration=a.duration/2),a.allowCss3Support){var I=document.body||document.createElement("div"),x="marqueeAnimation-"+Math.floor(1e7*Math.random()),w="Webkit Moz O ms Khtml".split(" "),S="animation",q="",j="";if(I.style.animation&&(j="@keyframes "+x+" ",l=!0),!1===l)for(var C=0;C<w.length;C++)if(void 0!==I.style[w[C]+"AnimationName"]){var V="-"+w[C].toLowerCase()+"-";S=V+S,p=V+p,j="@"+V+"keyframes "+x+" ",l=!0;break}l&&(q=x+" "+a.duration/1e3+"s "+a.delayBeforeStart/1e3+"s infinite "+a.css3easing,r.data("css3AnimationIsSupported",!0))}var k=function(){n.css("transform","translateY("+("up"==a.direction?b+"px":"-"+y+"px")+")")},A=function(){n.css("transform","translateX("+("left"==a.direction?i+"px":"-"+u+"px")+")")};a.duplicated?(o?a.startVisible?n.css("transform","translateY(0)"):n.css("transform","translateY("+("up"==a.direction?b+"px":"-"+(2*y-a.gap)+"px")+")"):a.startVisible?n.css("transform","translateX(0)"):n.css("transform","translateX("+("left"==a.direction?i+"px":"-"+(2*u-a.gap)+"px")+")"),a.startVisible||(d=1)):a.startVisible?d=2:o?k():A();var B=function(){if(a.duplicated&&(1===d?(a._originalDuration=a.duration,a.duration=o?"up"==a.direction?a.duration+b/(y/a.duration):2*a.duration:"left"==a.direction?a.duration+i/(u/a.duration):2*a.duration,q&&(q=x+" "+a.duration/1e3+"s "+a.delayBeforeStart/1e3+"s "+a.css3easing),d++):2===d&&(a.duration=a._originalDuration,q&&(x+="0",j=t.trim(j)+"0 ",q=x+" "+a.duration/1e3+"s 0s infinite "+a.css3easing),d++)),o?a.duplicated?(d>2&&n.css("transform","translateY("+("up"==a.direction?0:"-"+y+"px")+")"),s={transform:"translateY("+("up"==a.direction?"-"+y+"px":0)+")"}):a.startVisible?2===d?(q&&(q=x+" "+a.duration/1e3+"s "+a.delayBeforeStart/1e3+"s "+a.css3easing),s={transform:"translateY("+("up"==a.direction?"-"+y+"px":b+"px")+")"},d++):3===d&&(a.duration=a._completeDuration,q&&(x+="0",j=t.trim(j)+"0 ",q=x+" "+a.duration/1e3+"s 0s infinite "+a.css3easing),k()):(k(),s={transform:"translateY("+("up"==a.direction?"-"+n.height()+"px":b+"px")+")"}):a.duplicated?(d>2&&n.css("transform","translateX("+("left"==a.direction?0:"-"+u+"px")+")"),s={transform:"translateX("+("left"==a.direction?"-"+u+"px":0)+")"}):a.startVisible?2===d?(q&&(q=x+" "+a.duration/1e3+"s "+a.delayBeforeStart/1e3+"s "+a.css3easing),s={transform:"translateX("+("left"==a.direction?"-"+u+"px":i+"px")+")"},d++):3===d&&(a.duration=a._completeDuration,q&&(x+="0",j=t.trim(j)+"0 ",q=x+" "+a.duration/1e3+"s 0s infinite "+a.css3easing),A()):(A(),s={transform:"translateX("+("left"==a.direction?"-"+u+"px":i+"px")+")"}),r.trigger("beforeStarting"),l){n.css(S,q);var e=j+" { 100%  "+c(s)+"}",p=n.find("style");0!==p.length?p.filter(":last").html(e):t("head").append("<style>"+e+"</style>"),f(n[0],"AnimationIteration",function(){r.trigger("finished")}),f(n[0],"AnimationEnd",function(){B(),r.trigger("finished")})}else n.animate(s,a.duration,a.easing,function(){r.trigger("finished"),a.pauseOnCycle?m():B()});r.data("runningStatus","resumed")};r.bind("pause",g.pause),r.bind("resume",g.resume),a.pauseOnHover&&(r.bind("mouseenter",g.pause),r.bind("mouseleave",g.resume)),l&&a.allowCss3Support?B():m()}else t.isFunction(g[e])&&(n||(n=r.find(".js-marquee-wrapper")),!0===r.data("css3AnimationIsSupported")&&(l=!0),g[e]())})},t.fn.marquee.defaults={allowCss3Support:!0,css3easing:"linear",easing:"linear",delayBeforeStart:1e3,direction:"left",duplicated:!1,duration:5e3,gap:20,pauseOnCycle:!1,pauseOnHover:!1,startVisible:!1}}(jQuery);