(function(t){function e(e){for(var i,o,s=e[0],c=e[1],u=e[2],h=0,f=[];h<s.length;h++)o=s[h],r[o]&&f.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(i=!1)}i&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},r={app:0},a=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3c88":function(t,e,n){"use strict";var i=n("d84d"),r=n.n(i);r.a},"48cb":function(t,e,n){"use strict";var i=n("d344"),r=n.n(i);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"simulator"}},[n("PuyoEditor",{attrs:{base64:t.base64}}),n("pre",[t._v("original field:\n"+t._s(t.field)+"\n\nbase64 field:\n"+t._s(t.base64)+"\n\ndecoded field:\n"+t._s(t.decoded)+"\n\ndecoded field margin time setting is null:\n"+t._s(t.noMarginTime)+"\n\nfinal field:\n"+t._s(t.final)+"\n\npoints:\n"+t._s(t.points)+"\n\nwith margin time = null, nuisance multiplier after 500 sec:\n"+t._s(t.multiplier)+"\n    ")])],1)},a=[],o=n("5d73"),s=n.n(o),c=n("768b"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor"},[n("PuyoPlayer",{attrs:{base64:t.base64}}),t._m(0)],1)},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"editor__control"},[n("ul",{staticClass:"editor__color"},[n("li",{staticClass:"editor__color--red"}),n("li",{staticClass:"editor__color--green"}),n("li",{staticClass:"editor__color--blue"}),n("li",{staticClass:"editor__color--yellow"}),n("li",{staticClass:"editor__color--purple"})])])}],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"player"},[n("PuyoField",{attrs:{base64:t.base64,state:t.state},on:{"update:state":function(e){t.state=e}}}),n("ul",{staticClass:"player__control"},[t.playing?t._e():n("li",{on:{click:function(e){return e.stopPropagation(),t.play(e)}}},[n("i",{staticClass:"fas fa-play"})]),t.playing?n("li",{on:{click:function(e){return e.stopPropagation(),t.stop(e)}}},[n("i",{staticClass:"fas fa-pause"})]):t._e(),n("li",{on:{click:function(e){return e.stopPropagation(),t.step(e)}}},[n("i",{staticClass:"fas fa-step-forward"})]),n("li",{on:{click:function(e){return e.stopPropagation(),t.reset(e)}}},[n("i",{staticClass:"fas fa-fast-backward"})])])],1)},f=[],d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"puyostage"}})},b=[],v=(n("6c7b"),n("774e1")),p=n.n(v),m=(n("ac6a"),n("5df3"),n("96cf"),n("3b8d")),w=n("795b"),y=n.n(w),j=n("912c"),g=n("109c"),O=n("b0b4"),k=n("d225"),C=n("bd86"),R=n("1b81"),E=n.n(R),P=n("5d58"),x=n.n(P),T=n("db0c"),S=n.n(T),B=(n("6762"),n("2fdb"),n("ab0e")),A=n("a52d"),_=n("15b8"),M=n.n(_),L=n("85f2"),N=n.n(L),z={},D=z;N()(z,"Properties",{value:function t(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.cleared,r=void 0===i?function(t){return e}:i,a=n.adjacentCleared,o=void 0===a?function(t){return e}:a,s=n.gravityImmune,c=void 0!==s&&s,u=n.symbol,l=void 0===u?"?":u;Object(k["a"])(this,t),this.cleared=r,this.adjacentCleared=o,this.gravityImmune=c,this.symbol=l,M()(this)}}),N()(z,"EMPTY",{value:new z.Properties({gravityImmune:!0,symbol:" "}),enumerable:!0});var Y=n("9a04"),F=n("75fc"),I=n("b6d0"),G=n.n(I),U=n("2d7d"),H=n.n(U),$=n("308d"),V=n("6bb5"),q=n("4e2b"),W=n("f28b"),X=function(){function t(e){var n=e.type,i=e.positional,r=e.argument;switch(Object(k["a"])(this,t),this.positional=i,this.type=n){case t.Type.TRANSFORM:this.newObject=r;break;case t.Type.EXCHANGE:this.otherPositional=r;break}M()(this)}return Object(O["a"])(t,[{key:"apply",value:function(){if(this.valid)switch(this.type){case t.Type.TRANSFORM:this.positional.object=this.newObject;break;case t.Type.EXCHANGE:var e=[this.otherPositional.object,this.positional.object];this.positional.object=e[0],this.otherPositional.object=e[1];break}}},{key:"valid",get:function(){if(!this.positional.valid)return!1;switch(this.type){case t.Type.TRANSFORM:return!0;case t.Type.EXCHANGE:return this.positional.field==this.otherPositional.field;default:return!1}}}]),t}();Object(C["a"])(X,"Collection",function(t){function e(){var t;Object(k["a"])(this,e);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return Object($["a"])(this,(t=Object(V["a"])(e)).call.apply(t,[this].concat(i)))}return Object(q["a"])(e,t),Object(O["a"])(e,[{key:"apply",value:function(){this.forEach(function(t){return t.apply()})}}]),e}(Object(W["a"])(Array))),Object(C["a"])(X,"Type",{EXCHANGE:{},TRANSFORM:{}});var K=function(){function t(){Object(k["a"])(this,t)}return Object(O["a"])(t,null,[{key:"findConnections",value:function(t,e){var n=e.targetObjects,i=e.minConnection,r=void 0===i?1:i,a=e.onlyVisible,o=void 0===a||a,s=new H.a(n.map(function(t){return[t,[]]}));return new G.a(Object(F["a"])(Array(t.dimension.rows*t.dimension.columns).keys())).forEach(function(e,n,i){var a=new t.Positional({primitive:e}),c=a.object;if(o&&a.hidden||!s.has(c))i.delete(a.primitive);else{var u=[];(function t(e){i.has(e.primitive)&&c===e.object&&(i.delete(e.primitive),u.push(e),e.adjacent.forEach(t))})(a),u.length>=r&&s.get(c).push(u)}}),s}},{key:"flattenConnectionMap",value:function(t){var e=function(t){return t.reduce(function(t,e){return t.concat(e)},[])};return e(e(p()(t.values())))}},{key:"clearingDiff",value:function(t){var e=new H.a,n=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){return e.cleared(t)};if(t.valid){var i=e.has(t.primitive)?e.get(t.primitive).newObject:t.object,r=n(i);i!==r&&e.set(t.primitive,new X({type:X.Type.TRANSFORM,positional:t,argument:r}))}},i=!0,r=!1,a=void 0;try{for(var o,c=s()(t);!(i=(o=c.next()).done);i=!0){var u=o.value;n(u);var l=!0,h=!1,f=void 0;try{for(var d,b=function(){var t=d.value;n(t,function(e){return e.adjacentCleared(t)})},v=s()(u.adjacent);!(l=(d=v.next()).done);l=!0)b()}catch(p){h=!0,f=p}finally{try{l||null==v.return||v.return()}finally{if(h)throw f}}}}catch(p){r=!0,a=p}finally{try{i||null==c.return||c.return()}finally{if(r)throw a}}return Object(Y["a"])(X.Collection,Object(F["a"])(e.values()))}},{key:"diff",value:function(t,e){var n=[t.dimension,e.dimension],i=n[0],r=n[1];if(i.columns===r.columns&&i.visibleRows===r.visibleRows&&i.hiddenRows===r.hiddenRows){for(var a=new X.Collection,o=new t.Positional,s=new e.Positional;o.valid;c=[o.right.bottom,s.right.bottom],o=c[0],s=c[1],c)for(var c;o.valid;u=[o.above,s.above],o=u[0],s=u[1],u){var u;o.object!==s.object&&a.push(new X({type:X.Type.TRANSFORM,positional:o,argument:s.object}))}return a}}},{key:"gravitationalDiff",value:function(t){for(var e=new X.Collection,n=new H.a,i=new t.Positional,r=new t.Positional;i.valid;a=[i.right.bottom,r.right.bottom],i=a[0],r=a[1],a)for(var a;i.valid;i=i.above){var o=n.get(i.primitive)||i.object,s=n.get(r.primitive)||r.object;o!==D.EMPTY&&(o.gravityImmune&&(r.row=i.row),o!==s&&(e.push(new X({type:X.Type.EXCHANGE,positional:i,argument:r})),n.set(i.primitive,s),n.set(r.primitive,o)),r=r.above)}return e}}]),t}(),J=(n("14b9"),8),Q=n("1fb5"),Z=function(){function t(){Object(k["a"])(this,t),tt.set(this,{writable:!0,value:0}),et.set(this,{writable:!0,value:0}),nt.set(this,{writable:!0,value:[]}),it.set(this,{writable:!0,value:function(){0!==Object(B["a"])(this,et)&&(Object(B["a"])(this,nt).push(Object(B["a"])(this,tt)<<J-Object(B["a"])(this,et)),Object(A["a"])(this,tt,Object(A["a"])(this,et,0)))}})}return Object(O["a"])(t,[{key:"write",value:function(t){var e=t.value,n=t.writeBitCount;n<=0||(Object(A["a"])(this,tt,Object(B["a"])(this,tt)<<1|e>>n-1&1),Object(A["a"])(this,et,+Object(B["a"])(this,et)+1)%J===0&&Object(B["a"])(this,it).call(this),this.write({value:e,writeBitCount:n-1}))}},{key:"writeVariableLength",value:function(t){var e=t.value,n=t.writeBitCount,i=t.partitionBitCount,r=this,a=function t(e,n){if(n<=i)return[e>>>i,function(){r.write({value:0,writeBitCount:1}),r.write({value:e,writeBitCount:i})}];var a=t(e,n-i),o=Object(c["a"])(a,2),s=o[0],u=o[1];return[s>>>i,function(){0!==s&&(r.write({value:1,writeBitCount:1}),r.write({value:s,writeBitCount:i})),u()}]},o=a(e,n),s=Object(c["a"])(o,2),u=s[1];u()}},{key:"finalize",value:function(){return Object(B["a"])(this,it).call(this),M()(this),Q.fromByteArray(Object(B["a"])(this,nt))}}]),t}(),tt=new E.a,et=new E.a,nt=new E.a,it=new E.a,rt=n("2d1f"),at=n.n(rt),ot=n("fa35"),st=function(){function t(e){var n=e.entry;n=void 0===n?[]:n;var i=Object(c["a"])(n,2),r=i[0],a=i[1],o=e.branches;o=void 0===o?[]:o;var s=Object(c["a"])(o,2),u=s[0],l=s[1];Object(k["a"])(this,t),u&&l?(this.symbol=u.symbol+l.symbol,this.frequency=u.frequency+l.frequency,this.left=u,this.right=l):(this.symbol=r,this.frequency=a,this.left=null,this.right=null),M()(this)}return Object(O["a"])(t,null,[{key:"comparator",value:function(t,e){return t.frequency<e.frequency?-1:t.frequency>e.frequency?1:t.symbol<e.symbol?-1:t.symbol>e.symbol?1:0}}]),Object(O["a"])(t,[{key:"isLeaf",value:function(){return null===this.left&&null===this.right}},{key:"to",value:function(e){this.isLeaf()?(e.write({value:t.LEAF,writeBitCount:1}),e.write({value:this.symbol.charCodeAt(0),writeBitCount:8})):(e.write({value:t.BRANCH,writeBitCount:1}),this.left.to(e),this.right.to(e))}}],[{key:"from",value:function(t){return t.read(1)===this.BRANCH?new this({branches:[this.from(t),this.from(t)]}):new this({entry:[String.fromCharCode(t.read(8)),0]})}}]),t}();Object(C["a"])(st,"BRANCH",0),Object(C["a"])(st,"LEAF",1);var ct=function(){function t(e){Object(k["a"])(this,t),ut.set(this,{writable:!0,value:void 0});var n=new ot["a"](at()(e).map(function(t){return new st({entry:t})}),st.comparator);while(n.length>1)n.push(new st({branches:[n.pop(),n.pop()]}));Object(A["a"])(this,ut,n.pop())}return Object(O["a"])(t,[{key:"to",value:function(t){Object(B["a"])(this,ut).to(t)}}],[{key:"from",value:function(t){var e=new this({});return Object(A["a"])(e,ut,st.from(t)),e}}]),Object(O["a"])(t,[{key:"symbolFromStream",value:function(e){for(var n=Object(B["a"])(this,ut);!n.isLeaf();n=e.read(1)===t.LEFT?n.left:n.right);return n.symbol}},{key:"encoding",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(B["a"])(this,ut),i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(n.isLeaf())e[n.symbol]=i;else{var r=function(t){return function(e){i(e),e.write({value:t,writeBitCount:1})}};this.encoding(e,n.left,r(t.LEFT)),this.encoding(e,n.right,r(t.RIGHT))}return e}}]),t}(),ut=new E.a;Object(C["a"])(ct,"LEFT",0),Object(C["a"])(ct,"RIGHT",1);var lt=function(t){var e={toAsciiArt:function(t){for(var e=["++"+"=".repeat(2*t.dimension.columns+1)+"++"],n=new t.Positional;n.valid;n=n.farLeft.above){for(var i=" ",r=n.hidden?"  ":"||";n.valid;n=n.right)i+=n.object.symbol+" ";e.unshift(r+i+r)}return e.join("\n")},toBitStream:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Z,n={},i=new t.Positional;i.valid;i=i.bottom.right)for(;i.valid;i=i.above){var r=i.object.symbol;n[r]=n[r]?n[r]+1:1}var a=new ct(n);a.to(e);var o=a.encoding(),c=!0,u=!1,l=void 0;try{for(var h,f=s()(t);!(c=(h=f.next()).done);c=!0){var d=h.value;o[d.object.symbol](e)}}catch(b){u=!0,l=b}finally{try{c||null==f.return||f.return()}finally{if(u)throw l}}return e}};return e},ht=n("01c8"),ft=(n("28a5"),function(t){var e={},n=function(){return S()(t.Object).reduce(function(t,e){return t[e.symbol]=e,t},{})};return e.fromAsciiArt=function(e){var i=n(),r=e.split("\n"),a=new t({columns:Math.ceil(r.pop().slice(3,-3).length/2),hiddenRows:function(t){var e=!0,n=!1,i=void 0;try{for(var a,o=s()(r);!(e=(a=o.next()).done);e=!0){var c=a.value;if(" "!=c[0])break;++t}}catch(u){n=!0,i=u}finally{try{e||null==o.return||o.return()}finally{if(n)throw i}}return t}(0),visibleRows:r.length-this.hiddenRows}),o=(new a.Positional).top,c=!0,u=!1,l=void 0;try{for(var h,f=s()(r);!(c=(h=f.next()).done);c=!0){for(var d=h.value,b=d.slice(3,-3),v=Object(ht["a"])(b),p=v[0],m=(v[1],v.slice(2));m.length>0;w=m,y=Object(ht["a"])(w),p=y[0],y[1],m=y.slice(2),w){var w,y;o.object=i[p],o=o.right}o=o.farLeft.below}}catch(j){u=!0,l=j}finally{try{c||null==f.return||f.return()}finally{if(u)throw l}}return a},e.fromBitStream=function(t,e){var i=ct.from(e),r=n(),a=!0,o=!1,c=void 0;try{for(var u,l=s()(t);!(a=(u=l.next()).done);a=!0){var h=u.value;h.object=r[i.symbolFromStream(e)]}}catch(f){o=!0,c=f}finally{try{a||null==l.return||l.return()}finally{if(o)throw c}}return t},e}),dt={BELOW:1,ABOVE:2,RIGHT:4,LEFT:8},bt=x.a,vt=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.columns,i=void 0===n?6:n,r=e.visibleRows,a=void 0===r?12:r,o=e.hiddenRows,s=void 0===o?1:o;Object(k["a"])(this,t),pt.set(this,{writable:!0,value:void 0}),this.dimension={columns:i>=0?i:6,visibleRows:a>=0?a:12,hiddenRows:s>=0?s:1,get rows(){return this.visibleRows+this.hiddenRows}},Object(A["a"])(this,pt,[]);var c=this;this.Positional=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.row,i=void 0===n?0:n,r=t.column,a=void 0===r?0:r,o=t.primitive;if(Object(k["a"])(this,e),void 0!==o)this.row=o%c.dimension.rows,this.column=Math.floor(o/c.dimension.rows);else{var s=[i,a];this.row=s[0],this.column=s[1]}}return Object(O["a"])(e,[{key:"primitive",get:function(){return this.column*c.dimension.rows+this.row}},{key:"above",get:function(){return new this.constructor({row:this.row+1,column:this.column})}},{key:"below",get:function(){return new this.constructor({row:this.row-1,column:this.column})}},{key:"left",get:function(){return new this.constructor({row:this.row,column:this.column-1})}},{key:"right",get:function(){return new this.constructor({row:this.row,column:this.column+1})}},{key:"adjacent",get:function(){return[this.above,this.below,this.left,this.right]}},{key:"top",get:function(){return new this.constructor({row:c.dimension.rows-1,column:this.column})}},{key:"farRight",get:function(){return new this.constructor({row:this.row,column:c.dimension.columns-1})}},{key:"bottom",get:function(){return new this.constructor({row:0,column:this.column})}},{key:"farLeft",get:function(){return new this.constructor({row:this.row,column:0})}},{key:"hidden",get:function(){return c.dimension.visibleRows<=this.row&&this.row<c.dimension.rows}},{key:"valid",get:function(){return 0<=this.row&&this.row<c.dimension.rows&&0<=this.column&&this.column<c.dimension.columns}},{key:"field",get:function(){return c}},{key:"connections",get:function(){return this.object.hidden?0:0|(this.below.hidden||this.below.object!=this.object?0:dt.BELOW)|(this.above.hidden||this.above.object!=this.object?0:dt.ABOVE)|(this.right.hidden||this.right.object!=this.object?0:dt.RIGHT)|(this.left.hidden||this.left.object!=this.object?0:dt.LEFT)}},{key:"object",get:function(){if(this.valid){var e=[this.row,this.column],n=e[0],i=e[1];return Object(B["a"])(c,pt)[i]&&Object(B["a"])(c,pt)[i][n]?Object(B["a"])(c,pt)[i][n]:t.Object.EMPTY}},set:function(e){if(this.valid&&S()(t.Object).includes(e)){var n=[this.row,this.column],i=n[0],r=n[1];if(e===t.Object.EMPTY){if(!Object(B["a"])(c,pt)[r])return;delete Object(B["a"])(c,pt)[r][i]}else Object(B["a"])(c,pt)[r]||(Object(B["a"])(c,pt)[r]=[]),Object(B["a"])(c,pt)[r][i]=e}}}]),e}()}return Object(O["a"])(t,[{key:bt,value:regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=new this.Positional;case 1:if(!e.valid){t.next=11;break}case 2:if(!e.valid){t.next=8;break}return t.next=5,e;case 5:e=e.above,t.next=2;break;case 8:e=e.right.bottom,t.next=1;break;case 11:case"end":return t.stop()}},t,this)})},{key:"clone",value:function(){var t=new this.constructor(this.dimension);return Object(A["a"])(t,pt,Object(B["a"])(this,pt).map(function(t){return void 0!==t?t.slice():void 0})),t}}]),t}(),pt=new E.a;Object(C["a"])(vt,"Object",D),Object(C["a"])(vt,"Algorithm",K),Object(C["a"])(vt,"Serializer",lt(vt)),Object(C["a"])(vt,"Deserializer",ft(vt));var mt=8,wt=n("1fb5"),yt=function(){function t(e){Object(k["a"])(this,t),jt.set(this,{writable:!0,value:0}),gt.set(this,{writable:!0,value:0}),Ot.set(this,{writable:!0,value:void 0}),Object(A["a"])(this,Ot,p()(wt.toByteArray(e)))}return Object(O["a"])(t,[{key:"read",value:function(t){if(t<=0)return 0;if(0===Object(B["a"])(this,gt)){if(0===Object(B["a"])(this,Ot).length)return;Object(A["a"])(this,jt,Object(B["a"])(this,Ot).shift()),Object(A["a"])(this,gt,mt)}var e=(Object(B["a"])(this,jt)>>Object(A["a"])(this,gt,+Object(B["a"])(this,gt)-1)&1)<<t-1;return e|this.read(t-1)}},{key:"readVariableLength",value:function(t){var e=0;do{var n=this.read(1);e<<=t,e|=this.read(t)}while(1===n);return e}}]),t}(),jt=new E.a,gt=new E.a,Ot=new E.a;vt.Object.RED=new vt.Object.Properties({symbol:"R",cleared:function(){return vt.Object.EMPTY}}),vt.Object.YELLOW=new vt.Object.Properties({symbol:"Y",cleared:function(){return vt.Object.EMPTY}}),vt.Object.BLUE=new vt.Object.Properties({symbol:"B",cleared:function(){return vt.Object.EMPTY}}),vt.Object.GREEN=new vt.Object.Properties({symbol:"G",cleared:function(){return vt.Object.EMPTY}}),vt.Object.PURPLE=new vt.Object.Properties({symbol:"P",cleared:function(){return vt.Object.EMPTY}}),vt.Object.BLOCK=new vt.Object.Properties({symbol:"=",gravityImmune:!0}),vt.Object.IRON=new vt.Object.Properties({symbol:"-"}),vt.Object.NUISANCE=new vt.Object.Properties({symbol:"o",adjacentCleared:function(){return vt.Object.EMPTY}}),vt.Object.HARD_NUISANCE=new vt.Object.Properties({symbol:"O",adjacentCleared:function(){return vt.Object.NUISANCE}});var kt=32,Ct=function t(e){var n=e.rule,i=e.dimension;Object(k["a"])(this,t),this.rule=n,this.field=new vt(i)};Object(C["a"])(Ct,"Modes",[]),Object(C["a"])(Ct,"Serializer",function(){function t(){Object(k["a"])(this,t)}return Object(O["a"])(t,null,[{key:"headerToBitStream",value:function(t,e){for(var n=e.actualParams,i=e.defaultParams,r=e.partitionSizes,a=0;a<i.length;++a)n[a]===i[a]?t.write({value:0,writeBitCount:1}):(t.write({value:1,writeBitCount:1}),null===n[a]?t.write({value:0,writeBitCount:1}):(t.write({value:1,writeBitCount:1}),t.writeVariableLength({value:n[a],writeBitCount:kt,partitionBitCount:r[a]})))}},{key:"toBitStream",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Z;return e.writeVariableLength({value:Ct.Modes.indexOf(t.constructor),writeBitCount:kt,partitionBitCount:4}),t.constructor.Serializer.toBitStream(t,e)}},{key:"toBase64",value:function(t){return Ct.Serializer.toBitStream(t).finalize()}}]),t}()),Object(C["a"])(Ct,"Deserializer",function(){function t(){Object(k["a"])(this,t)}return Object(O["a"])(t,null,[{key:"array2objects",value:function(t){var e=t.array,n=t.objectKeys,i=[],r=!0,a=!1,o=void 0;try{for(var c,u=s()(n);!(r=(c=u.next()).done);r=!0){var l=c.value;i.push(l.reduce(function(t,n){return t[n]=e.shift(),t},{}))}}catch(h){a=!0,o=h}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return i}},{key:"headerFromBitStream",value:function(t,e){for(var n=e.defaultParams,i=e.partitionSizes,r=0;r<n.length;++r)0!==t.read(1)&&(n[r]=0===t.read(1)?null:t.readVariableLength(i[r]));return n}},{key:"fromBitStream",value:function(t){return Ct.Modes[t.readVariableLength(4)].Deserializer.fromBitStream(t)}},{key:"fromBase64",value:function(t){return Ct.Deserializer.fromBitStream(new yt(t))}}]),t}());var Rt=32,Et=[19,24,28,31,34,37,40,42,44,46,48],Pt="STATE_IDLE",xt="STATE_END",Tt="STATE_PLAY",St="STATE_STEP",Bt="STATE_RESET",At={name:"PuyoField",data:function(){return{app:null,container:{bg:null,puyo:null},game:null,pixifield:null,playable:!0}},props:{base64:String,state:String},watch:{state:function(t,e){switch(t){case Tt:e===Pt?this.play():this.$emit("update:state",Pt);break;case St:e===Pt?this.step():this.$emit("update:state",Pt);break;case Bt:e===Pt||e===xt?this.reset():this.$emit("update:state",Pt);break;case Pt:case xt:default:break}}},methods:{timelinePromise:function(t,e,n){var i=this;return new y.a(function(r){t.play(),t.eventCallback("onComplete",function(){"gravity"===n&&i.setpuyo(e.otherPositional,e.otherPositional.connections),r()})})},step:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.state!==xt){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,this.gravity();case 4:if(t.t0=t.sent,t.t0){t.next=9;break}return t.next=8,this.clear();case 8:t.t0=t.sent;case 9:e=t.t0,e?this.$emit("update:state",Pt):this.$emit("update:state",xt);case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),play:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this.state!==xt;case 1:if(!e){t.next=16;break}if(this.state!==Tt){t.next=13;break}return t.next=5,this.gravity();case 5:if(t.t0=t.sent,t.t0){t.next=10;break}return t.next=9,this.clear();case 9:t.t0=t.sent;case 10:e=t.t0,t.next=14;break;case 13:return t.abrupt("return");case 14:t.next=1;break;case 16:this.$emit("update:state",xt);case 17:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),reset:function(){for(var t=this.container.puyo.children.length-1;t>=0;t--)this.container.puyo.removeChild(this.container.puyo.children[t]);this.game=Ct.Deserializer.fromBase64(this.base64),this.loadpuyo(),this.$emit("update:state",Pt)},gravity:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,n,i,r,a,o,c,u,l,h,f=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=[],n=this.game.field.gravitate(),0!==n.length){t.next=4;break}return t.abrupt("return",!1);case 4:for(i=!0,r=!1,a=void 0,t.prev=7,o=s()(n);!(i=(c=o.next()).done);i=!0)u=c.value,l=new g["a"]({paused:!0}),this.setpuyo(u.positional),l.to(this.pixifield[u.positional.row][u.positional.column],Et[u.positional.row-u.otherPositional.row]/60,{pixi:{y:(this.game.field.dimension.rows-u.otherPositional.row-1)*Rt},ease:"Linear"}).to(this.pixifield[u.positional.row][u.positional.column],.1,{pixi:{scaleY:.8}}).to(this.pixifield[u.positional.row][u.positional.column],.1,{pixi:{scaleY:1},yoyo:!0}),this.pixifield[u.otherPositional.row][u.otherPositional.column]=this.pixifield[u.positional.row][u.positional.column],this.pixifield[u.positional.row][u.positional.column]=null,e.push([l,u]);t.next=15;break;case 11:t.prev=11,t.t0=t["catch"](7),r=!0,a=t.t0;case 15:t.prev=15,t.prev=16,i||null==o.return||o.return();case 18:if(t.prev=18,!r){t.next=21;break}throw a;case 21:return t.finish(18);case 22:return t.finish(15);case 23:return n.apply(),h=e.map(function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",f.timelinePromise(e[0],e[1],"gravity"));case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),t.next=27,y.a.all(h).then(function(){f.loadpuyo(!1)});case 27:return t.abrupt("return",!0);case 28:case"end":return t.stop()}},t,this,[[7,11,15,23],[16,,18,22]])}));function e(){return t.apply(this,arguments)}return e}(),clear:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,n,i,r,a,o=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=[],n=this.game.field.connections(),i=function(t){return t.reduce(function(t,e){return t.concat(e)},[])},r=i(i(p()(n.values()))),0!==r.length){t.next=6;break}return t.abrupt("return",!1);case 6:return this.game.field.clear().forEach(function(t){var n=new g["a"]({paused:!0});n.to(o.pixifield[t.positional.row][t.positional.column],.1,{pixi:{alpha:.5},repeat:5,yoyo:!0,onComplete:function(){o.container.puyo.removeChild(o.pixifield[t.positional.row][t.positional.column]),o.pixifield[t.positional.row][t.positional.column]=null}}),e.push([n,t]),t.apply()}),a=e.map(function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",o.timelinePromise(e[0],e[1],"clear"));case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}()),t.next=10,y.a.all(a);case 10:return t.abrupt("return",!0);case 11:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),loadbg:function(){var t=j["loader"].resources["pic/bg.json"].textures,e=new j["extras"].TilingSprite(t["bg"],this.app.screen.width,this.app.screen.height);this.container.bg.addChild(e);var n=new j["extras"].TilingSprite(t["bgleft"],48,this.app.screen.height);this.container.bg.addChild(n);var i=new j["extras"].TilingSprite(t["bgtop"],this.app.screen.width,48);this.container.bg.addChild(i);var r=new j["extras"].TilingSprite(t["pole1"],Rt,this.app.screen.height);r.y=this.game.field.dimension.hiddenRows*Rt,this.container.bg.addChild(r);var a=new j["extras"].TilingSprite(t["pole1"],Rt,this.app.screen.height);a.x=this.app.screen.width-Rt,a.y=this.game.field.dimension.hiddenRows*Rt,this.container.bg.addChild(a);var o=new j["Sprite"](t["pole0"]);o.y=this.game.field.dimension.hiddenRows*Rt,this.container.bg.addChild(o);var s=new j["Sprite"](t["pole0"]);s.x=this.app.screen.width-Rt,s.y=this.game.field.dimension.hiddenRows*Rt,this.container.bg.addChild(s);var c=new j["extras"].TilingSprite(t["block"],this.game.field.dimension.columns*Rt,Rt);c.x=Rt,c.y=this.app.screen.height-Rt,this.container.bg.addChild(c)},loadpuyo:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=!0,n=!1,i=void 0;try{for(var r,a=s()(this.game.field);!(e=(r=a.next()).done);e=!0){var o=r.value;t&&o.object!==vt.Object.EMPTY&&(this.pixifield[o.row][o.column]=new j["Sprite"]),this.setpuyo(o,o.connections)}}catch(c){n=!0,i=c}finally{try{e||null==a.return||a.return()}finally{if(n)throw i}}},setpuyo:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=j["loader"].resources["pic/skin.json"].textures,i=this.pixifield[t.row][t.column];if(i){switch(t.object){case vt.Object.RED:i.texture=n["red".concat(e)];break;case vt.Object.GREEN:i.texture=n["green".concat(e)];break;case vt.Object.BLUE:i.texture=n["blue".concat(e)];break;case vt.Object.YELLOW:i.texture=n["yellow".concat(e)];break;case vt.Object.PURPLE:i.texture=n["purple".concat(e)];break;default:break}i.x=(t.column+1)*Rt,i.y=(this.game.field.dimension.rows-t.row-1)*Rt,this.container.puyo.addChild(i)}}},created:function(){var t=this;this.game=Ct.Deserializer.fromBase64(this.base64),this.pixifield=new Array(this.game.field.dimension.rows).fill(null).map(function(){return new Array(t.game.field.dimension.columns).fill(null)}),this.app=new j["Application"]({width:(this.game.field.dimension.columns+2)*Rt,height:(this.game.field.dimension.rows+1)*Rt,antialias:!0,transparent:!1,resolution:1}),this.container.bg=new j["Container"],this.container.puyo=new j["Container"],this.app.stage.addChild(this.container.bg),this.app.stage.addChild(this.container.puyo),j["loader"].add("pic/bg.json").add("pic/skin.json").load(this.loadbg).load(this.loadpuyo)},mounted:function(){document.getElementById("puyostage").appendChild(this.app.view)},destroyed:function(){this.app.destroy()}},_t=At,Mt=n("2877"),Lt=Object(Mt["a"])(_t,d,b,!1,null,null,null),Nt=Lt.exports,zt={components:{PuyoField:Nt},props:{base64:String},data:function(){return{state:Pt}},computed:{playing:function(){return this.state===Tt}},methods:{play:function(){this.state=Tt},stop:function(){this.state=Pt},step:function(){this.state=St},reset:function(){this.state=Bt}}},Dt=zt,Yt=(n("3c88"),Object(Mt["a"])(Dt,h,f,!1,null,"7758b275",null)),Ft=Yt.exports,It={components:{PuyoPlayer:Ft},props:{base64:String},data:function(){return{minConnections:4}},computed:{},methods:{}},Gt=It,Ut=(n("48cb"),Object(Mt["a"])(Gt,u,l,!1,null,"aba63f82",null)),Ht=Ut.exports,$t=n("013f"),Vt=x.a,qt=function(){function t(e){Object(k["a"])(this,t),Wt.set(this,{writable:!0,value:void 0}),Xt.set(this,{writable:!0,value:function(t){return Math.floor(t/2)}}),Object(A["a"])(this,Wt,e)}return Object(O["a"])(t,[{key:Vt,value:regeneratorRuntime.mark(function t(){var e,n,i,r,a,o;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=1,n=.75,i=14,r=[Object(B["a"])(this,Wt)*e,Object(B["a"])(this,Wt)*n],a=0;case 5:if(!(a<=i)){t.next=15;break}return o=a%r.length,t.next=9,r[o];case 9:if(r[o]=Object(B["a"])(this,Xt).call(this,r[o]),!(r[o]<=0)){t.next=12;break}return t.abrupt("return");case 12:++a,t.next=5;break;case 15:case"end":return t.stop()}},t,this)})}]),t}(),Wt=new E.a,Xt=new E.a,Kt=function(){function t(e){var n=e.initialNuisanceRate,i=e.marginTime,r=e.minClearConnection;Object(k["a"])(this,t),this.initialNuisanceRate=n,this.marginTime=i,this.minClearConnection=r}return Object(O["a"])(t,[{key:"nuisanceCount",value:function(t){var e=t.point,n=t.time,i=void 0===n?0:n,r=this.nuisanceRate({time:i});return[Math.floor(e/r),e%r]}},{key:"nuisanceRate",value:function(t){var e=t.time,n=void 0===e?0:e;if(null===this.marginTime)return this.initialNuisanceRate;var i=16;n-=this.marginTime;var r=!0,a=!1,o=void 0;try{for(var c,u=s()(new qt(this.initialNuisanceRate));!(r=(c=u.next()).done);r=!0){var l=c.value;if(n<0)break;n-=i}}catch(h){a=!0,o=h}finally{try{r||null==u.return||u.return()}finally{if(a)throw o}}return l}},{key:"nuisanceRateMultiplier",value:function(t){var e=t.time,n=void 0===e?0:e;return this.initialNuisanceRate/this.nuisanceRate({time:n})}}]),t}();function Jt(t,e,n){return Math.min(Math.max(t,e),n)}var Qt=["initialNuisanceRate","marginTime","minClearConnection","nuisanceTransformPoint","level"],Zt=[8,9,3,8,5],te={initialNuisanceRate:70,marginTime:96,minClearConnection:4,nuisanceTransformPoint:0,level:1},ee=["columns","visibleRows","hiddenRows"],ne={columns:6,visibleRows:12,hiddenRows:1},ie=[5,5,2],re=function(t){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.rule,r=n.dimension,a=void 0===r?ne:r;Object(k["a"])(this,e),t=Object($["a"])(this,Object(V["a"])(e).call(this,{rule:new e.Rule(i),dimension:a}));var o=Object($t["a"])(t);t.field.gravitate=function(){return vt.Algorithm.gravitationalDiff(this)},t.field.connections=function(){return vt.Algorithm.findConnections(this,{targetObjects:["RED","BLUE","GREEN","YELLOW","PURPLE"].map(function(t){return vt.Object[t]}),minConnection:o.rule.minClearConnection})},t.field.clear=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.connections();return vt.Algorithm.clearingDiff(vt.Algorithm.flattenConnectionMap(t))};var s=t.field.clone;return t.field.clone=function(){var t=s.apply(this);return t.gravitate=this.gravitate,t.connections=this.connections,t.clear=this.clear,t},t}return Object(q["a"])(e,t),e}(Ct);Object(C["a"])(re,"GAME_ID",0),Object(C["a"])(re,"Serializer",function(){function t(){Object(k["a"])(this,t)}return Object(O["a"])(t,null,[{key:"toBitStream",value:function(t,e){return Ct.Serializer.headerToBitStream(e,{actualParams:[].concat(Object(F["a"])(Qt.map(function(e){return t.rule[e]})),Object(F["a"])(ee.map(function(e){return t.field.dimension[e]}))),defaultParams:[].concat(Object(F["a"])(Qt.map(function(t){return te[t]})),Object(F["a"])(ee.map(function(t){return ne[t]}))),partitionSizes:[].concat(Zt,ie)}),vt.Serializer.toBitStream(t.field,e),e}}]),t}()),Object(C["a"])(re,"Deserializer",function(){function t(){Object(k["a"])(this,t)}return Object(O["a"])(t,null,[{key:"fromBitStream",value:function(t){var e=Ct.Deserializer.headerFromBitStream(t,{defaultParams:[].concat(Object(F["a"])(Qt.map(function(t){return te[t]})),Object(F["a"])(ee.map(function(t){return ne[t]}))),partitionSizes:[].concat(Zt,ie)}),n=Ct.Deserializer.array2objects({array:e,objectKeys:[Qt,ee]}),i=Object(c["a"])(n,2),r=i[0],a=i[1],o=new re({rule:r,dimension:a});return vt.Deserializer.fromBitStream(o.field,t),o}}]),t}()),Object(C["a"])(re,"Rule",function(t){function e(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te;return Object(k["a"])(this,e),t=Object($["a"])(this,Object(V["a"])(e).call(this,n)),t.nuisanceTransformPoint=n.nuisanceTransformPoint,t.level=n.level,t}return Object(q["a"])(e,t),Object(O["a"])(e,[{key:"chainBonus",value:function(t){return t<4?8*(t-1):32*(t-3)}},{key:"colorBonus",value:function(t){switch(Math.abs(t)){case 0:case 1:return 0;case 2:return 3;default:return 2*this.colorBonus(t-1)}}},{key:"groupBonus",value:function(t){var e=t-Math.min(this.minClearConnection,4);return 0==e?0:e>=7?10:e+1}},{key:"transformPoint",value:function(t){if(t.type!=X.Type.TRANSFORM)return 0;switch(t.positional.object){case vt.Object.RED:case vt.Object.YELLOW:case vt.Object.BLUE:case vt.Object.GREEN:case vt.Object.PURPLE:return 10;case vt.Object.HARD_NUISANCE:if(t.newObject===vt.Object.EMPTY)return 6*this.nuisanceTransformPoint;case vt.Object.NUISANCE:return this.nuisanceTransformPoint}}},{key:"points",value:function(t){var e=this,n=t.chain,i=t.connectionMap,r=t.transformDiffs,a=p()(i.values()).reduce(function(t,e){return t+Math.min(1,e.length)},0),o=p()(i.values()).reduce(function(t,e){return t.concat(e.map(function(t){return t.length}))},[]);return[this.level*r.reduce(function(t,n){return t+e.transformPoint(n)},0),Jt(this.colorBonus(a)+this.chainBonus(n)+o.reduce(function(t,n){return t+e.groupBonus(n)},0),1,999)]}}]),e}(Kt)),Ct.Modes[re.GAME_ID]=re;var ae={components:{PuyoEditor:Ht},data:function(){var t=new re;t.rule.marginTime=null;var e=t.field,n=["RED","YELLOW","BLUE","GREEN","PURPLE","EMPTY"],i=[0,3,3,1,1,3,5,5,5,5,5,5,5,0,3,0,1,0,1,5,5,5,5,5,5,5,2,0,2,0,0,3,0,5,5,5,5,5,5,3,2,1,2,3,1,3,5,5,5,5,5,5,3,2,3,1,2,1,3,5,5,5,5,5,5,1,3,1,2,2,1,5,1,5,5,5,5,5],r=0,a=!0,o=!1,u=void 0;try{for(var l,h=s()(e);!(a=(l=h.next()).done);a=!0){var f=l.value;f.object=vt.Object[n[i[r]]],r++}}catch(C){o=!0,u=C}finally{try{a||null==h.return||h.return()}finally{if(o)throw u}}for(var d=Ct.Serializer.toBitStream(t).finalize(),b=Ct.Deserializer.fromBitStream(new yt(d)),v=e.clone(),p=0,m=1;void 0===y||y.length>0;++m){e.gravitate().apply();var w=e.connections(),y=e.clear(w),j=t.rule.points({chain:m,connectionMap:w,transformDiffs:y}),g=Object(c["a"])(j,2),O=g[0],k=g[1];p+=O*k,y.apply()}return{field:vt.Serializer.toAsciiArt(v),base64:d,decoded:vt.Serializer.toAsciiArt(b.field),final:vt.Serializer.toAsciiArt(e),points:p,multiplier:t.rule.nuisanceRateMultiplier({time:500}),noMarginTime:null===b.rule.marginTime}}},oe=ae,se=(n("9da9"),Object(Mt["a"])(oe,r,a,!1,null,null,null)),ce=se.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(ce)}}).$mount("#simulator")},"9da9":function(t,e,n){"use strict";var i=n("a12a"),r=n.n(i);r.a},a12a:function(t,e,n){},d344:function(t,e,n){},d84d:function(t,e,n){}});
//# sourceMappingURL=app.4bf96a79.js.map