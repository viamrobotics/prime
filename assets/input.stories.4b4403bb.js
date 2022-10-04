var C=Object.defineProperty;var p=(o,t)=>C(o,"name",{value:t,configurable:!0});import"./jsx-runtime.cfb825f3.js";import{c as n,A as E,M as w,C as u,S as s}from"./Props.2d443bab.js";import"./iframe.ab471664.js";import"./es.map.constructor.5cc9a37b.js";import"./es.number.to-fixed.e10b300b.js";function b(){return b=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(o[l]=e[l])}return o},b.apply(this,arguments)}p(b,"_extends");const D={},V="wrapper";function N({components:o,...t}){return n(V,b({},D,t,{components:o,mdxType:"MDXLayout"}),n(w,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),n("h1",null,"Input"),n("p",null,"Used for all text single-line user inputs."),n(u,{mdxType:"Canvas"},n(s,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${i}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${i}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${a}'
        value='${r}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:i})=>`
      <v-input
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${i}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${i}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Readonly",args:{label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"},mdxType:"Story"},({label:e,readonly:l,value:a})=>`
      <v-input
        label='${e}'
        readonly='${l}'
        value='${a}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Tooltip",args:{label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."},mdxType:"Story"},({label:e,tooltip:l,value:a})=>`
      <v-input
        label='${e}'
        tooltip='${l}'
        value='${a}'
      />
    `)),n(u,{mdxType:"Canvas"},n(s,{name:"Disabled",args:{label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0},mdxType:"Story"},({label:e,tooltip:l,value:a,disabled:r})=>`
      <v-input
        label='${e}'
        disabled='${r}'
        tooltip='${l}'
        value='${a}'
      />
    `)))}p(N,"MDXContent");N.isMDXComponent=!0;const m=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"text");m.storyName="Text";m.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};m.parameters={storySource:{source:`({
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
    \``}};const c=p(({type:o,label:t,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `,"integer");c.storyName="Integer";c.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};c.parameters={storySource:{source:`({
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
    \``}};const $=p(({type:o,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `,"time");$.storyName="Time";$.args={type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"};$.parameters={storySource:{source:`({
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
    `,"datetimeLocal");h.storyName="Datetime Local";h.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};h.parameters={storySource:{source:`({
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
    \``}};const g=p(({type:o,label:t,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `,"leftLabel");g.storyName="Left label";g.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};g.parameters={storySource:{source:`({
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
    \``}};const f=p(({type:o,label:t,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        type='${o}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `,"leftLabelWithNumber");f.storyName="Left label with number";f.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};f.parameters={storySource:{source:`({
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
    \``}};const x=p(({label:o,readonly:t,value:e})=>`
      <v-input
        label='${o}'
        readonly='${t}'
        value='${e}'
      />
    `,"readonly");x.storyName="Readonly";x.args={label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"};x.parameters={storySource:{source:`({
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
    \``}};const S=p(({label:o,tooltip:t,value:e,disabled:l})=>`
      <v-input
        label='${o}'
        disabled='${l}'
        tooltip='${t}'
        value='${e}'
      />
    `,"disabled");S.storyName="Disabled";S.args={label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0};S.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled"]},M={Text:"text",Number:"number",Integer:"integer",Date:"date",Time:"time","Datetime Local":"datetimeLocal","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly",Tooltip:"tooltip",Disabled:"disabled"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>n(E,{mdxStoryNameToKey:M,mdxComponentAnnotations:d},n(N,null))};const X=["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled"];export{X as __namedExportsOrder,v as date,h as datetimeLocal,d as default,S as disabled,c as integer,g as leftLabel,f as leftLabelWithNumber,T as noLabel,y as number,x as readonly,m as text,$ as time,L as tooltip};
//# sourceMappingURL=input.stories.4b4403bb.js.map
