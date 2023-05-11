import{M as m,C as r,S as l}from"./chunk-PCJTTTQV-f45470c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-0360cb47.js";import{u}from"./index-8ca1bc58.js";import"./iframe-15c5bc93.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function g(t={}){const{wrapper:o}=Object.assign({},u(),t.components);return o?e.jsx(o,{...t,children:e.jsx(v,{})}):v();function v(){const b=Object.assign({h1:"h1",p:"p"},u(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(m,{title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}}}),`
`,e.jsx(b.h1,{id:"collapse",children:"Collapse"}),`
`,e.jsx(b.p,{children:"Toggles visibility of content"}),`
`,e.jsx(r,{children:e.jsx(l,{name:"Collapse",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:a})=>`
<v-collapse
  title='${n}'
>
  <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${a}</div>
</v-collapse>
    `})}),`
`,e.jsx(r,{children:e.jsx(l,{name:"Header slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:a})=>`
<v-collapse
  title='${n}'
>
  <v-badge slot='header' label='Inactive'></v-badge>
  <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${a}</div>
</v-collapse>
    `})}),`
`,e.jsx(r,{children:e.jsx(l,{name:"Title slot",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:a})=>`
<v-collapse
  title='${n}'
>
  <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
  <v-badge slot='header' label='Inactive'></v-badge>
  <div style='font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;'>${a}</div>
</v-collapse>
    `})}),`
`,e.jsx(r,{children:e.jsx(l,{name:"No Background and No Border",args:{title:"Motor 1",content:"Motor one was concieved and executed at Bell Labs in 1972 under the guidance of lead director Dennis Richie and Superviser Wallace Breen."},children:({title:n,content:a})=>`
<v-collapse
  title='${n}'
  variant=''
>
  <v-breadcrumbs slot='title' crumbs='Robot,Motor'></v-breadcrumbs>
  <v-badge slot='header' label='Inactive'></v-badge>
  <div style='font-size: 12px; padding: 1rem'>${a}</div>
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
    \``}};const s={title:"Elements/Collapse",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{options:["default",""],control:{type:"select"},description:"These are the options. The default variant adds a black border and white background",table:{defaultValue:{summary:"default"}}},title:{description:"This is the title",table:{defaultValue:{summary:""}}},content:{description:"This is the content",control:"text",table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when an option is selected"}},tags:["stories-mdx"],includeStories:["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:g};const T=["collapse","headerSlot","titleSlot","noBackgroundAndNoBorder"];export{T as __namedExportsOrder,i as collapse,s as default,d as headerSlot,p as noBackgroundAndNoBorder,c as titleSlot};
//# sourceMappingURL=collapse.stories-5e94571f.js.map
