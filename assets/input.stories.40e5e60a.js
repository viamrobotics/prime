import"./jsx-runtime.39ba4f65.js";import{c as t,A as L,M as S,C as p,S as u}from"./Props.86d51286.js";import"./iframe.0b34fbbe.js";import"./es.map.constructor.f69855c6.js";import"./es.number.to-fixed.a8b353d9.js";function d(){return d=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(r[l]=e[l])}return r},d.apply(this,arguments)}const N={},C="wrapper";function x({components:r,...n}){return t(C,d({},N,n,{components:r,mdxType:"MDXLayout"}),t(S,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),t("h1",null,"Input"),t("p",null,"Used for all text single-line user inputs."),t(p,{mdxType:"Canvas"},t(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o,step:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
        step='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o,step:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
        step='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o})=>`
      <v-input
        type='${e}'
        placeholder='${a}'
        value='${o}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o,labelPosition:s})=>`
      <v-input
        label='${l}'
        placeholder='${a}'
        value='${o}'
        labelposition='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:o,labelPosition:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${o}'
        labelposition='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Readonly",args:{label:"Last favorite soup",readonly:"readonly",value:"New england clam chowder"},mdxType:"Story"},({label:e,readonly:l,value:a})=>`
      <v-input
        label='${e}'
        readonly='${l}'
        value='${a}'
      />
    `)))}x.isMDXComponent=!0;const m=({type:r,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
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
    \``}};const y=({type:r,label:n,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `;y.storyName="Number";y.args={type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1};y.parameters={storySource:{source:`({
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
    \``}};const c=({type:r,label:n,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `;c.storyName="Integer";c.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};c.parameters={storySource:{source:`({
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
    \``}};const b=({type:r,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;b.storyName="Date";b.args={type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"};b.parameters={storySource:{source:`({
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
    \``}};const v=({type:r,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;v.storyName="Time";v.args={type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"};v.parameters={storySource:{source:`({
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
    \``}};const $=({type:r,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;$.storyName="Datetime Local";$.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};$.parameters={storySource:{source:`({
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
    \``}};const h=({type:r,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${r}'
        placeholder='${e}'
        value='${l}'
      />
    `;h.storyName="No label";h.args={type:"number",placeholder:"0",value:""};h.parameters={storySource:{source:`({
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
    \``}};const f=({type:r,label:n,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        label='${n}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `;f.storyName="Left label";f.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};f.parameters={storySource:{source:`({
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
    \``}};const g=({type:r,label:n,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        type='${r}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `;g.storyName="Left label with number";g.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};g.parameters={storySource:{source:`({
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
    \``}};const T=({label:r,readonly:n,value:e})=>`
      <v-input
        label='${r}'
        readonly='${n}'
        value='${e}'
      />
    `;T.storyName="Readonly";T.args={label:"Last favorite soup",readonly:"readonly",value:"New england clam chowder"};T.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
      <v-input
        label='\${label}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const i={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly"]},E={Text:"text",Number:"number",Integer:"integer",Date:"date",Time:"time","Datetime Local":"datetimeLocal","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>t(L,{mdxStoryNameToKey:E,mdxComponentAnnotations:i},t(x,null))};const I=["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly"];export{I as __namedExportsOrder,b as date,$ as datetimeLocal,i as default,c as integer,f as leftLabel,g as leftLabelWithNumber,h as noLabel,y as number,T as readonly,m as text,v as time};
//# sourceMappingURL=input.stories.40e5e60a.js.map
