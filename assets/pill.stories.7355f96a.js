var c=Object.defineProperty;var n=(e,t)=>c(e,"name",{value:t,configurable:!0});import"./jsx-runtime.e819bcfc.js";import{c as a,A as d,M as y,C as p,S as u}from"./Props.c4731b41.js";import"./iframe.33d62c99.js";import"./es.map.constructor.7a4b5b44.js";import"./es.number.to-fixed.e1836392.js";function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},m.apply(this,arguments)}n(m,"_extends");const b={},x="wrapper";function v({components:e,...t}){return a(x,m({},b,t,{components:e,mdxType:"MDXLayout"}),a(y,{title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}},mdxType:"Meta"}),a("h1",null,"Pill"),a("p",null,"For displaying a list of items"),a(p,{mdxType:"Canvas"},a(u,{name:"Primary",args:{value:"cool pill"},mdxType:"Story"},({value:o})=>`
      <v-pill
        value='${o}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"unremovable",args:{value:"not removable",removable:"false"},mdxType:"Story"},({value:o,removable:r})=>`
      <v-pill
        value='${o}'
        removable='${r}'
      />
    `)))}n(v,"MDXContent");v.isMDXComponent=!0;const s=n(({value:e})=>`
      <v-pill
        value='${e}'
      />
    `,"primary");s.storyName="Primary";s.args={value:"cool pill"};s.parameters={storySource:{source:`({
  value
}) => \`
      <v-pill
        value='\${value}'
      />
    \``}};const i=n(({value:e,removable:t})=>`
      <v-pill
        value='${e}'
        removable='${t}'
      />
    `,"unremovable");i.storyName="unremovable";i.args={value:"not removable",removable:"false"};i.parameters={storySource:{source:`({
  value,
  removable
}) => \`
      <v-pill
        value='\${value}'
        removable='\${removable}'
      />
    \``}};const l={title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}},includeStories:["primary","unremovable"]},f={Primary:"primary",unremovable:"unremovable"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>a(d,{mdxStoryNameToKey:f,mdxComponentAnnotations:l},a(v,null))};const M=["primary","unremovable"];export{M as __namedExportsOrder,l as default,s as primary,i as unremovable};
//# sourceMappingURL=pill.stories.7355f96a.js.map
