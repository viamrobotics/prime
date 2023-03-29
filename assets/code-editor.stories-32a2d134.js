import{M as O,C as h,S as u}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as b}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";const c=JSON.stringify({name:"Bob",age:400,favorite_food:"pizza"},null,2),M=`
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
`.trim(),N=`
package main

import "fmt"

func DoSomething(thing string) {
	fmt.Println(thing)
}
`.trim(),T=`
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
`.trim();function k(i={}){const{wrapper:r}=Object.assign({},b(),i.components);return r?t.exports.jsx(r,{...i,children:t.exports.jsx(s,{})}):s();function s(){const o=Object.assign({h1:"h1",p:"p",code:"code"},b(),i.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(O,{title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","shell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},schema:{description:"When defined, is used to create the model URI passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}}}),`
`,t.exports.jsx(o.h1,{children:"Code Editor"}),`
`,t.exports.jsxs(o.p,{children:["Uses ",t.exports.jsx(o.code,{children:"monaco"})," for syntax-highlighting."]}),`
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"JSON editor",args:{language:"json",value:c},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${e}'
        previous='${a}'
        language='${n}'
        theme='${l}'
        readonly='${d}'
        minimap='${m}'
        schema='${p??""}'
      />
    </div>
    `})}),`
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"JavaScript editor",args:{language:"javascript",value:M},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${e}'
        previous='${a}'
        language='${n}'
        theme='${l}'
        readonly='${d}'
        minimap='${m}'
        schema='${p??""}'
      />
    </div>
    `})}),`
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"TypeScript editor",args:{language:"typescript",value:C},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
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
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Python editor",args:{language:"python",value:V},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
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
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Go editor",args:{language:"go",value:N},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
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
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Shell editor",args:{language:"shell",value:T},children:({value:e,language:a,theme:n,readonly:l,minimap:d,schema:m})=>`
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
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Readonly editor",args:{language:"json",value:c,readonly:!0},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${e}'
        previous='${a}'
        language='${n}'
        theme='${l}'
        readonly='${d}'
        minimap='${m}'
        schema='${p??""}'
      />
    </div>
    `})}),`
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Mini Map",args:{language:"json",value:c,minimap:!0},children:({value:e,previous:a,language:n,theme:l,readonly:d,minimap:m,schema:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${e}'
        previous='${a}'
        language='${n}'
        theme='${l}'
        readonly='${d}'
        minimap='${m}'
        schema='${p??""}'
      />
    </div>
    `})}),`
`,t.exports.jsx(h,{children:t.exports.jsx(u,{name:"Diff editor",args:{variant:"diff",language:"json",value:_,previous:D},children:({variant:e,value:a,previous:n,language:l,theme:d,readonly:m,minimap:p,schema:z})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${e}'
        value='${a}'
        previous='${n}'
        language='${l}'
        theme='${d}'
        readonly='${m}'
        minimap='${p}'
        schema='${z??""}'
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
    `;f.storyName="Go editor";f.args={language:"go",value:N};f.parameters={storySource:{source:`({
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
    `;j.storyName="Shell editor";j.args={language:"shell",value:T};j.parameters={storySource:{source:`({
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
    `;S.storyName="Readonly editor";S.args={language:"json",value:c,readonly:!0};S.parameters={storySource:{source:`({
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
    `;E.storyName="Mini Map";E.args={language:"json",value:c,minimap:!0};E.parameters={storySource:{source:`({
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
    \``}};const g={title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","shell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},schema:{description:"When defined, is used to create the model URI passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},tags:["mdx"],includeStories:["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","shellEditor","readonlyEditor","miniMap","diffEditor"]};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:k};const ne=["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","shellEditor","readonlyEditor","miniMap","diffEditor"];export{ne as __namedExportsOrder,g as default,w as diffEditor,f as goEditor,$ as javaScriptEditor,v as jsonEditor,E as miniMap,x as pythonEditor,S as readonlyEditor,j as shellEditor,y as typeScriptEditor};
//# sourceMappingURL=code-editor.stories-32a2d134.js.map
