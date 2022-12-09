var V=Object.defineProperty;var r=(a,o)=>V(a,"name",{value:o,configurable:!0});import"./jsx-runtime.db37b24f.js";import{c as n,A as C,M as N,C as p,S as c}from"./Props.f44fe6c2.js";import"./iframe.1bd41216.js";import{g as T}from"./gpio-options.f92cd13d.js";import"./es.map.constructor.93addd7b.js";import"./es.number.to-fixed.96395589.js";function b(){return b=Object.assign?Object.assign.bind():function(a){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t])}return a},b.apply(this,arguments)}r(b,"_extends");const A={},W="wrapper";function g({components:a,...o}){return n(W,b({},A,o,{components:a,mdxType:"MDXLayout"}),n(N,{title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},showpill:{description:"When in multi-select variant, have the option to show pills in the select representing selected values",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},clearable:{description:'Option to have the "Clear All" button to deselect all otpions',table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},reducesort:{description:"If true, only results with matching elements will display on search",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},mdxType:"Meta"}),n("h1",null,"Select"),n("p",null,"For user triggered actions"),n(p,{mdxType:"Canvas"},n(c,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:t,placeholder:l})=>`
      <v-select
        label='${e}'
        options='${t}'
        placeholder='${l}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Option with Button",args:{label:"Your photos",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},mdxType:"Story"},({label:e,options:t,withbutton:l,buttontext:i,buttonicon:s})=>`
      <v-select
        label='${e}'
        options='${t}'
        withbutton='${l}'
        buttontext='${i}'
        buttonicon='${s}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,disabled:s,tooltip:u,state:h})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
        disabled='${s}'
        tooltip='${u}'
        state='${h}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,exact:s})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
        exact='${s}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Tooltip",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,tooltip:s,state:u})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
        tooltip='${s}'
        state='${u}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"With prefix",args:{label:"Your options",options:T,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,variant:s,prefix:u})=>`
      <v-select
        label='${e}'
        options='${t}'
        placeholder='${i}'
        prefix='${u}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,variant:s})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
        variant='${s}'
      />
    `)),n(p,{mdxType:"Canvas"},n(c,{name:"Multiple With Pills Not Clearable",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple",showpill:"true",clearable:"false"},mdxType:"Story"},({label:e,options:t,value:l,placeholder:i,variant:s,showpill:u,clearable:h})=>`
      <v-select
        label='${e}'
        options='${t}'
        value='${l}'
        placeholder='${i}'
        variant='${s}'
        showpill='${u}'
        clearable='${h}'
      />
    `)))}r(g,"MDXContent");g.isMDXComponent=!0;const m=r(({label:a,options:o,placeholder:e})=>`
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
    \``}};const $=r(({label:a,options:o,value:e,placeholder:t})=>`
      <v-select
        label='${a}'
        options='${o}'
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
    \``}};const v=r(({label:a,options:o,withbutton:e,buttontext:t,buttonicon:l})=>`
      <v-select
        label='${a}'
        options='${o}'
        withbutton='${e}'
        buttontext='${t}'
        buttonicon='${l}'
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
    \``}};const y=r(({label:a,options:o,value:e,placeholder:t,disabled:l,tooltip:i,state:s})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
        disabled='${l}'
        tooltip='${i}'
        state='${s}'
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
    \``}};const x=r(({label:a,options:o,value:e,placeholder:t,exact:l})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
        exact='${l}'
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
    \``}};const f=r(({label:a,options:o,value:e,placeholder:t,tooltip:l,state:i})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
        tooltip='${l}'
        state='${i}'
      />
    `,"tooltip");f.storyName="Tooltip";f.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"};f.parameters={storySource:{source:`({
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
    \``}};const S=r(({label:a,options:o,value:e,placeholder:t,variant:l,prefix:i})=>`
      <v-select
        label='${a}'
        options='${o}'
        placeholder='${t}'
        prefix='${i}'
      />
    `,"withPrefix");S.storyName="With prefix";S.args={label:"Your options",options:T,placeholder:"Select...",prefix:"true"};S.parameters={storySource:{source:`({
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
    \``}};const O=r(({label:a,options:o,value:e,placeholder:t,variant:l})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
        variant='${l}'
      />
    `,"multiple");O.storyName="Multiple";O.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"};O.parameters={storySource:{source:`({
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
    \``}};const w=r(({label:a,options:o,value:e,placeholder:t,variant:l,showpill:i,clearable:s})=>`
      <v-select
        label='${a}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
        variant='${l}'
        showpill='${i}'
        clearable='${s}'
      />
    `,"multipleWithPillsNotClearable");w.storyName="Multiple With Pills Not Clearable";w.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple",showpill:"true",clearable:"false"};w.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},showpill:{description:"When in multi-select variant, have the option to show pills in the select representing selected values",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},clearable:{description:'Option to have the "Clear All" button to deselect all otpions',table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},reducesort:{description:"If true, only results with matching elements will display on search",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},includeStories:["select","withValue","optionWithButton","disabled","exact","tooltip","withPrefix","multiple","multipleWithPillsNotClearable"]},P={Select:"select","With value":"withValue","Option with Button":"optionWithButton",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix",Multiple:"multiple","Multiple With Pills Not Clearable":"multipleWithPillsNotClearable"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>n(C,{mdxStoryNameToKey:P,mdxComponentAnnotations:d},n(g,null))};const k=["select","withValue","optionWithButton","disabled","exact","tooltip","withPrefix","multiple","multipleWithPillsNotClearable"];export{k as __namedExportsOrder,d as default,y as disabled,x as exact,O as multiple,w as multipleWithPillsNotClearable,v as optionWithButton,m as select,f as tooltip,S as withPrefix,$ as withValue};
//# sourceMappingURL=select.stories.8b14a56c.js.map
