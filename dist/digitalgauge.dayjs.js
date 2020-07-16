module.exports=function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="./",i(i.s=18)}([function(t,e,i){"use strict";i.r(e),i.d(e,"render",(function(){return n})),i.d(e,"setText",(function(){return s})),i.d(e,"setAttr",(function(){return r})),i.d(e,"setStyle",(function(){return a})),i.d(e,"bindMethods",(function(){return o})),i.d(e,"unbindMethods",(function(){return l})),i.d(e,"getPosition",(function(){return c})),i.d(e,"eventToArg",(function(){return h})),i.d(e,"valueColor",(function(){return u})),i.d(e,"valueToColor",(function(){return d})),i.d(e,"isDef",(function(){return f})),i.d(e,"isUndef",(function(){return m})),i.d(e,"EmptyObj",(function(){return g})),i.d(e,"noop",(function(){return x})),i.d(e,"fontParse",(function(){return p})),i.d(e,"numberFixRange",(function(){return v})),i.d(e,"getModuleDefault",(function(){return y}));const n=(t="div",e={},i)=>{if(m(t))return;const{className:n,text:l,style:c,methods:h,...u}=e,d="string"==typeof t?document.createElement(t):t;return f(n)&&(d.classList=n),f(l)&&s(d,l),f(c)&&a(d,c),f(h)&&o(d,h),f(u)&&r(d,u),f(i)&&i.appendChild(d),d},s=(t,e)=>{f(e)&&(t.innerText=e)},r=(t,e=g)=>{Object.keys(e).forEach(i=>{f(e[i])&&t.setAttribute(i,e[i])})},a=(t,e=g)=>{Object.keys(e).forEach(i=>{f(e[i])&&(t.style[i]=e[i])})},o=(t,e=g)=>{Object.keys(e).forEach(i=>{t.addEventListener(i,e[i])})},l=(t,e=g)=>{Object.keys(e).forEach(i=>{t.removeEventListener(i,e[i])})},c=(t,e=0,i=0)=>t.offsetParent?c(t.offsetParent,t.offsetLeft+e-t.scrollLeft,t.offsetTop+i-t.scrollTop):{x:e,y:i},h=(t,e)=>{let i=t.pageX-e.x,n=t.pageY-e.y,s=180*Math.atan2(n,i)/Math.PI+180;if(!(s>260&&s<280))return s<315&&s>280&&(s=315),s>225&&s<260&&(s=225),s},u=[[95,"#ff0000"],[90,"#c02424"],[80,"#cb4848"],[70,"#ff8c00"],[60,"#f49a2c"],[50,"#cb9d25"],[40,"#d6b359"],[30,"#aab566"],[20,"#9ab566"],[10,"#19b620"],[0,"#108315"]],d=(t,e=u)=>{let i=+t;for(let t=0;t<e.length;t++)if(i>=e[t][0])return e[t][1];return e[e.length-1][1]},f=t=>null!=t,m=t=>null==t,g={},x=()=>{},b={family:{fKey:"fontFamily"},size:{fKey:"fontSize",parse:t=>isNaN(+t)?t:`${t}px`},style:{fKey:"font-style"},weight:{fKey:"font-weight"}},p=(t={})=>{let e={};return Object.keys(t).forEach(i=>{let n=b[i];if(n){const{fKey:s,parse:r}=n;e[s]=r?r(t[i]):t[i]}else e[i]=t[i]}),e},v=(t,e,i)=>Math.min(Math.max(t,e),i),y=t=>t.default?t.default:t},function(t,e,i){"use strict";var n,s=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},r=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),a=[];function o(t){for(var e=-1,i=0;i<a.length;i++)if(a[i].identifier===t){e=i;break}return e}function l(t,e){for(var i={},n=[],s=0;s<t.length;s++){var r=t[s],l=e.base?r[0]+e.base:r[0],c=i[l]||0,h="".concat(l," ").concat(c);i[l]=c+1;var u=o(h),d={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(a[u].references++,a[u].updater(d)):a.push({identifier:h,updater:x(d,e),references:1}),n.push(h)}return n}function c(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var s=i.nc;s&&(n.nonce=s)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=r(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var h,u=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function d(t,e,i,n){var s=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=u(e,s);else{var r=document.createTextNode(s),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function f(t,e,i){var n=i.css,s=i.media,r=i.sourceMap;if(s?t.setAttribute("media",s):t.removeAttribute("media"),r&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var m=null,g=0;function x(t,e){var i,n,s;if(e.singleton){var r=g++;i=m||(m=c(e)),n=d.bind(null,i,r,!1),s=d.bind(null,i,r,!0)}else i=c(e),n=f.bind(null,i,e),s=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else s()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=s());var i=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<i.length;n++){var s=o(i[n]);a[s].references--}for(var r=l(t,e),c=0;c<i.length;c++){var h=o(i[c]);0===a[h].references&&(a[h].updater(),a.splice(h,1))}i=r}}}},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var s=(a=n,o=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(l," */")),r=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[i].concat(r).concat([s]).join("\n")}var a,o,l;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,n){"string"==typeof t&&(t=[[null,t,""]]);var s={};if(n)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(s[a]=!0)}for(var o=0;o<t.length;o++){var l=[].concat(t[o]);n&&s[l[0]]||(i&&(l[2]?l[2]="".concat(i," and ").concat(l[2]):l[2]=i),e.push(l))}},e}},,,,,,,function(t,e,i){var n=i(1),s=i(10);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[t.i,s,""]]);var r={insert:"head",singleton:!1};n(s,r);t.exports=s.locals||{}},function(t,e,i){(e=i(2)(!1)).push([t.i,".digital-gauge {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.digital-gauge .digital-canvas {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.digital-gauge .digital-texts {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.digital-gauge .digital-texts .digital-title {\n  text-align: center;\n  font-size: 30px;\n}\n.digital-gauge .digital-texts .digital-value {\n  text-align: center;\n  flex: 1;\n}\n.digital-gauge .digital-texts .digital-time {\n  text-align: center;\n}\n.digital-gauge .digital-minmax {\n  position: absolute;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 50px 0;\n  top: 0;\n  left: 60%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.horizontalBar .digital-minmax {\n  left: 0;\n  top: 50%;\n  height: auto;\n  width: 100%;\n  flex-direction: row-reverse;\n  padding: 0 50px;\n}\n.donut .digital-minmax {\n  display: none;\n}\n.donut .digital-texts .digital-title {\n  flex: 3;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}\n.donut .digital-texts .digital-value {\n  flex: 3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.donut .digital-texts .digital-time {\n  flex: 3;\n}\n.arc .digital-minmax {\n  left: 0;\n  top: 50%;\n  height: auto;\n  width: 100%;\n  flex-direction: row-reverse;\n  padding: 0 50px;\n}\n.arc .digital-texts {\n  justify-content: flex-end;\n}\n.arc .digital-texts .digital-title {\n  flex: 3;\n  display: flex;\n  justify-content: center;\n  align-items: flex-end;\n}\n.arc .digital-texts .digital-value {\n  flex: 4;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n}\n.arc .digital-texts .digital-time {\n  flex: 1;\n}\n",""]),t.exports=e},,,,,,,,function(t,e,i){"use strict";i.r(e);var n=i(20),s=i.n(n),r=i(0);function a(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}i(9);const o=2*Math.PI,l=Math.PI,c=l/180;e.default=class{constructor(t,e){a(this,"_maxValue",100),a(this,"_minValue",0),a(this,"_time",null),a(this,"_unitTitle",""),a(this,"_title",""),a(this,"_valueSuffix",""),a(this,"donutStartAngle",90),a(this,"showValue",!0),a(this,"showMinMax",!0),a(this,"showTitle",!0),a(this,"showTimestamp",!0),a(this,"showUnitTitle",!1),a(this,"gaugeType","horizontalBar"),a(this,"gaugeWidthScale",.75),a(this,"titleFont",{family:"Roboto",size:12,style:"normal",weight:"500",color:"#999999"}),a(this,"labelFont",{family:"Roboto",size:8,style:"normal",weight:"500"}),a(this,"valueFont",{family:"Roboto",style:"normal",weight:"500",size:18,color:"#666666"}),a(this,"minMaxFont",{family:"Roboto",size:12,style:"normal",weight:"500",color:"#666666"}),a(this,"neonGlowBrightness",0),a(this,"levelColors",[]),a(this,"animation",!0),a(this,"animationDuration",500),a(this,"roundedLineCap",!1),a(this,"animationRule","linear"),a(this,"dashThickness",1),a(this,"stripBasic",2),a(this,"gaugeColor","#eeeeee"),a(this,"defaultColor","#65a0f8"),a(this,"timestampFormat","yyyy-MM-dd HH:mm:ss"),a(this,"ctx",null),a(this,"drawInfo",{rect:[0,0,100,100],clearbox:[0,0,1e4,1e4],donutCircle:[100,100,100],lineWidth:1}),a(this,"_value",0),a(this,"_errorMsg",""),a(this,"lastValue",0),a(this,"nextFrame",(t,e,i)=>{clearTimeout(this.animatTimer),i&&t>=this.value||!i&&t<this.value?this.updateValue(t):(this.updateValue(t),this.animatTimer=setTimeout(this.nextFrame,20,t+e,e,i))}),this.$el=t,this.$options=e,this._init()}get maxValue(){return this._maxValue}get minValue(){return this._minValue}set maxValue(t){this._maxValue=t,this.showValue&&this.$doms&&Object(r.render)(this.$doms.maxSpan,{text:t})}set minValue(t){this._minValue=t,this.showValue&&this.$doms&&Object(r.render)(this.$doms.minSpan,{text:t})}get time(){return this._time}set time(t){let e=s()(t).format("YYYY-MM-DD HH:mm:ss");this._time=e,this.showTimestamp&&this.$doms&&Object(r.render)(this.$doms.timeOrunitTitleDiv,{text:e})}get unitTitle(){return this._unitTitle}set unitTitle(t){this._unitTitle!==t&&(this._unitTitle=t,!this.showTimestamp&&this.showUnitTitle&&this.$doms&&Object(r.render)(this.$doms.timeOrunitTitleDiv,{text:t}))}get title(){return this._title}set title(t){this._title!==t&&(this._title=t,this.showTitle&&this.$doms&&Object(r.render)(this.$doms.titleDiv,{text:t}))}get valueSuffix(){return this._valueSuffix}set valueSuffix(t=""){this._valueSuffix=t,this.updateValue(this.value)}_init(){this.setOption(this.$options),this.initDom()}setOption(t={}){Object.keys(t).forEach(e=>{Object(r.isDef)(t[e])&&(this[e]=t[e])})}initDom(){this.$el.innerHtml="",this.$el.innerText="";const t=Object(r.render)("div",{className:`digital-gauge ${this.gaugeType}`},this.$el),e=Object(r.render)("canvas",{className:"digital-canvas"},t);this.ctx=e.getContext("2d"),window.ctx=this.ctx;const i=Object(r.render)("div",{className:"digital-texts"},t),n=Object(r.render)("div",{className:"digital-title",text:this.showTitle?this.title:"",style:Object(r.fontParse)(this.titleFont)},i),s=Object(r.render)("div",{className:"digital-value",text:"",style:Object(r.fontParse)(this.valueFont)},i);let a="";!this.showTimestamp&&this.showUnitTitle&&(a=this.unitTitle);const o=Object(r.render)("div",{className:"digital-time",style:{color:this.defaultColor},text:a},i),l=Object(r.render)("div",{className:"digital-minmax",style:Object(r.fontParse)(this.minMaxFont)},t),c=Object(r.render)("span",{className:"digital-max-span",text:this.showMinMax?this.maxValue:""},l),h=Object(r.render)("span",{className:"digital-min-span",text:this.showMinMax?this.minValue:""},l);this.$doms={box:t,canvas:e,titleDiv:n,valueDiv:s,minmaxDiv:l,minSpan:h,maxSpan:c,timeOrunitTitleDiv:o},this.resize()}resize(){const t=this.$el.offsetWidth,e=this.$el.offsetHeight;this.drawInfo.clearbox=[0,0,t,e],this[`set${this.gaugeType}`]&&this[`set${this.gaugeType}`](t,e),this.draw(this.value)}setverticalBar(t,e){const i=Math.min(t,e),n=Object(r.numberFixRange)(i/3,50,300)*this.gaugeWidthScale,s=Object(r.numberFixRange)(t/20,20,50),a=Object(r.numberFixRange)(t/10,16,40),o=Object(r.numberFixRange)(t/25,14,30),l=Object(r.numberFixRange)(t/30,14,30),c=t/2-n/2,h=1.2*(s+a+l),u=o+10;this.drawInfo.rect=[c,h,n,e-h-u],this.drawInfo.lineWidth=n;const d={fontSize:`${l}px`,left:`calc( 50% + ${n/2+5}px )`,padding:`${h-l}px 0 ${u-l}px 0`},f={fontSize:`${s}px`},m={fontSize:`${a}px`},g={fontSize:`${o}px`};Object(r.render)(this.$doms.canvas,{width:t,height:e}),Object(r.render)(this.$doms.titleDiv,{style:f}),Object(r.render)(this.$doms.valueDiv,{style:m}),Object(r.render)(this.$doms.timeOrunitTitleDiv,{style:g}),Object(r.render)(this.$doms.minmaxDiv,{style:d})}sethorizontalBar(t,e){const i=Math.min(t,e),n=Object(r.numberFixRange)(i/3,25,300)*this.gaugeWidthScale;this.drawInfo.lineWidth=n;const s=this.showTimestamp,a=this.showUnitTitle,o=Object(r.numberFixRange)(e/20,12,50),l=Object(r.numberFixRange)(e/10,16,40),c=Object(r.numberFixRange)(e/25,12,30),h=Object(r.numberFixRange)(e/30,12,30),u=t/15;let d=Object(r.numberFixRange)(o+l+h,e/5,e/2);d=a||s?d:d+c,this.drawInfo.rect=[u,d,t-2*u,n];const f={fontSize:`${h}px`,top:`${d+n/2-h}px`,padding:`0 ${u-2*h}px 0 ${u-h}px `},m={fontSize:`${o}px`},g={fontSize:`${l}px`},x={fontSize:`${c}px`};Object(r.render)(this.$doms.canvas,{width:t,height:e}),Object(r.render)(this.$doms.titleDiv,{style:m}),Object(r.render)(this.$doms.valueDiv,{style:g}),Object(r.render)(this.$doms.timeOrunitTitleDiv,{style:x}),Object(r.render)(this.$doms.minmaxDiv,{style:f})}setdonut(t,e){const i=.9*Math.min(t,e)/2,n=t/2,s=e/2,a=Object(r.numberFixRange)(i/3,15,3e3)*this.gaugeWidthScale;this.drawInfo.lineWidth=a,this.drawInfo.donutCircle=[n,s,Math.max(i-a/2,0)];const o={fontSize:`${Object(r.numberFixRange)(i/10,12,90)}px`},l={fontSize:`${Object(r.numberFixRange)(i/3,16,100)}px`},c={fontSize:`${Object(r.numberFixRange)(i/13,12,50)}px`};Object(r.render)(this.$doms.canvas,{width:t,height:e}),Object(r.render)(this.$doms.titleDiv,{style:o}),Object(r.render)(this.$doms.valueDiv,{style:l}),Object(r.render)(this.$doms.timeOrunitTitleDiv,{style:c})}setarc(t,e){const i=.9*Math.min(t,e)/2,n=Object(r.numberFixRange)(i/3,15,3e3),s=t/2,a=Object(r.numberFixRange)(.85*e,e/2,e-20);this.drawInfo.donutCircle=[s,a,i],this.drawInfo.lineWidth=n*this.gaugeWidthScale;const o={fontSize:`${Object(r.numberFixRange)(i/10,12,90)}px`},l={fontSize:`${Object(r.numberFixRange)(i/3,16,100)}px`},c={fontSize:`${Object(r.numberFixRange)(i/13,12,50)}px`},h={fontSize:`${Object(r.numberFixRange)(i/30,12,30)}px`,top:`calc(${a+5}px )`,padding:`0 ${t/2-i-10}px 0 ${t/2-i-10}px `};Object(r.render)(this.$doms.canvas,{width:t,height:e}),Object(r.render)(this.$doms.titleDiv,{style:o}),Object(r.render)(this.$doms.valueDiv,{style:l}),Object(r.render)(this.$doms.timeOrunitTitleDiv,{style:c}),Object(r.render)(this.$doms.minmaxDiv,{style:h})}draw(t=0){if(!this.$doms||!this.$doms.canvas)return;let e=Object(r.numberFixRange)((t-this.minValue)/(this.maxValue-this.minValue),0,1),i=this.ctx;i.lineCap=this.roundedLineCap?"round":"butt",i.lineWidth=this.drawInfo.lineWidth,i.clearRect(...this.drawInfo.clearbox),i.save();const n=this.stripBasic*this.dashThickness;this[this.gaugeType]&&this[this.gaugeType](i,e,n),i.restore()}verticalBar(t,e,i){const[n,s,r,a]=this.drawInfo.rect;if(t.translate(n+r/2,s+a),t.beginPath(),t.strokeStyle=this.getColor(!0),i){let e=0;for(;e<a;)t.moveTo(0,-e),t.lineTo(0,-Math.min(e+i,a)),e+=2*i;t.stroke()}else t.moveTo(0,0),t.lineTo(0,-a),t.closePath(),t.stroke();t.strokeStyle=this.getColor(!1,e),t.beginPath();const o=e*a;if(i){let e=0;for(;e<o;)t.moveTo(0,-e),t.lineTo(0,-Math.min(e+i,o)),e+=2*i;t.stroke()}else t.moveTo(0,0),t.lineTo(0,-o),t.closePath(),t.stroke()}horizontalBar(t,e,i){const[n,s,r,a]=this.drawInfo.rect;if(t.translate(n,s+a/2),t.strokeStyle=this.getColor(!0),t.beginPath(),i){let e=0;for(;e<r;)t.moveTo(e,0),t.lineTo(Math.min(e+i,r),0),e+=2*i;t.stroke()}else t.moveTo(0,0),t.lineTo(r,0),t.closePath(),t.stroke();t.strokeStyle=this.getColor(!1,e);const o=e*r;if(t.beginPath(),i){let e=0;for(;e<o;)t.moveTo(e,0),t.lineTo(Math.min(e+i,o),0),e+=2*i;t.stroke()}else t.moveTo(0,0),t.lineTo(o,0),t.closePath(),t.stroke()}donut(t,e,i){const n=i*c,[s,r,a]=this.drawInfo.donutCircle;if(t.translate(s,r),t.rotate(-l/2),t.strokeStyle=this.getColor(!0),t.beginPath(),n){let e=0;for(;e<o;)t.beginPath(),t.arc(0,0,a,e,Math.min(e+n,o)),e+=2*n,t.stroke()}else t.arc(0,0,a,0,o),t.stroke();const h=o*e;if(t.strokeStyle=this.getColor(!1,e),n){let e=0;for(;e<h;)t.beginPath(),t.arc(0,0,a,e,Math.min(e+n,h)),e+=2*n,t.stroke()}else t.beginPath(),t.arc(0,0,a,0,h),t.stroke()}arc(t,e,i){const n=i*c,[s,r,a]=this.drawInfo.donutCircle;if(t.translate(s,r),t.rotate(-l),t.strokeStyle=this.getColor(!0),t.beginPath(),n){let e=0;for(;e<l;)t.beginPath(),t.arc(0,0,a,e,Math.min(e+n,l)),e+=2*n,t.stroke()}else t.arc(0,0,a,0,l),t.stroke();const o=l*e;if(t.strokeStyle=this.getColor(!1,e),n){let e=0;for(;e<o;)t.beginPath(),t.arc(0,0,a,e,Math.min(e+n,o)),e+=2*n,t.stroke()}else t.beginPath(),t.arc(0,0,a,0,o),t.stroke()}getColor(t=!0,e){if(t)return this.gaugeColor;if(this.levelColors&&this.levelColors.length){let t=Math.floor(e*(this.levelColors.length-1));return this.levelColors[t]}return this.defaultColor}valueToArg(t){return t<=this.minValue?0:t>=this.maxValue?270:270*(t=(t-this.minValue)/(this.maxValue-this.minValue))}calcTickPoint(t){t=t%360/180*Math.PI;let e=this.size/2*.5,i=this.size/2-3,n=this.size/2,s=Math.sin(t),r=Math.cos(t);return[[n+e*r,n+e*s],[n+i*r,n+i*s]]}get value(){return this._value}set value(t){t=parseFloat(t),isNaN(t)||(this.lastValue=this._value,this._value=t,this.$doms&&(this.animation?this.animatValue(this.lastValue,t):this.updateValue(t),this.time=new Date))}animatValue(t,e){if(e===t)return;const i=(e-t)/Math.ceil(this.animationDuration/20),n=t+i,s=i>0;this.nextFrame(n,i,s)}updateValue(t){this.$doms&&(this.showValue&&Object(r.render)(this.$doms.valueDiv,{text:t.toFixed(2)+this.valueSuffix}),this.draw(t))}get errorMsg(){return this._errorMsg}set errorMsg(t){t=""+t,this._errorMsg=t,this.$doms&&Object(r.render)(this.$doms.errorDiv,{text:t})}destroy(){clearTimeout(this.animatTimer),this.$el.removeChild(this.$doms.box)}}},,function(t,e){t.exports=require("dayjs")}]);