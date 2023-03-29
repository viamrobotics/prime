import{M as x,C as r,S as p}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as y}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function w(a={}){const{wrapper:t}=Object.assign({},y(),a.components);return t?e.exports.jsx(t,{...a,children:e.exports.jsx(o,{})}):o();function o(){const s=Object.assign({h1:"h1",p:"p"},y(),a.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(x,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}}}),`
`,e.exports.jsx(s.h1,{children:"Switch"}),`
`,e.exports.jsx(s.p,{children:"Used to handle binary input."}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Default",args:{value:"off"},children:({value:l})=>`
      <v-switch
        value='${l}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Annotated",args:{value:"off",variant:"annotated"},children:({value:l,variant:n})=>`
      <v-switch
        value='${l}'
        variant='${n}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"With label",args:{value:"off",label:"Lunchtime"},children:({value:l,label:n})=>`
      <v-switch
        value='${l}'
        label='${n}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Label position",args:{value:"off",label:"Lunchtime",labelposition:"left"},children:({value:l,label:n,labelposition:i})=>`
      <v-switch
        value='${l}'
        label='${n}'
        labelposition='${i}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true",label:"disabled"},children:({value:l,variant:n,disabled:i,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        disabled='${i}'
        label='${u}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},children:({value:l,variant:n,tooltip:i,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        tooltip='${i}'
        label='${u}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Readonly",args:{value:"on",variant:"annotated",readonly:"true",label:"readonly"},children:({value:l,variant:n,readonly:i,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        readonly='${i}'
        label='${u}'
      />
    `})})]})}}const c=({value:a})=>`
      <v-switch
        value='${a}'
      />
    `;c.storyName="Default";c.args={value:"off"};c.parameters={storySource:{source:`({
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
    \``}};const m=({value:a,variant:t,disabled:o,label:s})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        disabled='${o}'
        label='${s}'
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
    \``}};const f=({value:a,variant:t,tooltip:o,label:s})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        tooltip='${o}'
        label='${s}'
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
    \``}};const $=({value:a,variant:t,readonly:o,label:s})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        readonly='${o}'
        label='${s}'
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
    \``}};const d={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position of the label",control:"select",options:["top","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},tags:["mdx"],includeStories:["defaultStory","annotated","withLabel","labelPosition","disabled","tooltip","readonly"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:w};const k=["defaultStory","annotated","withLabel","labelPosition","disabled","tooltip","readonly"];export{k as __namedExportsOrder,v as annotated,d as default,c as defaultStory,m as disabled,h as labelPosition,$ as readonly,f as tooltip,b as withLabel};
//# sourceMappingURL=switch.stories-a5182cba.js.map
