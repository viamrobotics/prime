var d=Object.defineProperty;var n=(e,r)=>d(e,"name",{value:r,configurable:!0});import"./jsx-runtime.edd43df9.js";import{c as a,A as c,M as y,C as p,S as u}from"./Props.d1f8dbc1.js";import"./iframe.eab4e074.js";import"./es.map.constructor.79cbb541.js";import"./es.number.to-fixed.3f3eb80b.js";function m(){return m=Object.assign?Object.assign.bind():function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},m.apply(this,arguments)}n(m,"_extends");const b={},x="wrapper";function v({components:e,...r}){return a(x,m({},b,r,{components:e,mdxType:"MDXLayout"}),a(y,{title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}}},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}}},"on:remove":{description:"Event fired when x icon is clicked"}},mdxType:"Meta"}),a("h1",null,"Pill"),a("p",null,"For displaying a list of items"),a(p,{mdxType:"Canvas"},a(u,{name:"Primary",args:{value:"cool pill"},mdxType:"Story"},({value:t})=>`
      <v-pill
        value='${t}'
      />
    `)),a(p,{mdxType:"Canvas"},a(u,{name:"unremovable",args:{value:"not removable",removable:"false"},mdxType:"Story"},({value:t,removable:o})=>`
      <v-pill
        value='${t}'
        removable='${o}'
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
    \``}};const i=n(({value:e,removable:r})=>`
      <v-pill
        value='${e}'
        removable='${r}'
      />
    `,"unremovable");i.storyName="unremovable";i.args={value:"not removable",removable:"false"};i.parameters={storySource:{source:`({
  value,
  removable
}) => \`
      <v-pill
        value='\${value}'
        removable='\${removable}'
      />
    \``}};const l={title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}}},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}}},"on:remove":{description:"Event fired when x icon is clicked"}},includeStories:["primary","unremovable"]},f={Primary:"primary",unremovable:"unremovable"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>a(c,{mdxStoryNameToKey:f,mdxComponentAnnotations:l},a(v,null))};const M=["primary","unremovable"];export{M as __namedExportsOrder,l as default,s as primary,i as unremovable};
//# sourceMappingURL=pill.stories.473386b4.js.map
