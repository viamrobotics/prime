import"./jsx-runtime.fc73e4b3.js";import{c as e,A as S,M as T,C as o,S as l}from"./Props.01c5db80.js";import"./iframe.c07a5832.js";import"./es.map.constructor.00e0fa62.js";import"./es.number.to-fixed.3318625d.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},i.apply(this,arguments)}const x={},f="wrapper";function g({components:t,...n}){return e(f,i({},x,n,{components:t,mdxType:"MDXLayout"}),e(T,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},mdxType:"Meta"}),e("h1",null,"Button"),e("p",null,"For user triggered actions"),e(o,{mdxType:"Canvas"},e(l,{name:"Primary",args:{label:"RUN"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"Inverse Primary",args:{label:"RUN",variant:"inverse-primary"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        label='${a}'
        variant="${r}"
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"Success",args:{label:"SUCCESS",variant:"success"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant="${r}"
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"Disabled",args:{disabled:"true",label:"RUN"},mdxType:"Story"},({label:a,disabled:r})=>`
      <v-button
        label='${a}'
        disabled='${r}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"With icon",args:{label:"Refresh",icon:"refresh"},mdxType:"Story"},({label:a,icon:r})=>`
      <v-button
        label='${a}'
        icon='${r}'
      />
    `)),e(o,{mdxType:"Canvas"},e(l,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},mdxType:"Story"},({label:a,icon:r,tooltip:$,disabled:h})=>`
      <v-button
        label='${a}'
        icon='${r}'
        disabled='${h}'
        tooltip='${$}'
      />
    `)))}g.isMDXComponent=!0;const b=({label:t,variant:n})=>`
      <v-button
        label='${t}'
      />
    `;b.storyName="Primary";b.args={label:"RUN"};b.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const u=({label:t,variant:n})=>`
      <v-button
        label='${t}'
        variant="${n}"
      />
    `;u.storyName="Inverse Primary";u.args={label:"RUN",variant:"inverse-primary"};u.parameters={storySource:{source:`({
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
    \``}};const d=({label:t,variant:n})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;d.storyName="Danger";d.args={label:"STOP",variant:"danger"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=({label:t,variant:n})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;m.storyName="Danger (outline)";m.args={label:"SLOW DOWN",variant:"outline-danger"};m.parameters={storySource:{source:`({
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
    \``}};const y=({label:t,icon:n})=>`
      <v-button
        label='${t}'
        icon='${n}'
      />
    `;y.storyName="With icon";y.args={label:"Refresh",icon:"refresh"};y.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const v=({label:t,icon:n,tooltip:a,disabled:r})=>`
      <v-button
        label='${t}'
        icon='${n}'
        disabled='${r}'
        tooltip='${a}'
      />
    `;v.storyName="With tooltip";v.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};v.parameters={storySource:{source:`({
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
    \``}};const s={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip"]},C={Primary:"primary","Inverse Primary":"inversePrimary",Success:"success",Danger:"danger","Danger (outline)":"dangerOutline",Disabled:"disabled","With icon":"withIcon","With tooltip":"withTooltip"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(S,{mdxStoryNameToKey:C,mdxComponentAnnotations:s},e(g,null))};const W=["primary","inversePrimary","success","danger","dangerOutline","disabled","withIcon","withTooltip"];export{W as __namedExportsOrder,d as danger,m as dangerOutline,s as default,p as disabled,u as inversePrimary,b as primary,c as success,y as withIcon,v as withTooltip};
//# sourceMappingURL=button.stories.8ac29a4a.js.map
