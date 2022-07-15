import"./jsx-runtime.c0e8ee6e.js";import{c as e,A as v,M as m,C as s,S as r}from"./Props.86b94550.js";import"./iframe.5bc893a2.js";function i(){return i=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(a[o]=n[o])}return a},i.apply(this,arguments)}const b={},g="wrapper";function u({components:a,...t}){return e(g,i({},b,t,{components:a,mdxType:"MDXLayout"}),e(m,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(s,{mdxType:"Canvas"},e(r,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:o})=>`
      <v-collapse
        title='${n}'
      >
        <span>${o}</span>
      </v-collapse>
    `)),e(s,{mdxType:"Canvas"},e(r,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:o})=>`
      <v-collapse
        title='${n}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>${o}</span>
      </v-collapse>
    `)),e(s,{mdxType:"Canvas"},e(r,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:o})=>`
      <v-collapse
        title='${n}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>${o}</span>
      </v-collapse>
    `)))}u.isMDXComponent=!0;const c=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <span>${t}</span>
      </v-collapse>
    `;c.storyName="Collapse";c.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};c.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <span>\${content}</span>
      </v-collapse>
    \``}};const d=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>${t}</span>
      </v-collapse>
    `;d.storyName="Header slot";d.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};d.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>\${content}</span>
      </v-collapse>
    \``}};const p=({title:a,content:t})=>`
      <v-collapse
        title='${a}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>${t}</span>
      </v-collapse>
    `;p.storyName="Title slot";p.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};p.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <span>\${content}</span>
      </v-collapse>
    \``}};const l={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},includeStories:["collapse","headerSlot","titleSlot"]},h={Collapse:"collapse","Header slot":"headerSlot","Title slot":"titleSlot"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:h,mdxComponentAnnotations:l},e(u,null))};const M=["collapse","headerSlot","titleSlot"];export{M as __namedExportsOrder,c as collapse,l as default,d as headerSlot,p as titleSlot};
//# sourceMappingURL=collapse.stories.edb4b446.js.map
