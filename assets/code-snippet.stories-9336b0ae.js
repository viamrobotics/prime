import{M as y,C as u,S as d}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as o}from"./json-code-example-4ee47be0.js";import{j as e}from"./jsx-runtime-cb192941.js";import{u as g}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function x(t={}){const{wrapper:n}=Object.assign({},g(),t.components);return n?e.jsx(n,{...t,children:e.jsx(a,{})}):a();function a(){const l=Object.assign({h1:"h1"},g(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(y,{title:"Elements/Code Snippet",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model","copy"]}},argTypes:{value:{description:"The content for the snippet",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","powershell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `prismjs` theme to use",control:{type:"select"},options:["vs","vsc-dark-plus"],table:{defaultValue:{summary:"vs"}}},showbutton:{description:"Determines if the snippet should include a copy button",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}}}}),`
`,e.jsx(l.h1,{id:"code-snippet",children:"Code Snippet"}),`
`,e.jsx(u,{children:e.jsx(d,{name:"Code Snippet",args:{language:"json",value:o,theme:"vs"},children:({value:s,language:i,theme:p})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${i}'
    theme='${p}'
    code='${s}'
  />
</div>
    `})}),`
`,e.jsx(u,{children:e.jsx(d,{name:"Code Snippet Dark",args:{language:"json",value:o,theme:"vsc-dark-plus"},children:({value:s,language:i,theme:p})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${i}'
    theme='${p}'
    code='${s}'
  />
</div>
    `})}),`
`,e.jsx(u,{children:e.jsx(d,{name:"Hide Copy Button",args:{language:"json",value:o,showbutton:"false"},children:({value:s,language:i,theme:p,showbutton:v})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${i}'
    code='${s}'
    showbutton='${v}'
  />
</div>
    `})})]})}}const m=({value:t,language:n,theme:a})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${n}'
    theme='${a}'
    code='${t}'
  />
</div>
    `;m.storyName="Code Snippet";m.args={language:"json",value:o,theme:"vs"};m.parameters={storySource:{source:`({
  value,
  language,
  theme
}) => \`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='\${language}'
    theme='\${theme}'
    code='\${value}'
  />
</div>
    \``}};const c=({value:t,language:n,theme:a})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${n}'
    theme='${a}'
    code='${t}'
  />
</div>
    `;c.storyName="Code Snippet Dark";c.args={language:"json",value:o,theme:"vsc-dark-plus"};c.parameters={storySource:{source:`({
  value,
  language,
  theme
}) => \`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='\${language}'
    theme='\${theme}'
    code='\${value}'
  />
</div>
    \``}};const h=({value:t,language:n,theme:a,showbutton:l})=>`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='${n}'
    code='${t}'
    showbutton='${l}'
  />
</div>
    `;h.storyName="Hide Copy Button";h.args={language:"json",value:o,showbutton:"false"};h.parameters={storySource:{source:`({
  value,
  language,
  theme,
  showbutton
}) => \`
<div style='margin: auto; max-width: 600px; height: 400px;'>
  <v-code-snippet 
    language='\${language}'
    code='\${value}'
    showbutton='\${showbutton}'
  />
</div>
    \``}};const r={title:"Elements/Code Snippet",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model","copy"]}},argTypes:{value:{description:"The content for the snippet",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","powershell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `prismjs` theme to use",control:{type:"select"},options:["vs","vsc-dark-plus"],table:{defaultValue:{summary:"vs"}}},showbutton:{description:"Determines if the snippet should include a copy button",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}}},tags:["stories-mdx"],includeStories:["codeSnippet","codeSnippetDark","hideCopyButton"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:x};const B=["codeSnippet","codeSnippetDark","hideCopyButton"];export{B as __namedExportsOrder,m as codeSnippet,c as codeSnippetDark,r as default,h as hideCopyButton};
//# sourceMappingURL=code-snippet.stories-9336b0ae.js.map
