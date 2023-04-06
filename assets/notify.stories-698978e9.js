import{M as b,C as o,S as l}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as x}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function j(e={}){const{wrapper:s}=Object.assign({},x(),e.components);return s?t.exports.jsx(s,{...e,children:t.exports.jsx(a,{})}):a();function a(){const d=Object.assign({h1:"h1",p:"p"},x(),e.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(b,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}}}),`
`,t.exports.jsx(d.h1,{children:"Notify"}),`
`,t.exports.jsx(d.p,{children:"Notify message of type info, success, warning, or error"}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},children:({title:n,message:i,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${i}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},children:({title:n,message:i,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${i}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},children:({title:n,message:i,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${i}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"error",args:{variant:"error",title:"This is the title.",message:"This is the message."},children:({title:n,message:i,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
        message='${i}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"no message info",args:{variant:"info",title:"This is the title."},children:({title:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${n}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"no message success",args:{variant:"success",title:"This is the title."},children:({title:n,message:i,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${n}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"no message warning",args:{variant:"warning",title:"This is the title."},children:({title:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${n}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"no message error",args:{variant:"error",title:"This is the title."},children:({title:n,variant:i})=>`
      <v-notify
        title='${n}'
        variant='${i}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"White background",args:{variant:"error",title:"This is the title.",background:"white"},children:({title:n,variant:i,background:r})=>`
      <v-notify
        title='${n}'
        variant='${i}'
        background='${r}'
      />
    `})}),`
`,t.exports.jsx(o,{children:t.exports.jsx(l,{name:"Slot",children:()=>`
      <v-notify
        variant='info'
        title='This is the title.'
        message='This is the message.'
      >
        <v-button slot='action' variant='inverse-primary' label='Click here'></v-button>
      </v-notify>
    `})})]})}}const m=({title:e,message:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${e}'
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
    \``}};const g=({title:e,message:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${e}'
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
    \``}};const v=({title:e,message:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${e}'
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
    \``}};const h=({title:e,message:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${e}'
        message='${s}'
      />
    `;h.storyName="error";h.args={variant:"error",title:"This is the title.",message:"This is the message."};h.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const p=({title:e,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${e}'
      />
    `;p.storyName="no message info";p.args={variant:"info",title:"This is the title."};p.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const u=({title:e,message:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${e}'
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
    \``}};const y=({title:e,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${e}'
      />
    `;y.storyName="no message warning";y.args={variant:"warning",title:"This is the title."};y.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=({title:e,variant:s})=>`
      <v-notify
        title='${e}'
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
    \``}};const $=({title:e,variant:s,background:a})=>`
      <v-notify
        title='${e}'
        variant='${s}'
        background='${a}'
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
    \``}};const c={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},tags:["mdx"],includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:j};const A=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"];export{A as __namedExportsOrder,c as default,h as error,m as info,f as noMessageError,p as noMessageInfo,u as noMessageSuccess,y as noMessageWarning,T as slot,g as success,v as warning,$ as whiteBackground};
//# sourceMappingURL=notify.stories-698978e9.js.map
