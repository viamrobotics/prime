import{M as C,C as i,S as u}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as l}from"./jsx-runtime-a482d093.js";import{u as q}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function D(a={}){const{wrapper:n}=Object.assign({},q(),a.components);return n?l.jsx(n,{...a,children:l.jsx(t,{})}):t();function t(){const s=Object.assign({h1:"h1",p:"p"},q(),a.components);return l.jsxs(l.Fragment,{children:[l.jsx(C,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}}}),`
`,l.jsx(s.h1,{id:"input",children:"Input"}),`
`,l.jsx(s.p,{children:"Used for all text single-line user inputs."}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},children:({type:e,label:r,placeholder:o,value:p})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${p}'
      />
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Required",args:{type:"text",label:"Required soup",tooltip:"It works with a tooltip too.",placeholder:"Enter soup here",value:"Chicken Noodle",required:!0},children:({type:e,label:r,tooltip:o,placeholder:p,value:d})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${p}'
  tooltip='${o}'
  value='${d}'
  required='true'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},children:({type:e,label:r,placeholder:o,value:p,step:d})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
  step='${d}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Number with slider",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"},children:({type:e,label:r,placeholder:o,value:p,step:d,incrementor:B})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  incrementor='${B}'
  value='${p}'
  step='${d}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},children:({type:e,label:r,placeholder:o,value:p,step:d})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
  step='${d}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},children:({type:e,label:r,placeholder:o,value:p})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Time",args:{type:"time",label:"Lunch time",placeholder:"00:00:00",value:"12:52:48"},children:({type:e,label:r,placeholder:o,value:p})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},children:({type:e,label:r,placeholder:o,value:p})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},children:({type:e,label:r,placeholder:o,value:p})=>`
<v-input
  type='${e}'
  placeholder='${o}'
  value='${p}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},children:({type:e,label:r,placeholder:o,value:p,labelPosition:d})=>`
<v-input
  label='${r}'
  placeholder='${o}'
  value='${p}'
  labelposition='${d}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},children:({type:e,label:r,placeholder:o,value:p,labelPosition:d})=>`
<v-input
  type='${e}'
  label='${r}'
  placeholder='${o}'
  value='${p}'
  labelposition='${d}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Tooltip",args:{label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."},children:({label:e,tooltip:r,value:o})=>`
<v-input
  label='${e}'
  tooltip='${r}'
  value='${o}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Readonly",args:{label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"},children:({label:e,readonly:r,value:o})=>`
<v-input
  label='${e}'
  readonly='${r}'
  value='${o}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Disabled",args:{label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0},children:({label:e,tooltip:r,value:o,disabled:p})=>`
<v-input
  label='${e}'
  disabled='${p}'
  tooltip='${r}'
  value='${o}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Message",args:{label:"Board",value:"",message:"some message",state:"info"},children:({label:e,value:r,message:o,state:p})=>`
<v-input
  label='${e}'
  value='${r}'
  message='${o}'
  state='${p}'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Error",args:{label:"Board",value:"",state:"error"},children:({label:e,tooltip:r,value:o,disabled:p,state:d})=>`
<v-input
  label='${e}'
  value='${o}'
  state='${d}'
  message='Something went wrong.'
/>
    `})}),`
`,l.jsx(i,{children:l.jsx(u,{name:"Warning",args:{label:"Board",value:"",state:"warn",tooltip:"Uh oh"},children:({label:e,value:r,disabled:o,state:p,tooltip:d})=>`
<v-input
  label='${e}'
  value='${r}'
  state='${p}'
  tooltip='Something went wrong.'
/>
    `})})]})}}const b=({type:a,label:n,placeholder:t,value:s})=>`
      <v-input
        type='${a}'
        label='${n}'
        placeholder='${t}'
        value='${s}'
      />
    `;b.storyName="Text";b.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};b.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
      <v-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
      />
    \``}};const $=({type:a,label:n,tooltip:t,placeholder:s,value:e})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${s}'
  tooltip='${t}'
  value='${e}'
  required='true'
/>
    `;$.storyName="Required";$.args={type:"text",label:"Required soup",tooltip:"It works with a tooltip too.",placeholder:"Enter soup here",value:"Chicken Noodle",required:!0};$.parameters={storySource:{source:`({
  type,
  label,
  tooltip,
  placeholder,
  value
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  tooltip='\${tooltip}'
  value='\${value}'
  required='true'
/>
    \``}};const m=({type:a,label:n,placeholder:t,value:s,step:e})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
  step='${e}'
/>
    `;m.storyName="Number";m.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1};m.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  step
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
  step='\${step}'
/>
    \``}};const v=({type:a,label:n,placeholder:t,value:s,step:e,incrementor:r})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  incrementor='${r}'
  value='${s}'
  step='${e}'
/>
    `;v.storyName="Number with slider";v.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"};v.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  step,
  incrementor
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  incrementor='\${incrementor}'
  value='\${value}'
  step='\${step}'
/>
    \``}};const h=({type:a,label:n,placeholder:t,value:s,step:e})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
  step='${e}'
/>
    `;h.storyName="Integer";h.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};h.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  step
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
  step='\${step}'
/>
    \``}};const y=({type:a,label:n,placeholder:t,value:s})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
