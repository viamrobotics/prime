import"./index.5c7752e3.js";import{c as e,A as c,M as d,C as s,S as i}from"./Props.318fd20d.js";import"./iframe.831d7428.js";const m={},v="wrapper";function r({components:t,...a}){return e(v,{...m,...a,components:t,mdxType:"MDXLayout"},e(d,{title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(s,{mdxType:"Canvas"},e(i,{name:"Collapse",mdxType:"Story"},({title:o,content:n})=>`
      <v-collapse
        title='${o}'
      >
        <span>${n}</span>
      </v-collapse>
    `)),e(s,{mdxType:"Canvas"},e(i,{name:"Header slot",mdxType:"Story"},({title:o,content:n})=>`
      <v-collapse
        title='${o}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>${n}</span>
      </v-collapse>
    `)))}r.isMDXComponent=!0;const u=({title:t,content:a})=>`
      <v-collapse
        title='${t}'
      >
        <span>${a}</span>
      </v-collapse>
    `;u.storyName="Collapse";u.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <span>\${content}</span>
      </v-collapse>
    \``}};const p=({title:t,content:a})=>`
      <v-collapse
        title='${t}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>${a}</span>
      </v-collapse>
    `;p.storyName="Header slot";p.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>\${content}</span>
      </v-collapse>
    \``}};const l={title:"Elements/Collapse",argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},includeStories:["collapse","headerSlot"]},h={Collapse:"collapse","Header slot":"headerSlot"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:h,mdxComponentAnnotations:l},e(r,null))};export{u as collapse,l as default,p as headerSlot};
//# sourceMappingURL=collapse.stories.48d2754f.js.map
