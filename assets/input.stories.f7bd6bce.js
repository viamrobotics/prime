import"./jsx-runtime.a1bed176.js";import{c as t,A as v,M as $,C as u,S as s}from"./Props.bfc5015b.js";import"./iframe.34d5fcf3.js";function i(){return i=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},i.apply(this,arguments)}const f={},x="wrapper";function y({components:n,...a}){return t(x,i({},f,a,{components:n,mdxType:"MDXLayout"}),t($,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),t("h1",null,"Input"),t("p",null,"Used for all text single-line user inputs."),t(u,{mdxType:"Canvas"},t(s,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(u,{mdxType:"Canvas"},t(s,{name:"Number",args:{type:"number",label:"Amount of soup",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(u,{mdxType:"Canvas"},t(s,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(u,{mdxType:"Canvas"},t(s,{name:"Left label",args:{label:"Who does this soup belong to?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r,labelPosition:h})=>`
      <v-input
        label='${l}'
        placeholder='${o}'
        value='${r}'
        labelposition='${h}'
      />
    `)))}y.isMDXComponent=!0;const m=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${a}'
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
    \``}};const c=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${l}'
      />
    `;c.storyName="Number";c.args={type:"number",label:"Amount of soup",placeholder:"0",value:""};c.parameters={storySource:{source:`({
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
    \``}};const d=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;d.storyName="No label";d.args={type:"number",placeholder:"0",value:""};d.parameters={storySource:{source:`({
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
    \``}};const b=({type:n,label:a,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        label='${a}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;b.storyName="Left label";b.args={label:"Who does this soup belong to?",placeholder:"Enter name",value:"",labelPosition:"left"};b.parameters={storySource:{source:`({
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
    \``}};const p={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","noLabel","leftLabel"]},T={Text:"text",Number:"number","No label":"noLabel","Left label":"leftLabel"};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:()=>t(v,{mdxStoryNameToKey:T,mdxComponentAnnotations:p},t(y,null))};const N=["text","number","noLabel","leftLabel"];export{N as __namedExportsOrder,p as default,b as leftLabel,d as noLabel,c as number,m as text};
//# sourceMappingURL=input.stories.f7bd6bce.js.map
