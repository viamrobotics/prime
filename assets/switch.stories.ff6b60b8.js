import"./index.5c7752e3.js";import{c as e,A as v,M as h,C as r,S as o}from"./Props.11e92fe1.js";import"./iframe.fe5a3aef.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},i.apply(this,arguments)}const y={},f="wrapper";function p({components:t,...s}){return e(f,i({},y,s,{components:t,mdxType:"MDXLayout"}),e(h,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}}},mdxType:"Meta"}),e("h1",null,"Switch"),e("p",null,"Used to handle binary input."),e(r,{mdxType:"Canvas"},e(o,{name:"Switch",args:{value:"off"},mdxType:"Story"},({value:a})=>`
      <v-switch
        value='${a}'
      />
    `)),e(r,{mdxType:"Canvas"},e(o,{name:"With label",args:{value:"off",variant:"labeled"},mdxType:"Story"},({value:a,variant:n})=>`
      <v-switch
        value='${a}'
        variant='${n}'
      />
    `)),e(r,{mdxType:"Canvas"},e(o,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},mdxType:"Story"},({value:a,variant:n,disabled:m})=>`
      <v-switch
        value='${a}'
        variant='${n}'
        disabled='${m}'
      />
    `)))}p.isMDXComponent=!0;const d=({value:t})=>`
      <v-switch
        value='${t}'
      />
    `;d.storyName="Switch";d.args={value:"off"};d.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const u=({value:t,variant:s})=>`
      <v-switch
        value='${t}'
        variant='${s}'
      />
    `;u.storyName="With label";u.args={value:"off",variant:"labeled"};u.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const c=({value:t,variant:s,disabled:a})=>`
      <v-switch
        value='${t}'
        variant='${s}'
        disabled='${a}'
      />
    `;c.storyName="Disabled";c.args={value:"off",variant:"labeled",disabled:"true"};c.parameters={storySource:{source:`({
  value,
  variant,
  disabled
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        disabled='\${disabled}'
      />
    \``}};const l={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}}},includeStories:["switchStory","withLabel","disabled"]},b={Switch:"switchStory","With label":"withLabel",Disabled:"disabled"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:b,mdxComponentAnnotations:l},e(p,null))};const x=["switchStory","withLabel","disabled"];export{x as __namedExportsOrder,l as default,c as disabled,d as switchStory,u as withLabel};
//# sourceMappingURL=switch.stories.ff6b60b8.js.map
