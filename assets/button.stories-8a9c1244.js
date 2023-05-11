import{M as T,C as l,S as o}from"./chunk-PCJTTTQV-f45470c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-0360cb47.js";import{u as f}from"./index-8ca1bc58.js";import"./iframe-15c5bc93.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function D(a={}){const{wrapper:t}=Object.assign({},f(),a.components);return t?n.jsx(t,{...a,children:n.jsx(i,{})}):i();function i(){const c=Object.assign({h1:"h1",p:"p"},f(),a.components);return n.jsxs(n.Fragment,{children:[n.jsx(T,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}}}),`
`,n.jsx(c.h1,{id:"button",children:"Button"}),`
`,n.jsx(c.p,{children:"For user triggered actions"}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Primary",args:{label:"Run"},children:({label:e,variant:r})=>`
<v-button
  label='${e}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Inverse Primary",args:{label:"Run",variant:"inverse-primary"},children:({label:e,variant:r})=>`
<v-button
  label='${e}'
  variant="${r}"
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Ghost",args:{label:"Walk",variant:"ghost"},children:({label:e,variant:r})=>`
<v-button
  label='${e}'
  variant="${r}"
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Success",args:{label:"Success",variant:"success"},children:({label:e,variant:r})=>`
<v-button
  variant="${r}"
  label='${e}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Danger",args:{label:"Stop",variant:"danger"},children:({label:e,variant:r})=>`
<v-button
  variant='${r}'
  label='${e}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Danger (outline)",args:{label:"Slow down",variant:"outline-danger"},children:({label:e,variant:r})=>`
<v-button
  variant='${r}'
  label='${e}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Disabled",args:{disabled:"true",label:"Run"},children:({label:e,disabled:r})=>`
<v-button
  label='${e}'
  disabled='${r}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"With title",args:{label:"Run",title:"Run this command"},children:({label:e,title:r})=>`
<v-button
  label='${e}'
  title='${r}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},children:({label:e,icon:r,tooltip:s,disabled:w})=>`
<v-button
  label='${e}'
  icon='${r}'
  disabled='${w}'
  tooltip='${s}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"With icon",args:{label:"Refresh",icon:"refresh"},children:({label:e,icon:r})=>`
<v-button
  label='${e}'
  icon='${r}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},children:({icon:e,variant:r,label:s})=>`
<v-button
  icon='${e}'
  label='${s}'
  variant='${r}'
/>
    `})}),`
`,n.jsx(l,{children:n.jsx(o,{name:"Color icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},children:({icon:e,variant:r,label:s})=>`
<v-button
  class='text-danger-dark'
  icon='${e}'
  label='${s}'
  variant='${r}'
/>
    `})})]})}}const u=({label:a,variant:t})=>`
<v-button
  label='${a}'
/>
    `;u.storyName="Primary";u.args={label:"Run"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  label='\${label}'
/>
    \``}};const d=({label:a,variant:t})=>`
<v-button
  label='${a}'
  variant="${t}"
/>
    `;d.storyName="Inverse Primary";d.args={label:"Run",variant:"inverse-primary"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  label='\${label}'
  variant="\${variant}"
/>
    \``}};const m=({label:a,variant:t})=>`
<v-button
  label='${a}'
  variant="${t}"
/>
    `;m.storyName="Ghost";m.args={label:"Walk",variant:"ghost"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  label='\${label}'
  variant="\${variant}"
/>
    \``}};const v=({label:a,variant:t})=>`
<v-button
  variant="${t}"
  label='${a}'
/>
    `;v.storyName="Success";v.args={label:"Success",variant:"success"};v.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant="\${variant}"
  label='\${label}'
/>
    \``}};const p=({label:a,variant:t})=>`
<v-button
  variant='${t}'
  label='${a}'
/>
    `;p.storyName="Danger";p.args={label:"Stop",variant:"danger"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant='\${variant}'
  label='\${label}'
/>
    \``}};const $=({label:a,variant:t})=>`
<v-button
  variant='${t}'
  label='${a}'
/>
    `;$.storyName="Danger (outline)";$.args={label:"Slow down",variant:"outline-danger"};$.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant='\${variant}'
  label='\${label}'
/>
    \``}};const h=({label:a,disabled:t})=>`
<v-button
  label='${a}'
  disabled='${t}'
/>
    `;h.storyName="Disabled";h.args={disabled:"true",label:"Run"};h.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
<v-button
  label='\${label}'
  disabled='\${disabled}'
/>
    \``}};const g=({label:a,title:t})=>`
<v-button
  label='${a}'
  title='${t}'
/>
    `;g.storyName="With title";g.args={label:"Run",title:"Run this command"};g.parameters={storySource:{source:`({
  label,
  title
}) => \`
<v-button
  label='\${label}'
  title='\${title}'
/>
    \``}};const y=({label:a,icon:t,tooltip:i,disabled:c})=>`
<v-button
  label='${a}'
  icon='${t}'
  disabled='${c}'
  tooltip='${i}'
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
    \``}};const x=({label:a,icon:t})=>`
<v-button
  label='${a}'
  icon='${t}'
/>
    `;x.storyName="With icon";x.args={label:"Refresh",icon:"refresh"};x.parameters={storySource:{source:`({
  label,
  icon
}) => \`
<v-button
  label='\${label}'
  icon='\${icon}'
/>
    \``}};const j=({icon:a,variant:t,label:i})=>`
<v-button
  icon='${a}'
  label='${i}'
  variant='${t}'
/>
    `;j.storyName="Icon variant";j.args={icon:"trash",variant:"icon",label:"Delete component"};j.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
<v-button
  icon='\${icon}'
  label='\${label}'
  variant='\${variant}'
/>
    \``}};const S=({icon:a,variant:t,label:i})=>`
<v-button
  class='text-danger-dark'
  icon='${a}'
  label='${i}'
  variant='${t}'
/>
    `;S.storyName="Color icon variant";S.args={icon:"trash",variant:"icon",label:"Delete component"};S.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
<v-button
  class='text-danger-dark'
  icon='\${icon}'
  label='\${label}'
  variant='\${variant}'
/>
    \``}};const b={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},tags:["stories-mdx"],includeStories:["primary","inversePrimary","ghost","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant","colorIconVariant"]};b.parameters=b.parameters||{};b.parameters.docs={...b.parameters.docs||{},page:D};const H=["primary","inversePrimary","ghost","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant","colorIconVariant"];export{H as __namedExportsOrder,S as colorIconVariant,p as danger,$ as dangerOutline,b as default,h as disabled,m as ghost,j as iconVariant,d as inversePrimary,u as primary,v as success,x as withIcon,g as withTitle,y as withTooltip};
//# sourceMappingURL=button.stories-8a9c1244.js.map
