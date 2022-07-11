import"./index.5c7752e3.js";import{c as l,A as v,M as $,C as u,S as s}from"./Props.55eba346.js";import"./iframe.9a87bb0c.js";function i(){return i=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n},i.apply(this,arguments)}const x={},f="wrapper";function y({components:n,...a}){return l(f,i({},x,a,{components:n,mdxType:"MDXLayout"}),l($,{title:"Elements/Input",argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",control:"text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",control:"text",table:{defaultValue:{summary:""}}},labelPosition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},input:{description:"Fired whenever the input changes",onInput:{action:"input"}}},mdxType:"Meta"}),l("h1",null,"Input"),l("p",null,"Used for all text single-line user inputs."),l(u,{mdxType:"Canvas"},l(s,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:t,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${t}'
        placeholder='${o}'
        value='${r}'
      />
    `)),l(u,{mdxType:"Canvas"},l(s,{name:"Number",args:{type:"number",label:"Amount of soup",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:t,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${t}'
        placeholder='${o}'
        value='${r}'
      />
    `)),l(u,{mdxType:"Canvas"},l(s,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:t,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${o}'
        value='${r}'
      />
    `)),l(u,{mdxType:"Canvas"},l(s,{name:"Left label",args:{label:"Who does this soup belong to?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:t,placeholder:o,value:r,labelPosition:h})=>`
      <v-input
        label='${t}'
        placeholder='${o}'
        value='${r}'
        labelposition='${h}'
      />
    `)))}y.isMDXComponent=!0;const c=({type:n,label:a,placeholder:e,value:t})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${t}'
      />
    `;c.storyName="Text";c.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};c.parameters={storySource:{source:`({
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
    \``}};const m=({type:n,label:a,placeholder:e,value:t})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${t}'
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
    \``}};const b=({type:n,label:a,placeholder:e,value:t})=>`
      <v-input
        type='${n}'
        placeholder='${e}'
        value='${t}'
      />
    `;b.storyName="No label";b.args={type:"number",placeholder:"0",value:""};b.parameters={storySource:{source:`({
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
    \``}};const d=({type:n,label:a,placeholder:e,value:t,labelPosition:o})=>`
      <v-input
        label='${a}'
        placeholder='${e}'
        value='${t}'
        labelposition='${o}'
      />
    `;d.storyName="Left label";d.args={label:"Who does this soup belong to?",placeholder:"Enter name",value:"",labelPosition:"left"};d.parameters={storySource:{source:`({
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
    \``}};const p={title:"Elements/Input",argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",control:"text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",control:"text",table:{defaultValue:{summary:""}}},labelPosition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},input:{description:"Fired whenever the input changes",onInput:{action:"input"}}},includeStories:["text","number","noLabel","leftLabel"]},T={Text:"text",Number:"number","No label":"noLabel","Left label":"leftLabel"};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:()=>l(v,{mdxStoryNameToKey:T,mdxComponentAnnotations:p},l(y,null))};const N=["text","number","noLabel","leftLabel"];export{N as __namedExportsOrder,p as default,d as leftLabel,b as noLabel,m as number,c as text};
//# sourceMappingURL=input.stories.dd7a8ed8.js.map
