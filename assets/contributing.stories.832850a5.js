import"./jsx-runtime.4fc96cdb.js";import{c as e,A as s}from"./Props.747abe38.js";import"./iframe.c1607b9f.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},i.apply(this,arguments)}const p=t=>function(o){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",o)},m=p("Meta"),d={},c="wrapper";function l({components:t,...n}){return e(c,i({},d,n,{components:t,mdxType:"MDXLayout"}),e(m,{title:"Docs/Contributing",mdxType:"Meta"}),e("h1",null,"Creating a component"),e("ol",null,e("li",{parentName:"ol"},"Create a new component directory and index.svelte file in ",e("inlineCode",{parentName:"li"},"/elements")),e("li",{parentName:"ol"},"Create a new ",e("inlineCode",{parentName:"li"},"[component].stories.mdx")," file in ",e("inlineCode",{parentName:"li"},"/stories")),e("li",{parentName:"ol"},"Import the component in ",e("inlineCode",{parentName:"li"},"elements/index.ts")),e("li",{parentName:"ol"},"Import the ",e("inlineCode",{parentName:"li"},"addStyles()")," helper in ",e("inlineCode",{parentName:"li"},"lib/")," to the component to add the shared component stylesheet"),e("li",{parentName:"ol"},"Add the component name to the list of ",e("inlineCode",{parentName:"li"},"display: block")," elements in ",e("inlineCode",{parentName:"li"},"prime.css"))),e("h3",null,"Further Reading"),e("p",null,"Linked below are some articles that provide knowledge for how to best build reusable, generic web components."),e("ul",null,e("li",{parentName:"ul"},e("a",{parentName:"li",href:"https://web.dev/custom-elements-best-practices/"},"Custom Elements Best Practices"))))}l.isMDXComponent=!0;const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const a={title:"Docs/Contributing",includeStories:["__page"]},h={};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>e(s,{mdxStoryNameToKey:h,mdxComponentAnnotations:a},e(l,null))};const N=["__page"];export{N as __namedExportsOrder,u as __page,a as default};
//# sourceMappingURL=contributing.stories.832850a5.js.map
