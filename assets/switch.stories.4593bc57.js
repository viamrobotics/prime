import"./jsx-runtime.32f98563.js";import{c as e,A as f,M as h,C as o,S as r}from"./Props.fc236782.js";import"./iframe.8d069f6b.js";import"./es.map.constructor.bdcfca2e.js";import"./es.number.to-fixed.55902939.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},i.apply(this,arguments)}const y={},b="wrapper";function v({components:t,...n}){return e(b,i({},y,n,{components:t,mdxType:"MDXLayout"}),e(h,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},mdxType:"Meta"}),e("h1",null,"Switch"),e("p",null,"Used to handle binary input."),e(o,{mdxType:"Canvas"},e(r,{name:"Default",args:{value:"off"},mdxType:"Story"},({value:a})=>`
      <v-switch
        value='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(r,{name:"Annotated",args:{value:"off",variant:"annotated"},mdxType:"Story"},({value:a,variant:l})=>`
      <v-switch
        value='${a}'
        variant='${l}'
      />
    `)),e(o,{mdxType:"Canvas"},e(r,{name:"With label",args:{value:"off",label:"Lunchtime"},mdxType:"Story"},({value:a,label:l})=>`
      <v-switch
        value='${a}'
        label='${l}'
      />
    `)),e(o,{mdxType:"Canvas"},e(r,{name:"Disabled",args:{value:"off",variant:"labeled",disabled:"true"},mdxType:"Story"},({value:a,variant:l,disabled:m})=>`
      <v-switch
        value='${a}'
        variant='${l}'
        disabled='${m}'
      />
    `)))}v.isMDXComponent=!0;const u=({value:t})=>`
      <v-switch
        value='${t}'
      />
    `;u.storyName="Default";u.args={value:"off"};u.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const d=({value:t,variant:n})=>`
      <v-switch
        value='${t}'
        variant='${n}'
      />
    `;d.storyName="Annotated";d.args={value:"off",variant:"annotated"};d.parameters={storySource:{source:`({
  value,
  variant
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
      />
    \``}};const c=({value:t,label:n})=>`
      <v-switch
        value='${t}'
        label='${n}'
      />
    `;c.storyName="With label";c.args={value:"off",label:"Lunchtime"};c.parameters={storySource:{source:`({
  value,
  label
}) => \`
      <v-switch
        value='\${value}'
        label='\${label}'
      />
    \``}};const p=({value:t,variant:n,disabled:a})=>`
      <v-switch
        value='${t}'
        variant='${n}'
        disabled='${a}'
      />
    `;p.storyName="Disabled";p.args={value:"off",variant:"labeled",disabled:"true"};p.parameters={storySource:{source:`({
  value,
  variant,
  disabled
}) => \`
      <v-switch
        value='\${value}'
        variant='\${variant}'
        disabled='\${disabled}'
      />
    \``}};const s={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",table:{defaultValue:{summary:"off"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},variant:{description:"The displayed style of the switch",control:"select",options:["default","annotated"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Whether the input is disabled",control:"select",options:["true","false"],table:{defaultValue:{summary:"false"}}},"on:input":{description:"Event fired when input value changes."}},includeStories:["defaultStory","annotated","withLabel","disabled"]},w={Default:"defaultStory",Annotated:"annotated","With label":"withLabel",Disabled:"disabled"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(f,{mdxStoryNameToKey:w,mdxComponentAnnotations:s},e(v,null))};const C=["defaultStory","annotated","withLabel","disabled"];export{C as __namedExportsOrder,d as annotated,s as default,u as defaultStory,p as disabled,c as withLabel};
//# sourceMappingURL=switch.stories.4593bc57.js.map
