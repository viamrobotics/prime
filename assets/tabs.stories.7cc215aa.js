import"./jsx-runtime.062645a1.js";import{c as e,A as b,M as i,C as p,S as m}from"./Props.3d822439.js";import"./iframe.958cefcb.js";import"./es.map.constructor.39a5cc1f.js";import"./es.number.to-fixed.0b22efd3.js";function o(){return o=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(a[n]=s[n])}return a},o.apply(this,arguments)}const c={},u="wrapper";function d({components:a,...t}){return e(u,o({},c,t,{components:a,mdxType:"MDXLayout"}),e(i,{title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when tab is selected"}},mdxType:"Meta"}),e("h1",null,"Tabs"),e("p",null,"For user triggered actions"),e(p,{mdxType:"Canvas"},e(m,{name:"Tabs",args:{tabs:"Tab 1, Tab 2, Tab 3",selected:"Tab 1"},mdxType:"Story"},({tabs:s,selected:n})=>`
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
    \``}};const r={title:"Elements/Tabs",parameters:{actions:{handles:["input"]}},argTypes:{tabs:{description:"The list of tabs",table:{defaultValue:{summary:""}}},selected:{description:"The selected tab",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when tab is selected"}},includeStories:["tabs"]},T={Tabs:"tabs"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(b,{mdxStoryNameToKey:T,mdxComponentAnnotations:r},e(d,null))};const v=["tabs"];export{v as __namedExportsOrder,r as default,l as tabs};
//# sourceMappingURL=tabs.stories.7cc215aa.js.map
