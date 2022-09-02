import"./jsx-runtime.c53d8267.js";import{c as e,A as m,M as b,C as r,S as s}from"./Props.2476ec14.js";import"./iframe.501ffeae.js";import"./es.map.constructor.322186fb.js";import"./es.number.to-fixed.361e2a81.js";function i(){return i=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(o[a]=n[a])}return o},i.apply(this,arguments)}const u={},g="wrapper";function v({components:o,...t}){return e(g,i({},u,t,{components:o,mdxType:"MDXLayout"}),e(b,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Collapse"),e("p",null,"Toggles visibility of content"),e(r,{mdxType:"Canvas"},e(s,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),e(r,{mdxType:"Canvas"},e(s,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),e(r,{mdxType:"Canvas"},e(s,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)))}v.isMDXComponent=!0;const d=({title:o,content:t})=>`
      <v-collapse
        title='${o}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${t}</div>
      </v-collapse>
    `;d.storyName="Collapse";d.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};d.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const c=({title:o,content:t})=>`
      <v-collapse
        title='${o}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${t}</div>
      </v-collapse>
    `;c.storyName="Header slot";c.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};c.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const p=({title:o,content:t})=>`
      <v-collapse
        title='${o}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${t}</div>
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
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const l={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},includeStories:["collapse","headerSlot","titleSlot"]},y={Collapse:"collapse","Header slot":"headerSlot","Title slot":"titleSlot"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(m,{mdxStoryNameToKey:y,mdxComponentAnnotations:l},e(v,null))};const T=["collapse","headerSlot","titleSlot"];export{T as __namedExportsOrder,d as collapse,l as default,c as headerSlot,p as titleSlot};
//# sourceMappingURL=collapse.stories.f78bfbd5.js.map
