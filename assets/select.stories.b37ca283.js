import"./index.5c7752e3.js";import{c as e,A as i,M as d,C as m,S as u}from"./Props.a7eef7fb.js";import"./iframe.fcd91b50.js";function s(){return s=Object.assign?Object.assign.bind():function(l){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(l[n]=o[n])}return l},s.apply(this,arguments)}const h={},y="wrapper";function c({components:l,...t}){return e(y,s({},h,t,{components:l,mdxType:"MDXLayout"}),e(d,{title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",control:"text",table:{defaultValue:{summary:""}}},"on:select":{description:"Callback invoked when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Select"),e("p",null,"For user triggered actions"),e(m,{mdxType:"Canvas"},e(u,{name:"Select",args:{options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."},mdxType:"Story"},({options:o,selected:n,placeholder:p})=>`
      <v-select
        options="${o}"
        selected="${n}"
        placeholder="${p}"
      />
    `)))}c.isMDXComponent=!0;const r=({options:l,selected:t,placeholder:o})=>`
      <v-select
        options="${l}"
        selected="${t}"
        placeholder="${o}"
      />
    `;r.storyName="Select";r.args={options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."};r.parameters={storySource:{source:`({
  options,
  selected,
  placeholder
}) => \`
      <v-select
        options="\${options}"
        selected="\${selected}"
        placeholder="\${placeholder}"
      />
    \``}};const a={title:"Elements/Select",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",control:"text",table:{defaultValue:{summary:""}}},"on:select":{description:"Callback invoked when an option is selected"}},includeStories:["select"]},x={Select:"select"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>e(i,{mdxStoryNameToKey:x,mdxComponentAnnotations:a},e(c,null))};const T=["select"];export{T as __namedExportsOrder,a as default,r as select};
//# sourceMappingURL=select.stories.b37ca283.js.map
