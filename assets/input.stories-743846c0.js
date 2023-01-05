import{M as q,C as u,S as i}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as l}from"./jsx-runtime-c27a426b.js";import{u as E}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function C(t={}){const{wrapper:n}=Object.assign({},E(),t.components);return n?l.exports.jsx(n,{...t,children:l.exports.jsx(a,{})}):a();function a(){const p=Object.assign({h1:"h1",p:"p"},E(),t.components);return l.exports.jsxs(l.exports.Fragment,{children:[l.exports.jsx(q,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}}}),`
`,l.exports.jsx(p.h1,{children:"Input"}),`
`,l.exports.jsx(p.p,{children:"Used for all text single-line user inputs."}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},children:({type:e,label:r,placeholder:o,value:s})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Required",args:{type:"text",label:"Required soup",tooltip:"It works with a tooltip too.",placeholder:"Enter soup here",value:"Chicken Noodle",required:!0},children:({type:e,label:r,tooltip:o,placeholder:s,value:d})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${s}'
        tooltip='${o}'
        value='${d}'
        required='true'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},children:({type:e,label:r,placeholder:o,value:s,step:d})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
        step='${d}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Number with slider",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"},children:({type:e,label:r,placeholder:o,value:s,step:d,incrementor:V})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        incrementor='${V}'
        value='${s}'
        step='${d}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},children:({type:e,label:r,placeholder:o,value:s,step:d})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
        step='${d}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},children:({type:e,label:r,placeholder:o,value:s})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},children:({type:e,label:r,placeholder:o,value:s})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},children:({type:e,label:r,placeholder:o,value:s})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"No label",args:{type:"number",placeholder:"0",value:""},children:({type:e,label:r,placeholder:o,value:s})=>`
      <v-input
        type='${e}'
        placeholder='${o}'
        value='${s}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},children:({type:e,label:r,placeholder:o,value:s,labelPosition:d})=>`
      <v-input
        label='${r}'
        placeholder='${o}'
        value='${s}'
        labelposition='${d}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},children:({type:e,label:r,placeholder:o,value:s,labelPosition:d})=>`
      <v-input
        type='${e}'
        label='${r}'
        placeholder='${o}'
        value='${s}'
        labelposition='${d}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Tooltip",args:{label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."},children:({label:e,tooltip:r,value:o})=>`
      <v-input
        label='${e}'
        tooltip='${r}'
        value='${o}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Readonly",args:{label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"},children:({label:e,readonly:r,value:o})=>`
      <v-input
        label='${e}'
        readonly='${r}'
        value='${o}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Disabled",args:{label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0},children:({label:e,tooltip:r,value:o,disabled:s})=>`
      <v-input
        label='${e}'
        disabled='${s}'
        tooltip='${r}'
        value='${o}'
      />
    `})}),`
`,l.exports.jsx(u,{children:l.exports.jsx(i,{name:"Message",args:{label:"Board",value:"",message:"some message",state:"info"},children:({label:e,value:r,message:o,state:s})=>`
      <v-input
        label='${e}'
        value='${r}'
        message='${o}'
        state='${s}'
      />
    `})})]})}}const m=({type:t,label:n,placeholder:a,value:p})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
      />
    `;m.storyName="Text";m.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};m.parameters={storySource:{source:`({
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
    \``}};const b=({type:t,label:n,tooltip:a,placeholder:p,value:e})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${p}'
        tooltip='${a}'
        value='${e}'
        required='true'
      />
    `;b.storyName="Required";b.args={type:"text",label:"Required soup",tooltip:"It works with a tooltip too.",placeholder:"Enter soup here",value:"Chicken Noodle",required:!0};b.parameters={storySource:{source:`({
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
    \``}};const $=({type:t,label:n,placeholder:a,value:p,step:e})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
        step='${e}'
      />
    `;$.storyName="Number";$.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1};$.parameters={storySource:{source:`({
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
    \``}};const h=({type:t,label:n,placeholder:a,value:p,step:e,incrementor:r})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        incrementor='${r}'
        value='${p}'
        step='${e}'
      />
    `;h.storyName="Number with slider";h.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"};h.parameters={storySource:{source:`({
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
    \``}};const v=({type:t,label:n,placeholder:a,value:p,step:e})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
        step='${e}'
      />
    `;v.storyName="Integer";v.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};v.parameters={storySource:{source:`({
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
    \``}};const y=({type:t,label:n,placeholder:a,value:p})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
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
    \``}};const x=({type:t,label:n,placeholder:a,value:p})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
      />
    `;x.storyName="Time";x.args={type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"};x.parameters={storySource:{source:`({
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
    \``}};const g=({type:t,label:n,placeholder:a,value:p})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
      />
    `;g.storyName="Datetime Local";g.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};g.parameters={storySource:{source:`({
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
    \``}};const f=({type:t,label:n,placeholder:a,value:p})=>`
      <v-input
        type='${t}'
        placeholder='${a}'
        value='${p}'
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
    \``}};const j=({type:t,label:n,placeholder:a,value:p,labelPosition:e})=>`
      <v-input
        label='${n}'
        placeholder='${a}'
        value='${p}'
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
    \``}};const N=({type:t,label:n,placeholder:a,value:p,labelPosition:e})=>`
      <v-input
        type='${t}'
        label='${n}'
        placeholder='${a}'
        value='${p}'
        labelposition='${e}'
      />
    `;N.storyName="Left label with number";N.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};N.parameters={storySource:{source:`({
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
    \``}};const L=({label:t,tooltip:n,value:a})=>`
      <v-input
        label='${t}'
        tooltip='${n}'
        value='${a}'
      />
    `;L.storyName="Tooltip";L.args={label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."};L.parameters={storySource:{source:`({
  label,
  tooltip,
  value
}) => \`
      <v-input
        label='\${label}'
        tooltip='\${tooltip}'
        value='\${value}'
      />
    \``}};const S=({label:t,readonly:n,value:a})=>`
      <v-input
        label='${t}'
        readonly='${n}'
        value='${a}'
      />
    `;S.storyName="Readonly";S.args={label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"};S.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
      <v-input
        label='\${label}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const T=({label:t,tooltip:n,value:a,disabled:p})=>`
      <v-input
        label='${t}'
        disabled='${p}'
        tooltip='${n}'
        value='${a}'
      />
    `;T.storyName="Disabled";T.args={label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0};T.parameters={storySource:{source:`({
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
    \``}};const w=({label:t,value:n,message:a,state:p})=>`
      <v-input
        label='${t}'
        value='${n}'
        message='${a}'
        state='${p}'
      />
    `;w.storyName="Message";w.args={label:"Board",value:"",message:"some message",state:"info"};w.parameters={storySource:{source:`({
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
    \``}};const c={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},tags:["mdx"],includeStories:["text","required","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","tooltip","readonly","disabled","message"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:C};const Y=["text","required","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","tooltip","readonly","disabled","message"];export{Y as __namedExportsOrder,y as date,g as datetimeLocal,c as default,T as disabled,v as integer,j as leftLabel,N as leftLabelWithNumber,w as message,f as noLabel,$ as number,h as numberWithSlider,S as readonly,b as required,m as text,x as time,L as tooltip};
//# sourceMappingURL=input.stories-743846c0.js.map
