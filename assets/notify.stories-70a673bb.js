import{M as j,C as o,S as l}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as x}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function b(t={}){const{wrapper:s}=Object.assign({},x(),t.components);return s?e.exports.jsx(s,{...t,children:e.exports.jsx(i,{})}):i();function i(){const d=Object.assign({h1:"h1",p:"p"},x(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(j,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}}}),`
`,e.exports.jsx(d.h1,{children:"Notify"}),`
`,e.exports.jsx(d.p,{children:"Notify message of type info, success, warning, or error"}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"error",args:{variant:"error",title:"This is the title.",message:"This is the message."},children:({title:n,message:a,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"no message info",args:{variant:"info",title:"This is the title."},children:({title:n,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${n}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"no message success",args:{variant:"success",title:"This is the title."},children:({title:n,message:a,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"no message warning",args:{variant:"warning",title:"This is the title."},children:({title:n,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${n}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"no message error",args:{variant:"error",title:"This is the title."},children:({title:n,variant:a})=>`
      <v-notify
        title='${n}'
        variant='${a}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"White background",args:{variant:"error",title:"This is the title.",background:"white"},children:({title:n,variant:a,background:r})=>`
      <v-notify
        title='${n}'
        variant='${a}'
        background='${r}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(l,{name:"Slot",children:()=>`
      <v-notify>Slot example</v-notify>
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
    \``}};const g=({title:t,message:s,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${t}'
        message='${s}'
      />
    `;g.storyName="success";g.args={variant:"success",title:"This is the title.",message:"This is the message."};g.parameters={storySource:{source:`({
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
    \``}};const p=({title:t,message:s,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${t}'
        message='${s}'
      />
    `;p.storyName="error";p.args={variant:"error",title:"This is the title.",message:"This is the message."};p.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const h=({title:t,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${t}'
      />
    `;h.storyName="no message info";h.args={variant:"info",title:"This is the title."};h.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const u=({title:t,message:s,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${t}'
      />
    `;u.storyName="no message success";u.args={variant:"success",title:"This is the title."};u.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const y=({title:t,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${t}'
      />
    `;y.storyName="no message warning";y.args={variant:"warning",title:"This is the title."};y.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=({title:t,variant:s})=>`
      <v-notify
        title='${t}'
        variant='${s}'
      />
    `;f.storyName="no message error";f.args={variant:"error",title:"This is the title."};f.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      />
    \``}};const $=({title:t,variant:s,background:i})=>`
      <v-notify
        title='${t}'
        variant='${s}'
        background='${i}'
      />
    `;$.storyName="White background";$.args={variant:"error",title:"This is the title.",background:"white"};$.parameters={storySource:{source:`({
  title,
  variant,
  background
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
        background='\${background}'
      />
    \``}};const T=()=>`
      <v-notify>Slot example</v-notify>
    `;T.storyName="Slot";T.parameters={storySource:{source:"() => `\n      <v-notify>Slot example</v-notify>\n    `"}};const c={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},tags:["mdx"],includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:b};const A=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"];export{A as __namedExportsOrder,c as default,p as error,m as info,f as noMessageError,h as noMessageInfo,u as noMessageSuccess,y as noMessageWarning,T as slot,g as success,v as warning,$ as whiteBackground};
//# sourceMappingURL=notify.stories-70a673bb.js.map
