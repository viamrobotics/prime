import{u,d,a as l}from"./iframe.8cc0bb81.js";import{R as t}from"./index.5c7752e3.js";var v="storybook/docs",f="".concat(v,"/snippet-rendered"),s;(function(e){e.AUTO="auto",e.CODE="code",e.DYNAMIC="dynamic"})(s||(s={}));function c(e){var r,a=e==null||(r=e.parameters.docs)===null||r===void 0?void 0:r.source,o=e==null?void 0:e.parameters.__isArgsStory;return(a==null?void 0:a.type)===s.DYNAMIC?!1:!o||(a==null?void 0:a.code)||(a==null?void 0:a.type)===s.CODE}function m(e){return d(e)}function p(e,r){var a,o,i=(a=r.parameters.docs)!==null&&a!==void 0?a:{},n=(o=i.transformSource)!==null&&o!==void 0?o:m;return n(e,r)}function _(e,r){var a,o,i=r!=null&&(a=r.parameters.docs)!==null&&a!==void 0&&(o=a.source)!==null&&o!==void 0&&o.excludeDecorators?r.originalStoryFn(r.args,r):e(),n;return c(r)||(typeof i=="string"?n=i:i instanceof Element&&(n=i.outerHTML),n&&(n=p(n,r))),u(function(){n&&l.getChannel().emit(f,r.id,n)}),i}function y(e){var r=e();return typeof r=="string"?t.createElement("div",{dangerouslySetInnerHTML:{__html:r}}):t.createElement("div",{ref:function(o){return o?o.appendChild(r):null}})}var g=[_],E={docs:{inlineStories:!0,prepareForInline:y,source:{type:s.DYNAMIC,language:"html"}}};export{g as decorators,E as parameters};
//# sourceMappingURL=config.e076848e.js.map
