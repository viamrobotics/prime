import{M as x,C as o,S as l}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-a482d093.js";import{u as p}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function j(t={}){const{wrapper:s}=Object.assign({},p(),t.components);return s?e.jsx(s,{...t,children:e.jsx(i,{})}):i();function i(){const d=Object.assign({h1:"h1",p:"p"},p(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(x,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["danger","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}}}}),`
`,e.jsx(d.h1,{id:"notify",children:"Notify"}),`
`,e.jsx(d.p,{children:"Notify message of type info, success, warning, or error"}),`
`,e.jsx(o,{children:e.jsx(l,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
<v-notify
  variant='${r}'
  title='${n}'
  message='${a}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
<v-notify
  variant='${r}'
  title='${n}'
  message='${a}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
<v-notify
  variant='${r}'
  title='${n}'
  message='${a}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"danger",args:{variant:"danger",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
<v-notify
  variant='${r}'
  title='${n}'
  message='${a}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"no message info",args:{variant:"info",title:"This is the title."},children:({title:n,variant:a})=>`
<v-notify
  variant='${a}'
  title='${n}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"no message success",args:{variant:"success",title:"This is the title."},children:({title:n,message:a,variant:r})=>`
<v-notify
  variant='${r}'
  title='${n}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"no message warning",args:{variant:"warning",title:"This is the title."},children:({title:n,variant:a})=>`
<v-notify
  variant='${a}'
  title='${n}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"no message danger",args:{variant:"danger",title:"This is the title."},children:({title:n,variant:a})=>`
<v-notify
  title='${n}'
  variant='${a}'
/>
    `})}),`
`,e.jsx(o,{children:e.jsx(l,{name:"Slot",children:()=>`
<v-notify
  variant='info'
  title='This is the title.'
  message='This is the message.'
>
  <v-button slot='action' variant='inverse-primary' label='Click here'></v-button>
</v-notify>
    `})})]})}}const m=({title:t,message:s,variant:i})=>`
<v-notify
  variant='${i}'
  title='${t}'
  message='${s}'
/>
    `;m.storyName="info";m.args={variant:"info",title:"This is the title.",message:"This is the message."};m.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
  message='\${message}'
/>
    \``}};const c=({title:t,message:s,variant:i})=>`
<v-notify
  variant='${i}'
  title='${t}'
  message='${s}'
/>
    `;c.storyName="success";c.args={variant:"success",title:"This is the title.",message:"This is the message."};c.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
  message='\${message}'
/>
    \``}};const v=({title:t,message:s,variant:i})=>`
<v-notify
  variant='${i}'
  title='${t}'
  message='${s}'
/>
    `;v.storyName="warning";v.args={variant:"warning",title:"This is the title.",message:"This is the message."};v.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
  message='\${message}'
/>
    \``}};const h=({title:t,message:s,variant:i})=>`
<v-notify
  variant='${i}'
  title='${t}'
  message='${s}'
/>
    `;h.storyName="danger";h.args={variant:"danger",title:"This is the title.",message:"This is the message."};h.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
  message='\${message}'
/>
    \``}};const f=({title:t,variant:s})=>`
<v-notify
  variant='${s}'
  title='${t}'
/>
    `;f.storyName="no message info";f.args={variant:"info",title:"This is the title."};f.parameters={storySource:{source:`({
  title,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
/>
    \``}};const y=({title:t,message:s,variant:i})=>`
<v-notify
  variant='${i}'
  title='${t}'
/>
    `;y.storyName="no message success";y.args={variant:"success",title:"This is the title."};y.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
/>
    \``}};const u=({title:t,variant:s})=>`
<v-notify
  variant='${s}'
  title='${t}'
/>
    `;u.storyName="no message warning";u.args={variant:"warning",title:"This is the title."};u.parameters={storySource:{source:`({
  title,
  variant
}) => \`
<v-notify
  variant='\${variant}'
  title='\${title}'
/>
    \``}};const $=({title:t,variant:s})=>`
<v-notify
  title='${t}'
  variant='${s}'
/>
    `;$.storyName="no message danger";$.args={variant:"danger",title:"This is the title."};$.parameters={storySource:{source:`({
  title,
  variant
}) => \`
<v-notify
  title='\${title}'
  variant='\${variant}'
/>
    \``}};const T=()=>`
<v-notify
  variant='info'
  title='This is the title.'
  message='This is the message.'
>
  <v-button slot='action' variant='inverse-primary' label='Click here'></v-button>
</v-notify>
    `;T.storyName="Slot";T.parameters={storySource:{source:`() => \`
<v-notify
  variant='info'
  title='This is the title.'
  message='This is the message.'
>
  <v-button slot='action' variant='inverse-primary' label='Click here'></v-button>
</v-notify>
    \``}};const g={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["danger","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}}},tags:["stories-mdx"],includeStories:["info","success","warning","danger","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageDanger","slot"]};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:j};const I=["info","success","warning","danger","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageDanger","slot"];export{I as __namedExportsOrder,h as danger,g as default,m as info,$ as noMessageDanger,f as noMessageInfo,y as noMessageSuccess,u as noMessageWarning,T as slot,c as success,v as warning};
//# sourceMappingURL=notify.stories-985b368a.js.map
