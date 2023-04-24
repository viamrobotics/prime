import{M as O,C as u,S as p}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as c}from"./json-code-example-4ee47be0.js";import{j as t}from"./jsx-runtime-cb192941.js";import{u as b}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";const M=`
function doSomething(thing) { 
  console.log(thing) 
}
`.trim(),C=`
function doSomething(thing: string): void { 
    console.log(thing) 
  }
`.trim(),V=`
def do_something(thing):
    print(thing)    
`.trim(),T=`
package main

import "fmt"

func DoSomething(thing string) {
	fmt.Println(thing)
}
`.trim(),N=`
#!/bin/sh
echo "Hello world"
`.trim(),D=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "pizza"
}
`.trim(),_=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "salad",
  "status": "healthy"
}
`.trim();function R(i={}){const{wrapper:r}=Object.assign({},b(),i.components);return r?t.jsx(r,{...i,children:t.jsx(s,{})}):s();function s(){const o=Object.assign({h1:"h1",p:"p",code:"code"},b(),i.components);return t.jsxs(t.Fragment,{children:[t.jsx(O,{title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","shell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},schema:{description:"When defined, is used to create the model URI passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}}}),`
`,t.jsx(o.h1,{id:"code-editor",children:"Code Editor"}),`
`,t.jsxs(o.p,{children:["Uses ",t.jsx(o.code,{children:"monaco"})," for syntax-highlighting."]}),`
`,t.jsx(u,{children:t.jsx(p,{name:"JSON editor",args:{language:"json",value:c},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:h})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${e}'
    previous='${a}'
    language='${n}'
    theme='${l}'
    readonly='${d}'
    minimap='${m}'
    schema='${h??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"JavaScript editor",args:{language:"javascript",value:M},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:h})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${e}'
    previous='${a}'
    language='${n}'
    theme='${l}'
    readonly='${d}'
    minimap='${m}'
    schema='${h??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"TypeScript editor",args:{language:"typescript",value:C},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${e}'
    language='${a}'
    theme='${n}'
    readonly='${l}'
    minimap='${d}'
    schema='${m??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Python editor",args:{language:"python",value:V},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${e}'
    language='${a}'
    theme='${n}'
    readonly='${l}'
    minimap='${d}'
    schema='${m??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Go editor",args:{language:"go",value:T},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${e}'
    language='${a}'
    theme='${n}'
    readonly='${l}'
    minimap='${d}'
    schema='${m??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Shell editor",args:{language:"shell",value:N},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${e}'
    language='${a}'
    theme='${n}'
    readonly='${l}'
    minimap='${d}'
    schema='${m??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Readonly editor",args:{language:"json",value:c,readonly:!0},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:h})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${e}'
    previous='${a}'
    language='${n}'
    theme='${l}'
    readonly='${d}'
    minimap='${m}'
    schema='${h??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Mini Map",args:{language:"json",value:c,minimap:!0},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:h})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${e}'
    previous='${a}'
    language='${n}'
    theme='${l}'
    readonly='${d}'
    minimap='${m}'
    schema='${h??""}'
  />
</div>
    `})}),`
`,t.jsx(u,{children:t.jsx(p,{name:"Diff editor",args:{variant:"diff",language:"json",value:_,previous:D},children:({variant:e,value:a,previous:n,language:l,theme:d,readonly:m,minimap:h,schema:k})=>`
<div style='width: auto; height: 400px;'>
  <v-code-editor
    variant='${e}'
    value='${a}'
    previous='${n}'
    language='${l}'
    theme='${d}'
    readonly='${m}'
    minimap='${h}'
    schema='${k??""}'
  />
</div>
    `})})]})}}const v=({value:i,previous:r,language:s,theme:o,readonly:e,minimap:a,schema:n})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${i}'
    previous='${r}'
    language='${s}'
    theme='${o}'
    readonly='${e}'
    minimap='${a}'
    schema='${n??""}'
  />
