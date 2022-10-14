var x=Object.defineProperty;var o=(e,t)=>x(e,"name",{value:t,configurable:!0});import"./jsx-runtime.463b8ded.js";import{c as n,A as f,M as C,C as l,S as i}from"./Props.88a4c731.js";import"./iframe.24dbdcb5.js";import"./es.map.constructor.d0b89e0d.js";import"./es.number.to-fixed.c34bc9f2.js";function c(){return c=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},c.apply(this,arguments)}o(c,"_extends");const N={},D="wrapper";function S({components:e,...t}){return n(D,c({},N,t,{components:e,mdxType:"MDXLayout"}),n(C,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),n("h1",null,"Button"),n("p",null,"For user triggered actions"),n(l,{mdxType:"Canvas"},n(i,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Inverse Primary",args:{label:"RUN",variant:"inverse-primary"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
        variant="${r}"
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant="${r}"
        label='${a}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:a,disabled:r})=>`
      <v-button
        label='${a}'
        disabled='${r}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:a,icon:r})=>`
      <v-button
        label='${a}'
        icon='${r}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},mdxType:"Story"},({label:a,icon:r,tooltip:b,disabled:T})=>`
      <v-button
        label='${a}'
        icon='${r}'
        disabled='${T}'
        tooltip='${b}'
      />
    `)),n(l,{mdxType:"Canvas"},n(i,{name:"Icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},mdxType:"Story"},({icon:a,variant:r,label:b})=>`
      <v-button
        icon='${a}'
        label='${b}'
        variant='${r}'
      />
    `)))}o(S,"MDXContent");S.isMDXComponent=!0;const u=o(({label:e,variant:t})=>`
      <v-button
        label='${e}'
      />
    `,"primary");u.storyName="Primary";u.args={label:"RUN"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const m=o(({label:e,variant:t})=>`
      <v-button
        label='${e}'
        variant="${t}"
      />
    `,"inversePrimary");m.storyName="Inverse Primary";m.args={label:"RUN",variant:"inverse-primary"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
        variant="\${variant}"
      />
    \``}};const d=o(({label:e,variant:t})=>`
      <v-button
        variant="${t}"
        label='${e}'
      />
    `,"success");d.storyName="Success";d.args={label:"SUCCESS",variant:"success"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant="\${variant}"
        label='\${label}'
      />
    \``}};const p=o(({label:e,variant:t})=>`
      <v-button
        variant='${t}'
        label='${e}'
      />
    `,"danger");p.storyName="Danger";p.args={label:"STOP",variant:"danger"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const v=o(({label:e,variant:t})=>`
      <v-button
        variant='${t}'
        label='${e}'
      />
    `,"dangerOutline");v.storyName="Danger (outline)";v.args={label:"SLOW DOWN",variant:"outline-danger"};v.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const y=o(({label:e,disabled:t})=>`
      <v-button
        label='${e}'
        disabled='${t}'
      />
    `,"disabled");y.storyName="Disabled";y.args={disabled:"true",label:"RUN"};y.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const g=o(({label:e,icon:t})=>`
      <v-button
        label='${e}'
        icon='${t}'
      />
    `,"withIcon");g.storyName="With icon";g.args={label:"Refresh",icon:"refresh"};g.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const $=o(({label:e,icon:t,tooltip:a,disabled:r})=>`
      <v-button
        label='${e}'
        icon='${t}'
        disabled='${r}'
        tooltip='${a}'
      />
    `,"withTooltip");$.storyName="With tooltip";$.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};$.parameters={storySource:{source:`({
  label,
  icon,
  tooltip,
  disabled
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
        disabled='\${disabled}'
        tooltip='\${tooltip}'
      />
    \``}};const h=o(({icon:e,variant:t,label:a})=>`
      <v-button
        icon='${e}'
        label='${a}'
        variant='${t}'
      />
    `,"iconVariant");h.storyName="Icon variant";h.args={icon:"trash",variant:"icon",label:"Delete component"};h.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
      <v-button
        icon='\${icon}'
        label='\${label}'
        variant='\${variant}'
      />
    \``}};const s={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip","iconVariant"]},O={Primary:"primary","Inverse Primary":"inversePrimary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon","With tooltip":"withTooltip","Icon variant":"iconVariant"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>n(f,{mdxStoryNameToKey:O,mdxComponentAnnotations:s},n(S,null))};const R=["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip","iconVariant"];export{R as __namedExportsOrder,p as danger,v as dangerOutline,s as default,y as disabled,h as iconVariant,m as inversePrimary,u as primary,d as success,g as withIcon,$ as withTooltip};
//# sourceMappingURL=button.stories.9f5008b6.js.map
