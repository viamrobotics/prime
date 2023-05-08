import{M as d,C as h,S as b}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-a482d093.js";import{u as i}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function y(t={}){const{wrapper:n}=Object.assign({},i(),t.components);return n?e.jsx(n,{...t,children:e.jsx(a,{})}):a();function a(){const r=Object.assign({h1:"h1"},i(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}}}),`
`,e.jsx(r.h1,{id:"vector-input",children:"Vector Input"}),`
`,e.jsx(h,{children:e.jsx(b,{name:"3 Dimension",args:{dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1},children:({type:l,label:p,placeholder:u,value:m,step:c})=>`
<v-vector-input
  type='${l}'
  label='${p}'
  placeholder='${u}'
  value='${m}'
  step='${c}'
/>
    `})})]})}}const s=({type:t,label:n,placeholder:a,value:r,step:l})=>`
<v-vector-input
  type='${t}'
  label='${n}'
  placeholder='${a}'
  value='${r}'
  step='${l}'
/>
    `;s.storyName="3 Dimension";s.args={dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1};s.parameters={storySource:{source:`({
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
    \``}};const o={title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},tags:["stories-mdx"],includeStories:["_3Dimension"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:y};const E=["_3Dimension"];export{s as _3Dimension,E as __namedExportsOrder,o as default};
//# sourceMappingURL=vector-input.stories-6f24ba4f.js.map