/>
    `;y.storyName="Date";y.args={type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"};y.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
/>
    \``}};const g=({type:a,label:n,placeholder:t,value:s})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
/>
    `;g.storyName="Time";g.args={type:"time",label:"Lunch time",placeholder:"00:00:00",value:"12:52:48"};g.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
/>
    \``}};const x=({type:a,label:n,placeholder:t,value:s})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
/>
    `;x.storyName="Datetime Local";x.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};x.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
/>
    \``}};const f=({type:a,label:n,placeholder:t,value:s})=>`
<v-input
  type='${a}'
  placeholder='${t}'
  value='${s}'
/>
    `;f.storyName="No label";f.args={type:"number",placeholder:"0",value:""};f.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
<v-input
  type='\${type}'
  placeholder='\${placeholder}'
  value='\${value}'
/>
    \``}};const j=({type:a,label:n,placeholder:t,value:s,labelPosition:e})=>`
<v-input
  label='${n}'
  placeholder='${t}'
  value='${s}'
  labelposition='${e}'
/>
    `;j.storyName="Left label";j.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};j.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  labelPosition
}) => \`
<v-input
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
  labelposition='\${labelPosition}'
/>
    \``}};const w=({type:a,label:n,placeholder:t,value:s,labelPosition:e})=>`
<v-input
  type='${a}'
  label='${n}'
  placeholder='${t}'
  value='${s}'
  labelposition='${e}'
/>
    `;w.storyName="Left label with number";w.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};w.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  labelPosition
}) => \`
<v-input
  type='\${type}'
  label='\${label}'
  placeholder='\${placeholder}'
  value='\${value}'
  labelposition='\${labelPosition}'
/>
    \``}};const S=({label:a,tooltip:n,value:t})=>`
<v-input
  label='${a}'
  tooltip='${n}'
  value='${t}'
/>
    `;S.storyName="Tooltip";S.args={label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."};S.parameters={storySource:{source:`({
  label,
  tooltip,
  value
}) => \`
<v-input
  label='\${label}'
  tooltip='\${tooltip}'
  value='\${value}'
/>
    \``}};const N=({label:a,readonly:n,value:t})=>`
<v-input
  label='${a}'
  readonly='${n}'
  value='${t}'
/>
    `;N.storyName="Readonly";N.args={label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"};N.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
<v-input
  label='\${label}'
  readonly='\${readonly}'
  value='\${value}'
/>
    \``}};const L=({label:a,tooltip:n,value:t,disabled:s})=>`
<v-input
  label='${a}'
  disabled='${s}'
  tooltip='${n}'
  value='${t}'
/>
    `;L.storyName="Disabled";L.args={label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0};L.parameters={storySource:{source:`({
  label,
  tooltip,
  value,
  disabled
}) => \`
<v-input
  label='\${label}'
  disabled='\${disabled}'
  tooltip='\${tooltip}'
  value='\${value}'
/>
    \``}};const E=({label:a,value:n,message:t,state:s})=>`
<v-input
  label='${a}'
  value='${n}'
  message='${t}'
  state='${s}'
/>
    `;E.storyName="Message";E.args={label:"Board",value:"",message:"some message",state:"info"};E.parameters={storySource:{source:`({
  label,
  value,
  message,
  state
}) => \`
<v-input
  label='\${label}'
  value='\${value}'
  message='\${message}'
  state='\${state}'
/>
    \``}};const T=({label:a,tooltip:n,value:t,disabled:s,state:e})=>`
<v-input
  label='${a}'
  value='${t}'
  state='${e}'
  message='Something went wrong.'
/>
    `;T.storyName="Error";T.args={label:"Board",value:"",state:"error"};T.parameters={storySource:{source:`({
  label,
  tooltip,
  value,
  disabled,
  state
}) => \`
<v-input
  label='\${label}'
  value='\${value}'
  state='\${state}'
  message='Something went wrong.'
/>
    \``}};const V=({label:a,value:n,disabled:t,state:s,tooltip:e})=>`
<v-input
  label='${a}'
  value='${n}'
  state='${s}'
  tooltip='Something went wrong.'
/>
    `;V.storyName="Warning";V.args={label:"Board",value:"",state:"warn",tooltip:"Uh oh"};V.parameters={storySource:{source:`({
  label,
  value,
  disabled,
  state,
  tooltip
}) => \`
<v-input
  label='\${label}'
  value='\${value}'
  state='\${state}'
  tooltip='Something went wrong.'
/>
    \``}};const c={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},tags:["stories-mdx"],includeStories:["text","required","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","tooltip","readonly","disabled","message","error","warning"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:D};const z=["text","required","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","tooltip","readonly","disabled","message","error","warning"];export{z as __namedExportsOrder,y as date,x as datetimeLocal,c as default,L as disabled,T as error,h as integer,j as leftLabel,w as leftLabelWithNumber,E as message,f as noLabel,m as number,v as numberWithSlider,N as readonly,$ as required,b as text,g as time,S as tooltip,V as warning};
//# sourceMappingURL=input.stories-7943b602.js.map
