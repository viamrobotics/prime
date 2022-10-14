var b=Object.defineProperty;var l=(t,e)=>b(t,"name",{value:e,configurable:!0});import"./jsx-runtime.463b8ded.js";import{c as o,A as u,M as g,C as s,S as i}from"./Props.88a4c731.js";import"./iframe.24dbdcb5.js";import"./es.map.constructor.d0b89e0d.js";import"./es.number.to-fixed.c34bc9f2.js";function d(){return d=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},d.apply(this,arguments)}l(d,"_extends");const y={},x="wrapper";function m({components:t,...e}){return o(x,d({},y,e,{components:t,mdxType:"MDXLayout"}),o(g,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),o("h1",null,"Collapse"),o("p",null,"Toggles visibility of content"),o(s,{mdxType:"Canvas"},o(i,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),o(s,{mdxType:"Canvas"},o(i,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),o(s,{mdxType:"Canvas"},o(i,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)))}l(m,"MDXContent");m.isMDXComponent=!0;const c=l(({title:t,content:e})=>`
      <v-collapse
        title='${t}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${e}</div>
      </v-collapse>
    `,"collapse");c.storyName="Collapse";c.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};c.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const p=l(({title:t,content:e})=>`
      <v-collapse
        title='${t}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${e}</div>
      </v-collapse>
    `,"headerSlot");p.storyName="Header slot";p.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};p.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const v=l(({title:t,content:e})=>`
      <v-collapse
        title='${t}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${e}</div>
      </v-collapse>
    `,"titleSlot");v.storyName="Title slot";v.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};v.parameters={storySource:{source:`({
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
    \``}};const r={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},includeStories:["collapse","headerSlot","titleSlot"]},h={Collapse:"collapse","Header slot":"headerSlot","Title slot":"titleSlot"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>o(u,{mdxStoryNameToKey:h,mdxComponentAnnotations:r},o(m,null))};const B=["collapse","headerSlot","titleSlot"];export{B as __namedExportsOrder,c as collapse,r as default,p as headerSlot,v as titleSlot};
//# sourceMappingURL=collapse.stories.c18f9093.js.map
