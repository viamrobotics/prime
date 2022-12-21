import{M as u,C as x,S as f}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as m}from"./json-code-example-5a43b163.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as n}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";const p=JSON.stringify({$schema:"http://json-schema.org/draft-04/schema#",$ref:"#/definitions/AttrConfig",definitions:{AttrConfig:{required:["token","host"],properties:{token:{type:"string",description:"string"},host:{type:"string",description:"string"}},additionalProperties:!1,type:"object"}}});function y(t={}){const{wrapper:i}=Object.assign({},n(),t.components);return i?e.exports.jsx(i,{...t,children:e.exports.jsx(r,{})}):r();function r(){const o=Object.assign({h1:"h1",p:"p",code:"code"},n(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(u,{title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}}}),`
`,e.exports.jsx(o.h1,{children:"Code Editor"}),`
`,e.exports.jsxs(o.p,{children:["Uses ",e.exports.jsx(o.code,{children:"monaco"})," for syntax-highlighting."]}),`
`,e.exports.jsx(x,{children:e.exports.jsx(f,{name:"With validation",args:{value:m,schema:p},children:({value:d,theme:l,minimap:c,schema:h})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${d}'
        theme='${l}'
        minimap='${c}'
        schema='${h}'
      />
    </div>
    `})})]})}}const a=({value:t,theme:i,minimap:r,schema:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${t}'
        theme='${i}'
        minimap='${r}'
        schema='${o}'
      />
    </div>
    `;a.storyName="With validation";a.args={value:m,schema:p};a.parameters={storySource:{source:`({
  value,
  theme,
  minimap,
  schema
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='\${value}'
        theme='\${theme}'
        minimap='\${minimap}'
        schema='\${schema}'
      />
    </div>
    \``}};const s={title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},tags:["mdx"],includeStories:["withValidation"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:y};const A=["withValidation"];export{A as __namedExportsOrder,s as default,a as withValidation};
//# sourceMappingURL=json-editor.stories-f805383a.js.map
