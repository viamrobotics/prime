import{M as f,C as o,S as l}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as j}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function w(t={}){const{wrapper:n}=Object.assign({},j(),t.components);return n?e.exports.jsx(n,{...t,children:e.exports.jsx(s,{})}):s();function s(){const i=Object.assign({h1:"h1",p:"p"},j(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(f,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}}}),`
`,e.exports.jsx(i.h1,{children:"Button"}),`
`,e.exports.jsx(i.p,{children:"For user triggered actions"}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Primary",args:{label:"Run"},children:({label:a,variant:r})=>`
      <v-button
        label='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Inverse Primary",args:{label:"Run",variant:"inverse-primary"},children:({label:a,variant:r})=>`
      <v-button
        label='${a}'
        variant="${r}"
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Success",args:{label:"Success",variant:"success"},children:({label:a,variant:r})=>`
      <v-button
        variant="${r}"
        label='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Danger",args:{label:"Stop",variant:"danger"},children:({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Danger (outline)",args:{label:"Slow down",variant:"outline-danger"},children:({label:a,variant:r})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Disabled",args:{disabled:"true",label:"Run"},children:({label:a,disabled:r})=>`
      <v-button
        label='${a}'
        disabled='${r}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"With title",args:{label:"Run",title:"Run this command"},children:({label:a,title:r})=>`
      <v-button
        label='${a}'
        title='${r}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"With tooltip",args:{label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"},children:({label:a,icon:r,tooltip:b,disabled:S})=>`
      <v-button
        label='${a}'
        icon='${r}'
        disabled='${S}'
        tooltip='${b}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"With icon",args:{label:"Refresh",icon:"refresh"},children:({label:a,icon:r})=>`
      <v-button
        label='${a}'
        icon='${r}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Icon variant",args:{icon:"trash",variant:"icon",label:"Delete component"},children:({icon:a,variant:r,label:b})=>`
      <v-button
        icon='${a}'
        label='${b}'
        variant='${r}'
      />
    `})})]})}}const u=({label:t,variant:n})=>`
      <v-button
        label='${t}'
      />
    `;u.storyName="Primary";u.args={label:"Run"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
      />
    \``}};const p=({label:t,variant:n})=>`
      <v-button
        label='${t}'
        variant="${n}"
      />
    `;p.storyName="Inverse Primary";p.args={label:"Run",variant:"inverse-primary"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        label='\${label}'
        variant="\${variant}"
      />
    \``}};const m=({label:t,variant:n})=>`
      <v-button
        variant="${n}"
        label='${t}'
      />
    `;m.storyName="Success";m.args={label:"Success",variant:"success"};m.parameters={storySource:{source:`({
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
    `;d.storyName="Danger";d.args={label:"Stop",variant:"danger"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const v=({label:t,variant:n})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;v.storyName="Danger (outline)";v.args={label:"Slow down",variant:"outline-danger"};v.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const $=({label:t,disabled:n})=>`
      <v-button
        label='${t}'
        disabled='${n}'
      />
    `;$.storyName="Disabled";$.args={disabled:"true",label:"Run"};$.parameters={storySource:{source:`({
  label,
  disabled
}) => \`
      <v-button
        label='\${label}'
        disabled='\${disabled}'
      />
    \``}};const h=({label:t,title:n})=>`
      <v-button
        label='${t}'
        title='${n}'
      />
    `;h.storyName="With title";h.args={label:"Run",title:"Run this command"};h.parameters={storySource:{source:`({
  label,
  title
}) => \`
      <v-button
        label='\${label}'
        title='\${title}'
      />
    \``}};const x=({label:t,icon:n,tooltip:s,disabled:i})=>`
      <v-button
        label='${t}'
        icon='${n}'
        disabled='${i}'
        tooltip='${s}'
      />
    `;x.storyName="With tooltip";x.args={label:"Hug",icon:"naught",disabled:"true",tooltip:"Hugging is disabled"};x.parameters={storySource:{source:`({
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
    \``}};const g=({label:t,icon:n})=>`
      <v-button
        label='${t}'
        icon='${n}'
      />
    `;g.storyName="With icon";g.args={label:"Refresh",icon:"refresh"};g.parameters={storySource:{source:`({
  label,
  icon
}) => \`
      <v-button
        label='\${label}'
        icon='\${icon}'
      />
    \``}};const y=({icon:t,variant:n,label:s})=>`
      <v-button
        icon='${t}'
        label='${s}'
        variant='${n}'
      />
    `;y.storyName="Icon variant";y.args={icon:"trash",variant:"icon",label:"Delete component"};y.parameters={storySource:{source:`({
  icon,
  variant,
  label
}) => \`
      <v-button
        icon='\${icon}'
        label='\${label}'
        variant='\${variant}'
      />
    \``}};const c={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},type:{description:"The type attribute for the button",control:"select",options:["button","submit","reset"],table:{defaultValue:{summary:"button"}}}},tags:["mdx"],includeStories:["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:w};const z=["primary","inversePrimary","success","danger","dangerOutline","disabled","withTitle","withTooltip","withIcon","iconVariant"];export{z as __namedExportsOrder,d as danger,v as dangerOutline,c as default,$ as disabled,y as iconVariant,p as inversePrimary,u as primary,m as success,g as withIcon,h as withTitle,x as withTooltip};
//# sourceMappingURL=button.stories-365838f1.js.map
