(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{407:function(t,n,e){"use strict";e.r(n);var r=e(231),o=e(216),c=e.n(o),h=(e(365),{data:function(){return{lineChart:{}}},computed:{comparison:function(){return this.$store.state.frontend.comparisons[this.$route.params.id]}},mounted:function(){var t=this;r.c.options.onDragEnd=this.lineChartDragAction,this.lineChart=new c.a(document.getElementById("lineChart"),r.c),this.lineChart.data.labels=this.comparison.alternatives.map((function(a){return"".concat(a.model," - ").concat(a[t.comparison.criterion.getAttribute()])})),this.lineChart.data.datasets[0].data=this.comparison.dm.matrix[0].map(r.a),this.lineChart.update()},methods:{lineChartDragAction:function(t,n,e,o){this.comparison.dm.setCell(0,e,Object(r.b)(o)),this.comparison.dm.autocomplete2(),this.$store.commit("frontend/setCompared",this.$route.params.id)}}}),l=e(38),component=Object(l.a)(h,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("h1",{staticClass:"text-4xl"},[this._v(this._s(this.comparison.criterion.name))]),this._v(" "),this._m(0),this._v(" "),n("nuxt-link",{staticClass:"py-1 px-2 border-2 rounded font-bold text-xs",attrs:{to:"/"}},[this._v("\n    Volver\n  ")])],1)}),[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"w-1/2"},[n("canvas",{attrs:{id:"lineChart"}})])}],!1,null,null,null);n.default=component.exports}}]);