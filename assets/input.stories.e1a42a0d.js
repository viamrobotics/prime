var V=Object.defineProperty;var p=(o,t)=>V(o,"name",{value:t,configurable:!0});import"./jsx-runtime.b2017726.js";import{c as n,A as D,M,C as s,S as u}from"./Props.b5df9e21.js";import"./iframe.1b5a8018.js";import"./es.map.constructor.78c74c86.js";import"./es.number.to-fixed.476b9d29.js";function m(){return m=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(o[l]=e[l])}return o},m.apply(this,arguments)}p(m,"_extends");const P={},W="wrapper";function w({components:o,...t}){return n(W,m({},P,t,{components:o,mdxType:"MDXLayout"}),n(M,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),n("h1",null,"Input"),n("p",null,"Used for all text single-line user inputs."),n(s,{mdxType:"Canvas"},n(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Number with slider",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:i,incrementor:E})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        incrementor='${E}'
        value='${r}'
        step='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:i})=>`
      <v-input
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Readonly",args:{label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"},mdxType:"Story"},({label:e,readonly:l,value:a})=>`
      <v-input
        label='${e}'
        readonly='${l}'
        value='${a}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Tooltip",args:{label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."},mdxType:"Story"},({label:e,tooltip:l,value:a})=>`
      <v-input
        label='${e}'
        tooltip='${l}'
        value='${a}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Disabled",args:{label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0},mdxType:"Story"},({label:e,tooltip:l,value:a,disabled:r})=>`
      <v-input
        label='${e}'
        disabled='${r}'
        tooltip='${l}'
        value='${a}'
      />
    `)),n(s,{mdxType:"Canvas"},n(u,{name:"Message",args:{label:"Board",value:"",message:"some message",state:"info"},mdxType:"Story"},({label:e,value:l,message:a,state:r})=>`
      <v-input
        label='${e}'
        value='${l}'
        message='${a}'
        state='${r}'
      />
    `)))}p(w,"MDXContent");w.isMDXComponent=!0;const b=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"text");b.storyName="Text";b.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};b.parameters={storySource:{source:`({
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
    \``}};const y=p(({type:o,label:t,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `,"number");y.storyName="Number";y.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1};y.parameters={storySource:{source:`({
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
    \``}};const c=p(({type:o,label:t,placeholder:e,value:l,step:a,incrementor:r})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        incrementor='${r}'
        value='${l}'
        step='${a}'
      />
    `,"numberWithSlider");c.storyName="Number with slider";c.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1,incrementor:"slider"};c.parameters={storySource:{source:`({
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
    \``}};const $=p(({type:o,label:t,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `,"integer");$.storyName="Integer";$.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};$.parameters={storySource:{source:`({
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
    \``}};const v=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"date");v.storyName="Date";v.args={type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"};v.parameters={storySource:{source:`({
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
    \``}};const h=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"time");h.storyName="Time";h.args={type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"};h.parameters={storySource:{source:`({
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
    \``}};const g=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"datetimeLocal");g.storyName="Datetime Local";g.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};g.parameters={storySource:{source:`({
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
    \``}};const T=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        placeholder='${e}'
        value='${l}'
      />
    `,"noLabel");T.storyName="No label";T.args={type:"number",placeholder:"0",value:""};T.parameters={storySource:{source:`({
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
    \``}};const f=p(({type:o,label:t,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `,"leftLabel");f.storyName="Left label";f.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};f.parameters={storySource:{source:`({
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
    \``}};const x=p(({type:o,label:t,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `,"leftLabelWithNumber");x.storyName="Left label with number";x.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};x.parameters={storySource:{source:`({
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
    \``}};const S=p(({label:o,readonly:t,value:e})=>`
      <v-input
        label='${o}'
        readonly='${t}'
        value='${e}'
      />
    `,"readonly");S.storyName="Readonly";S.args={label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"};S.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
      <v-input
        label='\${label}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const L=p(({label:o,tooltip:t,value:e})=>`
      <v-input
        label='${o}'
        tooltip='${t}'
        value='${e}'
      />
    `,"tooltip");L.storyName="Tooltip";L.args={label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."};L.parameters={storySource:{source:`({
  label,
  tooltip,
  value
}) => \`
      <v-input
        label='\${label}'
        tooltip='\${tooltip}'
        value='\${value}'
      />
    \``}};const N=p(({label:o,tooltip:t,value:e,disabled:l})=>`
      <v-input
        label='${o}'
        disabled='${l}'
        tooltip='${t}'
        value='${e}'
      />
    `,"disabled");N.storyName="Disabled";N.args={label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0};N.parameters={storySource:{source:`({
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
    \``}};const C=p(({label:o,value:t,message:e,state:l})=>`
      <v-input
        label='${o}'
        value='${t}'
        message='${e}'
        state='${l}'
      />
    `,"message");C.storyName="Message";C.args={label:"Board",value:"",message:"some message",state:"info"};C.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled","message"]},B={Text:"text",Number:"number","Number with slider":"numberWithSlider",Integer:"integer",Date:"date",Time:"time","Datetime Local":"datetimeLocal","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly",Tooltip:"tooltip",Disabled:"disabled",Message:"message"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>n(D,{mdxStoryNameToKey:B,mdxComponentAnnotations:d},n(w,null))};const R=["text","number","numberWithSlider","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled","message"];export{R as __namedExportsOrder,v as date,g as datetimeLocal,d as default,N as disabled,$ as integer,f as leftLabel,x as leftLabelWithNumber,C as message,T as noLabel,y as number,c as numberWithSlider,S as readonly,b as text,h as time,L as tooltip};
//# sourceMappingURL=input.stories.e1a42a0d.js.map
