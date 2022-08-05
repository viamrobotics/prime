import"./jsx-runtime.dcfe0c44.js";import{c as a,A as g,M as L,C as p,S as u}from"./Props.60963865.js";import"./iframe.9d32359f.js";import"./es.map.constructor.8838f5e3.js";import"./es.number.to-fixed.bdade414.js";function d(){return d=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},d.apply(this,arguments)}const S={},N="wrapper";function x({components:n,...t}){return a(N,d({},S,t,{components:n,mdxType:"MDXLayout"}),a(L,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),a("h1",null,"Input"),a("p",null,"Used for all text single-line user inputs."),a(p,{mdxType:"Canvas"},a(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Number",args:{type:"number",label:"Amount of soup",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Date",args:{type:"date",label:"Birthday",placeholder:"Enter day here",value:"1985-10-22"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Time",args:{type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Datetime Local",args:{type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${o}'
        value='${r}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r,labelPosition:i})=>`
      <v-input
        label='${l}'
        placeholder='${o}'
        value='${r}'
        labelposition='${i}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r,labelPosition:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
        labelposition='${i}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"Readonly",args:{label:"Last favorite soup",readonly:"readonly",value:"New england clam chowder"},mdxType:"Story"},({label:e,readonly:l,value:o})=>`
      <v-input
        label='${e}'
        readonly='${l}'
        value='${o}'
      />
    `)))}x.isMDXComponent=!0;const m=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
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
    \``}};const y=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `;y.storyName="Number";y.args={type:"number",label:"Amount of soup",placeholder:"0",value:""};y.parameters={storySource:{source:`({
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
    \``}};const c=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
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
    \``}};const b=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `;b.storyName="Time";b.args={type:"time",label:"Lunch Time",placeholder:"00:00:00",value:"12:52:48"};b.parameters={storySource:{source:`({
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
    \``}};const v=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `;v.storyName="Datetime Local";v.args={type:"datetime-local",label:"Judgement Day",placeholder:"",value:"2022-08-09T11:03"};v.parameters={storySource:{source:`({
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
    \``}};const $=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;$.storyName="No label";$.args={type:"number",placeholder:"0",value:""};$.parameters={storySource:{source:`({
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
    \``}};const h=({type:n,label:t,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;h.storyName="Left label";h.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};h.parameters={storySource:{source:`({
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
    \``}};const f=({type:n,label:t,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;f.storyName="Left label with number";f.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};f.parameters={storySource:{source:`({
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
    \``}};const T=({label:n,readonly:t,value:e})=>`
      <v-input
        label='${n}'
        readonly='${t}'
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
    \``}};const s={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number","date","time","datetime-local"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly"]},C={Text:"text",Number:"number",Date:"date",Time:"time","Datetime Local":"datetimeLocal","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>a(g,{mdxStoryNameToKey:C,mdxComponentAnnotations:s},a(x,null))};const V=["text","number","date","time","datetimeLocal","noLabel","leftLabel","leftLabelWithNumber","readonly"];export{V as __namedExportsOrder,c as date,v as datetimeLocal,s as default,h as leftLabel,f as leftLabelWithNumber,$ as noLabel,y as number,T as readonly,m as text,b as time};
//# sourceMappingURL=input.stories.90f2c374.js.map
