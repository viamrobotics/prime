import{M as v,C as m,S as p}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as c}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function d(r={}){const{wrapper:t}=Object.assign({},c(),r.components);return t?e.exports.jsx(t,{...r,children:e.exports.jsx(s,{})}):s();function s(){const i=Object.assign({h1:"h1",p:"p"},c(),r.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(v,{title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}}}),`
`,e.exports.jsx(i.h1,{children:"Pill"}),`
`,e.exports.jsx(i.p,{children:"For displaying a list of items"}),`
`,e.exports.jsx(m,{children:e.exports.jsx(p,{name:"Primary",args:{value:"cool pill"},children:({value:a})=>`
      <v-pill
        value='${a}'
      />
    `})}),`
`,e.exports.jsx(m,{children:e.exports.jsx(p,{name:"unremovable",args:{value:"not removable",removable:"false"},children:({value:a,removable:u})=>`
      <v-pill
        value='${a}'
        removable='${u}'
      />
    `})})]})}}const n=({value:r})=>`
      <v-pill
        value='${r}'
      />
    `;n.storyName="Primary";n.args={value:"cool pill"};n.parameters={storySource:{source:`({
  value
}) => \`
      <v-pill
        value='\${value}'
      />
    \``}};const l=({value:r,removable:t})=>`
      <v-pill
        value='${r}'
        removable='${t}'
      />
    `;l.storyName="unremovable";l.args={value:"not removable",removable:"false"};l.parameters={storySource:{source:`({
  value,
  removable
}) => \`
      <v-pill
        value='\${value}'
        removable='\${removable}'
      />
    \``}};const o={title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}},tags:["mdx"],includeStories:["primary","unremovable"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:d};const k=["primary","unremovable"];export{k as __namedExportsOrder,o as default,n as primary,l as unremovable};
//# sourceMappingURL=pill.stories-384b68a1.js.map
