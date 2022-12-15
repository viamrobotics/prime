var p=Object.defineProperty;var l=(e,a)=>p(e,"name",{value:a,configurable:!0});import"./jsx-runtime.e2f18fbd.js";import{c as r,A as c,M as u,C as s,S as g}from"./Props.cd7729dd.js";import"./iframe.476f0919.js";import"./es.map.constructor.99a102b2.js";import"./es.number.to-fixed.4a0da2e0.js";function i(){return i=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var n=arguments[a];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e},i.apply(this,arguments)}l(i,"_extends");const $={},T="wrapper";function v({components:e,...a}){return r(T,i({},$,a,{components:e,mdxType:"MDXLayout"}),r(u,{title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),r("h1",null,"Badge"),r("p",null,"To display status of something"),r(s,{mdxType:"Canvas"},r(g,{name:"gray",args:{variant:"gray",label:"Inactive"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),r(s,{mdxType:"Canvas"},r(g,{name:"green",args:{variant:"green",label:"Active"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),r(s,{mdxType:"Canvas"},r(g,{name:"orange",args:{variant:"orange",label:"Danger"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),r(s,{mdxType:"Canvas"},r(g,{name:"red",args:{variant:"red",label:"Unhealthy"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)))}l(v,"MDXContent");v.isMDXComponent=!0;const d=l(({label:e,variant:a})=>`
      <v-badge
        variant='${a}'
        label='${e}'
      />
    `,"gray");d.storyName="gray";d.args={variant:"gray",label:"Inactive"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=l(({label:e,variant:a})=>`
      <v-badge
        variant='${a}'
        label='${e}'
      />
    `,"green");m.storyName="green";m.args={variant:"green",label:"Active"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const y=l(({label:e,variant:a})=>`
      <v-badge
        variant='${a}'
        label='${e}'
      />
    `,"orange");y.storyName="orange";y.args={variant:"orange",label:"Danger"};y.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const b=l(({label:e,variant:a})=>`
      <v-badge
        variant='${a}'
        label='${e}'
      />
    `,"red");b.storyName="red";b.args={variant:"red",label:"Unhealthy"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const o={title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},includeStories:["gray","green","orange","red"]},x={gray:"gray",green:"green",orange:"orange",red:"red"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>r(c,{mdxStoryNameToKey:x,mdxComponentAnnotations:o},r(v,null))};const N=["gray","green","orange","red"];export{N as __namedExportsOrder,o as default,d as gray,m as green,y as orange,b as red};
//# sourceMappingURL=badge.stories.dd764f89.js.map
