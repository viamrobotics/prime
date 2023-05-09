var P=Object.defineProperty;var R=(e,t,i)=>t in e?P(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var S=(e,t,i)=>(R(e,typeof t!="symbol"?t+"":t,i),i);import{S as D,i as T,n as I,a as F,b as _,f,l as G,c as w,h as y,j as H,o as J,p as K,e as k,k as L,d as o,q as j,g as E,r as q,v as M,w as O,x as Q,t as U,s as V}from"./preview-dc6b03ff.js";import{c as C}from"./index-74f03c09.js";import{h as W}from"./boolean-1ceedbab.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";function B(e){let t,i;return{c(){t=k("i"),o(t,"aria-hidden","true"),o(t,"class",i="icon-"+e[4]+" text-"+e[5])},m(s,n){_(s,t,n)},p(s,n){n&48&&i!==(i="icon-"+s[4]+" text-"+s[5])&&o(t,"class",i)},d(s){s&&y(t)}}}function A(e){let t,i;return{c(){t=k("span"),i=U(e[2]),o(t,"class","mx-auto")},m(s,n){_(s,t,n),E(t,i)},p(s,n){n&4&&V(i,s[2])},d(s){s&&y(t)}}}function z(e){let t,i,s,n,u,m,c,g,v,l=e[4]&&B(e),r=e[1]!=="icon"&&A(e),p=[{text:e[6]}],h={};for(let b=0;b<p.length;b+=1)h=K(h,p[b]);return{c(){t=k(e[6]?"v-tooltip":"span"),i=k("button"),l&&l.c(),s=L(),r&&r.c(),o(i,"type",e[0]),o(i,"aria-label",n=e[1]==="icon"?e[2]:void 0),o(i,"aria-disabled",u=e[7]?!0:void 0),o(i,"title",e[3]),o(i,"class",m=C("active:scale-95 motion-safe:transition-transform",{"inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs border":e[1]!=="icon","bg-light border-light hover:bg-medium hover:border-medium":e[1]==="primary","bg-gray-9 border-gray-9 text-white hover:bg-black hover:border-black":e[1]==="inverse-primary","bg-danger-dark text-white border-danger-dark hover:bg-[#aa2a2b]":e[1]==="danger","bg-success-dark border-success-dark text-white":e[1]==="success","bg-danger-light border-danger-medium text-danger-dark hover:bg-[#f5dfdc]":e[1]==="outline-danger","!bg-disabled-light !border-disabled-light text-disabled-dark pointer-events-none select-none":e[7]})),o(i,"style",c=e[7]?"-webkit-user-select: none":""),j(e[6]?"v-tooltip":"span")(t,h)},m(b,d){_(b,t,d),E(t,i),l&&l.m(i,null),E(i,s),r&&r.m(i,null),g||(v=[q(i,"click",e[8]),q(t,"click",function(){M(e[7]?e[9]:void 0)&&(e[7]?e[9]:void 0).apply(this,arguments)})],g=!0)},p(b,d){e=b,e[4]?l?l.p(e,d):(l=B(e),l.c(),l.m(i,s)):l&&(l.d(1),l=null),e[1]!=="icon"?r?r.p(e,d):(r=A(e),r.c(),r.m(i,null)):r&&(r.d(1),r=null),d&1&&o(i,"type",e[0]),d&6&&n!==(n=e[1]==="icon"?e[2]:void 0)&&o(i,"aria-label",n),d&128&&u!==(u=e[7]?!0:void 0)&&o(i,"aria-disabled",u),d&8&&o(i,"title",e[3]),d&130&&m!==(m=C("active:scale-95 motion-safe:transition-transform",{"inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs border":e[1]!=="icon","bg-light border-light hover:bg-medium hover:border-medium":e[1]==="primary","bg-gray-9 border-gray-9 text-white hover:bg-black hover:border-black":e[1]==="inverse-primary","bg-danger-dark text-white border-danger-dark hover:bg-[#aa2a2b]":e[1]==="danger","bg-success-dark border-success-dark text-white":e[1]==="success","bg-danger-light border-danger-medium text-danger-dark hover:bg-[#f5dfdc]":e[1]==="outline-danger","!bg-disabled-light !border-disabled-light text-disabled-dark pointer-events-none select-none":e[7]}))&&o(i,"class",m),d&128&&c!==(c=e[7]?"-webkit-user-select: none":"")&&o(i,"style",c),j(e[6]?"v-tooltip":"span")(t,h=O(p,[d&64&&{text:e[6]}]))},d(b){b&&y(t),l&&l.d(),r&&r.d(),g=!1,Q(v)}}}function X(e){let t=e[6]?"v-tooltip":"span",i,s=(e[6]?"v-tooltip":"span")&&z(e);return{c(){s&&s.c(),i=G(),this.c=w},m(n,u){s&&s.m(n,u),_(n,i,u)},p(n,[u]){n[6],t?I(t,n[6]?"v-tooltip":"span")?(s.d(1),s=z(n),t=n[6]?"v-tooltip":"span",s.c(),s.m(i.parentNode,i)):s.p(n,u):(s=z(n),t=n[6]?"v-tooltip":"span",s.c(),s.m(i.parentNode,i))},i:w,o:w,d(n){n&&y(i),s&&s.d(n)}}}function Y(e,t,i){let{disabled:s="false"}=t,{type:n="button"}=t,{variant:u="primary"}=t,{label:m=""}=t,{title:c=""}=t,{icon:g=""}=t,{size:v="base"}=t,{tooltip:l=""}=t;H();let r;const h=J().attachInternals(),b=()=>{const{form:a}=h;a!=null&&a.requestSubmit?a.requestSubmit():a==null||a.submit()},d=a=>{a.stopImmediatePropagation()};return e.$$set=a=>{"disabled"in a&&i(10,s=a.disabled),"type"in a&&i(0,n=a.type),"variant"in a&&i(1,u=a.variant),"label"in a&&i(2,m=a.label),"title"in a&&i(3,c=a.title),"icon"in a&&i(4,g=a.icon),"size"in a&&i(5,v=a.size),"tooltip"in a&&i(6,l=a.tooltip)},e.$$.update=()=>{e.$$.dirty&1024&&i(7,r=W(s,"disabled"))},[n,u,m,c,g,v,l,r,b,d,s]}let Z=class extends D{constructor(t){super();const i=document.createElement("style");i.textContent=":host{display:inline-block !important}",this.shadowRoot.appendChild(i),T(this,{target:this.shadowRoot,props:F(this.attributes),customElement:!0},Y,X,I,{disabled:10,type:0,variant:1,label:2,title:3,icon:4,size:5,tooltip:6},null),t&&(t.target&&_(t.target,this,t.anchor),t.props&&(this.$set(t.props),f()))}static get observedAttributes(){return["disabled","type","variant","label","title","icon","size","tooltip"]}get disabled(){return this.$$.ctx[10]}set disabled(t){this.$$set({disabled:t}),f()}get type(){return this.$$.ctx[0]}set type(t){this.$$set({type:t}),f()}get variant(){return this.$$.ctx[1]}set variant(t){this.$$set({variant:t}),f()}get label(){return this.$$.ctx[2]}set label(t){this.$$set({label:t}),f()}get title(){return this.$$.ctx[3]}set title(t){this.$$set({title:t}),f()}get icon(){return this.$$.ctx[4]}set icon(t){this.$$set({icon:t}),f()}get size(){return this.$$.ctx[5]}set size(t){this.$$set({size:t}),f()}get tooltip(){return this.$$.ctx[6]}set tooltip(t){this.$$set({tooltip:t}),f()}};customElements.define("v-button-internal",Z);class N extends customElements.get("v-button-internal"){}S(N,"formAssociated",!0);customElements.define("v-button",N);
//# sourceMappingURL=button-6299f880.js.map
