import"./jsx-runtime.2fcf8070.js";import{c as e,A as g,M as $,C as s,S as l}from"./Props.2d02661e.js";import"./iframe.7363a7d6.js";import"./es.map.constructor.98664091.js";import"./es.number.to-fixed.e2ce9d6e.js";function i(){return i=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(a[r]=n[r])}return a},i.apply(this,arguments)}const S={},T="wrapper";function v({components:a,...t}){return e(T,i({},S,t,{components:a,mdxType:"MDXLayout"}),e($,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),e("h1",null,"Button"),e("p",null,"For user triggered actions"),e(s,{mdxType:"Canvas"},e(l,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"Inverse Primary",args:{label:"RUN",variant:"inverse-primary"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        label='${n}'
        variant="${r}"
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant="${r}"
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:n,disabled:r})=>`
      <v-button
        label='${n}'
        disabled='${r}'
      />
    `)),e(s,{mdxType:"Canvas"},e(l,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:n,icon:r})=>`
      <v-button
        label='${n}'
        icon='${r}'
      />
    `)))}v.isMDXComponent=!0;const u=({label:a,variant:t})=>`
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
        label='${a}'
        variant="${t}"
      />
    `;b.storyName="Inverse Primary";b.args={label:"RUN",variant:"inverse-primary"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
        variant="\${variant}"
      />
    \``}};const m=({label:a,variant:t})=>`
      <v-button
        variant="${t}"
        label='${a}'
      />
    `;m.storyName="Success";m.args={label:"SUCCESS",variant:"success"};m.parameters={storySource:{source:`({
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
    \``}};const y=({label:a,disabled:t})=>`
      <v-button
        label='${a}'
        disabled='${t}'
      />
    `;y.storyName="Disabled";y.args={disabled:"true",label:"RUN"};y.parameters={storySource:{source:`({
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
    \``}};const o={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon"]},h={Primary:"primary","Inverse Primary":"inversePrimary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(g,{mdxStoryNameToKey:h,mdxComponentAnnotations:o},e(v,null))};const O=["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon"];export{O as __namedExportsOrder,c as danger,d as dangerOutline,o as default,y as disabled,b as inversePrimary,u as primary,m as success,p as withIcon};
//# sourceMappingURL=button.stories.3532b545.js.map
