import"./jsx-runtime.e4e9cc55.js";import{c as e,A as p}from"./Props.2328207e.js";import"./iframe.6ccd6cc5.js";import"./es.map.constructor.aa538d5c.js";import"./es.number.to-fixed.4d2c66cd.js";function l(){return l=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(a[r]=n[r])}return a},l.apply(this,arguments)}const d={},u="wrapper";function i({components:a,...t}){return e(u,l({},d,t,{components:a,mdxType:"MDXLayout"}),e("h1",null,"P.R.I.M.E."),e("p",null,"Pretty Rad Interactive Modular Elements."),e("p",null,"Made with \u2764\uFE0F at Viam."),e("h2",null,"Getting started"),e("p",null,'PRIME is a collection of atomic UI elements, designed to "just work" in any HTML-based environment, regardless of framework or lack thereof. It is a web component library.'),e("h2",null,"Installation"),e("p",null,"The PRIME NPM package contains the following necessary exports for usage:"),e("ul",null,e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"prime.es.js")," or ",e("inlineCode",{parentName:"li"},"prime.umd.js")," - JS that defines custom elements. ES modules are recommended over UMD."),e("li",{parentName:"ul"},e("inlineCode",{parentName:"li"},"prime.css")," - stylesheet shared by all elements.")),e("p",null,"If using ES modules, import Prime's JS file into your code:"),e("pre",null,e("code",{parentName:"pre",className:"language-ts"},`import '@viamrobotics/prime'
`)),e("p",null,"You must host ",e("inlineCode",{parentName:"p"},"prime.css")," in a static file server. This is every prime element loads it as a shared stylesheet."),e("p",null,"If you are not hosting ",e("inlineCode",{parentName:"p"},"prime.css")," at the root directory of your domain, you will need to add a PRIME_CONFIG global variable before loading the JS file:"),e("pre",null,e("code",{parentName:"pre",className:"language-html"},`<script type="module">
window.PRIME_CONFIG = {
  base: '/path/to/static/folder',
  query: '?v=someCacheBustingHashIfNeeded',
}
<\/script>
`)),e("p",null,"If the necessary ",e("inlineCode",{parentName:"p"},".css")," and ",e("inlineCode",{parentName:"p"},".js"),` files have been added, then no additional imports are needed!
You can immediately start adding PRIME elements to your app, since prime elements are simply custom HTML elements:`),e("pre",null,e("code",{parentName:"pre",className:"language-html"},`<v-button label='Hello world!' />
`)),e("p",null,"All elements are prefixed with ",e("inlineCode",{parentName:"p"},"v-"),". This stands for Viam, the cool company where these elements are made."),e("h3",null,"Browser Compatibility"),e("p",null,e("inlineCode",{parentName:"p"},"PRIME")," supports the following browsers:"),e("table",null,e("thead",{parentName:"table"},e("tr",{parentName:"thead"},e("th",{parentName:"tr",align:null},e("img",{parentName:"th",src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png",alt:"Chrome"})),e("th",{parentName:"tr",align:null},e("img",{parentName:"th",src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png",alt:"Firefox"})),e("th",{parentName:"tr",align:null},e("img",{parentName:"th",src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png",alt:"Edge"})),e("th",{parentName:"tr",align:null},e("img",{parentName:"th",src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png",alt:"Safari"})))),e("tbody",{parentName:"table"},e("tr",{parentName:"tbody"},e("td",{parentName:"tr",align:null},"Latest \u2714"),e("td",{parentName:"tr",align:null},"Latest \u2714"),e("td",{parentName:"tr",align:null},"Latest \u2714"),e("td",{parentName:"tr",align:null},"Latest \u2714")))))}i.isMDXComponent=!0;function s(){return s=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(a[r]=n[r])}return a},s.apply(this,arguments)}const c=a=>function(n){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",n)},h=c("Meta"),g={},f="wrapper";function m({components:a,...t}){return e(f,s({},g,t,{components:a,mdxType:"MDXLayout"}),e(h,{title:"Docs/Introduction",mdxType:"Meta"}),e(i,{mdxType:"Readme"}))}m.isMDXComponent=!0;const y=()=>{throw new Error("Docs-only story")};y.parameters={docsOnly:!0};const o={title:"Docs/Introduction",includeStories:["__page"]},N={};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(p,{mdxStoryNameToKey:N,mdxComponentAnnotations:o},e(m,null))};const v=["__page"];export{v as __namedExportsOrder,y as __page,o as default};
//# sourceMappingURL=introduction.stories.61f3e017.js.map
