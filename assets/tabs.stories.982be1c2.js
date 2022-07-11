import"./index.5c7752e3.js";import{c as e,A as c,M as b,C as m,S as u}from"./Props.ed0d98fa.js";import"./iframe.175d2946.js";function o(){return o=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(a[n]=s[n])}return a},o.apply(this,arguments)}const p={},i="wrapper";function d({components:a,...t}){return e(i,o({},p,t,{components:a,mdxType:"MDXLayout"}),e(b,{title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(m,{mdxType:"Canvas"},e(u,{name:"Tabs",args:{tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 1"},mdxType:"Story"},({tabs:s,selected:n})=>`
      <v-tabs
        tabs="${s}"
        selected="${n}"
      />
    `)))}d.isMDXComponent=!0;const l=({tabs:a,selected:t})=>`
      <v-tabs
        tabs="${a}"
        selected="${t}"
      />
    `;l.storyName="Tabs";l.args={tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 1"};l.parameters={storySource:{source:`({
  tabs,
  selected
}) => \`
      <v-tabs
        tabs="\${tabs}"
        selected="\${selected}"
      />
    \``}};const r={title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["tabs"]},T={Tabs:"tabs"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:T,mdxComponentAnnotations:r},e(d,null))};const g=["tabs"];export{g as __namedExportsOrder,r as default,l as tabs};
//# sourceMappingURL=tabs.stories.982be1c2.js.map
