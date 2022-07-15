import"./jsx-runtime.a71c9d3a.js";import{c as a,A as y,M as v,C as l,S as o}from"./Props.485ca562.js";import"./iframe.c317b4d1.js";function i(){return i=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},i.apply(this,arguments)}const g={},$="wrapper";function p({components:e,...n}){return a($,i({},g,n,{components:e,mdxType:"MDXLayout"}),a(v,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},mdxType:"Meta"}),a("h1",null,"Button"),a("p",null,"For user triggered actions"),a(l,{mdxType:"Canvas"},a(o,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        label='${t}'
      />
    `)),a(l,{mdxType:"Canvas"},a(o,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        variant='${r}'
        label='${t}'
      />
    `)),a(l,{mdxType:"Canvas"},a(o,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:t,variant:r})=>`
      <v-button
        variant='${r}'
        label='${t}'
      />
    `)),a(l,{mdxType:"Canvas"},a(o,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:t,disabled:r})=>`
      <v-button
        label='${t}'
        disabled='${r}'
      />
    `)),a(l,{mdxType:"Canvas"},a(o,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:t,icon:r})=>`
      <v-button
        label='${t}'
        icon='${r}'
      />
    `)))}p.isMDXComponent=!0;const d=({label:e,variant:n})=>`
      <v-button
        label='${e}'
      />
    `;d.storyName="Primary";d.args={label:"RUN"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
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
    \``}};const m=({label:e,variant:n})=>`
      <v-button
        variant='${n}'
        label='${e}'
      />
    `;m.storyName="Danger (outline)";m.args={label:"SLOW DOWN",variant:"outline-danger"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const u=({label:e,disabled:n})=>`
      <v-button
        label='${e}'
        disabled='${n}'
      />
    `;u.storyName="Disabled";u.args={disabled:"true",label:"RUN"};u.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const c=({label:e,icon:n})=>`
      <v-button
        label='${e}'
        icon='${n}'
      />
    `;c.storyName="With icon";c.args={label:"Refresh",icon:"refresh"};c.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const s={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},includeStories:["primary","danger","dangerOutline","disabled","withIcon"]},T={Primary:"primary",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>a(y,{mdxStoryNameToKey:T,mdxComponentAnnotations:s},a(p,null))};const f=["primary","danger","dangerOutline","disabled","withIcon"];export{f as __namedExportsOrder,b as danger,m as dangerOutline,s as default,u as disabled,d as primary,c as withIcon};
//# sourceMappingURL=button.stories.4b373df3.js.map
