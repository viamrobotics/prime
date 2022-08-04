import"./jsx-runtime.e4e9cc55.js";import{c as a,A as f,M as x,C as p,S as u}from"./Props.2328207e.js";import"./iframe.6ccd6cc5.js";import"./es.map.constructor.aa538d5c.js";import"./es.number.to-fixed.4d2c66cd.js";function b(){return b=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},b.apply(this,arguments)}const T={},g="wrapper";function $({components:n,...t}){return a(g,b({},T,t,{components:n,mdxType:"MDXLayout"}),a(x,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),a("h1",null,"Input"),a("p",null,"Used for all text single-line user inputs."),a(p,{mdxType:"Canvas"},a(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
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
    `)))}$.isMDXComponent=!0;const d=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `;d.storyName="Text";d.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};d.parameters={storySource:{source:`({
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
    \``}};const m=({type:n,label:t,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
      />
    `;m.storyName="Number";m.args={type:"number",label:"Amount of soup",placeholder:"0",value:""};m.parameters={storySource:{source:`({
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
        placeholder='${e}'
        value='${l}'
      />
    `;y.storyName="No label";y.args={type:"number",placeholder:"0",value:""};y.parameters={storySource:{source:`({
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
    \``}};const c=({type:n,label:t,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;c.storyName="Left label";c.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};c.parameters={storySource:{source:`({
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
    \``}};const v=({type:n,label:t,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        type='${n}'
        label='${t}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;v.storyName="Left label with number";v.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};v.parameters={storySource:{source:`({
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
    \``}};const h=({label:n,readonly:t,value:e})=>`
      <v-input
        label='${n}'
        readonly='${t}'
        value='${e}'
      />
    `;h.storyName="Readonly";h.args={label:"Last favorite soup",readonly:"readonly",value:"New england clam chowder"};h.parameters={storySource:{source:`({
  label,
  readonly,
  value
}) => \`
      <v-input
        label='\${label}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const s={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","noLabel","leftLabel","leftLabelWithNumber","readonly"]},L={Text:"text",Number:"number","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber",Readonly:"readonly"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>a(f,{mdxStoryNameToKey:L,mdxComponentAnnotations:s},a($,null))};const M=["text","number","noLabel","leftLabel","leftLabelWithNumber","readonly"];export{M as __namedExportsOrder,s as default,c as leftLabel,v as leftLabelWithNumber,y as noLabel,m as number,h as readonly,d as text};
//# sourceMappingURL=input.stories.3bb7ebb2.js.map
