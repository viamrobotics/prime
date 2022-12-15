var y=Object.defineProperty;var o=(t,l)=>y(t,"name",{value:l,configurable:!0});import"./jsx-runtime.e2f18fbd.js";import{c as a,A as $,M as w,C as s,S as i}from"./Props.cd7729dd.js";import"./iframe.476f0919.js";import"./es.map.constructor.99a102b2.js";import"./es.number.to-fixed.4a0da2e0.js";function d(){return d=Object.assign?Object.assign.bind():function(t){for(var l=1;l<arguments.length;l++){var e=arguments[l];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},d.apply(this,arguments)}o(d,"_extends");const T={},g="wrapper";function f({components:t,...l}){return a(g,d({},T,l,{components:t,mdxType:"MDXLayout"}),a(w,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},mdxType:"Meta"}),a("h1",null,"Switch"),a("p",null,"Used to handle binary input."),a(s,{mdxType:"Canvas"},a(i,{name:"Default",args:{value:"off"},mdxType:"Story"},({value:e})=>`
      <v-switch
        value='${e}'
      />
    `)),a(s,{mdxType:"Canvas"},a(i,{name:"Annotated",args:{value:"off",variant:"annotated"},mdxType:"Story"},({value:e,variant:n})=>`
      <v-switch
        value='${e}'
        variant='${n}'
      />
    `)),a(s,{mdxType:"Canvas"},a(i,{name:"With label",args:{value:"off",label:"Lunchtime"},mdxType:"Story"},({value:e,label:n})=>`
      <v-switch
        value='${e}'
        label='${n}'
      />
    `)),a(s,{mdxType:"Canvas"},a(i,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},mdxType:"Story"},({value:e,variant:n,disabled:u})=>`
      <v-switch
        value='${e}'
        variant='${n}'
        disabled='${u}'
      />
    `)),a(s,{mdxType:"Canvas"},a(i,{name:"Tooltip",args:{value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."},mdxType:"Story"},({value:e,variant:n,tooltip:u,label:b})=>`
      <v-switch
        value='${e}'
        variant='${n}'
        tooltip='${u}'
        label='${b}'
      />
    `)))}o(f,"MDXContent");f.isMDXComponent=!0;const p=o(({value:t})=>`
      <v-switch
        value='${t}'
      />
    `,"defaultStory");p.storyName="Default";p.args={value:"off"};p.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const v=o(({value:t,variant:l})=>`
      <v-switch
        value='${t}'
        variant='${l}'
      />
    `,"annotated");v.storyName="Annotated";v.args={value:"off",variant:"annotated"};v.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const c=o(({value:t,label:l})=>`
      <v-switch
        value='${t}'
        label='${l}'
      />
    `,"withLabel");c.storyName="With label";c.args={value:"off",label:"Lunchtime"};c.parameters={storySource:{source:`({
  value,
  label
}) => \`
      <v-switch
        value='\${value}'
        label='\${label}'
      />
    \``}};const m=o(({value:t,variant:l,disabled:e})=>`
      <v-switch
        value='${t}'
        variant='${l}'
        disabled='${e}'
      />
    `,"disabled");m.storyName="Disabled";m.args={value:"off",variant:"labeled",disabled:"true"};m.parameters={storySource:{source:`({
  value,
  variant,
  disabled
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        disabled='\${disabled}'
      />
    \``}};const h=o(({value:t,variant:l,tooltip:e,label:n})=>`
      <v-switch
        value='${t}'
        variant='${l}'
        tooltip='${e}'
        label='${n}'
      />
    `,"tooltip");h.storyName="Tooltip";h.args={value:"off",variant:"labeled",label:"Switch Label",tooltip:"This is the tooltip message."};h.parameters={storySource:{source:`({
  value,
  variant,
  tooltip,
  label
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        tooltip='\${tooltip}'
        label='\${label}'
      />
    \``}};const r={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},tooltip:{description:"The tooltip message."},"on:input":{description:"Event fired when input value changes."}},includeStories:["defaultStory","annotated","withLabel","disabled","tooltip"]},S={Default:"defaultStory",Annotated:"annotated","With label":"withLabel",Disabled:"disabled",Tooltip:"tooltip"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>a($,{mdxStoryNameToKey:S,mdxComponentAnnotations:r},a(f,null))};const N=["defaultStory","annotated","withLabel","disabled","tooltip"];export{N as __namedExportsOrder,v as annotated,r as default,p as defaultStory,m as disabled,h as tooltip,c as withLabel};
//# sourceMappingURL=switch.stories.9884fdee.js.map
