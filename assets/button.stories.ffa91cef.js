import"./index.5c7752e3.js";import{c as a,A as c,M as b,C as l,S as s}from"./Props.ed0d98fa.js";import"./iframe.175d2946.js";function i(){return i=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r])}return n},i.apply(this,arguments)}const g={},v="wrapper";function p({components:n,...t}){return a(v,i({},g,t,{components:n,mdxType:"MDXLayout"}),a(b,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}},size:{description:"The size of the button",control:{type:"select"},options:["small","medium","large"],defaultValue:"medium",table:{defaultValue:{summary:"medium"}}},variant:{description:"The button purpose",control:"select",options:["primary","danger","outline-danger"],defaultValue:"primary",table:{defaultValue:{summary:"primary"}}}},mdxType:"Meta"}),a("h1",null,"Button"),a("p",null,"For user triggered actions"),a(l,{mdxType:"Canvas"},a(s,{name:"Primary",mdxType:"Story"},({label:e,variant:r,size:d})=>`
      <v-button
        variant='${r}'
        label='${e}'
      />
    `)),a(l,{mdxType:"Canvas"},a(s,{name:"Danger",args:{variant:"danger"},mdxType:"Story"},({label:e,variant:r,size:d})=>`
      <v-button
        variant='${r}'
        label='${e}'
      />
    `)),a(l,{mdxType:"Canvas"},a(s,{name:"Danger (outline)",args:{variant:"outline-danger"},mdxType:"Story"},({label:e,variant:r,size:d})=>`
      <v-button
        variant='${r}'
        label='${e}'
      />
    `)))}p.isMDXComponent=!0;const y=({label:n,variant:t,size:e})=>`
      <v-button
        variant='${t}'
        label='${n}'
      />
    `;y.storyName="Primary";y.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const u=({label:n,variant:t,size:e})=>`
      <v-button
        variant='${t}'
        label='${n}'
      />
    `;u.storyName="Danger";u.args={variant:"danger"};u.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=({label:n,variant:t,size:e})=>`
      <v-button
        variant='${t}'
        label='${n}'
      />
    `;m.storyName="Danger (outline)";m.args={variant:"outline-danger"};m.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const o={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}},size:{description:"The size of the button",control:{type:"select"},options:["small","medium","large"],defaultValue:"medium",table:{defaultValue:{summary:"medium"}}},variant:{description:"The button purpose",control:"select",options:["primary","danger","outline-danger"],defaultValue:"primary",table:{defaultValue:{summary:"primary"}}}},includeStories:["primary","danger","dangerOutline"]},f={Primary:"primary",Danger:"danger","Danger (outline)":"dangerOutline"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(c,{mdxStoryNameToKey:f,mdxComponentAnnotations:o},a(p,null))};const z=["primary","danger","dangerOutline"];export{z as __namedExportsOrder,u as danger,m as dangerOutline,o as default,y as primary};
//# sourceMappingURL=button.stories.ffa91cef.js.map
