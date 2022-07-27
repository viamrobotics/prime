import"./jsx-runtime.feedc71a.js";import{c as t,A as h,M as y,C as c,S as u}from"./Props.9904186e.js";import"./iframe.7c357ea0.js";import"./es.map.constructor.60f2ba11.js";import"./es.number.to-fixed.37ffc8e7.js";function r(){return r=Object.assign?Object.assign.bind():function(a){for(var l=1;l<arguments.length;l++){var e=arguments[l];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(a[o]=e[o])}return a},r.apply(this,arguments)}const b={},v="wrapper";function d({components:a,...l}){return t(v,r({},b,l,{components:a,mdxType:"MDXLayout"}),t(y,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Select"),t("p",null,"For user triggered actions"),t(c,{mdxType:"Canvas"},t(u,{name:"Select",args:{label:"Your options",options:"Option 1, Option 2, Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:o,placeholder:s})=>`
      <v-select
        label='${e}'
        options='${o}'
        placeholder='${s}'
      />
    `)),t(c,{mdxType:"Canvas"},t(u,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:o,value:s,placeholder:m})=>`
      <v-select
        label='${e}'
        options='${o}'
        value='${s}'
        placeholder='${m}'
      />
    `)))}d.isMDXComponent=!0;const p=({label:a,options:l,placeholder:e})=>`
      <v-select
        label='${a}'
        options='${l}'
        placeholder='${e}'
      />
    `;p.storyName="Select";p.args={label:"Your options",options:"Option 1, Option 2, Option 3",placeholder:"Some placeholder..."};p.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const i=({label:a,options:l,value:e,placeholder:o})=>`
      <v-select
        label='${a}'
        options='${l}'
        value='${e}'
        placeholder='${o}'
      />
    `;i.storyName="With value";i.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3",placeholder:"Some placeholder..."};i.parameters={storySource:{source:`({
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
    \``}};const n={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},value:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select","withValue"]},$={Select:"select","With value":"withValue"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>t(h,{mdxStoryNameToKey:$,mdxComponentAnnotations:n},t(d,null))};const x=["select","withValue"];export{x as __namedExportsOrder,n as default,p as select,i as withValue};
//# sourceMappingURL=select.stories.cc251ebe.js.map
