(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{222:function(t,n,r){"use strict";var e=r(98),o=r(29),c=r(30),l=r(12),f=r.n(l),v=function(){function t(n){Object(o.a)(this,t),this.ranking=n}return Object(c.a)(t,[{key:"sort",value:function(){this.ranking=f.a.orderBy(this.ranking,["weight"],["desc"])}}],[{key:"combine",value:function(n){for(var r=Object(e.a)(n[0].ranking),i=1;i<n.length;i++)for(var o=0;o<n[i].length;o++)r[o].weight+=n[i].ranking[o].weight;return new t(r)}}]),t}();n.a=v},383:function(t,n,r){"use strict";var e=r(4),o=r(33),c=r(42),l=r(146),f=r(78),v=r(20),h=r(58).f,k=r(79).f,d=r(13).f,_=r(384).trim,N=e.Number,m=N,I=N.prototype,x="Number"==c(r(100)(I)),E="trim"in String.prototype,C=function(t){var n=f(t,!1);if("string"==typeof n&&n.length>2){var r,e,o,c=(n=E?n.trim():_(n,3)).charCodeAt(0);if(43===c||45===c){if(88===(r=n.charCodeAt(2))||120===r)return NaN}else if(48===c){switch(n.charCodeAt(1)){case 66:case 98:e=2,o=49;break;case 79:case 111:e=8,o=55;break;default:return+n}for(var code,l=n.slice(2),i=0,v=l.length;i<v;i++)if((code=l.charCodeAt(i))<48||code>o)return NaN;return parseInt(l,e)}}return+n};if(!N(" 0o1")||!N("0b1")||N("+0x1")){N=function(t){var n=arguments.length<1?0:t,r=this;return r instanceof N&&(x?v((function(){I.valueOf.call(r)})):"Number"!=c(r))?l(new m(C(n)),r,N):C(n)};for(var w,y=r(10)?h(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;y.length>A;A++)o(m,w=y[A])&&!o(N,w)&&d(N,w,k(m,w));N.prototype=I,I.constructor=N,r(21)(e,"Number",N)}},384:function(t,n,r){var e=r(5),o=r(41),c=r(20),l=r(385),f="["+l+"]",v=RegExp("^"+f+f+"*"),h=RegExp(f+f+"*$"),k=function(t,n,r){var o={},f=c((function(){return!!l[t]()||"​"!="​"[t]()})),v=o[t]=f?n(d):l[t];r&&(o[r]=v),e(e.P+e.F*f,"String",o)},d=k.trim=function(t,n){return t=String(o(t)),1&n&&(t=t.replace(v,"")),2&n&&(t=t.replace(h,"")),t};t.exports=k},385:function(t,n){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},414:function(t,n,r){"use strict";r.r(n);r(383);var e={props:{rank:{type:Object},position:{type:Number}}},o=r(14),component=Object(o.a)(e,(function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"mx-2 my-4 flex items-center grid grid-cols-12"},[r("div",{staticClass:"col-span-1"},[r("p",{staticClass:"text-2xl"},[t._v(t._s(t.position)+"º")])]),t._v(" "),r("div",{staticClass:"border-l-2 border-logikos-orange pl-2 col-span-1"},[r("img",{staticClass:"w-12",attrs:{src:t.rank.alternative.thumb}})]),t._v(" "),r("div",{staticClass:"col-span-7"},[r("p",{staticClass:"text-lg text-logikos"},[r("a",{attrs:{href:t.rank.alternative.url,target:"_blank"}},[t._v("\n        "+t._s(t.rank.alternative.label)+"\n      ")])])]),t._v(" "),r("div",{staticClass:"col-span-3"},[r("p",[t._v("$ "+t._s(t.rank.alternative.price))])])])}),[],!1,null,null,null);n.default=component.exports},420:function(t,n,r){"use strict";r.r(n);var e=r(222),o={layout:"frontend",computed:{rank:function(){var t=[];for(var n in this.$store.state.frontend.comparisons)t.push(this.$store.state.frontend.comparisons[n].rank());var r=e.a.combine(t);return r.sort(),r}}},c=r(14),component=Object(c.a)(o,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("h1",{staticClass:"text-4xl font-thin text-logikos"},[this._v("Ranking")]),this._v(" "),this._l(this.rank.ranking,(function(t,i){return n("Rank",{key:i,attrs:{rank:t,position:i+1}})})),this._v(" "),n("nuxt-link",{staticClass:"default-button",attrs:{to:"/"}},[this._v("\n    Back\n  ")])],2)}),[],!1,null,null,null);n.default=component.exports;installComponents(component,{Rank:r(414).default})}}]);