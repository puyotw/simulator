(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-common"],{"0332":function(e,t,i){},"0e19":function(e,t,i){"use strict";i.d(t,"a",function(){return v});var n=i("1b81"),r=i.n(n),a=i("15b8"),o=i.n(a),c=i("768b"),s=i("d225"),u=i("b0b4"),l=i("a52d"),d=i("ab0e"),h=8,f=i("8707").Buffer,b=i("2362")("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~"),v=function(){function e(){Object(s["a"])(this,e),p.set(this,{writable:!0,value:0}),m.set(this,{writable:!0,value:0}),w.set(this,{writable:!0,value:[]}),y.set(this,{writable:!0,value:function(){0!==Object(d["a"])(this,m)&&(Object(d["a"])(this,w).push(Object(d["a"])(this,p)<<h-Object(d["a"])(this,m)),Object(l["a"])(this,p,Object(l["a"])(this,m,0)))}})}return Object(u["a"])(e,[{key:"write",value:function(e){var t=e.value,i=e.writeBitCount;i<=0||(Object(l["a"])(this,p,Object(d["a"])(this,p)<<1|t>>i-1&1),Object(l["a"])(this,m,+Object(d["a"])(this,m)+1)%h===0&&Object(d["a"])(this,y).call(this),this.write({value:t,writeBitCount:i-1}))}},{key:"writeVariableLength",value:function(e){var t=e.value,i=e.writeBitCount,n=e.partitionBitCount,r=this,a=function e(t,i){if(i<=n)return[t>>>n,function(){r.write({value:0,writeBitCount:1}),r.write({value:t,writeBitCount:n})}];var a=e(t,i-n),o=Object(c["a"])(a,2),s=o[0],u=o[1];return[s>>>n,function(){0!==s&&(r.write({value:1,writeBitCount:1}),r.write({value:s,writeBitCount:n})),u()}]},o=a(t,i),s=Object(c["a"])(o,2),u=s[1];u()}},{key:"finalize",value:function(){return Object(d["a"])(this,y).call(this),o()(this),b.encode(f.from(Object(d["a"])(this,w)))}}]),e}(),p=new r.a,m=new r.a,w=new r.a,y=new r.a},1101:function(e,t,i){"use strict";i.d(t,"a",function(){return f});var n=i("1b81"),r=i.n(n),a=i("774e1"),o=i.n(a),c=i("d225"),s=i("b0b4"),u=i("ab0e"),l=i("a52d"),d=8,h=i("2362")("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~"),f=function(){function e(t){Object(c["a"])(this,e),b.set(this,{writable:!0,value:0}),v.set(this,{writable:!0,value:0}),p.set(this,{writable:!0,value:void 0}),Object(l["a"])(this,p,o()(h.decode(t)))}return Object(s["a"])(e,[{key:"read",value:function(e){if(e<=0)return 0;if(0===Object(u["a"])(this,v)){if(0===Object(u["a"])(this,p).length)return;Object(l["a"])(this,b,Object(u["a"])(this,p).shift()),Object(l["a"])(this,v,d)}var t=(Object(u["a"])(this,b)>>Object(l["a"])(this,v,+Object(u["a"])(this,v)-1)&1)<<e-1;return t|this.read(e-1)}},{key:"readVariableLength",value:function(e){var t=0;do{var i=this.read(1);t<<=e,t|=this.read(e)}while(1===i);return t}}]),e}(),b=new r.a,v=new r.a,p=new r.a},"3fb0":function(e,t,i){},"52f7":function(e,t,i){"use strict";var n=i("1b81"),r=i.n(n),a=i("5d58"),o=i.n(a),c=(i("96cf"),i("db0c")),s=i.n(c),u=(i("6762"),i("2fdb"),i("d225")),l=i("b0b4"),d=i("bd86"),h=i("ab0e"),f=i("a52d"),b=i("15b8"),v=i.n(b),p=i("85f2"),m=i.n(p),w={},y=w;m()(w,"Properties",{value:function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=i.cleared,r=void 0===n?function(e){return t}:n,a=i.adjacentCleared,o=void 0===a?function(e){return t}:a,c=i.gravityImmune,s=void 0!==c&&c,l=i.symbol,d=void 0===l?"?":l;Object(u["a"])(this,e),this.cleared=r,this.adjacentCleared=o,this.gravityImmune=s,this.symbol=d,v()(this)}}),m()(w,"EMPTY",{value:new w.Properties({gravityImmune:!0,symbol:" "}),enumerable:!0});var j=i("5d73"),g=i.n(j),O=i("9a04"),k=i("774e1"),E=i.n(k),C=i("75fc"),P=i("b6d0"),x=i.n(P),R=(i("ac6a"),i("2d7d")),T=i.n(R),S=i("e36d"),B=function(){function e(){Object(u["a"])(this,e)}return Object(l["a"])(e,null,[{key:"findConnections",value:function(e,t){var i=t.targetObjects,n=t.minConnection,r=void 0===n?1:n,a=t.onlyVisible,o=void 0===a||a,c=new T.a(i.map(function(e){return[e,[]]}));return new x.a(Object(C["a"])(Array(e.dimension.rows*e.dimension.columns).keys())).forEach(function(t,i,n){var a=new e.Positional({primitive:t}),s=a.object;if(o&&a.hidden||!c.has(s))n.delete(a.primitive);else{var u=[];(function e(t){n.has(t.primitive)&&s===t.object&&(n.delete(t.primitive),o&&t.hidden||(u.push(t),t.adjacent.forEach(e)))})(a),u.length>=r&&c.get(s).push(u)}}),c}},{key:"flattenConnectionMap",value:function(e){var t=function(e){return e.reduce(function(e,t){return e.concat(t)},[])};return t(t(E()(e.values())))}},{key:"clearingDiff",value:function(e){var t=new T.a,i=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t.cleared(e)};if(e.valid){var n=t.has(e.primitive)?t.get(e.primitive).newObject:e.object,r=i(n);n!==r&&t.set(e.primitive,new S["a"]({type:S["a"].Type.TRANSFORM,positional:e,argument:r}))}},n=!0,r=!1,a=void 0;try{for(var o,c=g()(e);!(n=(o=c.next()).done);n=!0){var s=o.value;i(s);var u=!0,l=!1,d=void 0;try{for(var h,f=function(){var e=h.value;i(e,function(t){return t.adjacentCleared(e)})},b=g()(s.adjacent);!(u=(h=b.next()).done);u=!0)f()}catch(v){l=!0,d=v}finally{try{u||null==b.return||b.return()}finally{if(l)throw d}}}}catch(v){r=!0,a=v}finally{try{n||null==c.return||c.return()}finally{if(r)throw a}}return Object(O["a"])(S["a"].Collection,Object(C["a"])(t.values()))}},{key:"diff",value:function(e,t){var i=[e.dimension,t.dimension],n=i[0],r=i[1];if(n.columns===r.columns&&n.visibleRows===r.visibleRows&&n.hiddenRows===r.hiddenRows){for(var a=new S["a"].Collection,o=new e.Positional,c=new t.Positional;o.valid;s=[o.right.bottom,c.right.bottom],o=s[0],c=s[1],s)for(var s;o.valid;u=[o.above,c.above],o=u[0],c=u[1],u){var u;o.object!==c.object&&a.push(new S["a"]({type:S["a"].Type.TRANSFORM,positional:o,argument:c.object}))}return a}}},{key:"gravitationalDiff",value:function(e){for(var t=new S["a"].Collection,i=new T.a,n=new e.Positional,r=new e.Positional;n.valid;a=[n.right.bottom,r.right.bottom],n=a[0],r=a[1],a)for(var a;n.valid;n=n.above){var o=i.get(n.primitive)||n.object,c=i.get(r.primitive)||r.object;o!==y.EMPTY&&(o.gravityImmune?r.row=n.row:o!==c&&(t.push(new S["a"]({type:S["a"].Type.EXCHANGE,positional:n,argument:r})),i.set(n.primitive,c),i.set(r.primitive,o)),r=r.above)}return t}}]),e}(),A=(i("14b9"),i("0e19")),M=i("2d1f"),L=i.n(M),N=i("768b"),_=i("fa35"),F=function(){function e(t){var i=t.entry;i=void 0===i?[]:i;var n=Object(N["a"])(i,2),r=n[0],a=n[1],o=t.branches;o=void 0===o?[]:o;var c=Object(N["a"])(o,2),s=c[0],l=c[1];Object(u["a"])(this,e),s&&l?(this.symbol=s.symbol+l.symbol,this.frequency=s.frequency+l.frequency,this.left=s,this.right=l):(this.symbol=r,this.frequency=a,this.left=null,this.right=null),v()(this)}return Object(l["a"])(e,null,[{key:"comparator",value:function(e,t){return e.frequency<t.frequency?-1:e.frequency>t.frequency?1:e.symbol<t.symbol?-1:e.symbol>t.symbol?1:0}}]),Object(l["a"])(e,[{key:"isLeaf",value:function(){return null===this.left&&null===this.right}},{key:"to",value:function(t){this.isLeaf()?(t.write({value:e.LEAF,writeBitCount:1}),t.write({value:this.symbol.charCodeAt(0),writeBitCount:8})):(t.write({value:e.BRANCH,writeBitCount:1}),this.left.to(t),this.right.to(t))}}],[{key:"from",value:function(e){return e.read(1)===this.BRANCH?new this({branches:[this.from(e),this.from(e)]}):new this({entry:[String.fromCharCode(e.read(8)),0]})}}]),e}();Object(d["a"])(F,"BRANCH",0),Object(d["a"])(F,"LEAF",1);var I=function(){function e(t){Object(u["a"])(this,e),D.set(this,{writable:!0,value:void 0});var i=new _["a"](L()(t).map(function(e){return new F({entry:e})}),F.comparator);while(i.length>1)i.push(new F({branches:[i.pop(),i.pop()]}));Object(f["a"])(this,D,i.pop())}return Object(l["a"])(e,[{key:"to",value:function(e){Object(h["a"])(this,D).to(e)}}],[{key:"from",value:function(e){var t=new this({});return Object(f["a"])(t,D,F.from(e)),t}}]),Object(l["a"])(e,[{key:"symbolFromStream",value:function(t){for(var i=Object(h["a"])(this,D);!i.isLeaf();i=t.read(1)===e.LEFT?i.left:i.right);return i.symbol}},{key:"encoding",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Object(h["a"])(this,D),n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if(i.isLeaf())t[i.symbol]=n;else{var r=function(e){return function(t){n(t),t.write({value:e,writeBitCount:1})}};this.encoding(t,i.left,r(e.LEFT)),this.encoding(t,i.right,r(e.RIGHT))}return t}}]),e}(),D=new r.a;Object(d["a"])(I,"LEFT",0),Object(d["a"])(I,"RIGHT",1);var Y=function(e){var t={toAsciiArt:function(e){for(var t=["++"+"=".repeat(2*e.dimension.columns+1)+"++"],i=new e.Positional;i.valid;i=i.farLeft.above){for(var n=" ",r=i.hidden?"  ":"||";i.valid;i=i.right)n+=i.object.symbol+" ";t.unshift(r+n+r)}return t.join("\n")},toBitStream:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new A["a"],i={},n=new e.Positional;n.valid;n=n.bottom.right)for(;n.valid;n=n.above){var r=n.object.symbol;i[r]=i[r]?i[r]+1:1}var a=new I(i);a.to(t);var o=a.encoding(),c=!0,s=!1,u=void 0;try{for(var l,d=g()(e);!(c=(l=d.next()).done);c=!0){var h=l.value;o[h.object.symbol](t)}}catch(f){s=!0,u=f}finally{try{c||null==d.return||d.return()}finally{if(s)throw u}}return t}};return t},z=i("01c8"),U=(i("28a5"),function(e){var t={},i=function(){return s()(e.Object).reduce(function(e,t){return e[t.symbol]=t,e},{})};return t.fromAsciiArt=function(t){var n=i(),r=t.split("\n"),a=new e({columns:Math.ceil(r.pop().slice(3,-3).length/2),hiddenRows:function(e){var t=!0,i=!1,n=void 0;try{for(var a,o=g()(r);!(t=(a=o.next()).done);t=!0){var c=a.value;if(" "!=c[0])break;++e}}catch(s){i=!0,n=s}finally{try{t||null==o.return||o.return()}finally{if(i)throw n}}return e}(0),visibleRows:r.length-this.hiddenRows}),o=(new a.Positional).top,c=!0,s=!1,u=void 0;try{for(var l,d=g()(r);!(c=(l=d.next()).done);c=!0){for(var h=l.value,f=h.slice(3,-3),b=Object(z["a"])(f),v=b[0],p=(b[1],b.slice(2));p.length>0;m=p,w=Object(z["a"])(m),v=w[0],w[1],p=w.slice(2),m){var m,w;o.object=n[v],o=o.right}o=o.farLeft.below}}catch(y){s=!0,u=y}finally{try{c||null==d.return||d.return()}finally{if(s)throw u}}return a},t.fromBitStream=function(e,t){var n=I.from(t),r=i(),a=!0,o=!1,c=void 0;try{for(var s,u=g()(e);!(a=(s=u.next()).done);a=!0){var l=s.value;l.object=r[n.symbolFromStream(t)]}}catch(d){o=!0,c=d}finally{try{a||null==u.return||u.return()}finally{if(o)throw c}}return e},t});i.d(t,"a",function(){return V});var G={BELOW:1,ABOVE:2,RIGHT:4,LEFT:8},H=o.a,V=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.columns,n=void 0===i?6:i,r=t.visibleRows,a=void 0===r?12:r,o=t.hiddenRows,c=void 0===o?1:o;Object(u["a"])(this,e),$.set(this,{writable:!0,value:void 0}),this.dimension={columns:n>=0?n:6,visibleRows:a>=0?a:12,hiddenRows:c>=0?c:1,get rows(){return this.visibleRows+this.hiddenRows}},Object(f["a"])(this,$,[]);var d=this;this.Positional=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=e.row,n=void 0===i?0:i,r=e.column,a=void 0===r?0:r,o=e.primitive;if(Object(u["a"])(this,t),void 0!==o)this.row=o%d.dimension.rows,this.column=Math.floor(o/d.dimension.rows);else{var c=[n,a];this.row=c[0],this.column=c[1]}}return Object(l["a"])(t,[{key:"primitive",get:function(){return this.column*d.dimension.rows+this.row}},{key:"above",get:function(){return new this.constructor({row:this.row+1,column:this.column})}},{key:"below",get:function(){return new this.constructor({row:this.row-1,column:this.column})}},{key:"left",get:function(){return new this.constructor({row:this.row,column:this.column-1})}},{key:"right",get:function(){return new this.constructor({row:this.row,column:this.column+1})}},{key:"adjacent",get:function(){return[this.above,this.below,this.left,this.right]}},{key:"top",get:function(){return new this.constructor({row:d.dimension.rows-1,column:this.column})}},{key:"farRight",get:function(){return new this.constructor({row:this.row,column:d.dimension.columns-1})}},{key:"bottom",get:function(){return new this.constructor({row:0,column:this.column})}},{key:"farLeft",get:function(){return new this.constructor({row:this.row,column:0})}},{key:"hidden",get:function(){return d.dimension.visibleRows<=this.row&&this.row<d.dimension.rows}},{key:"valid",get:function(){return 0<=this.row&&this.row<d.dimension.rows&&0<=this.column&&this.column<d.dimension.columns}},{key:"field",get:function(){return d}},{key:"connections",get:function(){return!this.object||this.hidden?0:0|(this.below.hidden||this.below.object!=this.object?0:G.BELOW)|(this.above.hidden||this.above.object!=this.object?0:G.ABOVE)|(this.right.hidden||this.right.object!=this.object?0:G.RIGHT)|(this.left.hidden||this.left.object!=this.object?0:G.LEFT)}},{key:"object",get:function(){if(this.valid){var t=[this.row,this.column],i=t[0],n=t[1];return Object(h["a"])(d,$)[n]&&Object(h["a"])(d,$)[n][i]?Object(h["a"])(d,$)[n][i]:e.Object.EMPTY}},set:function(t){if(this.valid&&s()(e.Object).includes(t)){var i=[this.row,this.column],n=i[0],r=i[1];if(t===e.Object.EMPTY){if(!Object(h["a"])(d,$)[r])return;delete Object(h["a"])(d,$)[r][n]}else Object(h["a"])(d,$)[r]||(Object(h["a"])(d,$)[r]=[]),Object(h["a"])(d,$)[r][n]=t}}}]),t}()}return Object(l["a"])(e,[{key:H,value:regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=new this.Positional;case 1:if(!t.valid){e.next=11;break}case 2:if(!t.valid){e.next=8;break}return e.next=5,t;case 5:t=t.above,e.next=2;break;case 8:t=t.right.bottom,e.next=1;break;case 11:case"end":return e.stop()}},e,this)})},{key:"clone",value:function(){var e=new this.constructor(this.dimension);return Object(f["a"])(e,$,Object(h["a"])(this,$).map(function(e){return void 0!==e?e.slice():void 0})),e}},{key:"erase",value:function(){Object(f["a"])(this,$,[])}}]),e}(),$=new r.a;Object(d["a"])(V,"Object",y),Object(d["a"])(V,"Algorithm",B),Object(d["a"])(V,"Serializer",Y(V)),Object(d["a"])(V,"Deserializer",U(V))},"555f":function(e,t,i){},"5c0e":function(e,t,i){"use strict";i.d(t,"a",function(){return f});var n=i("5d73"),r=i.n(n),a=i("b0b4"),o=i("d225"),c=i("bd86"),s=i("52f7"),u=i("0e19"),l=i("1101"),d=void 0;s["a"].Object.RED=new s["a"].Object.Properties({symbol:"R",cleared:function(e){return e.hidden?d:s["a"].Object.EMPTY}}),s["a"].Object.YELLOW=new s["a"].Object.Properties({symbol:"Y",cleared:function(e){return e.hidden?d:s["a"].Object.EMPTY}}),s["a"].Object.BLUE=new s["a"].Object.Properties({symbol:"B",cleared:function(e){return e.hidden?d:s["a"].Object.EMPTY}}),s["a"].Object.GREEN=new s["a"].Object.Properties({symbol:"G",cleared:function(e){return e.hidden?d:s["a"].Object.EMPTY}}),s["a"].Object.PURPLE=new s["a"].Object.Properties({symbol:"P",cleared:function(e){return e.hidden?d:s["a"].Object.EMPTY}}),s["a"].Object.BLOCK=new s["a"].Object.Properties({symbol:"=",gravityImmune:!0}),s["a"].Object.IRON=new s["a"].Object.Properties({symbol:"-"}),s["a"].Object.NUISANCE=new s["a"].Object.Properties({symbol:"o",adjacentCleared:function(){return s["a"].Object.EMPTY}}),s["a"].Object.HARD_NUISANCE=new s["a"].Object.Properties({symbol:"O",adjacentCleared:function(){return s["a"].Object.NUISANCE}});var h=32,f=function e(t){var i=t.rule,n=t.dimension;Object(o["a"])(this,e),this.rule=i,this.field=new s["a"](n)};Object(c["a"])(f,"Modes",[]),Object(c["a"])(f,"Serializer",function(){function e(){Object(o["a"])(this,e)}return Object(a["a"])(e,null,[{key:"headerToBitStream",value:function(e,t){for(var i=t.actualParams,n=t.defaultParams,r=t.partitionSizes,a=0;a<n.length;++a)i[a]===n[a]?e.write({value:0,writeBitCount:1}):(e.write({value:1,writeBitCount:1}),null===i[a]?e.write({value:0,writeBitCount:1}):(e.write({value:1,writeBitCount:1}),e.writeVariableLength({value:i[a],writeBitCount:h,partitionBitCount:r[a]})))}},{key:"toBitStream",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new u["a"];return t.writeVariableLength({value:f.Modes.indexOf(e.constructor),writeBitCount:h,partitionBitCount:4}),e.constructor.Serializer.toBitStream(e,t)}},{key:"encode",value:function(e){return f.Serializer.toBitStream(e).finalize()}}]),e}()),Object(c["a"])(f,"Deserializer",function(){function e(){Object(o["a"])(this,e)}return Object(a["a"])(e,null,[{key:"array2objects",value:function(e){var t=e.array,i=e.objectKeys,n=[],a=!0,o=!1,c=void 0;try{for(var s,u=r()(i);!(a=(s=u.next()).done);a=!0){var l=s.value;n.push(l.reduce(function(e,i){return e[i]=t.shift(),e},{}))}}catch(d){o=!0,c=d}finally{try{a||null==u.return||u.return()}finally{if(o)throw c}}return n}},{key:"headerFromBitStream",value:function(e,t){for(var i=t.defaultParams,n=t.partitionSizes,r=0;r<i.length;++r)0!==e.read(1)&&(i[r]=0===e.read(1)?null:e.readVariableLength(n[r]));return i}},{key:"fromBitStream",value:function(e){return f.Modes[e.readVariableLength(4)].Deserializer.fromBitStream(e)}},{key:"fromEncoded",value:function(e){return f.Deserializer.fromBitStream(new l["a"](e))}}]),e}())},6670:function(e,t,i){"use strict";var n=i("3fb0"),r=i.n(n);r.a},8195:function(e,t,i){"use strict";var n=i("555f"),r=i.n(n);r.a},"973e":function(e,t,i){"use strict";var n=i("0332"),r=i.n(n);r.a},"9bdd":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"editor"},[i("PuyoPlayer",{attrs:{encoded:e.passEncoded,editMode:!0,color:e.color},on:{"update:encoded":function(t){e.passEncoded=t}}}),i("div",{staticClass:"editor__control"},[i("ul",{staticClass:"editor__color"},[e._l(e.colorList,function(t){return i("li",{key:t,class:[{"editor__color--active":e.color===t},"editor__color--"+t],on:{click:function(i){e.color=t}}})}),i("li",{staticClass:"editor__color--CLEARALL",on:{click:e.clearAll}})],2),i("div",{staticClass:"editor__code"},[i("input",{staticClass:"editor__encoded",attrs:{id:"inputEncoded",type:"text",name:"encoded"},domProps:{value:e.passEncoded}}),i("button",{staticClass:"editor__button",on:{click:e.genCode}},[i("i",{staticClass:"fas fa-code"})]),i("button",{staticClass:"editor__button",on:{click:e.copyEncoded}},[i("i",{staticClass:"fas fa-copy"})])])])],1)},r=[],a=i("a4bb"),o=i.n(a),c=(i("ac6a"),i("9d65")),s=i("52f7"),u={components:{PuyoPlayer:c["a"]},props:{encoded:{type:String,default:""}},data:function(){return{minConnections:4,fieldWidth:6,fieldHeight:12,fieldHidden:1,passEncoded:this.encoded,color:"EMPTY"}},computed:{},methods:{clearAll:function(){this.$children[0].$children[0].clearAll()},genCode:function(){this.$children[0].$children[0].encodeGame()},copyEncoded:function(){document.getElementById("inputEncoded").select(),document.execCommand("copy")}},created:function(){var e=this;this.colorList=[],o()(s["a"].Object).forEach(function(t){e.colorList.push(t)})}},l=u,d=(i("6670"),i("2877")),h=Object(d["a"])(l,n,r,!1,null,"0f84bc3c",null);t["a"]=h.exports},"9d65":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"player"},[i("PuyoField",{attrs:{encoded:e.passEncoded,state:e.state,editMode:e.editMode,color:e.color},on:{"update:encoded":function(t){e.passEncoded=t},"update:state":function(t){e.state=t}}}),i("ul",{staticClass:"player__control"},[e.playing?e._e():i("li",{on:{click:function(t){return t.stopPropagation(),e.play(t)}}},[i("i",{staticClass:"fas fa-play"})]),e.playing?i("li",{on:{click:function(t){return t.stopPropagation(),e.stop(t)}}},[i("i",{staticClass:"fas fa-pause"})]):e._e(),i("li",{on:{click:function(t){return t.stopPropagation(),e.step(t)}}},[i("i",{staticClass:"fas fa-step-forward"})]),i("li",{on:{click:function(t){return t.stopPropagation(),e.reset(t)}}},[i("i",{staticClass:"fas fa-fast-backward"})]),e.editMode?e._e():i("li",{on:{click:function(t){return t.stopPropagation(),e.openEditPage(t)}}},[i("i",{staticClass:"fas fa-edit"})])])],1)},r=[],a=(i("ac6a"),i("5d73")),o=i.n(a),c=(i("386d"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"puyostage"}})}),s=[],u=i("85f2"),l=i.n(u),d=(i("6c7b"),i("5df3"),i("96cf"),i("3b8d")),h=i("795b"),f=i.n(h),b=i("912c"),v=i("109c"),p=i("876d"),m=i("9e5b"),w=i("5c0e"),y=i("52f7"),j=32,g=[19,24,28,31,34,37,40,42,44,46,48],O="STATE_IDLE",k="STATE_END",E="STATE_PLAY",C="STATE_STEP",P="STATE_RESET",x={name:"PuyoField",data:function(){return{app:null,game:null,chain:0}},props:{encoded:String,state:String,editMode:Boolean,color:String},watch:{state:function(e,t){switch(e){case E:t===O?(this.savedField||(this.savedField=this.game.field.clone(),this.editMode&&(this.container.editor.interactive=!1,this.container.editor.renderable=!1)),this.play()):this.$emit("update:state",O);break;case C:t===O?(this.savedField||(this.savedField=this.game.field.clone(),this.editMode&&(this.container.editor.interactive=!1,this.container.editor.renderable=!1)),this.step()):this.$emit("update:state",O);break;case P:t!==O&&t!==k||!this.savedField?this.$emit("update:state",O):this.reset();break;case O:case k:default:break}},color:function(e){var t=b["loader"].resources["pic/skin.json"].textures;switch(e){case"RED":this.editor.color.texture=t["red0"];break;case"GREEN":this.editor.color.texture=t["green0"];break;case"BLUE":this.editor.color.texture=t["blue0"];break;case"YELLOW":this.editor.color.texture=t["yellow0"];break;case"PURPLE":this.editor.color.texture=t["purple0"];break;case"BLOCK":this.editor.color.texture=t["blocks"];break;case"NUISANCE":this.editor.color.texture=t["nuisance"];break;case"HARD_NUISANCE":this.editor.color.texture=t["hard-nuisance"];break;case"IRON":this.editor.color.texture=t["iron"];break;case"EMPTY":default:this.editor.color.texture=null;break}},encode:function(){this.encodeGame()}},computed:{editorColor:function(){return y["a"].Object[this.color]}},methods:{encodeGame:function(){var e=w["a"].Serializer.encode(this.game);this.$emit("update:encoded",e)},timelinePromise:function(e,t,i){var n=this;return new f.a(function(r){e.play(),e.eventCallback("onComplete",function(){"gravity"===i&&n.setPuyo(t.otherPositional,t.otherPositional.connections),r()})})},step:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.state!==k){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,this.gravity();case 4:if(e.t0=e.sent,e.t0){e.next=9;break}return e.next=8,this.clear();case 8:e.t0=e.sent;case 9:t=e.t0,t?this.$emit("update:state",O):this.$emit("update:state",k);case 11:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),play:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this.state!==k;case 1:if(!t){e.next=16;break}if(this.state!==E){e.next=13;break}return e.next=5,this.gravity();case 5:if(e.t0=e.sent,e.t0){e.next=10;break}return e.next=9,this.clear();case 9:e.t0=e.sent;case 10:t=e.t0,e.next=14;break;case 13:return e.abrupt("return");case 14:e.next=1;break;case 16:this.$emit("update:state",k);case 17:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),clearAll:function(){for(var e=this.container.puyo.children.length-1;e>=0;e--)this.container.puyo.removeChild(this.container.puyo.children[e])},reset:function(){this.clearAll(),this.game.field=this.savedField,this.savedField=null,this.editMode&&(this.container.editor.interactive=!0,this.container.editor.renderable=!0),this.loadPuyo(),this.$emit("update:state",O),this.chain=0},gravity:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t,i,n,r,a,c,s,u,l,h,b=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=[],i=this.game.field.gravitate(),0!==i.length){e.next=4;break}return e.abrupt("return",!1);case 4:for(n=!0,r=!1,a=void 0,e.prev=7,c=o()(i);!(n=(s=c.next()).done);n=!0)u=s.value,l=new v["a"]({paused:!0}),this.setPuyo(u.positional),l.to(this.pixifield[u.positional.row][u.positional.column],g[u.positional.row-u.otherPositional.row]/60,{pixi:{y:(this.game.field.dimension.rows-u.otherPositional.row-1)*j},ease:"Linear"}).to(this.pixifield[u.positional.row][u.positional.column],.1,{pixi:{scaleY:.8}}).to(this.pixifield[u.positional.row][u.positional.column],.1,{pixi:{scaleY:1},yoyo:!0}),this.pixifield[u.otherPositional.row][u.otherPositional.column]=this.pixifield[u.positional.row][u.positional.column],this.pixifield[u.positional.row][u.positional.column]=null,t.push([l,u]);e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](7),r=!0,a=e.t0;case 15:e.prev=15,e.prev=16,n||null==c.return||c.return();case 18:if(e.prev=18,!r){e.next=21;break}throw a;case 21:return e.finish(18);case 22:return e.finish(15);case 23:return i.apply(),h=t.map(function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",b.timelinePromise(t[0],t[1],"gravity"));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),e.next=27,f.a.all(h).then(function(){b.loadPuyo(!1)});case 27:return e.abrupt("return",!0);case 28:case"end":return e.stop()}},e,this,[[7,11,15,23],[16,,18,22]])}));function t(){return e.apply(this,arguments)}return t}(),clear:function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(){var t,i,n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=[],i=y["a"].Algorithm.flattenConnectionMap(this.game.field.connections()),0!==i.length){e.next=4;break}return e.abrupt("return",!1);case 4:return this.game.field.clear(i).forEach(function(e){var i=new v["a"]({paused:!0});i.to(r.pixifield[e.positional.row][e.positional.column],.1,{pixi:{alpha:.5},repeat:5,yoyo:!0,onComplete:function(){var t=new r.game.field.Positional({row:e.positional.row,column:e.positional.column});t.object=e.newObject,r.setPuyo(t,t.connections),r.chain+=1}}),t.push([i,e]),e.apply()}),n=t.map(function(){var e=Object(d["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",r.timelinePromise(t[0],t[1],"clear"));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()),e.next=8,f.a.all(n);case 8:return e.abrupt("return",!0);case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),loadBg:function(){var e=b["loader"].resources["pic/bg.json"].textures,t=new b["extras"].TilingSprite(e["bg"],this.app.screen.width,this.app.screen.height);this.container.bg.addChild(t);var i=new b["extras"].TilingSprite(e["bgdark"],1.5*j,this.app.screen.height);this.container.bg.addChild(i);var n=new b["extras"].TilingSprite(e["bgdark"],this.app.screen.width,1.5*j);this.container.bg.addChild(n);var r=new b["extras"].TilingSprite(e["pole1"],j,this.app.screen.height);r.y=this.game.field.dimension.hiddenRows*j,this.container.bg.addChild(r);var a=new b["extras"].TilingSprite(e["pole1"],j,this.app.screen.height);a.x=this.app.screen.width-j,a.y=this.game.field.dimension.hiddenRows*j,this.container.bg.addChild(a);var o=new b["Sprite"](e["pole0"]);o.y=this.game.field.dimension.hiddenRows*j,this.container.bg.addChild(o);var c=new b["Sprite"](e["pole0"]);c.x=this.app.screen.width-j,c.y=this.game.field.dimension.hiddenRows*j,this.container.bg.addChild(c);var s=new b["extras"].TilingSprite(e["block"],this.game.field.dimension.columns*j,j);s.x=j,s.y=this.app.screen.height-j,this.container.bg.addChild(s)},loadPuyo:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=!0,i=!1,n=void 0;try{for(var r,a=o()(this.game.field);!(t=(r=a.next()).done);t=!0){var c=r.value;e&&c.object!==y["a"].Object.EMPTY&&(this.pixifield[c.row][c.column]=new b["Sprite"]),this.setPuyo(c,c.connections)}}catch(s){i=!0,n=s}finally{try{t||null==a.return||a.return()}finally{if(i)throw n}}},loadEditor:function(){var e=this,t=b["loader"].resources["pic/bg.json"].textures;this.editor.cursor=new b["Sprite"](t["select"]),this.editor.color=new b["Sprite"],this.container.editor.addChild(this.editor.color),this.container.editor.addChild(this.editor.cursor),this.container.editor.interactive=!0,this.container.editor.renderable=!1,this.container.editor.hitArea=new b["Rectangle"](j,0,this.game.field.dimension.columns*j,this.game.field.dimension.rows*j),this.container.editor.on("mousemove",function(t){var i=t.data.global.x,n=t.data.global.y;e.editor.cursor.x=Math.floor(i/j)*j,e.editor.cursor.y=Math.floor(n/j)*j,e.editor.color.x=Math.floor(i/j)*j,e.editor.color.y=Math.floor(n/j)*j,e.container.editor.renderable=!0}),this.container.editor.on("mouseout",function(t){e.container.editor.renderable=!1}),this.container.editor.on("click",function(t){e.savedField=null;var i=new e.game.field.Positional({row:e.game.field.dimension.rows-(Math.floor(t.data.global.y/j)+1),column:Math.floor(t.data.global.x/j)-1});i.object=e.editorColor,e.pixifield[i.row][i.column]||(e.pixifield[i.row][i.column]=new b["Sprite"]),e.setPuyo(i,i.connections),e.setPuyo(i.left,i.left.connections),e.setPuyo(i.right,i.right.connections),e.setPuyo(i.above,i.above.connections),e.setPuyo(i.below,i.below.connections)})},setPuyo:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=b["loader"].resources["pic/skin.json"].textures;if(e.valid){var n=this.pixifield[e.row][e.column];if(n){switch(e.object){case y["a"].Object.RED:n.texture=i["red".concat(t)];break;case y["a"].Object.GREEN:n.texture=i["green".concat(t)];break;case y["a"].Object.BLUE:n.texture=i["blue".concat(t)];break;case y["a"].Object.YELLOW:n.texture=i["yellow".concat(t)];break;case y["a"].Object.PURPLE:n.texture=i["purple".concat(t)];break;case y["a"].Object.BLOCK:n.texture=i["blocks"];break;case y["a"].Object.NUISANCE:n.texture=i["nuisance"];break;case y["a"].Object.HARD_NUISANCE:n.texture=i["hard-nuisance"];break;case y["a"].Object.IRON:n.texture=i["iron"];break;case y["a"].Object.EMPTY:default:n.texture=null;break}e.object===y["a"].Object.EMPTY?(this.container.puyo.removeChild(n),this.pixifield[e.row][e.column]=null):(n.x=(e.column+1)*j,n.y=(this.game.field.dimension.rows-e.row-1)*j,this.container.puyo.addChild(n))}}}},created:function(){var e=this;p["a"],m["a"];this.game=this.encoded?w["a"].Deserializer.fromEncoded(this.encoded):new m["a"],this.savedField=null,this.pixifield=new Array(this.game.field.dimension.rows).fill(null).map(function(){return new Array(e.game.field.dimension.columns).fill(null)}),l()(this.pixifield,"_isVue",{value:!0,enumerable:!1}),this.app=new b["Application"]({width:(this.game.field.dimension.columns+2)*j,height:(this.game.field.dimension.rows+1)*j,antialias:!0,transparent:!1,resolution:1}),this.container={},l()(this.container,"_isVue",{value:!0,enumerable:!1}),this.container.bg=new b["Container"],l()(this.container.bg,"_isVue",{value:!0,enumerable:!1}),this.container.puyo=new b["Container"],l()(this.container.puyo,"_isVue",{value:!0,enumerable:!1}),this.app.stage.addChild(this.container.bg),this.app.stage.addChild(this.container.puyo),b["loader"].add("pic/bg.json").add("pic/skin.json").load(this.loadBg).load(this.loadPuyo),this.editMode&&(this.container.editor=new b["Container"],l()(this.container.editor,"_isVue",{value:!0,enumerable:!1}),this.app.stage.addChild(this.container.editor),this.app.renderer.plugins.interaction.moveWhenInside=!0,this.editor={},l()(this.editor,"_isVue",{value:!0,enumerable:!1}),b["loader"].load(this.loadEditor))},mounted:function(){document.getElementById("puyostage").appendChild(this.app.view)},destroyed:function(){this.app.destroy()}},R=x,T=(i("973e"),i("2877")),S=Object(T["a"])(R,c,s,!1,null,null,null),B=S.exports,A={components:{PuyoField:B},props:{encoded:{type:String,default:""},editMode:{type:Boolean,default:!1},color:{type:String,default:"EMPTY"}},data:function(){return{passEncoded:this.encoded,state:O}},watch:{passEncoded:function(){this.$emit("update:encoded",this.passEncoded)}},computed:{playing:function(){return this.state===E}},methods:{play:function(){this.state=E},stop:function(){this.state=O},step:function(){this.state=C},reset:function(){this.state=P},openEditPage:function(){window.open("./?"+encodeURIComponent(this.passEncoded),"_blank")}},created:function(){var e=new URL(document.location).search,t=new URLSearchParams(e),i=!0,n=!1,r=void 0;try{for(var a,c=o()(t.keys());!(i=(a=c.next()).done);i=!0){var s=a.value;this.passEncoded=s;break}}catch(u){n=!0,r=u}finally{try{i||null==c.return||c.return()}finally{if(n)throw r}}}},M=A,L=(i("8195"),Object(T["a"])(M,n,r,!1,null,"fa1a05c4",null));t["a"]=L.exports},"9e5b":function(e,t,i){"use strict";i("ac6a");var n=i("774e1"),r=i.n(n),a=i("768b"),o=i("75fc"),c=i("b0b4"),s=i("d225"),u=i("308d"),l=i("6bb5"),d=i("013f"),h=i("4e2b"),f=i("bd86"),b=i("5c0e"),v=i("1b81"),p=i.n(v),m=i("5d58"),w=i.n(m),y=i("5d73"),j=i.n(y),g=(i("96cf"),i("ab0e")),O=i("a52d"),k=w.a,E=function(){function e(t){Object(s["a"])(this,e),C.set(this,{writable:!0,value:void 0}),P.set(this,{writable:!0,value:function(e){return Math.floor(e/2)}}),Object(O["a"])(this,C,t)}return Object(c["a"])(e,[{key:k,value:regeneratorRuntime.mark(function e(){var t,i,n,r,a,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=1,i=.75,n=14,r=[Object(g["a"])(this,C)*t,Object(g["a"])(this,C)*i],a=0;case 5:if(!(a<=n)){e.next=15;break}return o=a%r.length,e.next=9,r[o];case 9:if(r[o]=Object(g["a"])(this,P).call(this,r[o]),!(r[o]<=0)){e.next=12;break}return e.abrupt("return");case 12:++a,e.next=5;break;case 15:case"end":return e.stop()}},e,this)})}]),e}(),C=new p.a,P=new p.a,x=function(){function e(t){var i=t.initialNuisanceRate,n=t.marginTime,r=t.minClearConnection;Object(s["a"])(this,e),this.initialNuisanceRate=i,this.marginTime=n,this.minClearConnection=r}return Object(c["a"])(e,[{key:"nuisanceCount",value:function(e){var t=e.point,i=e.time,n=void 0===i?0:i,r=this.nuisanceRate({time:n});return[Math.floor(t/r),t%r]}},{key:"nuisanceRate",value:function(e){var t=e.time,i=void 0===t?0:t;if(null===this.marginTime)return this.initialNuisanceRate;var n=16;i-=this.marginTime;var r=!0,a=!1,o=void 0;try{for(var c,s=j()(new E(this.initialNuisanceRate));!(r=(c=s.next()).done);r=!0){var u=c.value;if(i<0)break;i-=n}}catch(l){a=!0,o=l}finally{try{r||null==s.return||s.return()}finally{if(a)throw o}}return u}},{key:"nuisanceRateMultiplier",value:function(e){var t=e.time,i=void 0===t?0:t;return this.initialNuisanceRate/this.nuisanceRate({time:i})}}]),e}(),R=i("52f7"),T=i("e36d");function S(e,t,i){return Math.min(Math.max(e,t),i)}i.d(t,"a",function(){return F});var B=["initialNuisanceRate","marginTime","minClearConnection","nuisanceTransformPoint","level"],A=[8,9,3,8,5],M={initialNuisanceRate:70,marginTime:96,minClearConnection:4,nuisanceTransformPoint:0,level:1},L=["columns","visibleRows","hiddenRows"],N={columns:6,visibleRows:12,hiddenRows:1},_=[5,5,2],F=function(e){function t(){var e,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=i.rule,r=i.dimension,a=void 0===r?N:r;Object(s["a"])(this,t),e=Object(u["a"])(this,Object(l["a"])(t).call(this,{rule:new t.Rule(n),dimension:a}));var o=Object(d["a"])(e);e.field.gravitate=function(){return R["a"].Algorithm.gravitationalDiff(this)},e.field.connections=function(){return R["a"].Algorithm.findConnections(this,{targetObjects:["RED","BLUE","GREEN","YELLOW","PURPLE"].map(function(e){return R["a"].Object[e]}),minConnection:o.rule.minClearConnection})},e.field.clear=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R["a"].Algorithm.flattenConnectionMap(this.connections());return R["a"].Algorithm.clearingDiff(e)};var c=e.field.clone;return e.field.clone=function(){var e=c.apply(this);return e.gravitate=this.gravitate,e.connections=this.connections,e.clear=this.clear,e.clone=this.clone,e},e}return Object(h["a"])(t,e),t}(b["a"]);Object(f["a"])(F,"GAME_ID",0),Object(f["a"])(F,"Serializer",function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"toBitStream",value:function(e,t){return b["a"].Serializer.headerToBitStream(t,{actualParams:[].concat(Object(o["a"])(B.map(function(t){return e.rule[t]})),Object(o["a"])(L.map(function(t){return e.field.dimension[t]}))),defaultParams:[].concat(Object(o["a"])(B.map(function(e){return M[e]})),Object(o["a"])(L.map(function(e){return N[e]}))),partitionSizes:[].concat(A,_)}),R["a"].Serializer.toBitStream(e.field,t),t}}]),e}()),Object(f["a"])(F,"Deserializer",function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"fromBitStream",value:function(e){var t=b["a"].Deserializer.headerFromBitStream(e,{defaultParams:[].concat(Object(o["a"])(B.map(function(e){return M[e]})),Object(o["a"])(L.map(function(e){return N[e]}))),partitionSizes:[].concat(A,_)}),i=b["a"].Deserializer.array2objects({array:t,objectKeys:[B,L]}),n=Object(a["a"])(i,2),r=n[0],c=n[1],s=new F({rule:r,dimension:c});return R["a"].Deserializer.fromBitStream(s.field,e),s}}]),e}()),Object(f["a"])(F,"Rule",function(e){function t(){var e,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M;return Object(s["a"])(this,t),e=Object(u["a"])(this,Object(l["a"])(t).call(this,i)),e.nuisanceTransformPoint=i.nuisanceTransformPoint,e.level=i.level,e}return Object(h["a"])(t,e),Object(c["a"])(t,[{key:"chainBonus",value:function(e){return e<4?8*(e-1):32*(e-3)}},{key:"colorBonus",value:function(e){switch(Math.abs(e)){case 0:case 1:return 0;case 2:return 3;default:return 2*this.colorBonus(e-1)}}},{key:"groupBonus",value:function(e){var t=e-Math.min(this.minClearConnection,4);return 0==t?0:t>=7?10:t+1}},{key:"transformPoint",value:function(e){if(e.type!=T["a"].Type.TRANSFORM)return 0;switch(e.positional.object){case R["a"].Object.RED:case R["a"].Object.YELLOW:case R["a"].Object.BLUE:case R["a"].Object.GREEN:case R["a"].Object.PURPLE:return 10;case R["a"].Object.HARD_NUISANCE:if(e.newObject===R["a"].Object.EMPTY)return 6*this.nuisanceTransformPoint;case R["a"].Object.NUISANCE:return this.nuisanceTransformPoint}}},{key:"points",value:function(e){var t=this,i=e.chain,n=e.connectionMap,a=e.transformDiffs,o=r()(n.values()).reduce(function(e,t){return e+Math.min(1,t.length)},0),c=r()(n.values()).reduce(function(e,t){return e.concat(t.map(function(e){return e.length}))},[]);return[this.level*a.reduce(function(e,i){return e+t.transformPoint(i)},0),S(this.colorBonus(o)+this.chainBonus(i)+c.reduce(function(e,i){return e+t.groupBonus(i)},0),1,999)]}}]),t}(x)),b["a"].Modes[F.GAME_ID]=F},e36d:function(e,t,i){"use strict";i.d(t,"a",function(){return h});i("ac6a");var n=i("308d"),r=i("6bb5"),a=i("4e2b"),o=i("f28b"),c=i("15b8"),s=i.n(c),u=i("d225"),l=i("b0b4"),d=i("bd86"),h=function(){function e(t){var i=t.type,n=t.positional,r=t.argument;switch(Object(u["a"])(this,e),this.positional=n,this.type=i){case e.Type.TRANSFORM:this.newObject=r;break;case e.Type.EXCHANGE:this.otherPositional=r;break}s()(this)}return Object(l["a"])(e,[{key:"apply",value:function(){if(this.valid)switch(this.type){case e.Type.TRANSFORM:this.positional.object=this.newObject;break;case e.Type.EXCHANGE:var t=[this.otherPositional.object,this.positional.object];this.positional.object=t[0],this.otherPositional.object=t[1];break}}},{key:"valid",get:function(){if(!this.positional.valid)return!1;switch(this.type){case e.Type.TRANSFORM:return!0;case e.Type.EXCHANGE:return this.positional.field==this.otherPositional.field;default:return!1}}}]),e}();Object(d["a"])(h,"Collection",function(e){function t(){var e;Object(u["a"])(this,t);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return Object(n["a"])(this,(e=Object(r["a"])(t)).call.apply(e,[this].concat(a)))}return Object(a["a"])(t,e),Object(l["a"])(t,[{key:"apply",value:function(){this.forEach(function(e){return e.apply()})}}]),t}(Object(o["a"])(Array))),Object(d["a"])(h,"Type",{EXCHANGE:{},TRANSFORM:{}})}}]);