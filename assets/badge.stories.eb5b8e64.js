import"./jsx-runtime.7c45e405.js";import{c as a,A as v,M as p,C as o,S as s}from"./Props.215a0882.js";import"./iframe.1bf534a0.js";import"./es.map.constructor.d1dec0f3.js";import"./es.number.to-fixed.11802755.js";function g(){return g=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},g.apply(this,arguments)}const c={},u="wrapper";function b({components:r,...e}){return a(u,g({},c,e,{components:r,mdxType:"MDXLayout"}),a(p,{title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),a("h1",null,"Badge"),a("p",null,"To display status of something"),a(o,{mdxType:"Canvas"},a(s,{name:"gray",args:{variant:"gray",label:"Inactive"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(o,{mdxType:"Canvas"},a(s,{name:"green",args:{variant:"green",label:"Active"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(o,{mdxType:"Canvas"},a(s,{name:"orange",args:{variant:"orange",label:"Danger"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(o,{mdxType:"Canvas"},a(s,{name:"red",args:{variant:"red",label:"Unhealthy"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)))}b.isMDXComponent=!0;const i=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;i.storyName="gray";i.args={variant:"gray",label:"Inactive"};i.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const d=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;d.storyName="green";d.args={variant:"green",label:"Active"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const m=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;m.storyName="orange";m.args={variant:"orange",label:"Danger"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const y=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;y.storyName="red";y.args={variant:"red",label:"Unhealthy"};y.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const l={title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},includeStories:["gray","green","orange","red"]},$={gray:"gray",green:"green",orange:"orange",red:"red"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>a(v,{mdxStoryNameToKey:$,mdxComponentAnnotations:l},a(b,null))};const C=["gray","green","orange","red"];export{C as __namedExportsOrder,l as default,i as gray,d as green,m as orange,y as red};
//# sourceMappingURL=badge.stories.eb5b8e64.js.map
