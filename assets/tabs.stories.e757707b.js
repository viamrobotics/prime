var i=Object.defineProperty;var o=(t,e)=>i(t,"name",{value:e,configurable:!0});import"./jsx-runtime.62a5b3b9.js";import{c as a,A as p,M as m,C as c,S as u}from"./Props.c70c1159.js";import"./iframe.955807a8.js";import"./es.map.constructor.e721a4f2.js";import"./es.number.to-fixed.d6275c24.js";function l(){return l=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},l.apply(this,arguments)}o(l,"_extends");const T={},y="wrapper";function b({components:t,...e}){return a(y,l({},T,e,{components:t,mdxType:"MDXLayout"}),a(m,{title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when tab is selected"}},mdxType:"Meta"}),a("h1",null,"Tabs"),a("p",null,"For user triggered actions"),a(c,{mdxType:"Canvas"},a(u,{name:"Tabs",args:{tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 1"},mdxType:"Story"},({tabs:s,selected:n})=>`
      <v-tabs
        tabs="${s}"
        selected="${n}"
      />
    `)))}o(b,"MDXContent");b.isMDXComponent=!0;const d=o(({tabs:t,selected:e})=>`
      <v-tabs
        tabs="${t}"
        selected="${e}"
      />
    `,"tabs");d.storyName="Tabs";d.args={tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 1"};d.parameters={storySource:{source:`({
  tabs,
  selected
}) => \`
      <v-tabs
        tabs="\${tabs}"
        selected="\${selected}"
      />
    \``}};const r={title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when tab is selected"}},includeStories:["tabs"]},f={Tabs:"tabs"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>a(p,{mdxStoryNameToKey:f,mdxComponentAnnotations:r},a(b,null))};const S=["tabs"];export{S as __namedExportsOrder,r as default,d as tabs};
//# sourceMappingURL=tabs.stories.e757707b.js.map
