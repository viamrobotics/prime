import"./jsx-runtime.39a69237.js";import{c as e,A as v,M as g,C as s,S as o}from"./Props.43cc716d.js";import"./iframe.d6834302.js";import"./es.map.constructor.c2e9bd1b.js";import"./es.number.to-fixed.734c4025.js";function i(){return i=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(a[r]=n[r])}return a},i.apply(this,arguments)}const $={},S="wrapper";function y({components:a,...t}){return e(S,i({},$,t,{components:a,mdxType:"MDXLayout"}),e(g,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),e("h1",null,"Button"),e("p",null,"For user triggered actions"),e(s,{mdxType:"Canvas"},e(o,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(o,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant="${r}"
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(o,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(o,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(o,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:n,disabled:r})=>`
      <v-button
        label='${n}'
        disabled='${r}'
      />
    `)),e(s,{mdxType:"Canvas"},e(o,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:n,icon:r})=>`
      <v-button
        label='${n}'
        icon='${r}'
      />
    `)))}y.isMDXComponent=!0;const u=({label:a,variant:t})=>`
      <v-button
        label='${a}'
      />
    `;u.storyName="Primary";u.args={label:"RUN"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const b=({label:a,variant:t})=>`
      <v-button
        variant="${t}"
        label='${a}'
      />
    `;b.storyName="Success";b.args={label:"SUCCESS",variant:"success"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant="\${variant}"
        label='\${label}'
      />
    \``}};const c=({label:a,variant:t})=>`
      <v-button
        variant='${t}'
        label='${a}'
      />
    `;c.storyName="Danger";c.args={label:"STOP",variant:"danger"};c.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const d=({label:a,variant:t})=>`
      <v-button
        variant='${t}'
        label='${a}'
      />
    `;d.storyName="Danger (outline)";d.args={label:"SLOW DOWN",variant:"outline-danger"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=({label:a,disabled:t})=>`
      <v-button
        label='${a}'
        disabled='${t}'
      />
    `;m.storyName="Disabled";m.args={disabled:"true",label:"RUN"};m.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const p=({label:a,icon:t})=>`
      <v-button
        label='${a}'
        icon='${t}'
      />
    `;p.storyName="With icon";p.args={label:"Refresh",icon:"refresh"};p.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const l={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","success","danger","dangerOutline","disabled","withIcon"]},T={Primary:"primary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:T,mdxComponentAnnotations:l},e(y,null))};const O=["primary","success","danger","dangerOutline","disabled","withIcon"];export{O as __namedExportsOrder,c as danger,d as dangerOutline,l as default,m as disabled,u as primary,b as success,p as withIcon};
//# sourceMappingURL=button.stories.b95424e6.js.map
