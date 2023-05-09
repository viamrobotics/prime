import{M as u,C as y,S as h}from"./chunk-PCJTTTQV-8bd841a0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-16962e30.js";import{u as l}from"./index-d35af5a3.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function b(t={}){const{wrapper:o}=Object.assign({},l(),t.components);return o?e.jsx(o,{...t,children:e.jsx(n,{})}):n();function n(){const a=Object.assign({h1:"h1",p:"p"},l(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(u,{title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}},buttonText:{description:"The button text (demo only)",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button (demo only)",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}}}),`
`,e.jsx(a.h1,{id:"modal",children:"Modal"}),`
`,e.jsx(a.p,{children:"Creates a modal overlay"}),`
`,e.jsx(y,{children:e.jsx(h,{name:"Confirmation",args:{title:"Delete Confirmation!",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},children:({title:r,message:m,variant:d,buttonText:c,open:p})=>`
<div style="height: 16rem">
  <v-modal
    ${p?"open":""}
    title='${r}'
    message='${m}'
    onclose='this.removeAttribute("open")'
  >
    <v-button
      class='ml-4'
      variant='${d}'
      label='${c}'
      slot='action'
    />
  </v-modal>
</div>
    `})})]})}}const i=({title:t,message:o,variant:n,buttonText:a,open:r})=>`
<div style="height: 16rem">
  <v-modal
    ${r?"open":""}
    title='${t}'
    message='${o}'
    onclose='this.removeAttribute("open")'
  >
    <v-button
      class='ml-4'
      variant='${n}'
      label='${a}'
      slot='action'
    />
  </v-modal>
</div>
    `;i.storyName="Confirmation";i.args={title:"Delete Confirmation!",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0};i.parameters={storySource:{source:`({
  title,
  message,
  variant,
  buttonText,
  open
}) => \`
<div style="height: 16rem">
  <v-modal
    \${open ? "open" : ""}
    title='\${title}'
    message='\${message}'
    onclose='this.removeAttribute("open")'
  >
    <v-button
      class='ml-4'
      variant='\${variant}'
      label='\${buttonText}'
      slot='action'
    />
  </v-modal>
</div>
    \``}};const s={title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}},buttonText:{description:"The button text (demo only)",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button (demo only)",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},tags:["stories-mdx"],includeStories:["confirmation"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:b};const V=["confirmation"];export{V as __namedExportsOrder,i as confirmation,s as default};
//# sourceMappingURL=modal.stories-6a3cbb6b.js.map
