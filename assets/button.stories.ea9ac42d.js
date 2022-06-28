import"./index.5c7752e3.js";import{c as e,A as y,M as c,C as o,S as s}from"./Props.43cdf6c7.js";import"./iframe.8cc0bb81.js";const b={},v="wrapper";function d({components:t,...n}){return e(v,{...b,...n,components:t,mdxType:"MDXLayout"},e(c,{title:"Elements/Button",argTypes:{label:{description:"Text displayed to users",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}},size:{description:"The size of the button",control:{type:"select"},options:["small","medium","large"],defaultValue:"medium",table:{defaultValue:{summary:"medium"}}},variant:{description:"The button purpose",control:"select",options:["primary","danger","outline-danger"],defaultValue:"primary",table:{defaultValue:{summary:"primary"}}}},mdxType:"Meta"}),e("h1",null,"Button"),e("p",null,"For user triggered actions"),e(o,{mdxType:"Canvas"},e(s,{name:"Primary",mdxType:"Story"},({label:a,variant:r,size:m})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(s,{name:"Danger",args:{variant:"danger"},mdxType:"Story"},({label:a,variant:r,size:m})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)),e(o,{mdxType:"Canvas"},e(s,{name:"Danger (outline)",args:{variant:"outline-danger"},mdxType:"Story"},({label:a,variant:r,size:m})=>`
      <v-button
        variant='${r}'
        label='${a}'
      />
    `)))}d.isMDXComponent=!0;const p=({label:t,variant:n,size:a})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;p.storyName="Primary";p.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const i=({label:t,variant:n,size:a})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;i.storyName="Danger";i.args={variant:"danger"};i.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const u=({label:t,variant:n,size:a})=>`
      <v-button
        variant='${n}'
        label='${t}'
      />
    `;u.storyName="Danger (outline)";u.args={variant:"outline-danger"};u.parameters={storySource:{source:`({
  label,
  variant,
  size
}) => \`
      <v-button
        variant='\${variant}'
        label='\${label}'
      />
    \``}};const l={title:"Elements/Button",argTypes:{label:{description:"Text displayed to users",control:"text",defaultValue:"Test",table:{defaultValue:{summary:""}}},size:{description:"The size of the button",control:{type:"select"},options:["small","medium","large"],defaultValue:"medium",table:{defaultValue:{summary:"medium"}}},variant:{description:"The button purpose",control:"select",options:["primary","danger","outline-danger"],defaultValue:"primary",table:{defaultValue:{summary:"primary"}}}},includeStories:["primary","danger","dangerOutline"]},g={Primary:"primary",Danger:"danger","Danger (outline)":"dangerOutline"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(y,{mdxStoryNameToKey:g,mdxComponentAnnotations:l},e(d,null))};export{i as danger,u as dangerOutline,l as default,p as primary};
//# sourceMappingURL=button.stories.ea9ac42d.js.map
