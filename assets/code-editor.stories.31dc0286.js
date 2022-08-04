import"./jsx-runtime.d53715e5.js";import{c as i,A as b,M as j,C as s,S as m}from"./Props.a5dbd648.js";import"./iframe.a6e3752b.js";import"./es.map.constructor.3901915a.js";import"./es.number.to-fixed.5152783c.js";const $=`
{ 
  "foo": "bar",
  "some": "thing",
  "yes": true,
  "count": 10
}
`.trim(),x=`
function doSomething(thing) { 
  console.log(thing) 
}
`.trim(),f=`
function doSomething(thing: string): void { 
    console.log(thing) 
  }
`.trim(),S=`
def do_something(thing):
    print(thing)    
`.trim(),E=`
package main

import "fmt"

func DoSomething(thing string) {
	fmt.Println(thing)
}
`.trim();function u(){return u=Object.assign?Object.assign.bind():function(d){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(d[a]=t[a])}return d},u.apply(this,arguments)}const w={},C="wrapper";function T({components:d,...r}){return i(C,u({},w,r,{components:d,mdxType:"MDXLayout"}),i(j,{title:"Elements/Code Editor",parameters:{actions:{handles:["input","blur","resize","updateMarkers","updateModel"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),i("h1",null,"Code Editor"),i("p",null,"Uses ",i("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),i(s,{mdxType:"Canvas"},i(m,{name:"JSON editor",args:{language:"json",value:$},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
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
    `)),i(s,{mdxType:"Canvas"},i(m,{name:"JavaScript editor",args:{language:"javascript",value:x},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
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
    `)),i(s,{mdxType:"Canvas"},i(m,{name:"TypeScript editor",args:{language:"typescript",value:f},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
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
    `)),i(s,{mdxType:"Canvas"},i(m,{name:"Python editor",args:{language:"python",value:S},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
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
    `)),i(s,{mdxType:"Canvas"},i(m,{name:"Go editor",args:{language:"go",value:E},mdxType:"Story"},({value:t,language:a,theme:n,readonly:e,minimap:l,uri:o})=>`
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
    `)))}T.isMDXComponent=!0;const g=({value:d,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;g.storyName="JSON editor";g.args={language:"json",value:$};g.parameters={storySource:{source:`({
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
    \``}};const h=({value:d,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;h.storyName="JavaScript editor";h.args={language:"javascript",value:x};h.parameters={storySource:{source:`({
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
    \``}};const y=({value:d,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;y.storyName="TypeScript editor";y.args={language:"typescript",value:f};y.parameters={storySource:{source:`({
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
    \``}};const c=({value:d,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;c.storyName="Python editor";c.args={language:"python",value:S};c.parameters={storySource:{source:`({
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
    \``}};const v=({value:d,language:r,theme:t,readonly:a,minimap:n,uri:e})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='${d}'
        language='${r}'
        theme='${t}'
        readonly='${a}'
        minimap='${n}'
        uri='${e!=null?e:""}'
      />
    </div>
    `;v.storyName="Go editor";v.args={language:"go",value:E};v.parameters={storySource:{source:`({
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
    \``}};const p={title:"Elements/Code Editor",parameters:{actions:{handles:["input","blur","resize","updateMarkers","updateModel"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},readonly:{description:"Determines if the editor should be readonly or editable",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor"]},M={"JSON editor":"jsonEditor","JavaScript editor":"javaScriptEditor","TypeScript editor":"typeScriptEditor","Python editor":"pythonEditor","Go editor":"goEditor"};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:()=>i(b,{mdxStoryNameToKey:M,mdxComponentAnnotations:p},i(T,null))};const P=["jsonEditor","javaScriptEditor","typeScriptEditor","pythonEditor","goEditor"];export{P as __namedExportsOrder,p as default,v as goEditor,h as javaScriptEditor,g as jsonEditor,c as pythonEditor,y as typeScriptEditor};
//# sourceMappingURL=code-editor.stories.31dc0286.js.map
