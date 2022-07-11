import"./index.5c7752e3.js";import{c as a,A as p,M as u,C as s,S as l}from"./Props.55eba346.js";import"./iframe.9a87bb0c.js";function g(){return g=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},g.apply(this,arguments)}const b={},c="wrapper";function y({components:r,...e}){return a(c,g({},b,e,{components:r,mdxType:"MDXLayout"}),a(u,{title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["green","orange","red"],defaultValue:"Test",table:{defaultValue:{summary:""}}},label:{description:"The badge status",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),a("h1",null,"Badge"),a("p",null,"To display status of something"),a(s,{mdxType:"Canvas"},a(l,{name:"gray",args:{variant:"gray"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"green",args:{variant:"green"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"orange",args:{variant:"orange"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)),a(s,{mdxType:"Canvas"},a(l,{name:"red",args:{variant:"red"},mdxType:"Story"},({label:n,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${n}'
      />
    `)))}y.isMDXComponent=!0;const d=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;d.storyName="gray";d.args={variant:"gray"};d.parameters={storySource:{source:`({
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
    `;i.storyName="green";i.args={variant:"green"};i.parameters={storySource:{source:`({
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
    `;m.storyName="orange";m.args={variant:"orange"};m.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const v=({label:r,variant:e})=>`
      <v-badge
        variant='${e}'
        label='${r}'
      />
    `;v.storyName="red";v.args={variant:"red"};v.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const o={title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["green","orange","red"],defaultValue:"Test",table:{defaultValue:{summary:""}}},label:{description:"The badge status",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}}},includeStories:["gray","green","orange","red"]},$={gray:"gray",green:"green",orange:"orange",red:"red"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(p,{mdxStoryNameToKey:$,mdxComponentAnnotations:o},a(y,null))};const S=["gray","green","orange","red"];export{S as __namedExportsOrder,o as default,d as gray,i as green,m as orange,v as red};
//# sourceMappingURL=badge.stories.27ebe0e7.js.map
