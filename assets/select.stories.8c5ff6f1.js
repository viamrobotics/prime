import"./jsx-runtime.39ba4f65.js";import{c as o,A as b,M as v,C as r,S as i}from"./Props.86d51286.js";import"./iframe.0b34fbbe.js";import"./es.map.constructor.f69855c6.js";import"./es.number.to-fixed.a8b353d9.js";function d(){return d=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(a[l]=e[l])}return a},d.apply(this,arguments)}const y={},$="wrapper";function h({components:a,...t}){return o($,d({},y,t,{components:a,mdxType:"MDXLayout"}),o(v,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),o("h1",null,"Select"),o("p",null,"For user triggered actions"),o(r,{mdxType:"Canvas"},o(i,{name:"Select",args:{label:"Your options",options:"Option 1, Option 2, Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,placeholder:n})=>`
      <v-select
        label='${e}'
        options='${l}'
        placeholder='${n}'
      />
    `)),o(r,{mdxType:"Canvas"},o(i,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
      />
    `)),o(r,{mdxType:"Canvas"},o(i,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:l,value:n,placeholder:p})=>`
      <v-select
        label='${e}'
        options='${l}'
        value='${n}'
        placeholder='${p}'
        disabled='true'
      />
    `)))}h.isMDXComponent=!0;const c=({label:a,options:t,placeholder:e})=>`
      <v-select
        label='${a}'
        options='${t}'
        placeholder='${e}'
      />
    `;c.storyName="Select";c.args={label:"Your options",options:"Option 1, Option 2, Option 3",placeholder:"Some placeholder..."};c.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const u=({label:a,options:t,value:e,placeholder:l})=>`
      <v-select
        label='${a}'
        options='${t}'
        value='${e}'
        placeholder='${l}'
      />
    `;u.storyName="With value";u.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};u.parameters={storySource:{source:`({
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
    \``}};const m=({label:a,options:t,value:e,placeholder:l})=>`
      <v-select
        label='${a}'
        options='${t}'
        value='${e}'
        placeholder='${l}'
        disabled='true'
      />
    `;m.storyName="Disabled";m.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
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
        disabled='true'
      />
    \``}};const s={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue","disabled"]},O={Select:"select","With value":"withValue",Disabled:"disabled"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>o(b,{mdxStoryNameToKey:O,mdxComponentAnnotations:s},o(h,null))};const V=["select","withValue","disabled"];export{V as __namedExportsOrder,s as default,m as disabled,c as select,u as withValue};
//# sourceMappingURL=select.stories.8c5ff6f1.js.map
