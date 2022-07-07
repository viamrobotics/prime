import"./index.5c7752e3.js";import{c as e,A as u,M as r,C as c,S as p}from"./Props.2832cebf.js";import"./iframe.6a49ddc2.js";const m={},d="wrapper";function o({components:a,...i}){return e(d,{...m,...i,components:a,mdxType:"MDXLayout"},e(r,{title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(c,{mdxType:"Canvas"},e(p,{name:"Collapse",mdxType:"Story"},({title:n,content:s})=>`
      <v-collapse
        title='${n}'
      >
        <span>${s}</span>
      </v-collapse>
    `)))}o.isMDXComponent=!0;const l=({title:a,content:i})=>`
      <v-collapse
        title='${a}'
      >
        <span>${i}</span>
      </v-collapse>
    `;l.storyName="Collapse";l.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <span>\${content}</span>
      </v-collapse>
    \``}};const t={title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},includeStories:["collapse"]},y={Collapse:"collapse"};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:y,mdxComponentAnnotations:t},e(o,null))};export{l as collapse,t as default};
//# sourceMappingURL=collapse.stories.31db3bc4.js.map
