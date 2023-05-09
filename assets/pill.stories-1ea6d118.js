import{M as v,C as m,S as p}from"./chunk-PCJTTTQV-8bd841a0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-16962e30.js";import{u as c}from"./index-d35af5a3.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function d(a={}){const{wrapper:r}=Object.assign({},c(),a.components);return r?e.jsx(r,{...a,children:e.jsx(s,{})}):s();function s(){const i=Object.assign({h1:"h1",p:"p"},c(),a.components);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}}}),`
`,e.jsx(i.h1,{id:"pill",children:"Pill"}),`
`,e.jsx(i.p,{children:"For displaying a list of items"}),`
`,e.jsx(m,{children:e.jsx(p,{name:"Primary",args:{value:"cool pill"},children:({value:o})=>`
<v-pill
  value='${o}'
/>
    `})}),`
`,e.jsx(m,{children:e.jsx(p,{name:"unremovable",args:{value:"not removable",removable:"false"},children:({value:o,removable:u})=>`
<v-pill
  value='${o}'
  removable='${u}'
/>
    `})})]})}}const l=({value:a})=>`
<v-pill
  value='${a}'
/>
    `;l.storyName="Primary";l.args={value:"cool pill"};l.parameters={storySource:{source:`({
  value
}) => \`
<v-pill
  value='\${value}'
/>
    \``}};const n=({value:a,removable:r})=>`
<v-pill
  value='${a}'
  removable='${r}'
/>
    `;n.storyName="unremovable";n.args={value:"not removable",removable:"false"};n.parameters={storySource:{source:`({
  value,
  removable
}) => \`
<v-pill
  value='\${value}'
  removable='\${removable}'
/>
    \``}};const t={title:"Elements/Pill",parameters:{actions:{handles:["remove"]}},argTypes:{value:{description:"Text displayed to within the pill",table:{defaultValue:{summary:""}},control:"text"},removable:{description:"to display the x icon and signal to external component to remove",table:{defaultValue:{summary:"true"}},control:{type:"boolean"}},"on:remove":{description:"Event fired when x icon is clicked"}},tags:["stories-mdx"],includeStories:["primary","unremovable"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:d};const C=["primary","unremovable"];export{C as __namedExportsOrder,t as default,l as primary,n as unremovable};
//# sourceMappingURL=pill.stories-1ea6d118.js.map
