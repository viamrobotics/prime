import{M as d,C as h,S as b}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as l}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function y(t={}){const{wrapper:n}=Object.assign({},l(),t.components);return n?e.exports.jsx(n,{...t,children:e.exports.jsx(o,{})}):o();function o(){const a=Object.assign({h1:"h1"},l(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(d,{title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}}}),`
`,e.exports.jsx(a.h1,{children:"Vector Input"}),`
`,e.exports.jsx(h,{children:e.exports.jsx(b,{name:"3 Dimension",args:{dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1},children:({type:s,label:i,placeholder:u,value:m,step:c})=>`
      <v-vector-input
        type='${s}'
        label='${i}'
        placeholder='${u}'
        value='${m}'
        step='${c}'
      />
    `})})]})}}const p=({type:t,label:n,placeholder:o,value:a,step:s})=>`
      <v-vector-input
        type='${t}'
        label='${n}'
        placeholder='${o}'
        value='${a}'
        step='${s}'
      />
    `;p.storyName="3 Dimension";p.args={dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1};p.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  step
}) => \`
      <v-vector-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
        step='\${step}'
      />
    \``}};const r={title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},tags:["mdx"],includeStories:["_3Dimension"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:y};const L=["_3Dimension"];export{p as _3Dimension,L as __namedExportsOrder,r as default};
//# sourceMappingURL=vector-input.stories-85043806.js.map
