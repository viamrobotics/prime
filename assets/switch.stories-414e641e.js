import{M as y,C as i,S as r}from"./chunk-PCJTTTQV-f45470c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-0360cb47.js";import{u as $}from"./index-8ca1bc58.js";import"./iframe-15c5bc93.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function w(a={}){const{wrapper:t}=Object.assign({},$(),a.components);return t?e.jsx(t,{...a,children:e.jsx(o,{})}):o();function o(){const s=Object.assign({h1:"h1",p:"p"},$(),a.components);return e.jsxs(e.Fragment,{children:[e.jsx(y,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}}}),`
`,e.jsx(s.h1,{id:"switch",children:"Switch"}),`
`,e.jsx(s.p,{children:"Used to handle binary input."}),`
`,e.jsx(i,{children:e.jsx(r,{name:"Default",args:{value:"off"},children:({value:l})=>`
<v-switch
  value='${l}'
/>
    `})}),`
`,e.jsx(i,{children:e.jsx(r,{name:"Annotated",args:{value:"off",variant:"annotated"},children:({value:l,variant:n})=>`
<v-switch
  value='${l}'
  variant='${n}'
/>
    `})}),`
`,e.jsx(i,{children:e.jsx(r,{name:"With label",args:{value:"off",label:"Lunchtime"},children:({value:l,label:n})=>`
<v-switch
  value='${l}'
  label='${n}'
/>
    `})}),`
`,e.jsx(i,{children:e.jsx(r,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true",label:"disabled"},children:({value:l,variant:n,disabled:d,label:u})=>`
<v-switch
  value='${l}'
  variant='${n}'
  disabled='${d}'
  label='${u}'
/>
    `})}),`
`,e.jsx(i,{children:e.jsx(r,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},children:({value:l,variant:n,tooltip:d,label:u})=>`
<v-switch
  value='${l}'
  variant='${n}'
  tooltip='${d}'
  label='${u}'
/>
    `})}),`
`,e.jsx(i,{children:e.jsx(r,{name:"Readonly",args:{value:"on",variant:"annotated",readonly:"true",label:"readonly"},children:({value:l,variant:n,readonly:d,label:u})=>`
<v-switch
  value='${l}'
  variant='${n}'
  readonly='${d}'
  label='${u}'
/>
    `})})]})}}const p=({value:a})=>`
<v-switch
  value='${a}'
/>
    `;p.storyName="Default";p.args={value:"off"};p.parameters={storySource:{source:`({
  value
}) => \`
<v-switch
  value='\${value}'
/>
    \``}};const v=({value:a,variant:t})=>`
<v-switch
  value='${a}'
  variant='${t}'
/>
    `;v.storyName="Annotated";v.args={value:"off",variant:"annotated"};v.parameters={storySource:{source:`({
  value,
  variant
}) => \`
<v-switch
  value='\${value}'
  variant='\${variant}'
/>
    \``}};const h=({value:a,label:t})=>`
<v-switch
  value='${a}'
  label='${t}'
/>
    `;h.storyName="With label";h.args={value:"off",label:"Lunchtime"};h.parameters={storySource:{source:`({
  value,
  label
}) => \`
<v-switch
  value='\${value}'
  label='\${label}'
/>
    \``}};const b=({value:a,variant:t,disabled:o,label:s})=>`
<v-switch
  value='${a}'
  variant='${t}'
  disabled='${o}'
  label='${s}'
/>
    `;b.storyName="Disabled";b.args={value:"off",variant:"labeled",disabled:"true",label:"disabled"};b.parameters={storySource:{source:`({
  value,
  variant,
  disabled,
  label
}) => \`
<v-switch
  value='\${value}'
  variant='\${variant}'
  disabled='\${disabled}'
  label='\${label}'
/>
    \``}};const m=({value:a,variant:t,tooltip:o,label:s})=>`
<v-switch
  value='${a}'
  variant='${t}'
  tooltip='${o}'
  label='${s}'
/>
    `;m.storyName="Tooltip";m.args={value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."};m.parameters={storySource:{source:`({
  value,
  variant,
  tooltip,
  label
}) => \`
<v-switch
  value='\${value}'
  variant='\${variant}'
  tooltip='\${tooltip}'
  label='\${label}'
/>
    \``}};const f=({value:a,variant:t,readonly:o,label:s})=>`
<v-switch
  value='${a}'
  variant='${t}'
  readonly='${o}'
  label='${s}'
/>
    `;f.storyName="Readonly";f.args={value:"on",variant:"annotated",readonly:"true",label:"readonly"};f.parameters={storySource:{source:`({
  value,
  variant,
  readonly,
  label
}) => \`
<v-switch
  value='\${value}'
  variant='\${variant}'
  readonly='\${readonly}'
  label='\${label}'
/>
    \``}};const c={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},tags:["stories-mdx"],includeStories:["defaultStory","annotated","withLabel","disabled","tooltip","readonly"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:w};const W=["defaultStory","annotated","withLabel","disabled","tooltip","readonly"];export{W as __namedExportsOrder,v as annotated,c as default,p as defaultStory,b as disabled,f as readonly,m as tooltip,h as withLabel};
//# sourceMappingURL=switch.stories-414e641e.js.map
