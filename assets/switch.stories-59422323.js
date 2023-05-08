import{M as w,C as r,S as u}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-a482d093.js";import{u as y}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function g(a={}){const{wrapper:t}=Object.assign({},y(),a.components);return t?e.jsx(t,{...a,children:e.jsx(o,{})}):o();function o(){const i=Object.assign({h1:"h1",p:"p"},y(),a.components);return e.jsxs(e.Fragment,{children:[e.jsx(w,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}}}),`
`,e.jsx(i.h1,{id:"switch",children:"Switch"}),`
`,e.jsx(i.p,{children:"Used to handle binary input."}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Default",args:{value:"off"},children:({value:l})=>`
<v-switch
  value='${l}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Annotated",args:{value:"off",variant:"annotated"},children:({value:l,variant:n})=>`
<v-switch
  value='${l}'
  variant='${n}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"With label",args:{value:"off",label:"Lunchtime"},children:({value:l,label:n})=>`
<v-switch
  value='${l}'
  label='${n}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Label position",args:{value:"off",label:"Lunchtime",labelposition:"left"},children:({value:l,label:n,labelposition:s})=>`
<v-switch
  value='${l}'
  label='${n}'
  labelposition='${s}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true",label:"disabled"},children:({value:l,variant:n,disabled:s,label:d})=>`
<v-switch
  value='${l}'
  variant='${n}'
  disabled='${s}'
  label='${d}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},children:({value:l,variant:n,tooltip:s,label:d})=>`
<v-switch
  value='${l}'
  variant='${n}'
  tooltip='${s}'
  label='${d}'
/>
    `})}),`
`,e.jsx(r,{children:e.jsx(u,{name:"Readonly",args:{value:"on",variant:"annotated",readonly:"true",label:"readonly"},children:({value:l,variant:n,readonly:s,label:d})=>`
<v-switch
  value='${l}'
  variant='${n}'
  readonly='${s}'
  label='${d}'
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
    \``}};const b=({value:a,label:t})=>`
<v-switch
  value='${a}'
  label='${t}'
/>
    `;b.storyName="With label";b.args={value:"off",label:"Lunchtime"};b.parameters={storySource:{source:`({
  value,
  label
}) => \`
<v-switch
  value='\${value}'
  label='\${label}'
/>
    \``}};const h=({value:a,label:t,labelposition:o})=>`
<v-switch
  value='${a}'
  label='${t}'
  labelposition='${o}'
/>
    `;h.storyName="Label position";h.args={value:"off",label:"Lunchtime",labelposition:"left"};h.parameters={storySource:{source:`({
  value,
  label,
  labelposition
}) => \`
<v-switch
  value='\${value}'
  label='\${label}'
  labelposition='\${labelposition}'
/>
    \``}};const m=({value:a,variant:t,disabled:o,label:i})=>`
<v-switch
  value='${a}'
  variant='${t}'
  disabled='${o}'
  label='${i}'
/>
    `;m.storyName="Disabled";m.args={value:"off",variant:"labeled",disabled:"true",label:"disabled"};m.parameters={storySource:{source:`({
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
    \``}};const f=({value:a,variant:t,tooltip:o,label:i})=>`
<v-switch
  value='${a}'
  variant='${t}'
  tooltip='${o}'
  label='${i}'
/>
    `;f.storyName="Tooltip";f.args={value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."};f.parameters={storySource:{source:`({
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
    \``}};const $=({value:a,variant:t,readonly:o,label:i})=>`
<v-switch
  value='${a}'
  variant='${t}'
  readonly='${o}'
  label='${i}'
/>
    `;$.storyName="Readonly";$.args={value:"on",variant:"annotated",readonly:"true",label:"readonly"};$.parameters={storySource:{source:`({
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
    \``}};const c={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},tags:["stories-mdx"],includeStories:["defaultStory","annotated","withLabel","labelPosition","disabled","tooltip","readonly"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:g};const C=["defaultStory","annotated","withLabel","labelPosition","disabled","tooltip","readonly"];export{C as __namedExportsOrder,v as annotated,c as default,p as defaultStory,m as disabled,h as labelPosition,$ as readonly,f as tooltip,b as withLabel};
//# sourceMappingURL=switch.stories-59422323.js.map
