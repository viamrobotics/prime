import"./jsx-runtime.c53d8267.js";import{c as i,A as j,M as V,C as p,S as m}from"./Props.2476ec14.js";import"./iframe.501ffeae.js";import"./json-code-example.e31aa41c.js";import"./es.map.constructor.322186fb.js";import"./es.number.to-fixed.361e2a81.js";const x=`
function doSomething(thing) { 
  console.log(thing) 
}
`.trim(),S=`
function doSomething(thing: string): void { 
    console.log(thing) 
  }
`.trim(),E=`
def do_something(thing):
    print(thing)    
`.trim(),b=`
package main

import "fmt"

func DoSomething(thing string) {
	fmt.Println(thing)
}
`.trim(),T=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "pizza"
}
`.trim(),w=`
{ 
  "name": "bob",
  "age": "400",
  "role": "Senescence research",
  "favorite_food": "salad",
  "status": "healthy"
}
`.trim();function y(){return y=Object.assign?Object.assign.bind():function(l){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(l[a]=t[a])}return l},y.apply(this,arguments)}const D={},M="wrapper";function C({components:l,...r}){return i(M,y({},D,r,{components:l,mdxType:"MDXLayout"}),i(V,{title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),i("h1",null,"Code Editor"),i("p",null,"Uses ",i("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),i(p,{mdxType:"Canvas"},i(m,{name:"JavaScript editor",args:{language:"javascript",value:x},mdxType:"Story"},({value:t,previous:a,language:n,theme:e,readonly:d,minimap:o,uri:s})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${t}'
        previous='${a}'
        language='${n}'
        theme='${e}'
        readonly='${d}'
        minimap='${o}'
        uri='${s!=null?s:""}'
      />
    </div>
    `)),i(p,{mdxType:"Canvas"},i(m,{name:"TypeScript editor",args:{language:"typescript",value:S},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:d,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${d}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),i(p,{mdxType:"Canvas"},i(m,{name:"Python editor",args:{language:"python",value:E},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:d,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${d}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),i(p,{mdxType:"Canvas"},i(m,{name:"Go editor",args:{language:"go",value:b},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:d,uri:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${d}'
        uri='${o!=null?o:""}'
      />
    </div>
    `)),i(p,{mdxType:"Canvas"},i(m,{name:"Diff editor",args:{variant:"diff",language:"json",value:w,previous:T},mdxType:"Story"},({variant:t,value:a,previous:n,language:e,theme:d,readonly:o,minimap:s,uri:g})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${t}'
        value='${a}'
        previous='${n}'
        language='${e}'
        theme='${d}'
        readonly='${o}'
        minimap='${s}'
        uri='${g!=null?g:""}'
      />
    </div>
    `)))}C.isMDXComponent=!0;const h=({value:l,previous:r,language:t,theme:a,readonly:n,minimap:e,uri:d})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor
        value='${l}'
        previous='${r}'
        language='${t}'
        theme='${a}'
        readonly='${n}'
        minimap='${e}'
        uri='${d!=null?d:""}'
      />
    </div>
    `;h.storyName="JavaScript editor";h.args={language:"javascript",value:x};h.parameters={storySource:{source:`({
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
    \``}};const c=({value:l,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${l}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;c.storyName="TypeScript editor";c.args={language:"typescript",value:S};c.parameters={storySource:{source:`({
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
    \``}};const v=({value:l,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${l}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;v.storyName="Python editor";v.args={language:"python",value:E};v.parameters={storySource:{source:`({
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
    \``}};const $=({value:l,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${l}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;$.storyName="Go editor";$.args={language:"go",value:b};$.parameters={storySource:{source:`({
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
    \``}};const f=({variant:l,value:r,previous:t,language:a,theme:n,readonly:e,minimap:d,uri:o})=>`
    <div style='width: auto; height: 400px;'>
      <v-code-editor
        variant='${l}'
        value='${r}'
        previous='${t}'
        language='${a}'
        theme='${n}'
        readonly='${e}'
        minimap='${d}'
        uri='${o!=null?o:""}'
      />
    </div>
    `;f.storyName="Diff editor";f.args={variant:"diff",language:"json",value:w,previous:T};f.parameters={storySource:{source:`({
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
    \``}};const u={title:"Elements/Code Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},variant:{description:"The type of editor to display",control:{type:"select"},options:["default","diff"],table:{defaultValue:{summary:"default"}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"]},N={"JavaScript editor":"javaScriptEditor","TypeScript editor":"typeScriptEditor","Python editor":"pythonEditor","Go editor":"goEditor","Diff editor":"diffEditor"};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:()=>i(j,{mdxStoryNameToKey:N,mdxComponentAnnotations:u},i(C,null))};const A=["javaScriptEditor","typeScriptEditor","pythonEditor","goEditor","diffEditor"];export{A as __namedExportsOrder,u as default,f as diffEditor,$ as goEditor,h as javaScriptEditor,v as pythonEditor,c as typeScriptEditor};
//# sourceMappingURL=code-editor.stories.472867fe.js.map
