import{M as m,C as a,S as l}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function g(t={}){const{wrapper:o}=Object.assign({},u(),t.components);return o?e.exports.jsx(o,{...t,children:e.exports.jsx(v,{})}):v();function v(){const b=Object.assign({h1:"h1",p:"p"},u(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(m,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}}}),`
`,e.exports.jsx(b.h1,{children:"Collapse"}),`
`,e.exports.jsx(b.p,{children:"Toggles visibility of content"}),`
`,e.exports.jsx(a,{children:e.exports.jsx(l,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:r})=>`
      <v-collapse
        title='${n}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${r}</div>
      </v-collapse>
    `})}),`
`,e.exports.jsx(a,{children:e.exports.jsx(l,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:r})=>`
      <v-collapse
        title='${n}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${r}</div>
      </v-collapse>
    `})}),`
`,e.exports.jsx(a,{children:e.exports.jsx(l,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:r})=>`
      <v-collapse
        title='${n}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${r}</div>
      </v-collapse>
    `})}),`
`,e.exports.jsx(a,{children:e.exports.jsx(l,{name:"No Background and No Border",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:r})=>`
      <v-collapse
        title='${n}'
        variant=''
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem'>${r}</div>
      </v-collapse>
    `})})]})}}const i=({title:t,content:o})=>`
      <v-collapse
        title='${t}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${o}</div>
      </v-collapse>
    `;i.storyName="Collapse";i.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};i.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const d=({title:t,content:o})=>`
      <v-collapse
        title='${t}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${o}</div>
      </v-collapse>
    `;d.storyName="Header slot";d.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};d.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const c=({title:t,content:o})=>`
      <v-collapse
        title='${t}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${o}</div>
      </v-collapse>
    `;c.storyName="Title slot";c.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};c.parameters={storySource:{source:`({
  title,
  content
}) => \`
      <v-collapse
        title='\${title}'
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>\${content}</div>
      </v-collapse>
    \``}};const p=({title:t,content:o})=>`
      <v-collapse
        title='${t}'
        variant=''
      >
        <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
        <v-badge slot='header' label='Inactive'></v-badge>
        <div style='font-size: 12px; padding: 1rem'>${o}</div>
      </v-collapse>
    `;p.storyName="No Background and No Border";p.args={title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."};p.parameters={storySource:{source:`({
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
    \``}};const s={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:g};const V=["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"];export{V as __namedExportsOrder,i as collapse,s as default,d as headerSlot,p as noBackgroundAndNoBorder,c as titleSlot};
//# sourceMappingURL=collapse.stories-8df8eaa2.js.map
