import"./jsx-runtime.32f98563.js";import{c as t,A as f,M as P,C as i,S as s}from"./Props.fc236782.js";import"./iframe.8d069f6b.js";import"./es.map.constructor.bdcfca2e.js";import"./es.number.to-fixed.55902939.js";const O=["3 GPIO 2","5 GPIO 3","7 GPIO 4","8 GPIO 14","10 GPIO 15","11 GPIO 17","12 GPIO 18","13 GPIO 27","15 GPIO 22","16 GPIO 23","18 GPIO 24","19 GPIO 10","21 GPIO 9","22 GPIO 25","23 GPIO 11","24 GPIO 8","26 GPIO 7","27 ID SD","28 ID SC","29 GPIO 5","31 GPIO 6","32 GPIO 12","33 GPIO 13","35 GPIO 19","36 GPIO 16","37 GPIO 26","38 GPIO 20","40 GPIO 21"].join(",");function d(){return d=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},d.apply(this,arguments)}const T={},I="wrapper";function x({components:n,...a}){return t(I,d({},T,a,{components:n,mdxType:"MDXLayout"}),t(P,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Select"),t("p",null,"For user triggered actions"),t(i,{mdxType:"Canvas"},t(s,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,placeholder:o})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${o}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,disabled:r})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        disabled='${r}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,exact:r})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        exact='${r}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"Tooltip",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options."},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,tooltip:r})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        tooltip='${r}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"With prefix",args:{label:"Your options",options:O,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,variant:r,prefix:S})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${p}'
        prefix='${S}'
      />
    `)),t(i,{mdxType:"Canvas"},t(s,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,variant:r})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        variant='${r}'
      />
    `)))}x.isMDXComponent=!0;const u=({label:n,options:a,placeholder:e})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${e}'
      />
    `;u.storyName="Select";u.args={label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};u.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const m=({label:n,options:a,value:e,placeholder:l})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
      />
    `;m.storyName="With value";m.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
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
    \``}};const h=({label:n,options:a,value:e,placeholder:l,disabled:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        disabled='${o}'
      />
    `;h.storyName="Disabled";h.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true"};h.parameters={storySource:{source:`({
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
    \``}};const $=({label:n,options:a,value:e,placeholder:l,exact:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        exact='${o}'
      />
    `;$.storyName="Exact";$.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"};$.parameters={storySource:{source:`({
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
    \``}};const v=({label:n,options:a,value:e,placeholder:l,tooltip:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        tooltip='${o}'
      />
    `;v.storyName="Tooltip";v.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options."};v.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder,
  tooltip
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
        placeholder='\${placeholder}'
        tooltip='\${tooltip}'
      />
    \``}};const b=({label:n,options:a,value:e,placeholder:l,variant:o,prefix:p})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${l}'
        prefix='${p}'
      />
    `;b.storyName="With prefix";b.args={label:"Your options",options:O,placeholder:"Select...",prefix:"true"};b.parameters={storySource:{source:`({
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
    \``}};const y=({label:n,options:a,value:e,placeholder:l,variant:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        variant='${o}'
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
    \``}};const c={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue","disabled","exact","tooltip","withPrefix","multiple"]},g={Select:"select","With value":"withValue",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix",Multiple:"multiple"};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:()=>t(f,{mdxStoryNameToKey:g,mdxComponentAnnotations:c},t(x,null))};const Y=["select","withValue","disabled","exact","tooltip","withPrefix","multiple"];export{Y as __namedExportsOrder,c as default,h as disabled,$ as exact,y as multiple,u as select,v as tooltip,b as withPrefix,m as withValue};
//# sourceMappingURL=select.stories.e9886d8b.js.map
