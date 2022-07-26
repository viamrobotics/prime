import"./jsx-runtime.d6bd0816.js";import{c as e,A as i}from"./Props.2f4e8e25.js";import"./iframe.f86228b8.js";import"./es.map.constructor.151b2416.js";import"./es.number.to-fixed.34de605b.js";function l(){return l=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},l.apply(this,arguments)}const m=t=>function(o){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",o)},p=m("Meta"),d={},c="wrapper";function s({components:t,...n}){return e(c,l({},d,n,{components:t,mdxType:"MDXLayout"}),e(p,{title:"Docs/Introduction",mdxType:"Meta"}),e("h1",null,"P.R.I.M.E."),e("p",null,"Pretty Rad Interactive Modular Elements."),e("p",null,"Made with \u2764\uFE0F at Viam."),e("h3",null,"Getting started"),e("p",null,'PRIME is a collection of atomic UI elements, designed to "just work" in any HTML-based environment, regardless of framework or lack thereof. It is a web component library.'),e("h3",null,"Installation"),e("p",null,"The PRIME NPM package contains the following necessary exports for usage:"),e("ul",null,e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"prime.es.js")," or ",e("inlineCode",{parentName:"li"},"prime.umd.js")," - JS that defines custom elements. ES modules are recommended over UMD."),e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"prime.css")," - stylesheet shared by all elements.")),e("p",null,"If using ES modules, import Prime's JS file into your code:"),e("pre",null,e("code",{parentName:"pre",className:"language-ts"},`import '@viamrobotics/prime'
`)),e("p",null,"You must host ",e("inlineCode",{parentName:"p"},"prime.css")," in a static file server. This is every prime element loads it as a shared stylesheet."),e("p",null,"If you are not hosting ",e("inlineCode",{parentName:"p"},"prime.css")," at the root directory of your domain, you will need to add a PRIME_CONFIG global variable before loading the JS file:"),e("pre",null,e("code",{parentName:"pre",className:"language-html"},`<script type="module">
window.PRIME_CONFIG = {
  base: '/path/to/static/folder',
  query: '?v=someCacheBustingHashIfNeeded',
}
<\/script>
`)),e("p",null,"If the necessary ",e("inlineCode",{parentName:"p"},".css")," and ",e("inlineCode",{parentName:"p"},".js"),` files have been added, then no additional imports are needed!
You can immediately start adding PRIME elements to your app, since prime elements are simply custom HTML elements:`),e("pre",null,e("code",{parentName:"pre",className:"language-html"},`<v-button label='Hello world!' />
`)),e("p",null,"All elements are prefixed with ",e("inlineCode",{parentName:"p"},"v-"),". This stands for Viam, the cool company where these elements are made."))}s.isMDXComponent=!0;const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const a={title:"Docs/Introduction",includeStories:["__page"]},h={};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>e(i,{mdxStoryNameToKey:h,mdxComponentAnnotations:a},e(s,null))};const b=["__page"];export{b as __namedExportsOrder,u as __page,a as default};
//# sourceMappingURL=introduction.stories.560c9ead.js.map
