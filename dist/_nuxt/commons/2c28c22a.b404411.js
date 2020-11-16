(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{214:function(t,e,r){"use strict";var n=r(97),o=r(28),c=r(29),l=r(12),m=r.n(l),d=function(){function t(e){Object(o.a)(this,t),this.ranking=e}return Object(c.a)(t,[{key:"sort",value:function(){this.ranking=m.a.orderBy(this.ranking,["weight"],["desc"])}}],[{key:"combine",value:function(e){for(var r=Object(n.a)(e[0].ranking),i=1;i<e.length;i++)for(var o=0;o<e[i].length;o++)r[o].weight+=e[i].ranking[o].weight;return new t(r)}}]),t}();e.a=d},215:function(t,e,r){"use strict";r.d(e,"a",(function(){return m}));var n=r(28),o=r(29),c=r(99),l=r(214),m=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Object(n.a)(this,t),this.criterion=r,this.alternatives=e,this.dm=new c.a(e.length),this.isCompared=!1,this.hasPreset()&&this.loadPreset()}return Object(o.a)(t,[{key:"addAlternative",value:function(t){this.alternatives.push(t),this.dm.enlarge()}},{key:"removeAlternative",value:function(t){var e=this.alternatives.indexOf(t);-1!==e&&(this.alternatives.splice(e,1),this.dm.shrink(),this.dm.reset())}},{key:"hasPreset",value:function(){return Object.prototype.hasOwnProperty.call(this,"preset")}},{key:"loadPreset",value:function(){this.alternatives=this.criterion.preset.sortAlternatives(this.alternatives),this.dm.matrix=this.criterion.preset.getSubDecisionMatrix(this.alternatives),this.isCompared=!0}},{key:"rank",value:function(){var t=this,e=null!==this.criterion?this.criterion.absoluteWeight():1;return new l.a(this.dm.weights().map((function(r,n){return{alternative:t.alternatives[n],weight:r*e}})))}}]),t}()},220:function(t,e,r){var content=r(383);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(47).default)("4612504a",content,!0,{sourceMap:!1})},221:function(t,e,r){var content=r(385);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(47).default)("4885cffb",content,!0,{sourceMap:!1})},222:function(t,e,r){var content=r(387);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(47).default)("ce5c524c",content,!0,{sourceMap:!1})},223:function(t,e,r){var content=r(389);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(47).default)("2a006186",content,!0,{sourceMap:!1})},224:function(t,e,r){var content=r(391);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(47).default)("2693e8a1",content,!0,{sourceMap:!1})},230:function(t,e,r){"use strict";r.r(e);var n={name:"HelpPopover",props:{title:String}},o=(r(384),r(38)),component=Object(o.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("v-popover",{attrs:{offset:"16",placement:"top"}},[e("font-awesome-icon",{staticClass:"text-base text-gray-600 cursor-pointer",attrs:{icon:["far","question-circle"]}}),this._v(" "),e("template",{slot:"popover"},[e("div",{staticClass:"py-4 px-10 bg-white shadow w-1/2"},[e("h1",{staticClass:"popover__title"},[this._v(this._s(this.title))]),this._v(" "),e("div",{staticClass:"mt-1 text-sm"},[this._t("default")],2)])])],2)}),[],!1,null,null,null);e.default=component.exports},366:function(t,e,r){"use strict";r.r(e);r(15);var n=r(216),o=r.n(n),c={name:"ProfileSummary",props:{profile:{type:Object,default:function(){return{}}}},data:function(){return{pieChart:{}}},mounted:function(){this.pieChart=new o.a(document.getElementById("pieChart"),{type:"pie",data:{datasets:[{backgroundColor:["#E9604E","#17273E","#71BBE8","#0F7173","#533A7B","#4B244A"]}]},options:{responsive:!0,maintainAspectRatio:!1,aspectRatio:1}}),this._updatePieChart()},watch:{profile:{handler:function(t){this._updatePieChart()},deep:!0}},methods:{_updatePieChart:function(){this.pieChart.data.labels=this.profile.criteria.map((function(t){return t.name})),this.pieChart.data.datasets[0].data=this.profile.criteria.map((function(t){return t.absoluteWeight()})),this.pieChart.update()}}},l=r(38),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"text-primary text-2xl"},[t._v('"'+t._s(t.profile.name)+'"')]),t._v(" "),r("p",{staticClass:"text-sm"},[t._v(t._s(t.profile.description))]),t._v(" "),t._m(0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"w-full h-full"},[e("canvas",{attrs:{id:"pieChart"}})])}],!1,null,null,null);e.default=component.exports},367:function(t,e,r){"use strict";r.r(e);var n={name:"CriteriaList",props:{criteria:Array,show:Boolean},methods:{newCriterion:function(){this.$emit("criterion:new")},compareCriteria:function(){this.$emit("comparison:new",this.criteria)}}},o=(r(382),r(38)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"flex flex-wrap justify-between"},[t._m(0),t._v(" "),r("div",[r("HelpPopover",{attrs:{title:"Profile criteria"}},[t._v("\n        Specify the comparison criteria for this profile that will be used on\n        a set of alternatives. You can create, edit and delete criterions.\n        Each criterion can be broke down in subcriteria. You can compare\n        criteria of the same level to determine how much important is one\n        criterion to another.\n      ")])],1)]),t._v(" "),t.criteria.length>1&&t.show?r("button",{staticClass:"criteria__btn",on:{click:t.compareCriteria}},[r("font-awesome-icon",{attrs:{icon:["fas","sort-amount-down"]}}),t._v("\n    Compare\n  ")],1):t._e(),t._v(" "),t._l(t.criteria,(function(e,i){return r("AdminCriterion",{key:i,attrs:{criterion:e,showActions:t.show},on:{"criterion:remove":function(r){return t.$emit("criterion:remove",e)},"criterion:edit":function(e){return t.$emit("criterion:edit",e)},"criterion:new":function(e){return t.$emit("criterion:new",e)},"comparison:new":function(e){return t.$emit("comparison:new",e)}}})})),t._v(" "),t.show?r("button",{staticClass:"criteria__btn",on:{click:t.newCriterion}},[r("font-awesome-icon",{attrs:{icon:["fas","plus"]}}),t._v("\n    Add Criterion\n  ")],1):t._e()],2)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",{staticClass:"text-secondary text-xl mb-4"},[this._v("Criteria")])])}],!1,null,"00ba8a1a",null);e.default=component.exports;installComponents(component,{HelpPopover:r(230).default,AdminCriterion:r(406).default})},368:function(t,e,r){"use strict";r.r(e);r(14),r(7);var n=r(133),o=r(12),c=r.n(o),l={name:"CriterionForm",props:{originalCriterion:{type:Object,default:function(){return new n.a("")}}},data:function(){return{criterion:new n.a(""),setAttribute:Boolean(this.originalCriterion.attribute),presetValue:""}},mounted:function(){this.criterion=c.a.cloneDeep(this.originalCriterion)},methods:{cancel:function(){this.$emit("cancel")},addCriterion:function(){this.$emit("criterion:add",this.criterion)},addPresetValue:function(){""!==this.presetValue&&(this.criterion.preset.values.push(this.presetValue),this.presetValue="")},removePresetValue:function(t){this.criterion.preset.values.splice(t,1)},comparePreset:function(){this.$emit("comparison:new:preset",this.criterion.preset.values,this.criterion)}}},m=(r(388),r(38)),component=Object(m.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"flex flex-wrap justify-between"},[t._m(0),t._v(" "),r("div",[r("HelpPopover",{attrs:{title:"Criterion"}},[t._v('\n        Create a new criterion or edit an existing one. If the name does not\n        match the alternative\'s corresponding property you should specify it\n        on the "attribute" field, for instance if the criterion\'s name is\n        "cost" you should specify "price" in the attribute field. '),r("br"),t._v("\n        If the criterion doesn't have subcriteria you can specify a preset, a\n        set of possible values and precompare them so the profile user doesn't\n        have to!\n      ")])],1)]),t._v(" "),r("div",{staticClass:"form-field"},[r("label",{staticClass:"form-field__label"},[t._v("NAME")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.criterion.name,expression:"criterion.name"}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.criterion.name},on:{input:function(e){e.target.composing||t.$set(t.criterion,"name",e.target.value)}}})]),t._v(" "),r("div",{staticClass:"form-field"},[r("label",{staticClass:"form-field__label form-field__label--inline"},[t._v("\n      SET ATTRIBUTE?\n    ")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.setAttribute,expression:"setAttribute"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.setAttribute)?t._i(t.setAttribute,null)>-1:t.setAttribute},on:{change:function(e){var r=t.setAttribute,n=e.target,o=!!n.checked;if(Array.isArray(r)){var c=t._i(r,null);n.checked?c<0&&(t.setAttribute=r.concat([null])):c>-1&&(t.setAttribute=r.slice(0,c).concat(r.slice(c+1)))}else t.setAttribute=o}}}),t._v(" "),r("p",{staticClass:"form-field__hint"},[t._v("\n      🛈 You should specify an attribute when the name of the criterion\n      doesn’t match the corresponding alternative field.\n    ")])]),t._v(" "),t.setAttribute?r("div",{staticClass:"form-field"},[r("label",{staticClass:"form-field__label"},[t._v("ATTRIBUTE")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.criterion.attribute,expression:"criterion.attribute"}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.criterion.attribute},on:{input:function(e){e.target.composing||t.$set(t.criterion,"attribute",e.target.value)}}})]):t._e(),t._v(" "),t.criterion.canHavePreset()?r("div",[r("p",{staticClass:"mt-4 text-lg text-secondary"},[t._v("Preset")]),t._v(" "),r("div",{staticClass:"form-field"},[r("label",{staticClass:"form-field__label"},[t._v("VALUE")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.presetValue,expression:"presetValue"}],staticClass:"form-field__input",attrs:{type:"text"},domProps:{value:t.presetValue},on:{input:function(e){e.target.composing||(t.presetValue=e.target.value)}}})]),t._v(" "),r("button",{staticClass:"criterion-form__btn",on:{click:function(e){return t.addPresetValue()}}},[r("font-awesome-icon",{attrs:{icon:["fas","plus"]}}),t._v("\n      Add\n    ")],1),t._v(" "),t.criterion.preset.values.length>1?r("button",{staticClass:"criterion-form__btn",on:{click:function(e){return t.comparePreset()}}},[r("font-awesome-icon",{attrs:{icon:["fas","sort-amount-down"]}}),t._v("\n      Compare\n    ")],1):t._e(),t._v(" "),r("ul",t._l(t.criterion.preset.values,(function(e,i){return r("li",{key:i},[t._v("\n        · "+t._s(e)+"\n      ")])})),0)]):t._e(),t._v(" "),r("button",{staticClass:"btn btn--save",on:{click:t.addCriterion}},[t._v("\n    Save\n  ")]),t._v(" "),r("button",{staticClass:"btn",on:{click:t.cancel}},[t._v("\n    Cancel\n  ")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",{staticClass:"text-secondary text-xl mb-4"},[this._v("New Criterion")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{HelpPopover:r(230).default})},369:function(t,e,r){"use strict";r.r(e);r(17),r(18),r(7);var n=r(231),o=r(216),c=r.n(o),l=(r(365),{props:{comparison:{type:Object,default:function(){return{}}}},data:function(){return{lineChart:{},showDetails:!1}},computed:{consistencyRatio:function(){return Math.abs(this.comparison.dm.consistencyRatio().toFixed(2))}},mounted:function(){n.c.options.onDragEnd=this.lineChartDragAction,this.lineChart=new c.a(document.getElementById("lineChart"),n.c),this.lineChart.data.labels=this.comparison.alternatives.map((function(a){return a.toString()})),this.lineChart.data.datasets[0].data=this.comparison.dm.matrix[0].map(n.a),this.lineChart.update()},methods:{invert:function(t,col){this.comparison.dm.setReciprocalValue(col,t),this.$set(this.comparison.dm.matrix,col,this.comparison.dm.matrix[col])},lineChartDragAction:function(t,e,r,o){this.comparison.dm.setCell(0,r,Object(n.b)(o)),this.comparison.dm.autocomplete2(),this.$forceUpdate()},cancel:function(){this.$emit("cancel")},save:function(){this.$emit("comparison:rank",this.comparison)}}}),m=(r(390),r(38)),component=Object(m.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"flex flex-wrap justify-between"},[t._m(0),t._v(" "),r("div",[r("HelpPopover",{attrs:{title:"Comparison"}},[t._v("\n        Compare a set of criteria or preset values. Drag the points of the\n        widget to specify the relationship of importance between an element to\n        the leftmost. If you want to, you can check more details of the\n        comparison: the resulting decision matrix and consistency of it.\n      ")])],1)]),t._v(" "),r("div",{staticClass:"flex flex-wrap mb-4"},[r("div",{staticClass:"w-full"},[r("canvas",{attrs:{id:"lineChart"}}),t._v(" "),r("p",{staticClass:"form-field__hint"},[t._v("\n        🛈 Drag each point representing an item/value in relation to\n        the one with the anchor icon. Is it better? Is it worse? how much\n        better/worse?\n      ")]),t._v(" "),r("button",{staticClass:"mt-2 text-sm text-secondary",on:{click:function(e){t.showDetails=!t.showDetails}}},[t.showDetails?r("font-awesome-icon",{attrs:{icon:["fas","angle-down"]}}):r("font-awesome-icon",{attrs:{icon:["fas","angle-right"]}}),t._v("\n        Show details\n      ")],1)]),t._v(" "),t.showDetails?r("div",{staticClass:"comparison-details"},[r("table",t._l(t.comparison.dm.matrix,(function(e,i){return r("tr",{key:i},t._l(e,(function(e,n){return r("td",{key:n,staticClass:"comparison-details__dm-cell"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.comparison.dm.matrix[i][n],expression:"comparison.dm.matrix[i][j]"}],staticClass:"comparison-details__dm-input",domProps:{value:t.comparison.dm.matrix[i][n]},on:{change:function(e){return t.invert(i,n)},input:function(e){e.target.composing||t.$set(t.comparison.dm.matrix[i],n,e.target.value)}}})])})),0)})),0),t._v(" "),r("div",[r("p",{staticClass:"comparison-details__cr-title"},[t._v("\n          CONSISTENCY RATIO\n        ")]),t._v(" "),r("p",{staticClass:"comparison-details__cr-value",class:[t.comparison.dm.isConsistent()?"":"comparison-details__cr-value--inconsistent"]},[t._v("\n          "+t._s(t.consistencyRatio)+"\n        ")])])]):t._e()]),t._v(" "),r("button",{staticClass:"btn btn--save",on:{click:t.save}},[t._v("\n    Save\n  ")]),t._v(" "),r("button",{staticClass:"btn",on:{click:t.cancel}},[t._v("\n    Cancel\n  ")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",{staticClass:"text-secondary text-xl mb-4"},[this._v("Compare")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{HelpPopover:r(230).default})},382:function(t,e,r){"use strict";var n=r(220);r.n(n).a},383:function(t,e,r){(e=r(46)(!1)).push([t.i,".criteria__btn[data-v-00ba8a1a]{--text-opacity:1;color:#71bbe8;color:rgba(113,187,232,var(--text-opacity));font-size:.875rem;cursor:pointer}",""]),t.exports=e},384:function(t,e,r){"use strict";var n=r(221);r.n(n).a},385:function(t,e,r){(e=r(46)(!1)).push([t.i,".popover__title{font-size:1.125rem;--text-opacity:1;color:#e9604e;color:rgba(233,96,78,var(--text-opacity))}",""]),t.exports=e},386:function(t,e,r){"use strict";var n=r(222);r.n(n).a},387:function(t,e,r){(e=r(46)(!1)).push([t.i,".criterion[data-v-76162831]{display:flex;flex-wrap:wrap;margin-bottom:.5rem}.criterion__name[data-v-76162831]{display:flex;flex-wrap:wrap;padding-left:.5rem;padding-right:.5rem;border-width:1px;--border-opacity:1;border-color:#f4f4f4;border-color:rgba(244,244,244,var(--border-opacity))}.criterion__weight[data-v-76162831]{margin-left:.5rem;margin-right:.5rem;--bg-opacity:1;background-color:#e9604e;background-color:rgba(233,96,78,var(--bg-opacity));--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity));text-align:center}.criterion__action-btn[data-v-76162831]{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity));font-size:1rem;cursor:pointer}.criterion__action-btn[data-v-76162831]:hover{--text-opacity:1;color:#71bbe8;color:rgba(113,187,232,var(--text-opacity))}.criterion__subcriteria[data-v-76162831]{margin-left:1.5rem}",""]),t.exports=e},388:function(t,e,r){"use strict";var n=r(223);r.n(n).a},389:function(t,e,r){(e=r(46)(!1)).push([t.i,".criterion-form__btn{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity));font-size:.875rem;cursor:pointer}.criterion-form__btn:hover{--text-opacity:1;color:#71bbe8;color:rgba(113,187,232,var(--text-opacity))}",""]),t.exports=e},390:function(t,e,r){"use strict";var n=r(224);r.n(n).a},391:function(t,e,r){(e=r(46)(!1)).push([t.i,".comparison-details{width:100%;display:flex;flex-wrap:wrap;justify-content:space-evenly;align-items:center}.comparison-details__dm-cell{border-width:2px;--border-opacity:1;border-color:#e2e8f0;border-color:rgba(226,232,240,var(--border-opacity))}.comparison-details__dm-input{width:2.5rem;height:2.5rem;text-align:center;background-color:transparent}.comparison-details__cr-title{text-align:center;letter-spacing:.05em;--text-opacity:1;color:#17273e;color:rgba(23,39,62,var(--text-opacity));font-size:1.125rem}.comparison-details__cr-value{text-align:center;font-size:1.5rem;--text-opacity:1;color:#68d391;color:rgba(104,211,145,var(--text-opacity))}.comparison-details__cr-value--inconsistent{--text-opacity:1;color:#fc8181;color:rgba(252,129,129,var(--text-opacity))}",""]),t.exports=e},406:function(t,e,r){"use strict";r.r(e);r(15);var n={name:"AdminCriterion2",props:{showActions:{type:Boolean,default:function(){return!1}},criterion:{type:Object,default:function(){return{}}}},computed:{weight:function(){var t=100*this.criterion.absoluteWeight();return t>1?Math.round(t):t.toFixed(2)}},methods:{remove:function(){this.$emit("criterion:remove",this.criterion)},edit:function(){this.$emit("criterion:edit",this.criterion)},addSubcriteria:function(){this.$emit("criterion:new",this.criterion)},removeSubcriterion:function(t){this.criterion.removeSubcriterion(t.name)},compareSubcriteria:function(){this.$emit("comparison:new",this.criterion.subcriteria)}}},o=(r(386),r(38)),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"criterion"},[r("div",{staticClass:"w-1/12"},[r("div",{staticClass:"criterion__weight"},[t._v(t._s(t.weight)+"%")])]),t._v(" "),r("div",{staticClass:"w-11/12 criterion__name"},[r("div",{staticClass:"w-10/12"},[t._v("\n        "+t._s(t.criterion.name)+"\n      ")]),t._v(" "),t.showActions?r("div",{staticClass:"w-2/12"},[r("font-awesome-icon",{staticClass:"criterion__action-btn",attrs:{icon:["fas","plus"]},on:{click:function(e){return t.addSubcriteria()}}}),t._v(" "),t.criterion.subcriteria.length>1?r("font-awesome-icon",{staticClass:"criterion__action-btn",attrs:{icon:["fas","sort-amount-down"]},on:{click:function(e){return t.compareSubcriteria()}}}):t._e(),t._v(" "),r("font-awesome-icon",{staticClass:"criterion__action-btn",attrs:{icon:["fas","pencil-alt"]},on:{click:function(e){return t.edit()}}}),t._v(" "),r("font-awesome-icon",{staticClass:"criterion__action-btn",attrs:{icon:["far","trash-alt"]},on:{click:function(e){return t.remove()}}})],1):t._e()])]),t._v(" "),t.criterion.subcriteria.length>0?r("div",{staticClass:"criterion__subcriteria"},t._l(t.criterion.subcriteria,(function(e,i){return r("AdminCriterion2",{key:i,attrs:{criterion:e,showActions:t.showActions},on:{"criterion:remove":function(r){return t.removeSubcriterion(e)},"criterion:new":function(e){return t.$emit("criterion:new",e)},"criterion:edit":function(e){return t.$emit("criterion:edit",e)},"comparison:new":function(e){return t.$emit("comparison:new",e)}}})})),1):t._e()])}),[],!1,null,"76162831",null);e.default=component.exports}}]);