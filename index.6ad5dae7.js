!function(){function e(e,t,n,r,a,o,i){try{var s=e[o](i),u=s.value}catch(e){return void n(e)}s.done?t(u):Promise.resolve(u).then(r,a)}function t(t){return function(){var n=this,r=arguments;return new Promise((function(a,o){var i=t.apply(n,r);function s(t){e(i,a,o,s,u,"next",t)}function u(t){e(i,a,o,s,u,"throw",t)}s(void 0)}))}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function a(e,t){return t.get?t.get.call(e):t.value}function o(e,t){return a(e,r(e,t,"get"))}function i(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function s(e,t,n){i(e,t),t.set(e,n)}function u(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}function c(e,t,n){return u(e,r(e,t,"set"),n),n}function l(e,t){if(t.set){if(!t.get)throw new TypeError("attempted to read set only private field");return"__destrWrapper"in t||(t.__destrWrapper={set value(n){t.set.call(e,n)},get value(){return t.get.call(e)}}),t.__destrWrapper}if(!t.writable)throw new TypeError("attempted to set read only private field");return t}function f(e,t){return l(e,r(e,t,"update"))}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o&&(o=0,s[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,r=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(a=i.trys,(a=a.length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){i.label=s[1];break}if(6===s[0]&&i.label<a[1]){i.label=a[1],a=s;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(s);break}a[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}Object.create;Object.create;var w=new WeakMap,v=new WeakMap,y=new WeakMap,g=new WeakMap,b=new WeakMap,d=new WeakMap,k=new WeakMap,m=new(function(){"use strict";function e(){n(this,e),s(this,w,{writable:!0,value:"https://api.nytimes.com/svc/"}),s(this,v,{writable:!0,value:"Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb"}),s(this,y,{writable:!0,value:void 0}),s(this,g,{writable:!0,value:void 0}),s(this,b,{writable:!0,value:void 0}),s(this,d,{writable:!0,value:void 0}),s(this,k,{writable:!0,value:{"api-key":o(this,v),q:o(this,g),page:o(this,d),begin_date:o(this,b)}}),c(this,y,7),this.category="all",c(this,d,1),c(this,b,"20120101")}var r,a,i;return r=e,(a=[{key:"getPopularNews",value:function(){var e=this;return t((function(){var t;return p(this,(function(n){switch(n.label){case 0:return[4,fetch(o(e,w)+"mostpopular/v2/viewed/".concat(o(e,y),".json?api-key=").concat(o(e,v)))];case 1:if(!(t=n.sent()).ok)throw new Error(error);return[4,t.json()];case 2:return[2,n.sent().results]}}))}))()}},{key:"getNewsByQuery",value:function(){var e=this;return t((function(){var t,n,r,a,i;return p(this,(function(s){switch(s.label){case 0:return Object.assign(o(e,k),{q:o(e,g),page:o(e,d),begin_date:o(e,b)}),[4,fetch(o(e,w)+"search/v2/articlesearch.json?"+new URLSearchParams(o(e,k)))];case 1:if(!(t=s.sent()).ok)throw new Error(error);return[4,t.json()];case 2:return n=s.sent(),r=n.response,a=r.docs,i=r.meta,console.log(i),e.updatePage(),[2,a]}}))}))()}},{key:"getNewsByCategories",value:function(){var e=this;return t((function(){var t,n;return p(this,(function(r){switch(r.label){case 0:return t=e.updatePage(),[4,fetch(o(e,w)+"/news/v3/content/inyt/".concat(e.category,".json?")+new URLSearchParams({"api-key":o(e,v),offset:t}))];case 1:if(!(n=r.sent()).ok)throw new Error(error);return[4,n.json()];case 2:return[2,r.sent()]}}))}))()}},{key:"getCategories",value:function(){var e=this;return t((function(){var t;return p(this,(function(n){switch(n.label){case 0:return[4,fetch(o(e,w)+"news/v3/content/section-list.json?api-key=".concat(o(e,v)))];case 1:if(!(t=n.sent()).ok)throw new Error(error);return[4,t.json()];case 2:return[2,n.sent().results]}}))}))()}},{key:"getNewsById",value:function(e){var n=this;return t((function(){return p(this,(function(t){return e.map((function(e){return fetch(o(n,w))})),[2]}))}))()}},{key:"query",get:function(){return o(this,g)},set:function(e){c(this,g,e)}},{key:"updatePage",value:function(){f(this,d).value++}},{key:"resetPage",value:function(){c(this,d,1)}},{key:"date",get:function(){o(this,b)},set:function(e){c(this,b,e)}}])&&h(r.prototype,a),i&&h(r,i),e}());m.getCategories().then(console.log),m.getPopularNews().then(console.log),m.query="apple",m.getNewsByQuery().then(console.log)}();
//# sourceMappingURL=index.6ad5dae7.js.map
