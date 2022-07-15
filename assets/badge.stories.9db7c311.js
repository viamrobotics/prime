import"./jsx-runtime.1040ad7c.js";import{c as a,A as v,M as p,C as o,S as s}from"./Props.b5960e0b.js";import"./iframe.8f1c9df5.js";function g(){return g=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},g.apply(this,arguments)}const c={},u="wrapper";function b({components:r,...e}){return a(u,g({},c,e,{components:r,mdxType:"MDXLayout"}),a(p,{title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),a("h1",null,"Badge"),a("p",null,"To display status of something"),a(o,{mdxType:"Canvas"},a(s,{name:"gray",args:{variant:"gray",label:"Inactive"},mdxType:"Story"},({label:n,variant:t})=>`
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
    `)))}b.isMDXComponent=!0;const d=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;d.storyName="gray";d.args={variant:"gray",label:"Inactive"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const i=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;i.storyName="green";i.args={variant:"green",label:"Active"};i.parameters={storySource:{source:`({
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
    \``}};const l={title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["gray","green","orange","red"],table:{defaultValue:{summary:"gray"}}},label:{description:"The badge status",table:{defaultValue:{summary:""}}}},includeStories:["gray","green","orange","red"]},$={gray:"gray",green:"green",orange:"orange",red:"red"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>a(v,{mdxStoryNameToKey:$,mdxComponentAnnotations:l},a(b,null))};const h=["gray","green","orange","red"];export{h as __namedExportsOrder,l as default,d as gray,i as green,m as orange,y as red};
//# sourceMappingURL=badge.stories.9db7c311.js.map
