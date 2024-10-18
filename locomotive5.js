!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t||self).LocomotiveScroll=e()}(this,function(){function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=Array(e);i<e;i++)s[i]=t[i];return s}function e(e,i){var s="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(s)return(s=s.call(e)).next.bind(s);if(Array.isArray(e)||(s=function(e,i){if(e){if("string"==typeof e)return t(e,i);var s={}.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?t(e,i):void 0}}(e))||i&&e&&"number"==typeof e.length){s&&(e=s);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)({}).hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t},i.apply(null,arguments)}function s(t,e,i){return Math.max(t,Math.min(e,i))}class n{constructor(){this.isRunning=!1,this.value=0,this.from=0,this.to=0,this.duration=0,this.currentTime=0}advance(t){var e;if(!this.isRunning)return;let i=!1;if(this.duration&&this.easing){this.currentTime+=t;const e=s(0,this.currentTime/this.duration,1);i=e>=1;const n=i?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=function(t,e,i,s){return function(t,e,i){return(1-i)*t+i*e}(t,e,1-Math.exp(-i*s))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,i=!0)):(this.value=this.to,i=!0);i&&this.stop(),null===(e=this.onUpdate)||void 0===e||e.call(this,this.value,i)}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i,duration:s,easing:n,onStart:r,onUpdate:o}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=s,this.easing=n,this.currentTime=0,this.isRunning=!0,null==r||r(),this.onUpdate=o}}class r{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:s=250}={}){this.width=0,this.height=0,this.scrollWidth=0,this.scrollHeight=0,this.resize=()=>{this.onWrapperResize(),this.onContentResize()},this.onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):this.wrapper instanceof HTMLElement&&(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)},this.onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):this.wrapper instanceof HTMLElement&&(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)},this.wrapper=t,this.content=e,i&&(this.debouncedResize=function(t,e){let i;return function(){let s=arguments,n=this;clearTimeout(i),i=setTimeout(function(){t.apply(n,s)},e)}}(this.resize,s),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var t,e;null===(t=this.wrapperResizeObserver)||void 0===t||t.disconnect(),null===(e=this.contentResizeObserver)||void 0===e||e.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class o{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let t=0,s=i.length;t<s;t++)i[t](...e)}on(t,e){var i;return(null===(i=this.events[t])||void 0===i?void 0:i.push(e))||(this.events[t]=[e]),()=>{var i;this.events[t]=null===(i=this.events[t])||void 0===i?void 0:i.filter(t=>e!==t)}}off(t,e){var i;this.events[t]=null===(i=this.events[t])||void 0===i?void 0:i.filter(t=>e!==t)}destroy(){this.events={}}}const l=100/6;class a{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){this.lastDelta={x:0,y:0},this.windowWidth=0,this.windowHeight=0,this.onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})},this.onTouchMove=t=>{var e,i,s,n;const{clientX:r,clientY:o}=t.targetTouches?t.targetTouches[0]:t,l=-(r-(null!==(i=null===(e=this.touchStart)||void 0===e?void 0:e.x)&&void 0!==i?i:0))*this.touchMultiplier,a=-(o-(null!==(n=null===(s=this.touchStart)||void 0===s?void 0:s.y)&&void 0!==n?n:0))*this.touchMultiplier;this.touchStart.x=r,this.touchStart.y=o,this.lastDelta={x:l,y:a},this.emitter.emit("scroll",{deltaX:l,deltaY:a,event:t})},this.onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})},this.onWheel=t=>{let{deltaX:e,deltaY:i,deltaMode:s}=t;e*=1===s?l:2===s?this.windowWidth:1,i*=1===s?l:2===s?this.windowHeight:1,e*=this.wheelMultiplier,i*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:i,event:t})},this.onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight},this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new o,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel),this.element.removeEventListener("touchstart",this.onTouchStart),this.element.removeEventListener("touchmove",this.onTouchMove),this.element.removeEventListener("touchend",this.onTouchEnd)}}class h{constructor({wrapper:t=window,content:e=document.documentElement,wheelEventsTarget:i=t,eventsTarget:s=i,smoothWheel:l=!0,syncTouch:h=!1,syncTouchLerp:c=.075,touchInertiaMultiplier:u=35,duration:d,easing:v=t=>Math.min(1,1.001-Math.pow(2,-10*t)),lerp:m=.1,infinite:p=!1,orientation:f="vertical",gestureOrientation:g="vertical",touchMultiplier:S=1,wheelMultiplier:b=1,autoResize:w=!0,prevent:E,virtualScroll:y,__experimental__naiveDimensions:I=!1}={}){this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.userData={},this.lastVelocity=0,this.velocity=0,this.direction=0,this.onPointerDown=t=>{1===t.button&&this.reset()},this.onVirtualScroll=t=>{if("function"==typeof this.options.virtualScroll&&!1===this.options.virtualScroll(t))return;const{deltaX:e,deltaY:i,event:s}=t;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:i,event:s}),s.ctrlKey)return;const n=s.type.includes("touch"),r=s.type.includes("wheel");if(this.isTouching="touchstart"===s.type||"touchmove"===s.type,this.options.syncTouch&&n&&"touchstart"===s.type&&!this.isStopped&&!this.isLocked)return void this.reset();if(0===e&&0===i||"vertical"===this.options.gestureOrientation&&0===i||"horizontal"===this.options.gestureOrientation&&0===e)return;let o=s.composedPath();o=o.slice(0,o.indexOf(this.rootElement));const l=this.options.prevent;if(o.find(t=>{var e,i,s,o,a;return t instanceof Element&&("function"==typeof l&&(null==l?void 0:l(t))||(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent"))||n&&(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent-touch"))||r&&(null===(s=t.hasAttribute)||void 0===s?void 0:s.call(t,"data-lenis-prevent-wheel"))||(null===(o=t.classList)||void 0===o?void 0:o.contains("lenis"))&&!(null===(a=t.classList)||void 0===a?void 0:a.contains("lenis-stopped")))}))return;if(this.isStopped||this.isLocked)return void s.preventDefault();if(!(this.options.syncTouch&&n||this.options.smoothWheel&&r))return this.isScrolling="native",void this.animate.stop();s.preventDefault();let a=i;"both"===this.options.gestureOrientation?a=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===this.options.gestureOrientation&&(a=e);const h=n&&this.options.syncTouch,c=n&&"touchend"===s.type&&Math.abs(a)>5;c&&(a=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+a,Object.assign({programmatic:!1},h?{lerp:c?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(clearTimeout(this.__resetVelocityTimeout),delete this.__resetVelocityTimeout,this.__preventNextNativeScrollEvent)delete this.__preventNextNativeScrollEvent;else if(!1===this.isScrolling||"native"===this.isScrolling){const t=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-t,this.direction=Math.sign(this.animatedScroll-t),this.isScrolling="native",this.emit(),0!==this.velocity&&(this.__resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}},window.lenisVersion="1.1.9",t&&t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:e,wheelEventsTarget:i,eventsTarget:s,smoothWheel:l,syncTouch:h,syncTouchLerp:c,touchInertiaMultiplier:u,duration:d,easing:v,lerp:m,infinite:p,gestureOrientation:g,orientation:f,touchMultiplier:S,wheelMultiplier:b,autoResize:w,prevent:E,virtualScroll:y,__experimental__naiveDimensions:I},this.animate=new n,this.emitter=new o,this.dimensions=new r({wrapper:t,content:e,autoResize:w}),this.updateClassName(),this.userData={},this.time=0,this.velocity=this.lastVelocity=0,this.isLocked=!1,this.isStopped=!1,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new a(s,{touchMultiplier:S,wheelMultiplier:b}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName()}on(t,e){return this.emitter.on(t,e)}off(t,e){return this.emitter.off(t,e)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.isStopped=!1,this.reset())}stop(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())}raf(t){const e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:i=!1,lock:n=!1,duration:r=this.options.duration,easing:o=this.options.easing,lerp:l=this.options.lerp,onStart:a,onComplete:h,force:c=!1,programmatic:u=!0,userData:d={}}={}){if(!this.isStopped&&!this.isLocked||c){if("string"==typeof t&&["top","left","start"].includes(t))t=0;else if("string"==typeof t&&["bottom","right","end"].includes(t))t=this.limit;else{let i;if("string"==typeof t?i=document.querySelector(t):t instanceof HTMLElement&&(null==t?void 0:t.nodeType)&&(i=t),i){if(this.options.wrapper!==window){const t=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?t.left:t.top}const s=i.getBoundingClientRect();t=(this.isHorizontal?s.left:s.top)+this.animatedScroll}}if("number"==typeof t&&(t+=e,t=Math.round(t),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):t=s(0,t,this.limit),t!==this.targetScroll)){if(this.userData=d,i)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),null==h||h(this),void(this.userData={});u||(this.targetScroll=t),this.animate.fromTo(this.animatedScroll,t,{duration:r,easing:o,lerp:l,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",null==a||a(this)},onUpdate:(t,e)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=t-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=t,this.setScroll(this.scroll),u&&(this.targetScroll=t),e||this.emit(),e&&(this.reset(),this.emit(),null==h||h(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this.__preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextNativeScrollEvent})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return"horizontal"===this.options.orientation}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(t,e){return(t%e+e)%e}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return 0===this.limit?1:this.scroll/this.limit}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.updateClassName())}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.updateClassName())}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.updateClassName())}get isSmooth(){return"smooth"===this.isScrolling}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),"smooth"===this.isScrolling&&(t+=" lenis-smooth"),t}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}}var c=/*#__PURE__*/function(){function t(t){var e=t.scrollElements,i=t.rootMargin,s=void 0===i?"-1px -1px -1px -1px":i,n=t.IORaf;this.scrollElements=void 0,this.rootMargin=void 0,this.IORaf=void 0,this.observer=void 0,this.scrollElements=e,this.rootMargin=s,this.IORaf=n,this._init()}var i=t.prototype;return i._init=function(){var t=this;this.observer=new IntersectionObserver(function(e){e.forEach(function(e){var i=t.scrollElements.find(function(t){return t.$el===e.target});e.isIntersecting?(i&&(i.isAlreadyIntersected=!0),t._setInview(e)):i&&i.isAlreadyIntersected&&t._setOutOfView(e)})},{rootMargin:this.rootMargin});for(var i,s=e(this.scrollElements);!(i=s()).done;)this.observe(i.value.$el)},i.destroy=function(){this.observer.disconnect()},i.observe=function(t){t&&this.observer.observe(t)},i.unobserve=function(t){t&&this.observer.unobserve(t)},i._setInview=function(t){var e=this.scrollElements.find(function(e){return e.$el===t.target});this.IORaf&&(null==e||e.setInteractivityOn()),!this.IORaf&&(null==e||e.setInview())},i._setOutOfView=function(t){var e=this.scrollElements.find(function(e){return e.$el===t.target});this.IORaf&&(null==e||e.setInteractivityOff()),!this.IORaf&&(null==e||e.setOutOfView()),null!=e&&e.attributes.scrollRepeat||this.IORaf||this.unobserve(t.target)},t}();function u(t,e,i,s,n){return i+((n-t)/(e-t)*(s-i)||0)}function d(t,e){return t.reduce(function(t,i){return Math.abs(i-e)<Math.abs(t-e)?i:t})}var v=/*#__PURE__*/function(){function t(t){var e,i,s,n,r,o=t.$el,l=t.id,a=t.modularInstance,h=t.subscribeElementUpdateFn,c=t.unsubscribeElementUpdateFn,u=t.needRaf,d=t.scrollOrientation;this.$el=void 0,this.id=void 0,this.needRaf=void 0,this.attributes=void 0,this.scrollOrientation=void 0,this.isAlreadyIntersected=void 0,this.intersection=void 0,this.metrics=void 0,this.currentScroll=void 0,this.translateValue=void 0,this.progress=void 0,this.lastProgress=void 0,this.modularInstance=void 0,this.progressModularModules=void 0,this.isInview=void 0,this.isInteractive=void 0,this.isInFold=void 0,this.isFirstResize=void 0,this.subscribeElementUpdateFn=void 0,this.unsubscribeElementUpdateFn=void 0,this.$el=o,this.id=l,this.needRaf=u,this.scrollOrientation=d,this.modularInstance=a,this.subscribeElementUpdateFn=h,this.unsubscribeElementUpdateFn=c,this.attributes={scrollClass:null!=(e=this.$el.dataset.scrollClass)?e:"is-inview",scrollOffset:null!=(i=this.$el.dataset.scrollOffset)?i:"0,0",scrollPosition:null!=(s=this.$el.dataset.scrollPosition)?s:"start,end",scrollModuleProgress:null!=this.$el.dataset.scrollModuleProgress,scrollCssProgress:null!=this.$el.dataset.scrollCssProgress,scrollEventProgress:null!=(n=this.$el.dataset.scrollEventProgress)?n:null,scrollSpeed:null!=this.$el.dataset.scrollSpeed?parseFloat(this.$el.dataset.scrollSpeed):null,scrollRepeat:null!=this.$el.dataset.scrollRepeat,scrollCall:null!=(r=this.$el.dataset.scrollCall)?r:null,scrollCallSelf:null!=this.$el.dataset.scrollCallSelf,scrollIgnoreFold:null!=this.$el.dataset.scrollIgnoreFold,scrollEnableTouchSpeed:null!=this.$el.dataset.scrollEnableTouchSpeed},this.intersection={start:0,end:0},this.metrics={offsetStart:0,offsetEnd:0,bcr:{}},this.currentScroll="vertical"===this.scrollOrientation?window.scrollY:window.scrollX,this.translateValue=0,this.progress=0,this.lastProgress=null,this.progressModularModules=[],this.isInview=!1,this.isInteractive=!1,this.isAlreadyIntersected=!1,this.isInFold=!1,this.isFirstResize=!0,this._init()}var i=t.prototype;return i._init=function(){this.needRaf&&(this.modularInstance&&this.attributes.scrollModuleProgress&&this._getProgressModularModules(),this._resize())},i.onResize=function(t){this.currentScroll=t.currentScroll,this._resize()},i.onRender=function(t){var e=t.smooth,i="vertical"===this.scrollOrientation?window.innerHeight:window.innerWidth;if(this.currentScroll=t.currentScroll,this._computeProgress(),this.attributes.scrollSpeed&&!isNaN(this.attributes.scrollSpeed))if(this.attributes.scrollEnableTouchSpeed||e){if(this.isInFold){var s=Math.max(0,this.progress);this.translateValue=s*i*this.attributes.scrollSpeed*-1}else{var n=u(0,1,-1,1,this.progress);this.translateValue=n*i*this.attributes.scrollSpeed*-1}this.$el.style.transform="vertical"===this.scrollOrientation?"translate3d(0, "+this.translateValue+"px, 0)":"translate3d("+this.translateValue+"px, 0, 0)"}else this.translateValue&&(this.$el.style.transform="translate3d(0, 0, 0)"),this.translateValue=0},i.setInview=function(){if(!this.isInview){this.isInview=!0,this.$el.classList.add(this.attributes.scrollClass);var t=this._getScrollCallFrom();this.attributes.scrollCall&&this._dispatchCall("enter",t)}},i.setOutOfView=function(){if(this.isInview&&this.attributes.scrollRepeat){this.isInview=!1,this.$el.classList.remove(this.attributes.scrollClass);var t=this._getScrollCallFrom();this.attributes.scrollCall&&this._dispatchCall("leave",t)}},i.setInteractivityOn=function(){this.isInteractive||(this.isInteractive=!0,this.subscribeElementUpdateFn(this))},i.setInteractivityOff=function(){this.isInteractive&&(this.isInteractive=!1,this.unsubscribeElementUpdateFn(this),null!=this.lastProgress&&this._computeProgress(d([0,1],this.lastProgress)))},i._resize=function(){this.metrics.bcr=this.$el.getBoundingClientRect(),this._computeMetrics(),this._computeIntersection(),this.isFirstResize&&(this.isFirstResize=!1,this.isInFold&&this.setInview())},i._computeMetrics=function(){var t=this.metrics.bcr,e="vertical"===this.scrollOrientation?window.innerHeight:window.innerWidth,i="vertical"===this.scrollOrientation?t.height:t.width;this.metrics.offsetStart=this.currentScroll+("vertical"===this.scrollOrientation?t.top:t.left)-this.translateValue,this.metrics.offsetEnd=this.metrics.offsetStart+i,this.isInFold=this.metrics.offsetStart<e&&!this.attributes.scrollIgnoreFold},i._computeIntersection=function(){var t="vertical"===this.scrollOrientation?window.innerHeight:window.innerWidth,e="vertical"===this.scrollOrientation?this.metrics.bcr.height:this.metrics.bcr.width,i=this.attributes.scrollOffset.split(","),s=null!=i[0]?i[0].trim():"0",n=null!=i[1]?i[1].trim():"0",r=this.attributes.scrollPosition.split(","),o=null!=r[0]?r[0].trim():"start",l=null!=r[1]?r[1].trim():"end",a=s.includes("%")?t*parseInt(s.replace("%","").trim())*.01:parseInt(s),h=n.includes("%")?t*parseInt(n.replace("%","").trim())*.01:parseInt(n);switch(this.isInFold&&(o="fold"),o){case"start":default:this.intersection.start=this.metrics.offsetStart-t+a;break;case"middle":this.intersection.start=this.metrics.offsetStart-t+a+.5*e;break;case"end":this.intersection.start=this.metrics.offsetStart-t+a+e;break;case"fold":this.intersection.start=0}switch(l){case"start":this.intersection.end=this.metrics.offsetStart-h;break;case"middle":this.intersection.end=this.metrics.offsetStart-h+.5*e;break;default:this.intersection.end=this.metrics.offsetStart-h+e}if(this.intersection.end<=this.intersection.start)switch(l){case"start":default:this.intersection.end=this.intersection.start+1;break;case"middle":this.intersection.end=this.intersection.start+.5*e;break;case"end":this.intersection.end=this.intersection.start+e}},i._computeProgress=function(t){var i,s=null!=t?t:(i=u(this.intersection.start,this.intersection.end,0,1,this.currentScroll))<0?0:i>1?1:i;if(this.progress=s,s!=this.lastProgress){if(this.lastProgress=s,this.attributes.scrollCssProgress&&this._setCssProgress(s),this.attributes.scrollEventProgress&&this._setCustomEventProgress(s),this.attributes.scrollModuleProgress)for(var n,r=e(this.progressModularModules);!(n=r()).done;){var o=n.value;this.modularInstance&&this.modularInstance.call("onScrollProgress",s,o.moduleName,o.moduleId)}s>0&&s<1&&this.setInview(),0===s&&this.setOutOfView(),1===s&&this.setOutOfView()}},i._setCssProgress=function(t){void 0===t&&(t=0),this.$el.style.setProperty("--progress",t.toString())},i._setCustomEventProgress=function(t){void 0===t&&(t=0);var e=this.attributes.scrollEventProgress;if(e){var i=new CustomEvent(e,{detail:{target:this.$el,progress:t}});window.dispatchEvent(i)}},i._getProgressModularModules=function(){if(this.modularInstance){var t=Object.keys(this.$el.dataset).filter(function(t){return t.includes("module")}),i=Object.entries(this.modularInstance.modules);if(t.length)for(var s,n=e(t);!(s=n()).done;){var r=this.$el.dataset[s.value];if(!r)return;for(var o,l=e(i);!(o=l()).done;){var a=o.value;r in a[1]&&this.progressModularModules.push({moduleName:a[0],moduleId:r})}}}},i._getScrollCallFrom=function(){var t=d([this.intersection.start,this.intersection.end],this.currentScroll);return this.intersection.start===t?"start":"end"},i._dispatchCall=function(t,e){var i,s,n=null==(i=this.attributes.scrollCall)?void 0:i.split(","),r=null==(s=this.attributes)?void 0:s.scrollCallSelf;if(n&&n.length>1){var o,l,a=n[0],h=n[1],c=n[2];l=r?this.$el.dataset["module"+h.trim()]:c,this.modularInstance&&this.modularInstance.call(a.trim(),{target:this.$el,way:t,from:e},h.trim(),null==(o=l)?void 0:o.trim())}else if(n){var u=new CustomEvent(n[0],{detail:{target:this.$el,way:t,from:e}});window.dispatchEvent(u)}},t}(),m=["scrollOffset","scrollPosition","scrollModuleProgress","scrollCssProgress","scrollEventProgress","scrollSpeed"],p=/*#__PURE__*/function(){function t(t){var e=t.$el,i=t.modularInstance,s=t.triggerRootMargin,n=t.rafRootMargin,r=t.scrollOrientation;this.$scrollContainer=void 0,this.modularInstance=void 0,this.triggerRootMargin=void 0,this.rafRootMargin=void 0,this.scrollElements=void 0,this.triggeredScrollElements=void 0,this.RAFScrollElements=void 0,this.scrollElementsToUpdate=void 0,this.IOTriggerInstance=void 0,this.IORafInstance=void 0,this.scrollOrientation=void 0,e?(this.$scrollContainer=e,this.modularInstance=i,this.scrollOrientation=r,this.triggerRootMargin=null!=s?s:"-1px -1px -1px -1px",this.rafRootMargin=null!=n?n:"100% 100% 100% 100%",this.scrollElements=[],this.triggeredScrollElements=[],this.RAFScrollElements=[],this.scrollElementsToUpdate=[],this._init()):console.error("Please provide a DOM Element as scrollContainer")}var i=t.prototype;return i._init=function(){var t=this.$scrollContainer.querySelectorAll("[data-scroll]"),e=Array.from(t);this._subscribeScrollElements(e),this.IOTriggerInstance=new c({scrollElements:[].concat(this.triggeredScrollElements),rootMargin:this.triggerRootMargin,IORaf:!1}),this.IORafInstance=new c({scrollElements:[].concat(this.RAFScrollElements),rootMargin:this.rafRootMargin,IORaf:!0})},i.destroy=function(){this.IOTriggerInstance.destroy(),this.IORafInstance.destroy(),this._unsubscribeAllScrollElements()},i.onResize=function(t){for(var i,s=t.currentScroll,n=e(this.RAFScrollElements);!(i=n()).done;)i.value.onResize({currentScroll:s})},i.onRender=function(t){for(var i,s=t.currentScroll,n=t.smooth,r=e(this.scrollElementsToUpdate);!(i=r()).done;)i.value.onRender({currentScroll:s,smooth:n})},i.removeScrollElements=function(t){var e=this,i=t.querySelectorAll("[data-scroll]");if(i.length){for(var s=0;s<this.triggeredScrollElements.length;s++){var n=this.triggeredScrollElements[s];Array.from(i).indexOf(n.$el)>-1&&(this.IOTriggerInstance.unobserve(n.$el),this.triggeredScrollElements.splice(s,1))}for(var r=0;r<this.RAFScrollElements.length;r++){var o=this.RAFScrollElements[r];Array.from(i).indexOf(o.$el)>-1&&(this.IORafInstance.unobserve(o.$el),this.RAFScrollElements.splice(r,1))}i.forEach(function(t){var i=e.scrollElementsToUpdate.find(function(e){return e.$el===t}),s=e.scrollElements.find(function(e){return e.$el===t});i&&e._unsubscribeElementUpdate(i),s&&(e.scrollElements=e.scrollElements.filter(function(t){return t.id!=s.id}))})}},i.addScrollElements=function(t){var e=t.querySelectorAll("[data-scroll]"),i=[];this.scrollElements.forEach(function(t){i.push(t.id)});var s=Math.max.apply(Math,i.concat([0]))+1,n=Array.from(e);this._subscribeScrollElements(n,s,!0)},i._subscribeScrollElements=function(t,e,i){void 0===e&&(e=0),void 0===i&&(i=!1);for(var s=0;s<t.length;s++){var n=t[s],r=this._checkRafNeeded(n),o=new v({$el:n,id:e+s,scrollOrientation:this.scrollOrientation,modularInstance:this.modularInstance,subscribeElementUpdateFn:this._subscribeElementUpdate.bind(this),unsubscribeElementUpdateFn:this._unsubscribeElementUpdate.bind(this),needRaf:r});this.scrollElements.push(o),r?(this.RAFScrollElements.push(o),i&&(this.IORafInstance.scrollElements.push(o),this.IORafInstance.observe(o.$el))):(this.triggeredScrollElements.push(o),i&&(this.IOTriggerInstance.scrollElements.push(o),this.IOTriggerInstance.observe(o.$el)))}},i._unsubscribeAllScrollElements=function(){this.scrollElements=[],this.RAFScrollElements=[],this.triggeredScrollElements=[],this.scrollElementsToUpdate=[]},i._subscribeElementUpdate=function(t){this.scrollElementsToUpdate.push(t)},i._unsubscribeElementUpdate=function(t){this.scrollElementsToUpdate=this.scrollElementsToUpdate.filter(function(e){return e.id!=t.id})},i._checkRafNeeded=function(t){var i=[].concat(m),s=function(t){i=i.filter(function(e){return e!=t})};if(t.dataset.scrollOffset){if("0,0"!=t.dataset.scrollOffset.split(",").map(function(t){return t.replace("%","").trim()}).join(","))return!0;s("scrollOffset")}else s("scrollOffset");if(t.dataset.scrollPosition){if("top,bottom"!=t.dataset.scrollPosition.trim())return!0;s("scrollPosition")}else s("scrollPosition");if(t.dataset.scrollSpeed&&!isNaN(parseFloat(t.dataset.scrollSpeed)))return!0;s("scrollSpeed");for(var n,r=e(i);!(n=r()).done;)if(n.value in t.dataset)return!0;return!1},t}(),f=/*#__PURE__*/function(){function t(t){var e=t.resizeElements,i=t.resizeCallback,s=void 0===i?function(){}:i;this.$resizeElements=void 0,this.isFirstObserve=void 0,this.observer=void 0,this.resizeCallback=void 0,this.$resizeElements=e,this.resizeCallback=s,this.isFirstObserve=!0,this._init()}var i=t.prototype;return i._init=function(){var t=this;this.observer=new ResizeObserver(function(e){!t.isFirstObserve&&(null==t.resizeCallback||t.resizeCallback()),t.isFirstObserve=!1});for(var i,s=e(this.$resizeElements);!(i=s()).done;)this.observer.observe(i.value)},i.destroy=function(){this.observer.disconnect()},t}();/*#__PURE__*/
return function(){function t(t){var e=void 0===t?{}:t,i=e.lenisOptions,s=void 0===i?{}:i,n=e.modularInstance,r=e.triggerRootMargin,o=e.rafRootMargin,l=e.autoResize,a=void 0===l||l,h=e.autoStart,c=void 0===h||h,u=e.scrollCallback,d=void 0===u?function(){}:u,v=e.initCustomTicker,m=e.destroyCustomTicker;this.rafPlaying=void 0,this.lenisInstance=void 0,this.coreInstance=void 0,this.lenisOptions=void 0,this.modularInstance=void 0,this.triggerRootMargin=void 0,this.rafRootMargin=void 0,this.rafInstance=void 0,this.autoResize=void 0,this.autoStart=void 0,this.ROInstance=void 0,this.initCustomTicker=void 0,this.destroyCustomTicker=void 0,this._onRenderBind=void 0,this._onResizeBind=void 0,this._onScrollToBind=void 0;for(var p=0,f=Object.entries(s);p<f.length;p++){var g=f[p][0];["wrapper","content","infinite"].includes(g)&&console.warn('Warning: Key "'+g+'" is not possible to edit in Locomotive Scroll.')}Object.assign(this,{lenisOptions:s,modularInstance:n,triggerRootMargin:r,rafRootMargin:o,autoResize:a,autoStart:c,scrollCallback:d,initCustomTicker:v,destroyCustomTicker:m}),this._onRenderBind=this._onRender.bind(this),this._onScrollToBind=this._onScrollTo.bind(this),this._onResizeBind=this._onResize.bind(this),this.rafPlaying=!1,this._init()}var e=t.prototype;return e._init=function(){var t,e=this;this.lenisInstance=new h(i({},this.lenisOptions,{wrapper:window,content:document.documentElement,infinite:!1})),null==(t=this.lenisInstance)||t.on("scroll",this.scrollCallback),document.documentElement.setAttribute("data-scroll-orientation",this.lenisInstance.options.orientation),requestAnimationFrame(function(){e.coreInstance=new p({$el:e.lenisInstance.rootElement,modularInstance:e.modularInstance,triggerRootMargin:e.triggerRootMargin,rafRootMargin:e.rafRootMargin,scrollOrientation:e.lenisInstance.options.orientation}),e._bindEvents(),e.initCustomTicker&&!e.destroyCustomTicker?console.warn("initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble."):!e.initCustomTicker&&e.destroyCustomTicker&&console.warn("destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."),e.autoStart&&e.start()})},e.destroy=function(){var t,e=this;this.stop(),this._unbindEvents(),this.lenisInstance.destroy(),null==(t=this.coreInstance)||t.destroy(),requestAnimationFrame(function(){var t;null==(t=e.coreInstance)||t.destroy()})},e._bindEvents=function(){this._bindScrollToEvents(),this.autoResize&&("ResizeObserver"in window?this.ROInstance=new f({resizeElements:[document.body],resizeCallback:this._onResizeBind}):window.addEventListener("resize",this._onResizeBind))},e._unbindEvents=function(){this._unbindScrollToEvents(),this.autoResize&&("ResizeObserver"in window?this.ROInstance&&this.ROInstance.destroy():window.removeEventListener("resize",this._onResizeBind))},e._bindScrollToEvents=function(t){var e=this,i=t||this.lenisInstance.rootElement,s=null==i?void 0:i.querySelectorAll("[data-scroll-to]");(null==s?void 0:s.length)&&s.forEach(function(t){t.addEventListener("click",e._onScrollToBind,!1)})},e._unbindScrollToEvents=function(t){var e=this,i=t||this.lenisInstance.rootElement,s=null==i?void 0:i.querySelectorAll("[data-scroll-to]");(null==s?void 0:s.length)&&s.forEach(function(t){t.removeEventListener("click",e._onScrollToBind,!1)})},e._onResize=function(){var t=this;requestAnimationFrame(function(){var e;null==(e=t.coreInstance)||e.onResize({currentScroll:t.lenisInstance.scroll})})},e._onRender=function(){var t,e;null==(t=this.lenisInstance)||t.raf(Date.now()),null==(e=this.coreInstance)||e.onRender({currentScroll:this.lenisInstance.scroll,smooth:this.lenisInstance.options.smoothWheel})},e._onScrollTo=function(t){var e;t.preventDefault();var i=null!=(e=t.currentTarget)?e:null;if(i){var s=i.getAttribute("data-scroll-to-href")||i.getAttribute("href"),n=i.getAttribute("data-scroll-to-offset")||0,r=i.getAttribute("data-scroll-to-duration")||this.lenisInstance.options.duration;s&&this.scrollTo(s,{offset:"string"==typeof n?parseInt(n):n,duration:"string"==typeof r?parseInt(r):r})}},e.start=function(){var t;this.rafPlaying||(null==(t=this.lenisInstance)||t.start(),this.rafPlaying=!0,this.initCustomTicker?this.initCustomTicker(this._onRenderBind):this._raf())},e.stop=function(){var t;this.rafPlaying&&(null==(t=this.lenisInstance)||t.stop(),this.rafPlaying=!1,this.destroyCustomTicker?this.destroyCustomTicker(this._onRenderBind):this.rafInstance&&cancelAnimationFrame(this.rafInstance))},e.removeScrollElements=function(t){var e;t?(this._unbindScrollToEvents(t),null==(e=this.coreInstance)||e.removeScrollElements(t)):console.error("Please provide a DOM Element as $oldContainer")},e.addScrollElements=function(t){var e,i=this;t?(null==(e=this.coreInstance)||e.addScrollElements(t),requestAnimationFrame(function(){i._bindScrollToEvents(t)})):console.error("Please provide a DOM Element as $newContainer")},e.resize=function(){this._onResizeBind()},e.scrollTo=function(t,e){var i;null==(i=this.lenisInstance)||i.scrollTo(t,{offset:null==e?void 0:e.offset,lerp:null==e?void 0:e.lerp,duration:null==e?void 0:e.duration,immediate:null==e?void 0:e.immediate,lock:null==e?void 0:e.lock,force:null==e?void 0:e.force,easing:null==e?void 0:e.easing,onComplete:null==e?void 0:e.onComplete})},e._raf=function(){var t=this;this._onRenderBind(),this.rafInstance=requestAnimationFrame(function(){return t._raf()})},t}()});