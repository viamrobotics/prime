import{M as x,C as s,S as i}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as f}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function $(t={}){const{wrapper:a}=Object.assign({},f(),t.components);return a?e.exports.jsx(a,{...t,children:e.exports.jsx(o,{})}):o();function o(){const r=Object.assign({h1:"h1",p:"p"},f(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(x,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}}}),`
`,e.exports.jsx(r.h1,{children:"Switch"}),`
`,e.exports.jsx(r.p,{children:"Used to handle binary input."}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Default",args:{value:"off"},children:({value:n})=>`
      <v-switch
        value='${n}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Annotated",args:{value:"off",variant:"annotated"},children:({value:n,variant:l})=>`
      <v-switch
        value='${n}'
        variant='${l}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"With label",args:{value:"off",label:"Lunchtime"},children:({value:n,label:l})=>`
      <v-switch
        value='${n}'
        label='${l}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},children:({value:n,variant:l,disabled:u})=>`
      <v-switch
        value='${n}'
        variant='${l}'
        disabled='${u}'
      />
    `})}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},children:({value:n,variant:l,tooltip:u,label:b})=>`
      <v-switch
        value='${n}'
        variant='${l}'
        tooltip='${u}'
        label='${b}'
      />
    `})})]})}}const d=({value:t})=>`
      <v-switch
        value='${t}'
      />
    `;d.storyName="Default";d.args={value:"off"};d.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const c=({value:t,variant:a})=>`
      <v-switch
        value='${t}'
        variant='${a}'
      />
    `;c.storyName="Annotated";c.args={value:"off",variant:"annotated"};c.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const v=({value:t,label:a})=>`
      <v-switch
        value='${t}'
        label='${a}'
      />
    `;v.storyName="With label";v.args={value:"off",label:"Lunchtime"};v.parameters={storySource:{source:`({
  value,
  label
}) => \`
      <v-switch
        value='\${value}'
        label='\${label}'
      />
    \``}};const h=({value:t,variant:a,disabled:o})=>`
      <v-switch
        value='${t}'
        variant='${a}'
        disabled='${o}'
      />
    `;h.storyName="Disabled";h.args={value:"off",variant:"labeled",disabled:"true"};h.parameters={storySource:{source:`({
  value,
  variant,
  disabled
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        disabled='\${disabled}'
      />
    \``}};const m=({value:t,variant:a,tooltip:o,label:r})=>`
      <v-switch
        value='${t}'
        variant='${a}'
        tooltip='${o}'
        label='${r}'
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
    \``}};const p={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},tags:["mdx"],includeStories:["defaultStory","annotated","withLabel","disabled","tooltip"]};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:$};const U=["defaultStory","annotated","withLabel","disabled","tooltip"];export{U as __namedExportsOrder,c as annotated,p as default,d as defaultStory,h as disabled,m as tooltip,v as withLabel};
//# sourceMappingURL=switch.stories-2ba243a5.js.map
