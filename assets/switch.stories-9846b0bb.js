import{M as y,C as s,S as i}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as $}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function x(a={}){const{wrapper:t}=Object.assign({},$(),a.components);return t?e.exports.jsx(t,{...a,children:e.exports.jsx(o,{})}):o();function o(){const r=Object.assign({h1:"h1",p:"p"},$(),a.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(y,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}}}),`
`,e.exports.jsx(r.h1,{children:"Switch"}),`
`,e.exports.jsx(r.p,{children:"Used to handle binary input."}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Default",args:{value:"off"},children:({value:l})=>`
      <v-switch
        value='${l}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Annotated",args:{value:"off",variant:"annotated"},children:({value:l,variant:n})=>`
      <v-switch
        value='${l}'
        variant='${n}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"With label",args:{value:"off",label:"Lunchtime"},children:({value:l,label:n})=>`
      <v-switch
        value='${l}'
        label='${n}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true",label:"disabled"},children:({value:l,variant:n,disabled:d,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        disabled='${d}'
        label='${u}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},children:({value:l,variant:n,tooltip:d,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        tooltip='${d}'
        label='${u}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Readonly",args:{value:"on",variant:"annotated",readonly:"true",label:"readonly"},children:({value:l,variant:n,readonly:d,label:u})=>`
      <v-switch
        value='${l}'
        variant='${n}'
        readonly='${d}'
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
    \``}};const m=({value:a,variant:t,disabled:o,label:r})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        disabled='${o}'
        label='${r}'
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
    \``}};const b=({value:a,variant:t,tooltip:o,label:r})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        tooltip='${o}'
        label='${r}'
      />
    `;b.storyName="Tooltip";b.args={value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."};b.parameters={storySource:{source:`({
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
    \``}};const f=({value:a,variant:t,readonly:o,label:r})=>`
      <v-switch
        value='${a}'
        variant='${t}'
        readonly='${o}'
        label='${r}'
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
    \``}};const p={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},tags:["mdx"],includeStories:["defaultStory","annotated","withLabel","disabled","tooltip","readonly"]};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:x};const k=["defaultStory","annotated","withLabel","disabled","tooltip","readonly"];export{k as __namedExportsOrder,v as annotated,p as default,c as defaultStory,m as disabled,f as readonly,b as tooltip,h as withLabel};
//# sourceMappingURL=switch.stories-9846b0bb.js.map
