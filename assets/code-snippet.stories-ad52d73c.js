import{M as v,C as u,S as d}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as a}from"./json-code-example-4ee47be0.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as g}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function y(t={}){const{wrapper:o}=Object.assign({},g(),t.components);return o?e.exports.jsx(o,{...t,children:e.exports.jsx(n,{})}):n();function n(){const l=Object.assign({h1:"h1"},g(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(v,{title:"Elements/Code Snippet",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model","copy"]}},argTypes:{value:{description:"The content for the snippet",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","powershell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `prismjs` theme to use",control:{type:"select"},options:["vs","vsc-dark-plus"],table:{defaultValue:{summary:"vs"}}},showbutton:{description:"Determines if the snippet should include a copy button",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}}}}),`
`,e.exports.jsx(l.h1,{children:"Code Snippet"}),`
`,e.exports.jsx(u,{children:e.exports.jsx(d,{name:"Code Snippet",args:{language:"json",value:a,theme:"vs"},children:({value:s,language:p,theme:r})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${p}'
        theme='${r}'
        code='${s}'
      />
    </div>
    `})}),`
`,e.exports.jsx(u,{children:e.exports.jsx(d,{name:"Code Snippet Dark",args:{language:"json",value:a,theme:"vsc-dark-plus"},children:({value:s,language:p,theme:r})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${p}'
        theme='${r}'
        code='${s}'
      />
    </div>
    `})}),`
`,e.exports.jsx(u,{children:e.exports.jsx(d,{name:"Hide Copy Button",args:{language:"json",value:a,showbutton:"false"},children:({value:s,language:p,theme:r,showbutton:x})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${p}'
        code='${s}'
        showbutton='${x}'
      />
    </div>
    `})})]})}}const m=({value:t,language:o,theme:n})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${o}'
        theme='${n}'
        code='${t}'
      />
    </div>
    `;m.storyName="Code Snippet";m.args={language:"json",value:a,theme:"vs"};m.parameters={storySource:{source:`({
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
    \``}};const c=({value:t,language:o,theme:n})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${o}'
        theme='${n}'
        code='${t}'
      />
    </div>
    `;c.storyName="Code Snippet Dark";c.args={language:"json",value:a,theme:"vsc-dark-plus"};c.parameters={storySource:{source:`({
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
    \``}};const h=({value:t,language:o,theme:n,showbutton:l})=>`
    <div style='margin: auto; max-width: 600px; height: 400px;'>
      <v-code-snippet 
        language='${o}'
        code='${t}'
        showbutton='${l}'
      />
    </div>
    `;h.storyName="Hide Copy Button";h.args={language:"json",value:a,showbutton:"false"};h.parameters={storySource:{source:`({
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
    \``}};const i={title:"Elements/Code Snippet",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model","copy"]}},argTypes:{value:{description:"The content for the snippet",table:{defaultValue:{summary:""}}},language:{control:{type:"select"},options:["json","javascript","typescript","python","go","powershell"],description:"The language to use for syntax highlighting",table:{defaultValue:{summary:"json"}}},theme:{description:"The `prismjs` theme to use",control:{type:"select"},options:["vs","vsc-dark-plus"],table:{defaultValue:{summary:"vs"}}},showbutton:{description:"Determines if the snippet should include a copy button",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}}},tags:["mdx"],includeStories:["codeSnippet","codeSnippetDark","hideCopyButton"]};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:y};const L=["codeSnippet","codeSnippetDark","hideCopyButton"];export{L as __namedExportsOrder,m as codeSnippet,c as codeSnippetDark,i as default,h as hideCopyButton};
//# sourceMappingURL=code-snippet.stories-ad52d73c.js.map
