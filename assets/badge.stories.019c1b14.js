import"./index.5c7752e3.js";import{c as e,A as u,M as p,C as l,S as s}from"./Props.53fe5a52.js";import"./iframe.12cfaed8.js";const v={},b="wrapper";function m({components:a,...t}){return e(b,{...v,...t,components:a,mdxType:"MDXLayout"},e(p,{title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["green","orange","red"],defaultValue:"Test",table:{defaultValue:{summary:""}}},label:{description:"The badge status",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Badge"),e("p",null,"To display status of something"),e(l,{mdxType:"Canvas"},e(s,{name:"green",args:{variant:"green"},mdxType:"Story"},({label:r,variant:n})=>`
      <v-badge
        variant='${n}'
        label='${r}'
      />
    `)),e(l,{mdxType:"Canvas"},e(s,{name:"orange",args:{variant:"orange"},mdxType:"Story"},({label:r,variant:n})=>`
      <v-badge
        variant='${n}'
        label='${r}'
      />
    `)),e(l,{mdxType:"Canvas"},e(s,{name:"red",args:{variant:"red"},mdxType:"Story"},({label:r,variant:n})=>`
      <v-badge
        variant='${n}'
        label='${r}'
      />
    `)))}m.isMDXComponent=!0;const d=({label:a,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${a}'
      />
    `;d.storyName="green";d.args={variant:"green"};d.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const g=({label:a,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${a}'
      />
    `;g.storyName="orange";g.args={variant:"orange"};g.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const i=({label:a,variant:t})=>`
      <v-badge
        variant='${t}'
        label='${a}'
      />
    `;i.storyName="red";i.args={variant:"red"};i.parameters={storySource:{source:`({
  label,
  variant
}) => \`
      <v-badge
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const o={title:"Elements/Badge",argTypes:{variant:{description:"The badge color",control:{type:"select"},options:["green","orange","red"],defaultValue:"Test",table:{defaultValue:{summary:""}}},label:{description:"The badge status",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}}},includeStories:["green","orange","red"]},c={green:"green",orange:"orange",red:"red"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:c,mdxComponentAnnotations:o},e(m,null))};export{o as default,d as green,g as orange,i as red};
//# sourceMappingURL=badge.stories.019c1b14.js.map
