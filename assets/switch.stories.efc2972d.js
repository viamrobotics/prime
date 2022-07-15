import"./jsx-runtime.1040ad7c.js";import{c as e,A as m,M as h,C as r,S as o}from"./Props.b5960e0b.js";import"./iframe.8f1c9df5.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},i.apply(this,arguments)}const b={},f="wrapper";function p({components:t,...n}){return e(f,i({},b,n,{components:t,mdxType:"MDXLayout"}),e(h,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},mdxType:"Meta"}),e("h1",null,"Switch"),e("p",null,"Used to handle binary input."),e(r,{mdxType:"Canvas"},e(o,{name:"No label",args:{value:"off"},mdxType:"Story"},({value:a})=>`
      <v-switch
        value='${a}'
      />
    `)),e(r,{mdxType:"Canvas"},e(o,{name:"Right label",args:{value:"off",variant:"labeled"},mdxType:"Story"},({value:a,variant:l})=>`
      <v-switch
        value='${a}'
        variant='${l}'
      />
    `)),e(r,{mdxType:"Canvas"},e(o,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},mdxType:"Story"},({value:a,variant:l,disabled:v})=>`
      <v-switch
        value='${a}'
        variant='${l}'
        disabled='${v}'
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
    \``}};const u=({value:t,variant:n})=>`
      <v-switch
        value='${t}'
        variant='${n}'
      />
    `;u.storyName="Right label";u.args={value:"off",variant:"labeled"};u.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const c=({value:t,variant:n,disabled:a})=>`
      <v-switch
        value='${t}'
        variant='${n}'
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
    \``}};const s={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","labeled"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},includeStories:["noLabel","rightLabel","disabled"]},y={"No label":"noLabel","Right label":"rightLabel",Disabled:"disabled"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(m,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},e(p,null))};const x=["noLabel","rightLabel","disabled"];export{x as __namedExportsOrder,s as default,c as disabled,d as noLabel,u as rightLabel};
//# sourceMappingURL=switch.stories.efc2972d.js.map
