(function(e){function n(n){for(var r,c,i=n[0],a=n[1],f=n[2],d=0,p=[];d<i.length;d++)c=i[d],o[c]&&p.push(o[c][0]),o[c]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);l&&l(n);while(p.length)p.shift()();return u.push.apply(u,f||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,i=1;i<t.length;i++){var a=t[i];0!==o[a]&&(r=!1)}r&&(u.splice(n--,1),e=c(c.s=t[0]))}return e}var r={},o={index:0},u=[];function c(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.m=e,c.c=r,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,n){if(1&n&&(e=c(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)c.d(t,r,function(n){return e[n]}.bind(null,r));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],a=i.push.bind(i);i.push=n,i=i.slice();for(var f=0;f<i.length;f++)n(i[f]);var l=a;u.push([1,"chunk-vendors","chunk-common"]),t()})({"0248":function(e,n,t){},1:function(e,n,t){e.exports=t("8ef1")},"8ef1":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"simulator"}},[t("PuyoEditor",{attrs:{encoded:e.encoded}})],1)},u=[],c=t("9bdd"),i={components:{PuyoEditor:c["a"]},data:function(){return{encoded:""}}},a=i,f=(t("c8c0"),t("2877")),l=Object(f["a"])(a,o,u,!1,null,null,null),d=l.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(d)}}).$mount("#simulator")},c8c0:function(e,n,t){"use strict";var r=t("0248"),o=t.n(r);o.a}});