var V=Object.defineProperty;var s=(d,i)=>V(d,"name",{value:i,configurable:!0});import"./jsx-runtime.e819bcfc.js";import{c as r,A as D,M,C as m,S as u}from"./Props.c4731b41.js";import"./iframe.33d62c99.js";import"./json-code-example.e31aa41c.js";import"./es.map.constructor.7a4b5b44.js";import"./es.number.to-fixed.e1836392.js";const S=`
function doSomething(thing) { 
  console.log(thing) 
}
`.trim(),E=`
function doSomething(thing: string): void { 
    console.log(thing) 
  }
`.trim(),b=`
def do_something(thing):
    print(thing)    
`.trim(),T=`
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
`.trim(),C=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "salad",
  "status": "healthy"
}
`.trim();function h(){return h=Object.assign?Object.assign.bind():function(d){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(d[a]=t[a])}return d},h.apply(this,arguments)}s(h,"_extends");const N={},P="wrapper";function j({components:d,...i}){return r(P,h({},N,i,{components:d,mdxType:"MDXLayout"}),r(M,{title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),r("h1",null,"Code Editor"),r("p",null,"Uses ",r("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),r(m,{mdxType:"Canvas"},r(u,{name:"JavaScript editor",args:{language:"javascript",value:S},mdxType:"Story"},({value:t,previous:a,language:n,theme:e,readonly:l,minimap:o,uri:p})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${t}'
        previous='${a}'
        language='${n}'
        theme='${e}'
        readonly='${l}'
        minimap='${o}'
        uri='${p!=null?p:""}'
      />
    </div>
    `)),r(m,{mdxType:"Canvas"},r(u,{name:"TypeScript editor",args:{language:"typescript",value:E},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${l}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),r(m,{mdxType:"Canvas"},r(u,{name:"Python editor",args:{language:"python",value:b},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${l}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),r(m,{mdxType:"Canvas"},r(u,{name:"Go editor",args:{language:"go",value:T},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${l}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),r(m,{mdxType:"Canvas"},r(u,{name:"Diff editor",args:{variant:"diff",language:"json",value:C,previous:w},mdxType:"Story"},({variant:t,value:a,previous:n,language:e,theme:l,readonly:o,minimap:p,uri:y})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${t}'
        value='${a}'
        previous='${n}'
        language='${e}'
        theme='${l}'
        readonly='${o}'
        minimap='${p}'
        uri='${y!=null?y:""}'
      />
    </div>
    `)))}s(j,"MDXContent");j.isMDXComponent=!0;const c=s(({value:d,previous:i,language:t,theme:a,readonly:n,minimap:e,uri:l})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${d}'
        previous='${i}'
        language='${t}'
        theme='${a}'
        readonly='${n}'
        minimap='${e}'
        uri='${l!=null?l:""}'
      />
    </div>
    `,"javaScriptEditor");c.storyName="JavaScript editor";c.args={language:"javascript",value:S};c.parameters={storySource:{source:`({
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
        uri='\${uri ?? ''}'
      />
    </div>
    \``}};const v=s(({value:d,language:i,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${i}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `,"typeScriptEditor");v.storyName="TypeScript editor";v.args={language:"typescript",value:E};v.parameters={storySource:{source:`({
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
        uri='\${uri ?? ''}'
      />
    </div>
    \``}};const $=s(({value:d,language:i,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${i}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `,"pythonEditor");$.storyName="Python editor";$.args={language:"python",value:b};$.parameters={storySource:{source:`({
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
        uri='\${uri ?? ''}'
      />
    </div>
    \``}};const f=s(({value:d,language:i,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${i}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `,"goEditor");f.storyName="Go editor";f.args={language:"go",value:T};f.parameters={storySource:{source:`({
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
        uri='\${uri ?? ''}'
      />
    </div>
    \``}};const x=s(({variant:d,value:i,previous:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${d}'
        value='${i}'
        previous='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${l}'
        uri='${o!=null?o:""}'
      />
    </div>
    `,"diffEditor");x.storyName="Diff editor";x.args={variant:"diff",language:"json",value:C,previous:w};x.parameters={storySource:{source:`({
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
        uri='\${uri ?? ''}'
      />
    </div>
    \``}};const g={title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"]},_={"JavaScript editor":"javaScriptEditor","TypeScript editor":"typeScriptEditor","Python editor":"pythonEditor","Go editor":"goEditor","Diff editor":"diffEditor"};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:()=>r(D,{mdxStoryNameToKey:_,mdxComponentAnnotations:g},r(j,null))};const K=["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"];export{K as __namedExportsOrder,g as default,x as diffEditor,f as goEditor,c as javaScriptEditor,$ as pythonEditor,v as typeScriptEditor};
//# sourceMappingURL=code-editor.stories.d8392a17.js.map
