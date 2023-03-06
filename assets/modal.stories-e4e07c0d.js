import{M as u,C as y,S as h}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as m}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function b(t={}){const{wrapper:o}=Object.assign({},m(),t.components);return o?e.exports.jsx(o,{...t,children:e.exports.jsx(n,{})}):n();function n(){const a=Object.assign({h1:"h1",p:"p"},m(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(u,{title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}},buttonText:{description:"The button text (demo only)",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button (demo only)",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}}}),`
`,e.exports.jsx(a.h1,{children:"Modal"}),`
`,e.exports.jsx(a.p,{children:"Creates a modal overlay"}),`
`,e.exports.jsx(y,{children:e.exports.jsx(h,{name:"Confirmation",args:{title:"Delete Confirmation!",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},children:({title:s,message:l,variant:p,buttonText:c,open:d})=>`
      <div style="height: 16rem">
        <v-modal
          ${d?"open":""}
          title='${s}'
          message='${l}'
          onclose='this.removeAttribute("open")'
        >
          <v-button
            class='ml-4'
            variant='${p}'
            label='${c}'
            slot='action'
          />
        </v-modal>
      </div>
    `})})]})}}const i=({title:t,message:o,variant:n,buttonText:a,open:s})=>`
      <div style="height: 16rem">
        <v-modal
          ${s?"open":""}
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
    \``}};const r={title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}},buttonText:{description:"The button text (demo only)",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button (demo only)",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}}},tags:["mdx"],includeStories:["confirmation"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:b};const F=["confirmation"];export{F as __namedExportsOrder,i as confirmation,r as default};
//# sourceMappingURL=modal.stories-e4e07c0d.js.map
