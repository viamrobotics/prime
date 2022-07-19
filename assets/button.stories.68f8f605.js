import"./jsx-runtime.447a3822.js";import{c as a,A as v,M as g,C as s,S as l}from"./Props.3ff7281a.js";import"./iframe.63352511.js";function i(){return i=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},i.apply(this,arguments)}const $={},S="wrapper";function y({components:e,...n}){return a(S,i({},$,n,{components:e,mdxType:"MDXLayout"}),a(g,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},mdxType:"Meta"}),a("h1",null,"Button"),a("p",null,"For user triggered actions"),a(s,{mdxType:"Canvas"},a(l,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        label='${t}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        variant="${r}"
        label='${t}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        variant='${r}'
        label='${t}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        variant='${r}'
        label='${t}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:t,disabled:r})=>`
      <v-button
        label='${t}'
        disabled='${r}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:t,icon:r})=>`
      <v-button
        label='${t}'
        icon='${r}'
      />
    `)))}y.isMDXComponent=!0;const c=({label:e,variant:n})=>`
      <v-button
        label='${e}'
      />
    `;c.storyName="Primary";c.args={label:"RUN"};c.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const u=({label:e,variant:n})=>`
      <v-button
        variant="${n}"
        label='${e}'
      />
    `;u.storyName="Success";u.args={label:"SUCCESS",variant:"success"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant="\${variant}"
        label='\${label}'
      />
    \``}};const b=({label:e,variant:n})=>`
      <v-button
        variant='${n}'
        label='${e}'
      />
    `;b.storyName="Danger";b.args={label:"STOP",variant:"danger"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const d=({label:e,variant:n})=>`
      <v-button
        variant='${n}'
        label='${e}'
      />
    `;d.storyName="Danger (outline)";d.args={label:"SLOW DOWN",variant:"outline-danger"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=({label:e,disabled:n})=>`
      <v-button
        label='${e}'
        disabled='${n}'
      />
    `;m.storyName="Disabled";m.args={disabled:"true",label:"RUN"};m.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const p=({label:e,icon:n})=>`
      <v-button
        label='${e}'
        icon='${n}'
      />
    `;p.storyName="With icon";p.args={label:"Refresh",icon:"refresh"};p.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const o={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},includeStories:["primary","success","danger","dangerOutline","disabled","withIcon"]},T={Primary:"primary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(v,{mdxStoryNameToKey:T,mdxComponentAnnotations:o},a(y,null))};const C=["primary","success","danger","dangerOutline","disabled","withIcon"];export{C as __namedExportsOrder,b as danger,d as dangerOutline,o as default,m as disabled,c as primary,u as success,p as withIcon};
//# sourceMappingURL=button.stories.68f8f605.js.map
