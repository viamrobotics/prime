var d=Object.defineProperty;var r=(t,e)=>d(t,"name",{value:e,configurable:!0});import"./jsx-runtime.e819bcfc.js";import{c as o,A as y,M as b,C as h,S as v}from"./Props.c4731b41.js";import"./iframe.33d62c99.js";import"./es.map.constructor.7a4b5b44.js";import"./es.number.to-fixed.e1836392.js";function p(){return p=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},p.apply(this,arguments)}r(p,"_extends");const f={},T="wrapper";function u({components:t,...e}){return o(T,p({},f,e,{components:t,mdxType:"MDXLayout"}),o(b,{title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),o("h1",null,"Vector Input"),o(h,{mdxType:"Canvas"},o(v,{name:"3 Dimension",args:{dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1},mdxType:"Story"},({type:n,label:a,placeholder:s,value:m,step:c})=>`
      <v-vector-input
        type='${n}'
        label='${a}'
        placeholder='${s}'
        value='${m}'
        step='${c}'
      />
    `)))}r(u,"MDXContent");u.isMDXComponent=!0;const i=r(({type:t,label:e,placeholder:n,value:a,step:s})=>`
      <v-vector-input
        type='${t}'
        label='${e}'
        placeholder='${n}'
        value='${a}'
        step='${s}'
      />
    `,"_3Dimension");i.storyName="3 Dimension";i.args={dimensions:3,type:"number",label:"Position",placeholder:"0",value:"",step:.1};i.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  step
}) => \`
      <v-vector-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
        step='\${step}'
      />
    \``}};const l={title:"Elements/VectorInput",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["number","integer"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},step:{description:"For number inputs, the increment step",control:"number",table:{defaultValue:{summary:1}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["_3Dimension"]},g={"3 Dimension":"_3Dimension"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>o(y,{mdxStoryNameToKey:g,mdxComponentAnnotations:l},o(u,null))};const S=["_3Dimension"];export{i as _3Dimension,S as __namedExportsOrder,l as default};
//# sourceMappingURL=vector-input.stories.83d02da7.js.map
