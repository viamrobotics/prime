import"./jsx-runtime.447a3822.js";import{c as e,A as d,M as u,C as m,S as h}from"./Props.3ff7281a.js";import"./iframe.63352511.js";function s(){return s=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&(o[a]=l[a])}return o},s.apply(this,arguments)}const y={},b="wrapper";function p({components:o,...t}){return e(b,s({},y,t,{components:o,mdxType:"MDXLayout"}),e(u,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Select"),e("p",null,"For user triggered actions"),e(m,{mdxType:"Canvas"},e(h,{name:"Select",args:{label:"Your options",options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."},mdxType:"Story"},({label:l,options:a,selected:i,placeholder:c})=>`
      <v-select
        label='${l}'
        options='${a}'
        selected='${i}'
        placeholder='${c}'
      />
    `)))}p.isMDXComponent=!0;const r=({label:o,options:t,selected:l,placeholder:a})=>`
      <v-select
        label='${o}'
        options='${t}'
        selected='${l}'
        placeholder='${a}'
      />
    `;r.storyName="Select";r.args={label:"Your options",options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."};r.parameters={storySource:{source:`({
  label,
  options,
  selected,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
        placeholder='\${placeholder}'
      />
    \``}};const n={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}}},options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["select"]},f={Select:"select"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>e(d,{mdxStoryNameToKey:f,mdxComponentAnnotations:n},e(p,null))};const g=["select"];export{g as __namedExportsOrder,n as default,r as select};
//# sourceMappingURL=select.stories.a66efcd1.js.map
