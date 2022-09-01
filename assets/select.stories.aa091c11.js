import"./jsx-runtime.0733ae78.js";import{c as t,A as T,M as P,C as r,S as i}from"./Props.6d2f3d2b.js";import"./iframe.d09fda60.js";import"./es.map.constructor.44dfcf82.js";import"./es.number.to-fixed.bf390618.js";const x=["3 GPIO 2","5 GPIO 3","7 GPIO 4","8 GPIO 14","10 GPIO 15","11 GPIO 17","12 GPIO 18","13 GPIO 27","15 GPIO 22","16 GPIO 23","18 GPIO 24","19 GPIO 10","21 GPIO 9","22 GPIO 25","23 GPIO 11","24 GPIO 8","26 GPIO 7","27 ID SD","28 ID SC","29 GPIO 5","31 GPIO 6","32 GPIO 12","33 GPIO 13","35 GPIO 19","36 GPIO 16","37 GPIO 26","38 GPIO 20","40 GPIO 21"].join(",");function u(){return u=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},u.apply(this,arguments)}const I={},g="wrapper";function S({components:n,...a}){return t(g,u({},I,a,{components:n,mdxType:"MDXLayout"}),t(P,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Select"),t("p",null,"For user triggered actions"),t(r,{mdxType:"Canvas"},t(i,{name:"Select",args:{label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,placeholder:o})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${o}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,disabled:s,tooltip:c,state:f})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        disabled='${s}'
        tooltip='${c}'
        state='${f}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"Exact",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,exact:s})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        exact='${s}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"Tooltip",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,tooltip:s,state:c})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        tooltip='${s}'
        state='${c}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"With prefix",args:{label:"Your options",options:x,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,variant:s,prefix:c})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${p}'
        prefix='${c}'
      />
    `)),t(r,{mdxType:"Canvas"},t(i,{name:"Multiple",args:{label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"},mdxType:"Story"},({label:e,options:l,value:o,placeholder:p,variant:s})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${o}'
        placeholder='${p}'
        variant='${s}'
      />
    `)))}S.isMDXComponent=!0;const h=({label:n,options:a,placeholder:e})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${e}'
      />
    `;h.storyName="Select";h.args={label:"Names",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};h.parameters={storySource:{source:`({
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
    \``}};const $=({label:n,options:a,value:e,placeholder:l,disabled:o,tooltip:p,state:s})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        disabled='${o}'
        tooltip='${p}'
        state='${s}'
      />
    `;$.storyName="Disabled";$.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder...",disabled:"true",tooltip:"This is disabled.",state:"error"};$.parameters={storySource:{source:`({
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
    \``}};const b=({label:n,options:a,value:e,placeholder:l,exact:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        exact='${o}'
      />
    `;b.storyName="Exact";b.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",exact:"true"};b.parameters={storySource:{source:`({
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
    \``}};const v=({label:n,options:a,value:e,placeholder:l,tooltip:o,state:p})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        tooltip='${o}'
        state='${p}'
      />
    `;v.storyName="Tooltip";v.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option",placeholder:"Some placeholder...",tooltip:"Warning: these options may not be your only options.",state:"warn"};v.parameters={storySource:{source:`({
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
    \``}};const y=({label:n,options:a,value:e,placeholder:l,variant:o,prefix:p})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${l}'
        prefix='${p}'
      />
    `;y.storyName="With prefix";y.args={label:"Your options",options:x,placeholder:"Select...",prefix:"true"};y.parameters={storySource:{source:`({
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
    \``}};const O=({label:n,options:a,value:e,placeholder:l,variant:o})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${e}'
        placeholder='${l}'
        variant='${o}'
      />
    `;O.storyName="Multiple";O.args={label:"Your options",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",placeholder:"Some placeholder...",variant:"multiple"};O.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue","disabled","exact","tooltip","withPrefix","multiple"]},G={Select:"select","With value":"withValue",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix",Multiple:"multiple"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>t(T,{mdxStoryNameToKey:G,mdxComponentAnnotations:d},t(S,null))};const M=["select","withValue","disabled","exact","tooltip","withPrefix","multiple"];export{M as __namedExportsOrder,d as default,$ as disabled,b as exact,O as multiple,h as select,v as tooltip,y as withPrefix,m as withValue};
//# sourceMappingURL=select.stories.aa091c11.js.map
