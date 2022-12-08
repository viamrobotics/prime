var f=Object.defineProperty;var l=(t,e)=>f(t,"name",{value:e,configurable:!0});import"./jsx-runtime.0513aa1a.js";import{c as n,A as N,M as C,C as o,S as i}from"./Props.18bf6f89.js";import"./iframe.b7fa8eb1.js";import"./es.map.constructor.96594e57.js";import"./es.number.to-fixed.358595f4.js";function u(){return u=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},u.apply(this,arguments)}l(u,"_extends");const D={},O="wrapper";function S({components:t,...e}){return n(O,u({},D,e,{components:t,mdxType:"MDXLayout"}),n(C,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),n("h1",null,"Button"),n("p",null,"For user triggered actions"),n(o,{mdxType:"Canvas"},n(i,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Inverse Primary",args:{label:"RUN",variant:"inverse-primary"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
        variant="${r}"
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant="${r}"
        label='${a}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:a,disabled:r})=>`
      <v-button
        label='${a}'
        disabled='${r}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"With title",args:{label:"RUN",title:"Run this command"},mdxType:"Story"},({label:a,title:r})=>`
      <v-button
        label='${a}'
        title='${r}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},mdxType:"Story"},({label:a,icon:r,tooltip:b,disabled:x})=>`
      <v-button
        label='${a}'
        icon='${r}'
        disabled='${x}'
        tooltip='${b}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:a,icon:r})=>`
      <v-button
        label='${a}'
        icon='${r}'
      />
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"Icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},mdxType:"Story"},({icon:a,variant:r,label:b})=>`
      <v-button
        icon='${a}'
        label='${b}'
        variant='${r}'
      />
    `)))}l(S,"MDXContent");S.isMDXComponent=!0;const c=l(({label:t,variant:e})=>`
      <v-button
        label='${t}'
      />
    `,"primary");c.storyName="Primary";c.args={label:"RUN"};c.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const m=l(({label:t,variant:e})=>`
      <v-button
        label='${t}'
        variant="${e}"
      />
    `,"inversePrimary");m.storyName="Inverse Primary";m.args={label:"RUN",variant:"inverse-primary"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
        variant="\${variant}"
      />
    \``}};const d=l(({label:t,variant:e})=>`
      <v-button
        variant="${e}"
        label='${t}'
      />
    `,"success");d.storyName="Success";d.args={label:"SUCCESS",variant:"success"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant="\${variant}"
        label='\${label}'
      />
    \``}};const p=l(({label:t,variant:e})=>`
      <v-button
        variant='${e}'
        label='${t}'
      />
    `,"danger");p.storyName="Danger";p.args={label:"STOP",variant:"danger"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const y=l(({label:t,variant:e})=>`
      <v-button
        variant='${e}'
        label='${t}'
      />
    `,"dangerOutline");y.storyName="Danger (outline)";y.args={label:"SLOW DOWN",variant:"outline-danger"};y.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const v=l(({label:t,disabled:e})=>`
      <v-button
        label='${t}'
        disabled='${e}'
      />
    `,"disabled");v.storyName="Disabled";v.args={disabled:"true",label:"RUN"};v.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const $=l(({label:t,title:e})=>`
      <v-button
        label='${t}'
        title='${e}'
      />
    `,"withTitle");$.storyName="With title";$.args={label:"RUN",title:"Run this command"};$.parameters={storySource:{source:`({
  label,
  title
}) => \`
      <v-button
        label='\${label}'
        title='\${title}'
      />
    \``}};const g=l(({label:t,icon:e,tooltip:a,disabled:r})=>`
      <v-button
        label='${t}'
        icon='${e}'
        disabled='${r}'
        tooltip='${a}'
      />
    `,"withTooltip");g.storyName="With tooltip";g.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};g.parameters={storySource:{source:`({
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
    \``}};const h=l(({label:t,icon:e})=>`
      <v-button
        label='${t}'
        icon='${e}'
      />
    `,"withIcon");h.storyName="With icon";h.args={label:"Refresh",icon:"refresh"};h.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const T=l(({icon:t,variant:e,label:a})=>`
      <v-button
        icon='${t}'
        label='${a}'
        variant='${e}'
      />
    `,"iconVariant");T.storyName="Icon variant";T.args={icon:"trash",variant:"icon",label:"Delete component"};T.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
      <v-button
        icon='\${icon}'
        label='\${label}'
        variant='\${variant}'
      />
    \``}};const s={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"]},w={Primary:"primary","Inverse Primary":"inversePrimary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With title":"withTitle","With tooltip":"withTooltip","With icon":"withIcon","Icon variant":"iconVariant"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>n(N,{mdxStoryNameToKey:w,mdxComponentAnnotations:s},n(S,null))};const M=["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"];export{M as __namedExportsOrder,p as danger,y as dangerOutline,s as default,v as disabled,T as iconVariant,m as inversePrimary,c as primary,d as success,h as withIcon,$ as withTitle,g as withTooltip};
//# sourceMappingURL=button.stories.189f50f9.js.map
