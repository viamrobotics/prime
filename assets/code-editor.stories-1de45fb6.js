import{M as T,C as u,S as m}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import"./json-code-example-5a43b163.js";import{j as a}from"./jsx-runtime-c27a426b.js";import{u as f}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";const j=`
function doSomething(thing) { 
  console.log(thing) 
}
`.trim(),S=`
function doSomething(thing: string): void { 
    console.log(thing) 
  }
`.trim(),b=`
def do_something(thing):
    print(thing)    
`.trim(),E=`
package main

import "fmt"

func DoSomething(thing string) {
	fmt.Println(thing)
}
`.trim(),w=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "pizza"
}
`.trim(),V=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "salad",
  "status": "healthy"
}
`.trim();function D(i={}){const{wrapper:r}=Object.assign({},f(),i.components);return r?a.exports.jsx(r,{...i,children:a.exports.jsx(s,{})}):s();function s(){const n=Object.assign({h1:"h1",p:"p",code:"code"},f(),i.components);return a.exports.jsxs(a.exports.Fragment,{children:[a.exports.jsx(T,{title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}}}),`
`,a.exports.jsx(n.h1,{children:"Code Editor"}),`
`,a.exports.jsxs(n.p,{children:["Uses ",a.exports.jsx(n.code,{children:"monaco"})," for syntax-highlighting."]}),`
`,a.exports.jsx(u,{children:a.exports.jsx(m,{name:"JavaScript editor",args:{language:"javascript",value:j},children:({value:e,previous:t,language:o,theme:d,readonly:l,minimap:p,uri:h})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${e}'
        previous='${t}'
        language='${o}'
        theme='${d}'
        readonly='${l}'
        minimap='${p}'
        uri='${h??""}'
      />
    </div>
    `})}),`
`,a.exports.jsx(u,{children:a.exports.jsx(m,{name:"TypeScript editor",args:{language:"typescript",value:S},children:({value:e,language:t,theme:o,readonly:d,minimap:l,uri:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${e}'
        language='${t}'
        theme='${o}'
        readonly='${d}'
        minimap='${l}'
        uri='${p??""}'
      />
    </div>
    `})}),`
`,a.exports.jsx(u,{children:a.exports.jsx(m,{name:"Python editor",args:{language:"python",value:b},children:({value:e,language:t,theme:o,readonly:d,minimap:l,uri:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${e}'
        language='${t}'
        theme='${o}'
        readonly='${d}'
        minimap='${l}'
        uri='${p??""}'
      />
    </div>
    `})}),`
`,a.exports.jsx(u,{children:a.exports.jsx(m,{name:"Go editor",args:{language:"go",value:E},children:({value:e,language:t,theme:o,readonly:d,minimap:l,uri:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${e}'
        language='${t}'
        theme='${o}'
        readonly='${d}'
        minimap='${l}'
        uri='${p??""}'
      />
    </div>
    `})}),`
`,a.exports.jsx(u,{children:a.exports.jsx(m,{name:"Diff editor",args:{variant:"diff",language:"json",value:V,previous:w},children:({variant:e,value:t,previous:o,language:d,theme:l,readonly:p,minimap:h,uri:C})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${e}'
        value='${t}'
        previous='${o}'
        language='${d}'
        theme='${l}'
        readonly='${p}'
        minimap='${h}'
        uri='${C??""}'
      />
    </div>
    `})})]})}}const g=({value:i,previous:r,language:s,theme:n,readonly:e,minimap:t,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${i}'
        previous='${r}'
        language='${s}'
        theme='${n}'
        readonly='${e}'
        minimap='${t}'
        uri='${o??""}'
      />
    </div>
    `;g.storyName="JavaScript editor";g.args={language:"javascript",value:j};g.parameters={storySource:{source:`({
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  uri
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='\${value}'
        previous='\${previous}'
        language='\${language}'
        theme='\${theme}'
        readonly='\${readonly}'
        minimap='\${minimap}'
        uri='\${uri ?? ""}'
      />
    </div>
    \``}};const v=({value:i,language:r,theme:s,readonly:n,minimap:e,uri:t})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${i}'
        language='${r}'
        theme='${s}'
        readonly='${n}'
        minimap='${e}'
        uri='${t??""}'
      />
    </div>
    `;v.storyName="TypeScript editor";v.args={language:"typescript",value:S};v.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  uri
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='\${value}'
        language='\${language}'
        theme='\${theme}'
        readonly='\${readonly}'
        minimap='\${minimap}'
        uri='\${uri ?? ""}'
      />
    </div>
    \``}};const y=({value:i,language:r,theme:s,readonly:n,minimap:e,uri:t})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${i}'
        language='${r}'
        theme='${s}'
        readonly='${n}'
        minimap='${e}'
        uri='${t??""}'
      />
    </div>
    `;y.storyName="Python editor";y.args={language:"python",value:b};y.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  uri
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='\${value}'
        language='\${language}'
        theme='\${theme}'
        readonly='\${readonly}'
        minimap='\${minimap}'
        uri='\${uri ?? ""}'
      />
    </div>
    \``}};const $=({value:i,language:r,theme:s,readonly:n,minimap:e,uri:t})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${i}'
        language='${r}'
        theme='${s}'
        readonly='${n}'
        minimap='${e}'
        uri='${t??""}'
      />
    </div>
    `;$.storyName="Go editor";$.args={language:"go",value:E};$.parameters={storySource:{source:`({
  value,
  language,
  theme,
  readonly,
  minimap,
  uri
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='\${value}'
        language='\${language}'
        theme='\${theme}'
        readonly='\${readonly}'
        minimap='\${minimap}'
        uri='\${uri ?? ""}'
      />
    </div>
    \``}};const x=({variant:i,value:r,previous:s,language:n,theme:e,readonly:t,minimap:o,uri:d})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${i}'
        value='${r}'
        previous='${s}'
        language='${n}'
        theme='${e}'
        readonly='${t}'
        minimap='${o}'
        uri='${d??""}'
      />
    </div>
    `;x.storyName="Diff editor";x.args={variant:"diff",language:"json",value:V,previous:w};x.parameters={storySource:{source:`({
  variant,
  value,
  previous,
  language,
  theme,
  readonly,
  minimap,
  uri
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
        uri='\${uri ?? ""}'
      />
    </div>
    \``}};const c={title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},tags:["mdx"],includeStories:["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"]};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:D};const Q=["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"];export{Q as __namedExportsOrder,c as default,x as diffEditor,$ as goEditor,g as javaScriptEditor,y as pythonEditor,v as typeScriptEditor};
//# sourceMappingURL=code-editor.stories-1de45fb6.js.map
