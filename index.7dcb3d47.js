function e(e,t,s){if(!t.has(e))throw new TypeError("attempted to "+s+" private field on non-instance");return t.get(e)}function t(e,t){return t.get?t.get.call(e):t.value}function s(s,r){return t(s,e(s,r,"get"))}function r(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function a(e,t,s){r(e,t),t.set(e,s)}function i(e,t,s){if(t.set)t.set.call(e,s);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=s}}function n(t,s,r){return i(t,e(t,s,"set"),r),r}function o(e,t){if(t.set){if(!t.get)throw new TypeError("attempted to read set only private field");return"__destrWrapper"in t||(t.__destrWrapper={set value(s){t.set.call(e,s)},get value(){return t.get.call(e)}}),t.__destrWrapper}if(!t.writable)throw new TypeError("attempted to set read only private field");return t}function h(t,s){return o(t,e(t,s,"update"))}var l=new WeakMap,c=new WeakMap,w=new WeakMap,u=new WeakMap,p=new WeakMap,g=new WeakMap,f=new WeakMap,d=new WeakMap;const y=new class{async getPopularNews(){const e=await fetch(s(this,l)+`mostpopular/v2/viewed/${s(this,w)}.json?api-key=${s(this,c)}`);if(!e.ok)throw new Error(error);const{results:t}=await e.json();return t}async getNewsByQuery(){Object.assign(s(this,d),{q:s(this,u),page:s(this,g),begin_date:s(this,p)});const e=await fetch(s(this,l)+"search/v2/articlesearch.json?"+new URLSearchParams(s(this,d)));if(!e.ok)throw new Error(error);const{response:{docs:t,meta:r}}=await e.json();return this.updatePage(),{docs:t,meta:r}}async getNewsByCategories(){const e=await fetch(s(this,l)+`/news/v3/content/inyt/${this.category}.json?`+new URLSearchParams({"api-key":s(this,c),offset:s(this,f)}));if(!e.ok)throw new Error(error);this.updateOffset();const{results:t,num_results:r}=await e.json();return{results:t,num_results:r}}async getCategories(){const e=await fetch(s(this,l)+`news/v3/content/section-list.json?api-key=${s(this,c)}`);if(!e.ok)throw new Error(error);const{results:t}=await e.json();return t}async getNewsById(e){e.map((e=>fetch(s(this,l))))}get query(){return s(this,u)}set query(e){n(this,u,e)}updatePage(){h(this,g).value++}resetPage(){n(this,g,1)}get date(){s(this,p)}set date(e){n(this,p,e)}updateOffset(){n(this,f,s(this,f)+20)}resetOffset(){n(this,f,0)}constructor(){a(this,l,{writable:!0,value:"https://api.nytimes.com/svc/"}),a(this,c,{writable:!0,value:"Y0rMFldQHIhCKPc5jiggZphSD4GPFMzb"}),a(this,w,{writable:!0,value:void 0}),a(this,u,{writable:!0,value:void 0}),a(this,p,{writable:!0,value:void 0}),a(this,g,{writable:!0,value:void 0}),a(this,f,{writable:!0,value:void 0}),a(this,d,{writable:!0,value:{"api-key":s(this,c),q:s(this,u),page:s(this,g),begin_date:s(this,p)}}),n(this,w,7),this.category="all",n(this,g,1),n(this,p,"20120101"),n(this,f,0)}};y.getCategories().then(console.log),y.getPopularNews().then(console.log),y.query="apple",y.getNewsByQuery().then(console.log),y.getNewsByCategories().then(console.log);
//# sourceMappingURL=index.7dcb3d47.js.map
