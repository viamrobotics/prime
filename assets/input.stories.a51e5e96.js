import"./jsx-runtime.0733ae78.js";import{c as t,A as N,M as C,C as p,S as u}from"./Props.6d2f3d2b.js";import"./iframe.d09fda60.js";import"./es.map.constructor.44dfcf82.js";import"./es.number.to-fixed.bf390618.js";function d(){return d=Object.assign?Object.assign.bind():function(o){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(o[l]=e[l])}return o},d.apply(this,arguments)}const E={},w="wrapper";function S({components:o,...n}){return t(w,d({},E,n,{components:o,mdxType:"MDXLayout"}),t(C,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),t("h1",null,"Input"),t("p",null,"Used for all text single-line user inputs."),t(p,{mdxType:"Canvas"},t(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Number",args:{type:"number",label:"Volume of soup",placeholder:"0",value:"",step:.1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Integer",args:{type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,step:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        step='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${a}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:s})=>`
      <v-input
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:a,value:r,labelPosition:s})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${a}'
        value='${r}'
        labelposition='${s}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Readonly",args:{label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"},mdxType:"Story"},({label:e,readonly:l,value:a})=>`
      <v-input
        label='${e}'
        readonly='${l}'
        value='${a}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Tooltip",args:{label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."},mdxType:"Story"},({label:e,tooltip:l,value:a})=>`
      <v-input
        label='${e}'
        tooltip='${l}'
        value='${a}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Disabled",args:{label:"Board",value:"",tooltip:"Create a board component first.",disabled:!0},mdxType:"Story"},({label:e,tooltip:l,value:a,disabled:r})=>`
      <v-input
        label='${e}'
        disabled='${r}'
        tooltip='${l}'
        value='${a}'
      />
    `)))}S.isMDXComponent=!0;const b=({type:o,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
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
    \``}};const m=({type:o,label:n,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${o}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
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
    \``}};const y=({type:o,label:n,placeholder:e,value:l,step:a})=>`
      <v-input
        type='${o}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
        step='${a}'
      />
    `;y.storyName="Integer";y.args={type:"integer",label:"Bowls of soup",placeholder:"0",value:"",step:1};y.parameters={storySource:{source:`({
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
    \``}};const c=({type:o,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
        label='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;c.storyName="Date";c.args={type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"};c.parameters={storySource:{source:`({
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
    \``}};const v=({type:o,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
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
    \``}};const $=({type:o,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
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
    \``}};const h=({type:o,label:n,placeholder:e,value:l})=>`
      <v-input
        type='${o}'
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
    \``}};const T=({type:o,label:n,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        label='${n}'
        placeholder='${e}'
        value='${l}'
        labelposition='${a}'
      />
    `;T.storyName="Left label";T.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};T.parameters={storySource:{source:`({
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
    \``}};const g=({type:o,label:n,placeholder:e,value:l,labelPosition:a})=>`
      <v-input
        type='${o}'
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
    \``}};const f=({label:o,readonly:n,value:e})=>`
      <v-input
        label='${o}'
        readonly='${n}'
        value='${e}'
      />
    `;f.storyName="Readonly";f.args={label:"Least favorite soup",readonly:"readonly",value:"New england clam chowder"};f.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
      <v-input
        label='\${label}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const x=({label:o,tooltip:n,value:e})=>`
      <v-input
        label='${o}'
        tooltip='${n}'
        value='${e}'
      />
    `;x.storyName="Tooltip";x.args={label:"Favorite soup",value:"Cereal",tooltip:"Unsupported soup type. Eat at your own risk. Or eat a recognized soup instead."};x.parameters={storySource:{source:`({
  label,
  tooltip,
  value
}) => \`
      <v-input
        label='\${label}'
        tooltip='\${tooltip}'
        value='\${value}'
      />
    \``}};const L=({label:o,tooltip:n,value:e,disabled:l})=>`
      <v-input
        label='${o}'
        disabled='${l}'
        tooltip='${n}'
        value='${e}'
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
    \``}};const i={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled"]},D={Text:"text",Number:"number",Integer:"integer",Date:"date",Time:"time","Datetime Local":"datetimeLocal","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly",Tooltip:"tooltip",Disabled:"disabled"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>t(N,{mdxStoryNameToKey:D,mdxComponentAnnotations:i},t(S,null))};const F=["text","number","integer","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly","tooltip","disabled"];export{F as __namedExportsOrder,c as date,$ as datetimeLocal,i as default,L as disabled,y as integer,T as leftLabel,g as leftLabelWithNumber,h as noLabel,m as number,f as readonly,b as text,v as time,x as tooltip};
//# sourceMappingURL=input.stories.a51e5e96.js.map
