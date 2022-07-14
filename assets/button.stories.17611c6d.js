import"./jsx-runtime.a1bed176.js";import{c as a,A as c,M as b,C as l,S as s}from"./Props.bfc5015b.js";import"./iframe.34d5fcf3.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}const y={},g="wrapper";function d({components:t,...e}){return a(g,i({},y,e,{components:t,mdxType:"MDXLayout"}),a(b,{title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},mdxType:"Meta"}),a("h1",null,"Button"),a("p",null,"For user triggered actions"),a(l,{mdxType:"Canvas"},a(s,{name:"Primary",args:{label:"RUN",crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),a(l,{mdxType:"Canvas"},a(s,{name:"Danger",args:{label:"STOP",variant:"danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)),a(l,{mdxType:"Canvas"},a(s,{name:"Danger (outline)",args:{label:"SLOW DOWN",variant:"outline-danger"},mdxType:"Story"},({label:n,variant:r})=>`
      <v-button
        variant='${r}'
        label='${n}'
      />
    `)))}d.isMDXComponent=!0;const m=({label:t,variant:e})=>`
      <v-button
        variant='${e}'
        label='${t}'
      />
    `;m.storyName="Primary";m.args={label:"RUN",crumbs:"Crumb 1, Crumb 2"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const u=({label:t,variant:e})=>`
      <v-button
        variant='${e}'
        label='${t}'
      />
    `;u.storyName="Danger";u.args={label:"STOP",variant:"danger"};u.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const p=({label:t,variant:e})=>`
      <v-button
        variant='${e}'
        label='${t}'
      />
    `;p.storyName="Danger (outline)";p.args={label:"SLOW DOWN",variant:"outline-danger"};p.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const o={title:"Elements/Button",parameters:{actions:{handles:["click"]}},argTypes:{label:{description:"Text displayed to users",table:{defaultValue:{summary:""}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},includeStories:["primary","danger","dangerOutline"]},v={Primary:"primary",Danger:"danger","Danger (outline)":"dangerOutline"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(c,{mdxStoryNameToKey:v,mdxComponentAnnotations:o},a(d,null))};const O=["primary","danger","dangerOutline"];export{O as __namedExportsOrder,u as danger,p as dangerOutline,o as default,m as primary};
//# sourceMappingURL=button.stories.17611c6d.js.map
