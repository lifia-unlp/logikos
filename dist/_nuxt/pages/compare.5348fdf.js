(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{226:function(t,n,e){"use strict";e.d(n,"a",(function(){return o})),e.d(n,"b",(function(){return l}));var r={"-8":"Extremely worst","-6":"Very strongly worst","-4":"Strongly worst","-2":"Moderately worst",0:"Equal",2:"Moderately better",4:"Strongly better",6:"Very strongly better",8:"Extremely better"};function o(t){return t>=1?-1*(t-1):1/t-1}function l(t){return t>0?1/(t+1):-1*(t-1)}n.c={type:"line",data:{labels:[],datasets:[{data:[],borderColor:"#71BBE8",fill:!1}]},options:{legend:{display:!1},scales:{yAxes:[{ticks:{max:8,min:-8,stepSize:1,fontSize:12,fontStyle:"bold",callback:function(t,n,e){return t in r?r[t]:"-"}}}]},dragData:!0,dragOptions:{magnet:{to:Math.round}},onDragStart:function(t,element){if(0===element._index)return!1}}}},416:function(t,n,e){"use strict";e.r(n);var r=e(226),o=e(223),l=e.n(o),c=(e(227),{data:function(){return{lineChart:{}}},computed:{comparison:function(){return this.$store.state.frontend.comparisons[this.$route.params.id]}},mounted:function(){var t=this;r.c.options.onDragEnd=this.lineChartDragAction,this.lineChart=new l.a(document.getElementById("lineChart"),r.c),this.lineChart.data.labels=this.comparison.alternatives.map((function(a){return"".concat(a.model," - ").concat(a[t.comparison.criterion.getAttribute()])})),this.lineChart.data.datasets[0].data=this.comparison.dm.matrix[0].map(r.a),this.lineChart.update()},methods:{lineChartDragAction:function(t,n,e,o){this.comparison.dm.setCell(0,e,Object(r.b)(o)),this.comparison.dm.autocomplete2(),this.$store.commit("frontend/setCompared",this.$route.params.id)}}}),d=e(14),component=Object(d.a)(c,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("h1",{staticClass:"text-4xl"},[this._v(this._s(this.comparison.criterion.name))]),this._v(" "),this._m(0),this._v(" "),n("nuxt-link",{staticClass:"py-1 px-2 border-2 rounded font-bold text-xs",attrs:{to:"/"}},[this._v("\n    Volver\n  ")])],1)}),[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"w-1/2"},[n("canvas",{attrs:{id:"lineChart"}})])}],!1,null,null,null);n.default=component.exports}}]);