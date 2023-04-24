import{M as f,C as l,S as i}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-cb192941.js";import{u as j}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function w(n={}){const{wrapper:t}=Object.assign({},j(),n.components);return t?e.jsx(t,{...n,children:e.jsx(o,{})}):o();function o(){const s=Object.assign({h1:"h1",p:"p"},j(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}}}),`
`,e.jsx(s.h1,{id:"button",children:"Button"}),`
`,e.jsx(s.p,{children:"For user triggered actions"}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Primary",args:{label:"Run"},children:({label:a,variant:r})=>`
<v-button
  label='${a}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Inverse Primary",args:{label:"Run",variant:"inverse-primary"},children:({label:a,variant:r})=>`
<v-button
  label='${a}'
  variant="${r}"
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Success",args:{label:"Success",variant:"success"},children:({label:a,variant:r})=>`
<v-button
  variant="${r}"
  label='${a}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Danger",args:{label:"Stop",variant:"danger"},children:({label:a,variant:r})=>`
<v-button
  variant='${r}'
  label='${a}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Danger (outline)",args:{label:"Slow down",variant:"outline-danger"},children:({label:a,variant:r})=>`
<v-button
  variant='${r}'
  label='${a}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Disabled",args:{disabled:"true",label:"Run"},children:({label:a,disabled:r})=>`
<v-button
  label='${a}'
  disabled='${r}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"With title",args:{label:"Run",title:"Run this command"},children:({label:a,title:r})=>`
<v-button
  label='${a}'
  title='${r}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},children:({label:a,icon:r,tooltip:b,disabled:S})=>`
<v-button
  label='${a}'
  icon='${r}'
  disabled='${S}'
  tooltip='${b}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"With icon",args:{label:"Refresh",icon:"refresh"},children:({label:a,icon:r})=>`
<v-button
  label='${a}'
  icon='${r}'
/>
    `})}),`
`,e.jsx(l,{children:e.jsx(i,{name:"Icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},children:({icon:a,variant:r,label:b})=>`
<v-button
  icon='${a}'
  label='${b}'
  variant='${r}'
/>
    `})})]})}}const u=({label:n,variant:t})=>`
<v-button
  label='${n}'
/>
    `;u.storyName="Primary";u.args={label:"Run"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  label='\${label}'
/>
    \``}};const d=({label:n,variant:t})=>`
<v-button
  label='${n}'
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
    \``}};const m=({label:n,variant:t})=>`
<v-button
  variant="${t}"
  label='${n}'
/>
    `;m.storyName="Success";m.args={label:"Success",variant:"success"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant="\${variant}"
  label='\${label}'
/>
    \``}};const p=({label:n,variant:t})=>`
<v-button
  variant='${t}'
  label='${n}'
/>
    `;p.storyName="Danger";p.args={label:"Stop",variant:"danger"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant='\${variant}'
  label='\${label}'
/>
    \``}};const v=({label:n,variant:t})=>`
<v-button
  variant='${t}'
  label='${n}'
/>
    `;v.storyName="Danger (outline)";v.args={label:"Slow down",variant:"outline-danger"};v.parameters={storySource:{source:`({
  label,
  variant
}) => \`
<v-button
  variant='\${variant}'
  label='\${label}'
/>
    \``}};const $=({label:n,disabled:t})=>`
<v-button
  label='${n}'
  disabled='${t}'
/>
    `;$.storyName="Disabled";$.args={disabled:"true",label:"Run"};$.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
<v-button
  label='\${label}'
  disabled='\${disabled}'
/>
    \``}};const h=({label:n,title:t})=>`
<v-button
  label='${n}'
  title='${t}'
/>
    `;h.storyName="With title";h.args={label:"Run",title:"Run this command"};h.parameters={storySource:{source:`({
  label,
  title
}) => \`
<v-button
  label='\${label}'
  title='\${title}'
/>
    \``}};const g=({label:n,icon:t,tooltip:o,disabled:s})=>`
<v-button
  label='${n}'
  icon='${t}'
  disabled='${s}'
  tooltip='${o}'
/>
    `;g.storyName="With tooltip";g.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};g.parameters={storySource:{source:`({
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
    \``}};const y=({label:n,icon:t})=>`
<v-button
  label='${n}'
  icon='${t}'
/>
    `;y.storyName="With icon";y.args={label:"Refresh",icon:"refresh"};y.parameters={storySource:{source:`({
  label,
  icon
}) => \`
<v-button
  label='\${label}'
  icon='\${icon}'
/>
    \``}};const x=({icon:n,variant:t,label:o})=>`
<v-button
  icon='${n}'
  label='${o}'
  variant='${t}'
/>
    `;x.storyName="Icon variant";x.args={icon:"trash",variant:"icon",label:"Delete component"};x.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
<v-button
  icon='\${icon}'
  label='\${label}'
  variant='\${variant}'
/>
    \``}};const c={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},tags:["stories-mdx"],includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:w};const E=["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"];export{E as __namedExportsOrder,p as danger,v as dangerOutline,c as default,$ as disabled,x as iconVariant,d as inversePrimary,u as primary,m as success,y as withIcon,h as withTitle,g as withTooltip};
//# sourceMappingURL=button.stories-bf87cd9e.js.map