</div>
    `;v.storyName="JSON editor";v.args={language:"json",value:c};v.parameters={storySource:{source:`({
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='\${value}'
    previous='\${previous}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const $=({value:i,previous:r,language:s,theme:o,readonly:e,minimap:a,schema:n})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${i}'
    previous='${r}'
    language='${s}'
    theme='${o}'
    readonly='${e}'
    minimap='${a}'
    schema='${n??""}'
  />
</div>
    `;$.storyName="JavaScript editor";$.args={language:"javascript",value:M};$.parameters={storySource:{source:`({
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='\${value}'
    previous='\${previous}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const y=({value:i,language:r,theme:s,readonly:o,minimap:e,schema:a})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${i}'
    language='${r}'
    theme='${s}'
    readonly='${o}'
    minimap='${e}'
    schema='${a??""}'
  />
</div>
    `;y.storyName="TypeScript editor";y.args={language:"typescript",value:C};y.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='\${value}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const x=({value:i,language:r,theme:s,readonly:o,minimap:e,schema:a})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${i}'
    language='${r}'
    theme='${s}'
    readonly='${o}'
    minimap='${e}'
    schema='${a??""}'
  />
</div>
    `;x.storyName="Python editor";x.args={language:"python",value:V};x.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='\${value}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const f=({value:i,language:r,theme:s,readonly:o,minimap:e,schema:a})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${i}'
    language='${r}'
    theme='${s}'
    readonly='${o}'
    minimap='${e}'
    schema='${a??""}'
  />
</div>
    `;f.storyName="Go editor";f.args={language:"go",value:T};f.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='\${value}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const j=({value:i,language:r,theme:s,readonly:o,minimap:e,schema:a})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='${i}'
    language='${r}'
    theme='${s}'
    readonly='${o}'
    minimap='${e}'
    schema='${a??""}'
  />
</div>
    `;j.storyName="Shell editor";j.args={language:"shell",value:N};j.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor 
    value='\${value}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const E=({value:i,previous:r,language:s,theme:o,readonly:e,minimap:a,schema:n})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${i}'
    previous='${r}'
    language='${s}'
    theme='${o}'
    readonly='${e}'
    minimap='${a}'
    schema='${n??""}'
  />
</div>
    `;E.storyName="Readonly editor";E.args={language:"json",value:c,readonly:!0};E.parameters={storySource:{source:`({
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='\${value}'
    previous='\${previous}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const S=({value:i,previous:r,language:s,theme:o,readonly:e,minimap:a,schema:n})=>`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='${i}'
    previous='${r}'
    language='${s}'
    theme='${o}'
    readonly='${e}'
    minimap='${a}'
    schema='${n??""}'
  />
</div>
    `;S.storyName="Mini Map";S.args={language:"json",value:c,minimap:!0};S.parameters={storySource:{source:`({
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: 400px; height: 400px;'>
  <v-code-editor
    value='\${value}'
    previous='\${previous}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const w=({variant:i,value:r,previous:s,language:o,theme:e,readonly:a,minimap:n,schema:l})=>`
<div style='width: auto; height: 400px;'>
  <v-code-editor
    variant='${i}'
    value='${r}'
    previous='${s}'
    language='${o}'
    theme='${e}'
    readonly='${a}'
    minimap='${n}'
    schema='${l??""}'
  />
</div>
    `;w.storyName="Diff editor";w.args={variant:"diff",language:"json",value:_,previous:D};w.parameters={storySource:{source:`({
  variant,
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  schema
}) => \`
<div style='width: auto; height: 400px;'>
  <v-code-editor
    variant='\${variant}'
    value='\${value}'
    previous='\${previous}'
    language='\${language}'
    theme='\${theme}'
    readonly='\${readonly}'
    minimap='\${minimap}'
    schema='\${schema ?? ""}'
  />
</div>
    \``}};const g={title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","shell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},schema:{description:"When defined, is used to create the model URI passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},tags:["stories-mdx"],includeStories:["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","shellEditor","readonlyEditor","miniMap","diffEditor"]};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:R};const A=["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","shellEditor","readonlyEditor","miniMap","diffEditor"];export{A as __namedExportsOrder,g as default,w as diffEditor,f as goEditor,$ as javaScriptEditor,v as jsonEditor,S as miniMap,x as pythonEditor,E as readonlyEditor,j as shellEditor,y as typeScriptEditor};
//# sourceMappingURL=code-editor.stories-0e7ce8b2.js.map
