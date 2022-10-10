var h=Object.defineProperty;var s=(e,t)=>h(e,"name",{value:t,configurable:!0});import"./jsx-runtime.88617851.js";import{c as a,A as y,M as b,C as r,S as i}from"./Props.4006b725.js";import"./iframe.3e667217.js";import"./es.map.constructor.6248c33e.js";import"./es.number.to-fixed.63341b37.js";function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var l in n)Object.prototype.hasOwnProperty.call(n,l)&&(e[l]=n[l])}return e},u.apply(this,arguments)}s(u,"_extends");const w={},$="wrapper";function m({components:e,...t}){return a($,u({},w,t,{components:e,mdxType:"MDXLayout"}),a(b,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},mdxType:"Meta"}),a("h1",null,"Switch"),a("p",null,"Used to handle binary input."),a(r,{mdxType:"Canvas"},a(i,{name:"Default",args:{value:"off"},mdxType:"Story"},({value:n})=>`
      <v-switch
        value='${n}'
      />
    `)),a(r,{mdxType:"Canvas"},a(i,{name:"Annotated",args:{value:"off",variant:"annotated"},mdxType:"Story"},({value:n,variant:l})=>`
      <v-switch
        value='${n}'
        variant='${l}'
      />
    `)),a(r,{mdxType:"Canvas"},a(i,{name:"With label",args:{value:"off",label:"Lunchtime"},mdxType:"Story"},({value:n,label:l})=>`
      <v-switch
        value='${n}'
        label='${l}'
      />
    `)),a(r,{mdxType:"Canvas"},a(i,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},mdxType:"Story"},({value:n,variant:l,disabled:f})=>`
      <v-switch
        value='${n}'
        variant='${l}'
        disabled='${f}'
      />
    `)))}s(m,"MDXContent");m.isMDXComponent=!0;const d=s(({value:e})=>`
      <v-switch
        value='${e}'
      />
    `,"defaultStory");d.storyName="Default";d.args={value:"off"};d.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const c=s(({value:e,variant:t})=>`
      <v-switch
        value='${e}'
        variant='${t}'
      />
    `,"annotated");c.storyName="Annotated";c.args={value:"off",variant:"annotated"};c.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const p=s(({value:e,label:t})=>`
      <v-switch
        value='${e}'
        label='${t}'
      />
    `,"withLabel");p.storyName="With label";p.args={value:"off",label:"Lunchtime"};p.parameters={storySource:{source:`({
  value,
  label
}) => \`
      <v-switch
        value='\${value}'
        label='\${label}'
      />
    \``}};const v=s(({value:e,variant:t,disabled:n})=>`
      <v-switch
        value='${e}'
        variant='${t}'
        disabled='${n}'
      />
    `,"disabled");v.storyName="Disabled";v.args={value:"off",variant:"labeled",disabled:"true"};v.parameters={storySource:{source:`({
  value,
  variant,
  disabled
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        disabled='\${disabled}'
      />
    \``}};const o={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},includeStories:["defaultStory","annotated","withLabel","disabled"]},S={Default:"defaultStory",Annotated:"annotated","With label":"withLabel",Disabled:"disabled"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(y,{mdxStoryNameToKey:S,mdxComponentAnnotations:o},a(m,null))};const M=["defaultStory","annotated","withLabel","disabled"];export{M as __namedExportsOrder,c as annotated,o as default,d as defaultStory,v as disabled,p as withLabel};
//# sourceMappingURL=switch.stories.a9d4e39b.js.map
