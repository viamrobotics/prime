import"./index.5c7752e3.js";import{c as e,A as m,M as b,C as n,S as i}from"./Props.18bc2ebe.js";import"./iframe.156ce600.js";function r(){return r=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(a[o]=l[o])}return a},r.apply(this,arguments)}const v={},h="wrapper";function c({components:a,...t}){return e(h,r({},v,t,{components:a,mdxType:"MDXLayout"}),e(b,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(n,{mdxType:"Canvas"},e(i,{name:"Collapse",mdxType:"Story"},({title:l,content:o})=>`
      <v-collapse
        title='${l}'
      >
        <span>${o}</span>
      </v-collapse>
    `)),e(n,{mdxType:"Canvas"},e(i,{name:"Header slot",mdxType:"Story"},({title:l,content:o})=>`
      <v-collapse
        title='${l}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>${o}</span>
      </v-collapse>
    `)),e(n,{mdxType:"Canvas"},e(i,{name:"Title slot",mdxType:"Story"},({title:l,content:o})=>`
      <v-collapse
        title='${l}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Test'></v-badge>
        <span>${o}</span>
      </v-collapse>
    `)))}c.isMDXComponent=!0;const p=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <span>${t}</span>
      </v-collapse>
    `;p.storyName="Collapse";p.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <span>\${content}</span>
      </v-collapse>
    \``}};const u=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>${t}</span>
      </v-collapse>
    `;u.storyName="Header slot";u.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Test'></v-badge>
        <span>\${content}</span>
      </v-collapse>
    \``}};const d=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Test'></v-badge>
        <span>${t}</span>
      </v-collapse>
    `;d.storyName="Title slot";d.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Test'></v-badge>
        <span>\${content}</span>
      </v-collapse>
    \``}};const s={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",control:"text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",defaultValue:"This is the content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",table:{defaultValue:{summary:""}}}},includeStories:["collapse","headerSlot","titleSlot"]},y={Collapse:"collapse","Header slot":"headerSlot","Title slot":"titleSlot"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(m,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},e(c,null))};const f=["collapse","headerSlot","titleSlot"];export{f as __namedExportsOrder,p as collapse,s as default,u as headerSlot,d as titleSlot};
//# sourceMappingURL=collapse.stories.01146e7e.js.map
