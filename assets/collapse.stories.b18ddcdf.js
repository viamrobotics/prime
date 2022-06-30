import"./index.5c7752e3.js";import{c as e,A as u,M as r,C as c,S as m}from"./Props.53fe5a52.js";import"./iframe.12cfaed8.js";const p={},d="wrapper";function a({components:i,...o}){return e(d,{...p,...o,components:i,mdxType:"MDXLayout"},e(r,{title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(c,{mdxType:"Canvas"},e(m,{name:"Collapse",mdxType:"Story"},({title:l,content:s})=>`
      <v-collapse
        title='${l}'
        content='${s}'
      />
    `)))}a.isMDXComponent=!0;const n=({title:i,content:o})=>`
      <v-collapse
        title='${i}'
        content='${o}'
      />
    `;n.storyName="Collapse";n.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
        content='\${content}'
      />
    \``}};const t={title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},includeStories:["collapse"]},y={Collapse:"collapse"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:y,mdxComponentAnnotations:t},e(a,null))};export{n as collapse,t as default};
//# sourceMappingURL=collapse.stories.b18ddcdf.js.map
