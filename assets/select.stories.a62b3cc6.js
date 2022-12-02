var g=Object.defineProperty;var r=(a,l)=>g(a,"name",{value:l,configurable:!0});import"./jsx-runtime.88e1415b.js";import{c as n,A as I,M as G,C as s,S as c}from"./Props.b0aadff9.js";import"./iframe.5823ecb8.js";import"./es.map.constructor.c807029b.js";import"./es.number.to-fixed.b36c08b6.js";const T=["3 GPIO 2","5 GPIO 3","7 GPIO 4","8 GPIO 14","10 GPIO 15","11 GPIO 17","12 GPIO 18","13 GPIO 27","15 GPIO 22","16 GPIO 23","18 GPIO 24","19 GPIO 10","21 GPIO 9","22 GPIO 25","23 GPIO 11","24 GPIO 8","26 GPIO 7","27 ID SD","28 ID SC","29 GPIO 5","31 GPIO 6","32 GPIO 12","33 GPIO 13","35 GPIO 19","36 GPIO 16","37 GPIO 26","38 GPIO 20","40 GPIO 21"].join(",");function b(){return b=Object.assign?Object.assign.bind():function(a){for(var l=1;l<arguments.length;l++){var e=arguments[l];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t])}return a},b.apply(this,arguments)}r(b,"_extends");const C={},N="wrapper";function w({components:a,...l}){return n(N,b({},C,l,{components:a,mdxType:"MDXLayout"}),n(G,{title:"Elements/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},showpill:{description:"when in multi-select variant, have the option to show pills in the select representing selected values",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},clearable:{description:"option to show the clear all button to deselect all otpions",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},mdxType:"Meta"}),n("h1",null,"Select"),n("p",null,"For user triggered actions"),n(s,{mdxType:"Canvas"},n(c,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:t,placeholder:o})=>`
      <v-select
        label='${e}'
        options='${t}'
        placeholder='${o}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Option with Button",args:{label:"Your photos",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},mdxType:"Story"},({label:e,options:t,withbutton:o,buttontext:i,buttonicon:p})=>`
      <v-select
        label='${e}'
        options='${t}'
        withbutton='${o}'
        buttontext='${i}'
        buttonicon='${p}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,disabled:p,tooltip:u,state:h})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
        disabled='${p}'
        tooltip='${u}'
        state='${h}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,exact:p})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
        exact='${p}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Tooltip",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,tooltip:p,state:u})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
        tooltip='${p}'
        state='${u}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"With prefix",args:{label:"Your options",options:T,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,variant:p,prefix:u})=>`
      <v-select
        label='${e}'
        options='${t}'
        placeholder='${i}'
        prefix='${u}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,variant:p})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
        variant='${p}'
      />
    `)),n(s,{mdxType:"Canvas"},n(c,{name:"Multiple With Pills Not Clearable",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple",showpill:"true",clearable:"false"},mdxType:"Story"},({label:e,options:t,value:o,placeholder:i,variant:p,showpill:u,clearable:h})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${o}'
        placeholder='${i}'
        variant='${p}'
        showpill='${u}'
        clearable='${h}'
      />
    `)))}r(w,"MDXContent");w.isMDXComponent=!0;const m=r(({label:a,options:l,placeholder:e})=>`
      <v-select
        label='${a}'
        options='${l}'
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
    \``}};const $=r(({label:a,options:l,value:e,placeholder:t})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
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
    \``}};const v=r(({label:a,options:l,withbutton:e,buttontext:t,buttonicon:o})=>`
      <v-select
        label='${a}'
        options='${l}'
        withbutton='${e}'
        buttontext='${t}'
        buttonicon='${o}'
      />
    `,"optionWithButton");v.storyName="Option with Button";v.args={label:"Your photos",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};v.parameters={storySource:{source:`({
  label,
  options,
  withbutton,
  buttontext,
  buttonicon
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        withbutton='\${withbutton}'
        buttontext='\${buttontext}'
        buttonicon='\${buttonicon}'
      />
    \``}};const y=r(({label:a,options:l,value:e,placeholder:t,disabled:o,tooltip:i,state:p})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
        disabled='${o}'
        tooltip='${i}'
        state='${p}'
      />
    `,"disabled");y.storyName="Disabled";y.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"};y.parameters={storySource:{source:`({
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
    \``}};const x=r(({label:a,options:l,value:e,placeholder:t,exact:o})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
        exact='${o}'
      />
    `,"exact");x.storyName="Exact";x.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"};x.parameters={storySource:{source:`({
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
    \``}};const O=r(({label:a,options:l,value:e,placeholder:t,tooltip:o,state:i})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
        tooltip='${o}'
        state='${i}'
      />
    `,"tooltip");O.storyName="Tooltip";O.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"};O.parameters={storySource:{source:`({
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
    \``}};const f=r(({label:a,options:l,value:e,placeholder:t,variant:o,prefix:i})=>`
      <v-select
        label='${a}'
        options='${l}'
        placeholder='${t}'
        prefix='${i}'
      />
    `,"withPrefix");f.storyName="With prefix";f.args={label:"Your options",options:T,placeholder:"Select...",prefix:"true"};f.parameters={storySource:{source:`({
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
    \``}};const S=r(({label:a,options:l,value:e,placeholder:t,variant:o})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
        variant='${o}'
      />
    `,"multiple");S.storyName="Multiple";S.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"};S.parameters={storySource:{source:`({
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
    \``}};const P=r(({label:a,options:l,value:e,placeholder:t,variant:o,showpill:i,clearable:p})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${t}'
        variant='${o}'
        showpill='${i}'
        clearable='${p}'
      />
    `,"multipleWithPillsNotClearable");P.storyName="Multiple With Pills Not Clearable";P.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple",showpill:"true",clearable:"false"};P.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  variant,
  showpill,
  clearable
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        variant='\${variant}'
        showpill='\${showpill}'
        clearable='\${clearable}'
      />
    \``}};const d={title:"Elements/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},showpill:{description:"when in multi-select variant, have the option to show pills in the select representing selected values",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},clearable:{description:"option to show the clear all button to deselect all otpions",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},includeStories:["select","withValue","optionWithButton","disabled","exact","tooltip","withPrefix","multiple","multipleWithPillsNotClearable"]},V={Select:"select","With value":"withValue","Option with Button":"optionWithButton",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix",Multiple:"multiple","Multiple With Pills Not Clearable":"multipleWithPillsNotClearable"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>n(I,{mdxStoryNameToKey:V,mdxComponentAnnotations:d},n(w,null))};const B=["select","withValue","optionWithButton","disabled","exact","tooltip","withPrefix","multiple","multipleWithPillsNotClearable"];export{B as __namedExportsOrder,d as default,y as disabled,x as exact,S as multiple,P as multipleWithPillsNotClearable,v as optionWithButton,m as select,O as tooltip,f as withPrefix,$ as withValue};
//# sourceMappingURL=select.stories.a62b3cc6.js.map
