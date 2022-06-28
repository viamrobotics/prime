import"./index.5c7752e3.js";import{c as e,A as c,M as d,C as u,S as s}from"./Props.43cdf6c7.js";import"./iframe.8cc0bb81.js";const y={},i="wrapper";function m({components:t,...a}){return e(i,{...y,...a,components:t,mdxType:"MDXLayout"},e(d,{title:"Elements/Input",argTypes:{placeholder:{description:"The input placeholder text",control:"text",defaultValue:"Favorite soup",table:{defaultValue:{summary:""}}},type:{description:"The input type",control:"select",options:["text","email","number"],defaultValue:"text",table:{defaultValue:{summary:"text"}}}},mdxType:"Meta"}),e("h1",null,"Input"),e("p",null,"Used for all text single-line user inputs."),e(u,{mdxType:"Canvas"},e(s,{name:"Text",args:{type:"text"},mdxType:"Story"},({type:r,placeholder:n})=>`
      <v-input
        type='${r}'
        placeholder='${n}'
      />
    `)),e(u,{mdxType:"Canvas"},e(s,{name:"Number",args:{type:"number",placeholder:"Amount of soup"},mdxType:"Story"},({type:r,placeholder:n})=>`
      <v-input
        type='${r}'
        placeholder='${n}'
      />
    `)))}m.isMDXComponent=!0;const p=({type:t,placeholder:a})=>`
      <v-input
        type='${t}'
        placeholder='${a}'
      />
    `;p.storyName="Text";p.args={type:"text"};p.parameters={storySource:{source:`({
  type,
  placeholder
}) => \`
      <v-input
        type='\${type}'
        placeholder='\${placeholder}'
      />
    \``}};const l=({type:t,placeholder:a})=>`
      <v-input
        type='${t}'
        placeholder='${a}'
      />
    `;l.storyName="Number";l.args={type:"number",placeholder:"Amount of soup"};l.parameters={storySource:{source:`({
  type,
  placeholder
}) => \`
      <v-input
        type='\${type}'
        placeholder='\${placeholder}'
      />
    \``}};const o={title:"Elements/Input",argTypes:{placeholder:{description:"The input placeholder text",control:"text",defaultValue:"Favorite soup",table:{defaultValue:{summary:""}}},type:{description:"The input type",control:"select",options:["text","email","number"],defaultValue:"text",table:{defaultValue:{summary:"text"}}}},includeStories:["text","number"]},x={Text:"text",Number:"number"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:x,mdxComponentAnnotations:o},e(m,null))};export{o as default,l as number,p as text};
//# sourceMappingURL=input.stories.884ce918.js.map
