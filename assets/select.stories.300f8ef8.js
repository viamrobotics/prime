import"./jsx-runtime.9362d9f6.js";import{c as a,A as S,M as f,C as r,S as s}from"./Props.f07bd32f.js";import"./iframe.563ef3a9.js";import"./es.map.constructor.74fd3ba3.js";import"./es.number.to-fixed.d4cf2875.js";const O=["3 GPIO 2","5 GPIO 3","7 GPIO 4","8 GPIO 14","10 GPIO 15","11 GPIO 17","12 GPIO 18","13 GPIO 27","15 GPIO 22","16 GPIO 23","18 GPIO 24","19 GPIO 10","21 GPIO 9","22 GPIO 25","23 GPIO 11","24 GPIO 8","26 GPIO 7","27 ID SD","28 ID SC","29 GPIO 5","31 GPIO 6","32 GPIO 12","33 GPIO 13","35 GPIO 19","36 GPIO 16","37 GPIO 26","38 GPIO 20","40 GPIO 21"].join(",");function u(){return u=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(t[l]=e[l])}return t},u.apply(this,arguments)}const P={},I="wrapper";function x({components:t,...o}){return a(I,u({},P,o,{components:t,mdxType:"MDXLayout"}),a(f,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),a("h1",null,"Select"),a("p",null,"For user triggered actions"),a(r,{mdxType:"Canvas"},a(s,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,placeholder:n})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${n}'
      />
    `)),a(r,{mdxType:"Canvas"},a(s,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
      />
    `)),a(r,{mdxType:"Canvas"},a(s,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true"},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p,disabled:i})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
        disabled='${i}'
      />
    `)),a(r,{mdxType:"Canvas"},a(s,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p,variant:i,exact:d})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
        exact='${d}'
      />
    `)),a(r,{mdxType:"Canvas"},a(s,{name:"With prefix",args:{label:"Your options",options:O,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p,variant:i,prefix:d})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${p}'
        prefix='${d}'
      />
    `)),a(r,{mdxType:"Canvas"},a(s,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p,variant:i})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
        variant='${i}'
      />
    `)))}x.isMDXComponent=!0;const m=({label:t,options:o,placeholder:e})=>`
      <v-select
        label='${t}'
        options='${o}'
        placeholder='${e}'
      />
    `;m.storyName="Select";m.args={label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const h=({label:t,options:o,value:e,placeholder:l})=>`
      <v-select
        label='${t}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
      />
    `;h.storyName="With value";h.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};h.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
      />
    \``}};const v=({label:t,options:o,value:e,placeholder:l,disabled:n})=>`
      <v-select
        label='${t}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        disabled='${n}'
      />
    `;v.storyName="Disabled";v.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true"};v.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  disabled
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        disabled='\${disabled}'
      />
    \``}};const b=({label:t,options:o,value:e,placeholder:l,variant:n,exact:p})=>`
      <v-select
        label='${t}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        exact='${p}'
      />
    `;b.storyName="Exact";b.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"};b.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  variant,
  exact
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        exact='\${exact}'
      />
    \``}};const $=({label:t,options:o,value:e,placeholder:l,variant:n,prefix:p})=>`
      <v-select
        label='${t}'
        options='${o}'
        placeholder='${l}'
        prefix='${p}'
      />
    `;$.storyName="With prefix";$.args={label:"Your options",options:O,placeholder:"Select...",prefix:"true"};$.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  variant,
  prefix
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
        prefix='\${prefix}'
      />
    \``}};const y=({label:t,options:o,value:e,placeholder:l,variant:n})=>`
      <v-select
        label='${t}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        variant='${n}'
      />
    `;y.storyName="Multiple";y.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"};y.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  variant
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        variant='\${variant}'
      />
    \``}};const c={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue","disabled","exact","withPrefix","multiple"]},G={Select:"select","With value":"withValue",Disabled:"disabled",Exact:"exact","With prefix":"withPrefix",Multiple:"multiple"};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:()=>a(S,{mdxStoryNameToKey:G,mdxComponentAnnotations:c},a(x,null))};const V=["select","withValue","disabled","exact","withPrefix","multiple"];export{V as __namedExportsOrder,c as default,v as disabled,b as exact,y as multiple,m as select,$ as withPrefix,h as withValue};
//# sourceMappingURL=select.stories.300f8ef8.js.map
