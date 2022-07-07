import"./index.5c7752e3.js";import{c as e,A as p,M as d,C as i,S as m}from"./Props.2832cebf.js";import"./iframe.6a49ddc2.js";const u={},h="wrapper";function n({components:o,...l}){return e(h,{...u,...l,components:o,mdxType:"MDXLayout"},e(d,{title:"Elements/Select",argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",control:"text",table:{defaultValue:{summary:""}}},"on:select":{description:"Callback invoked when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Select"),e("p",null,"For user triggered actions"),e(i,{mdxType:"Canvas"},e(m,{name:"Select",args:{options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."},mdxType:"Story"},({options:a,selected:c,placeholder:r})=>`
      <v-select
        options="${a}"
        selected="${c}"
        placeholder="${r}"
      />
    `)))}n.isMDXComponent=!0;const s=({options:o,selected:l,placeholder:a})=>`
      <v-select
        options="${o}"
        selected="${l}"
        placeholder="${a}"
      />
    `;s.storyName="Select";s.args={options:"Option 1, Option 2, Option 3",selected:"",placeholder:"Some placeholder..."};s.parameters={storySource:{source:`({
  options,
  selected,
  placeholder
}) => \`
      <v-select
        options="\${options}"
        selected="\${selected}"
        placeholder="\${placeholder}"
      />
    \``}};const t={title:"Elements/Select",argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected value",control:"text",table:{defaultValue:{summary:""}}},placeholder:{description:"The placeholder value",control:"text",table:{defaultValue:{summary:""}}},"on:select":{description:"Callback invoked when an option is selected"}},includeStories:["select"]},y={Select:"select"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(p,{mdxStoryNameToKey:y,mdxComponentAnnotations:t},e(n,null))};export{t as default,s as select};
//# sourceMappingURL=select.stories.1765cfc2.js.map
