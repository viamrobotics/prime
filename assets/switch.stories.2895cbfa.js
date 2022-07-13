import"./index.5c7752e3.js";import{c as e,A as v,M as b,C as r,S as o}from"./Props.a7eef7fb.js";import"./iframe.fcd91b50.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var l=1;l<arguments.length;l++){var a=arguments[l];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},i.apply(this,arguments)}const h={},f="wrapper";function p({components:t,...l}){return e(f,i({},h,l,{components:t,mdxType:"MDXLayout"}),e(b,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}}},mdxType:"Meta"}),e("h1",null,"Switch"),e("p",null,"Used to handle binary input."),e(r,{mdxType:"Canvas"},e(o,{name:"No label",args:{value:"off"},mdxType:"Story"},({value:a})=>`
      <v-switch
        value='${a}'
      />
    `)),e(r,{mdxType:"Canvas"},e(o,{name:"Right label",args:{value:"off",variant:"labeled"},mdxType:"Story"},({value:a,variant:n})=>`
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
    `;d.storyName="No label";d.args={value:"off"};d.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const u=({value:t,variant:l})=>`
      <v-switch
        value='${t}'
        variant='${l}'
      />
    `;u.storyName="Right label";u.args={value:"off",variant:"labeled"};u.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const c=({value:t,variant:l,disabled:a})=>`
      <v-switch
        value='${t}'
        variant='${l}'
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
    \``}};const s={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}}},includeStories:["noLabel","rightLabel","disabled"]},y={"No label":"noLabel","Right label":"rightLabel",Disabled:"disabled"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},e(p,null))};const x=["noLabel","rightLabel","disabled"];export{x as __namedExportsOrder,s as default,c as disabled,d as noLabel,u as rightLabel};
//# sourceMappingURL=switch.stories.2895cbfa.js.map
