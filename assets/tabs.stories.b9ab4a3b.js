import"./index.5c7752e3.js";import{c as e,A as b,M as d,C as c,S as u}from"./Props.e1f17ce8.js";import"./iframe.590f1be5.js";const m={},p="wrapper";function l({components:a,...s}){return e(p,{...m,...s,components:a,mdxType:"MDXLayout"},e(d,{title:"Elements/Tabs",argTypes:{tabs:{description:"The list of tabs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(c,{mdxType:"Canvas"},e(u,{name:"Tabs",args:{tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 2"},mdxType:"Story"},({tabs:r,selected:n})=>`
      <v-tabs
        tabs="${r}"
        selected="${n}"
      />
    `)))}l.isMDXComponent=!0;const o=({tabs:a,selected:s})=>`
      <v-tabs
        tabs="${a}"
        selected="${s}"
      />
    `;o.storyName="Tabs";o.args={tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 2"};o.parameters={storySource:{source:`({
  tabs,
  selected
}) => \`
      <v-tabs
        tabs="\${tabs}"
        selected="\${selected}"
      />
    \``}};const t={title:"Elements/Tabs",argTypes:{tabs:{description:"The list of tabs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["tabs"]},T={Tabs:"tabs"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(b,{mdxStoryNameToKey:T,mdxComponentAnnotations:t},e(l,null))};export{t as default,o as tabs};
//# sourceMappingURL=tabs.stories.b9ab4a3b.js.map
