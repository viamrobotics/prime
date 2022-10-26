var P=Object.defineProperty;var r=(a,o)=>P(a,"name",{value:o,configurable:!0});import"./jsx-runtime.7c956129.js";import{c as n,A as I,M as g,C as i,S as c}from"./Props.56b8c1bc.js";import"./iframe.169a578e.js";import"./es.map.constructor.4ff1da2c.js";import"./es.number.to-fixed.f7388daa.js";const S=["3 GPIO 2","5 GPIO 3","7 GPIO 4","8 GPIO 14","10 GPIO 15","11 GPIO 17","12 GPIO 18","13 GPIO 27","15 GPIO 22","16 GPIO 23","18 GPIO 24","19 GPIO 10","21 GPIO 9","22 GPIO 25","23 GPIO 11","24 GPIO 8","26 GPIO 7","27 ID SD","28 ID SC","29 GPIO 5","31 GPIO 6","32 GPIO 12","33 GPIO 13","35 GPIO 19","36 GPIO 16","37 GPIO 26","38 GPIO 20","40 GPIO 21"].join(",");function h(){return h=Object.assign?Object.assign.bind():function(a){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(a[l]=e[l])}return a},h.apply(this,arguments)}r(h,"_extends");const G={},w="wrapper";function f({components:a,...o}){return n(w,h({},G,o,{components:a,mdxType:"MDXLayout"}),n(g,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),n("h1",null,"Select"),n("p",null,"For user triggered actions"),n(i,{mdxType:"Canvas"},n(c,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,placeholder:t})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${t}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${t}'
        placeholder='${p}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p,disabled:s,tooltip:d,state:T})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${t}'
        placeholder='${p}'
        disabled='${s}'
        tooltip='${d}'
        state='${T}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p,exact:s})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${t}'
        placeholder='${p}'
        exact='${s}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"Tooltip",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p,tooltip:s,state:d})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${t}'
        placeholder='${p}'
        tooltip='${s}'
        state='${d}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"With prefix",args:{label:"Your options",options:S,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p,variant:s,prefix:d})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${p}'
        prefix='${d}'
      />
    `)),n(i,{mdxType:"Canvas"},n(c,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:l,value:t,placeholder:p,variant:s})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${t}'
        placeholder='${p}'
        variant='${s}'
      />
    `)))}r(f,"MDXContent");f.isMDXComponent=!0;const m=r(({label:a,options:o,placeholder:e})=>`
      <v-select
        label='${a}'
        options='${o}'
        placeholder='${e}'
      />
    `,"select");m.storyName="Select";m.args={label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const $=r(({label:a,options:o,value:e,placeholder:l})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
      />
    `,"withValue");$.storyName="With value";$.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};$.parameters={storySource:{source:`({
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
    \``}};const b=r(({label:a,options:o,value:e,placeholder:l,disabled:t,tooltip:p,state:s})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        disabled='${t}'
        tooltip='${p}'
        state='${s}'
      />
    `,"disabled");b.storyName="Disabled";b.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"};b.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  disabled,
  tooltip,
  state
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        disabled='\${disabled}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const v=r(({label:a,options:o,value:e,placeholder:l,exact:t})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        exact='${t}'
      />
    `,"exact");v.storyName="Exact";v.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"};v.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  exact
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        exact='\${exact}'
      />
    \``}};const y=r(({label:a,options:o,value:e,placeholder:l,tooltip:t,state:p})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        tooltip='${t}'
        state='${p}'
      />
    `,"tooltip");y.storyName="Tooltip";y.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"};y.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  tooltip,
  state
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const O=r(({label:a,options:o,value:e,placeholder:l,variant:t,prefix:p})=>`
      <v-select
        label='${a}'
        options='${o}'
        placeholder='${l}'
        prefix='${p}'
      />
    `,"withPrefix");O.storyName="With prefix";O.args={label:"Your options",options:S,placeholder:"Select...",prefix:"true"};O.parameters={storySource:{source:`({
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
    \``}};const x=r(({label:a,options:o,value:e,placeholder:l,variant:t})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${l}'
        variant='${t}'
      />
    `,"multiple");x.storyName="Multiple";x.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"};x.parameters={storySource:{source:`({
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
    \``}};const u={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue","disabled","exact","tooltip","withPrefix","multiple"]},C={Select:"select","With value":"withValue",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix",Multiple:"multiple"};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:()=>n(I,{mdxStoryNameToKey:C,mdxComponentAnnotations:u},n(f,null))};const E=["select","withValue","disabled","exact","tooltip","withPrefix","multiple"];export{E as __namedExportsOrder,u as default,b as disabled,v as exact,x as multiple,m as select,y as tooltip,O as withPrefix,$ as withValue};
//# sourceMappingURL=select.stories.80044f2a.js.map
