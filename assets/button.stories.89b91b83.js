import"./jsx-runtime.d3dc9ec1.js";import{c as a,A as T,M as x,C as o,S as i}from"./Props.3806e6d4.js";import"./iframe.c7f61d24.js";import"./es.map.constructor.345c58da.js";import"./es.number.to-fixed.c899f12d.js";function l(){return l=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},l.apply(this,arguments)}const f={},C="wrapper";function $({components:t,...n}){return a(C,l({},f,n,{components:t,mdxType:"MDXLayout"}),a(x,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),a("h1",null,"Button"),a("p",null,"For user triggered actions"),a(o,{mdxType:"Canvas"},a(i,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:e,variant:r})=>`
      <v-button
        label='${e}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Inverse Primary",args:{label:"RUN",variant:"inverse-primary"},mdxType:"Story"},({label:e,variant:r})=>`
      <v-button
        label='${e}'
        variant="${r}"
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:e,variant:r})=>`
      <v-button
        variant="${r}"
        label='${e}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:e,variant:r})=>`
      <v-button
        variant='${r}'
        label='${e}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:e,variant:r})=>`
      <v-button
        variant='${r}'
        label='${e}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:e,disabled:r})=>`
      <v-button
        label='${e}'
        disabled='${r}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:e,icon:r})=>`
      <v-button
        label='${e}'
        icon='${r}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},mdxType:"Story"},({label:e,icon:r,tooltip:h,disabled:S})=>`
      <v-button
        label='${e}'
        icon='${r}'
        disabled='${S}'
        tooltip='${h}'
      />
    `)),a(o,{mdxType:"Canvas"},a(i,{name:"Icon variant",args:{icon:"trash",variant:"icon"},mdxType:"Story"},({icon:e,variant:r})=>`
      <v-button
        icon='${e}'
        variant='${r}'
      />
    `)))}$.isMDXComponent=!0;const u=({label:t,variant:n})=>`
      <v-button
        label='${t}'
      />
    `;u.storyName="Primary";u.args={label:"RUN"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const b=({label:t,variant:n})=>`
      <v-button
        label='${t}'
        variant="${n}"
      />
    `;b.storyName="Inverse Primary";b.args={label:"RUN",variant:"inverse-primary"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
        variant="\${variant}"
      />
    \``}};const c=({label:t,variant:n})=>`
      <v-button
        variant="${n}"
        label='${t}'
      />
    `;c.storyName="Success";c.args={label:"SUCCESS",variant:"success"};c.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant="\${variant}"
        label='\${label}'
      />
    \``}};const m=({label:t,variant:n})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;m.storyName="Danger";m.args={label:"STOP",variant:"danger"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const d=({label:t,variant:n})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;d.storyName="Danger (outline)";d.args={label:"SLOW DOWN",variant:"outline-danger"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const p=({label:t,disabled:n})=>`
      <v-button
        label='${t}'
        disabled='${n}'
      />
    `;p.storyName="Disabled";p.args={disabled:"true",label:"RUN"};p.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const v=({label:t,icon:n})=>`
      <v-button
        label='${t}'
        icon='${n}'
      />
    `;v.storyName="With icon";v.args={label:"Refresh",icon:"refresh"};v.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const y=({label:t,icon:n,tooltip:e,disabled:r})=>`
      <v-button
        label='${t}'
        icon='${n}'
        disabled='${r}'
        tooltip='${e}'
      />
    `;y.storyName="With tooltip";y.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};y.parameters={storySource:{source:`({
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
    \``}};const g=({icon:t,variant:n})=>`
      <v-button
        icon='${t}'
        variant='${n}'
      />
    `;g.storyName="Icon variant";g.args={icon:"trash",variant:"icon"};g.parameters={storySource:{source:`({
  icon,
  variant
}) => \`
      <v-button
        icon='\${icon}'
        variant='\${variant}'
      />
    \``}};const s={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip","iconVariant"]},N={Primary:"primary","Inverse Primary":"inversePrimary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon","With tooltip":"withTooltip","Icon variant":"iconVariant"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>a(T,{mdxStoryNameToKey:N,mdxComponentAnnotations:s},a($,null))};const V=["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip","iconVariant"];export{V as __namedExportsOrder,m as danger,d as dangerOutline,s as default,p as disabled,g as iconVariant,b as inversePrimary,u as primary,c as success,v as withIcon,y as withTooltip};
//# sourceMappingURL=button.stories.89b91b83.js.map
