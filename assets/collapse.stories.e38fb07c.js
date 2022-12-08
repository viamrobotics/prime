var m=Object.defineProperty;var r=(t,e)=>m(t,"name",{value:e,configurable:!0});import"./jsx-runtime.0513aa1a.js";import{c as o,A as g,M as y,C as d,S as s}from"./Props.18bf6f89.js";import"./iframe.b7fa8eb1.js";import"./es.map.constructor.96594e57.js";import"./es.number.to-fixed.358595f4.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},i.apply(this,arguments)}r(i,"_extends");const h={},x="wrapper";function b({components:t,...e}){return o(x,i({},h,e,{components:t,mdxType:"MDXLayout"}),o(y,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),o("h1",null,"Collapse"),o("p",null,"Toggles visibility of content"),o(d,{mdxType:"Canvas"},o(s,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),o(d,{mdxType:"Canvas"},o(s,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),o(d,{mdxType:"Canvas"},o(s,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid; border-top: none;'>${a}</div>
      </v-collapse>
    `)),o(d,{mdxType:"Canvas"},o(s,{name:"No Background and No Border",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},mdxType:"Story"},({title:n,content:a})=>`
      <v-collapse
        title='${n}'
        variant=''
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem'>${a}</div>
      </v-collapse>
    `)))}r(b,"MDXContent");b.isMDXComponent=!0;const c=r(({title:t,content:e})=>`
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
    \``}};const p=r(({title:t,content:e})=>`
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
    \``}};const v=r(({title:t,content:e})=>`
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
    \``}};const u=r(({title:t,content:e})=>`
      <v-collapse
        title='${t}'
        variant=''
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem'>${e}</div>
      </v-collapse>
    `,"noBackgroundAndNoBorder");u.storyName="No Background and No Border";u.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};u.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
        variant=''
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem'>\${content}</div>
      </v-collapse>
    \``}};const l={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},includeStories:["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"]},f={Collapse:"collapse","Header slot":"headerSlot","Title slot":"titleSlot","No Background and No Border":"noBackgroundAndNoBorder"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>o(g,{mdxStoryNameToKey:f,mdxComponentAnnotations:l},o(b,null))};const N=["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"];export{N as __namedExportsOrder,c as collapse,l as default,p as headerSlot,u as noBackgroundAndNoBorder,v as titleSlot};
//# sourceMappingURL=collapse.stories.e38fb07c.js.map
