import{M as x,C as r,S as l}from"./chunk-PCJTTTQV-8bd841a0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-16962e30.js";import{u as d}from"./index-d35af5a3.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function v(e={}){const{wrapper:o}=Object.assign({},d(),e.components);return o?t.jsx(o,{...e,children:t.jsx(m,{})}):m();function m(){const h=Object.assign({h1:"h1",p:"p"},d(),e.components);return t.jsxs(t.Fragment,{children:[t.jsx(x,{title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}}}),`
`,t.jsx(h.h1,{id:"tooltip",children:"Tooltip"}),`
`,t.jsx(h.p,{children:"Used to display text box when hovering over an element."}),`
`,t.jsx(r,{children:t.jsx(l,{name:"Tooltip",args:{text:"Test information for the tooltip",location:"top"},children:({text:i,location:n})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${i}' location="${n}">
    <p>Hover here</p>
  </v-tooltip>
<div>
    `})}),`
`,t.jsx(r,{children:t.jsx(l,{name:"With HTML content",args:{text:"Test information for the tooltip",location:"top"},children:({text:i,location:n})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${i}' location="${n}">
    <p>Hover here</p>
    <span slot="text">For more information, see our guide to <a href="">roles & permissions.</a></span>
  </v-tooltip>
<div>
    `})}),`
`,t.jsx(r,{children:t.jsx(l,{name:"Icon",args:{text:"Revoke",location:"top"},children:({text:i,location:n})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${i}' location="${n}">
    <v-icon slot='icon' name='checkmark'></v-icon>
    <v-icon name='trash'></v-icon'>
  </v-tooltip>
<div>
    `})})]})}}const a=({text:e,location:o})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${e}' location="${o}">
    <p>Hover here</p>
  </v-tooltip>
<div>
    `;a.storyName="Tooltip";a.args={text:"Test information for the tooltip",location:"top"};a.parameters={storySource:{source:`({
  text,
  location
}) => \`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='\${text}' location="\${location}">
    <p>Hover here</p>
  </v-tooltip>
<div>
    \``}};const p=({text:e,location:o})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${e}' location="${o}">
    <p>Hover here</p>
    <span slot="text">For more information, see our guide to <a href="">roles & permissions.</a></span>
  </v-tooltip>
<div>
    `;p.storyName="With HTML content";p.args={text:"Test information for the tooltip",location:"top"};p.parameters={storySource:{source:`({
  text,
  location
}) => \`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='\${text}' location="\${location}">
    <p>Hover here</p>
    <span slot="text">For more information, see our guide to <a href="">roles & permissions.</a></span>
  </v-tooltip>
<div>
    \``}};const c=({text:e,location:o})=>`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='${e}' location="${o}">
    <v-icon slot='icon' name='checkmark'></v-icon>
    <v-icon name='trash'></v-icon'>
  </v-tooltip>
<div>
    `;c.storyName="Icon";c.args={text:"Revoke",location:"top"};c.parameters={storySource:{source:`({
  text,
  location
}) => \`
<div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
  <v-tooltip text='\${text}' location="\${location}">
    <v-icon slot='icon' name='checkmark'></v-icon>
    <v-icon name='trash'></v-icon'>
  </v-tooltip>
<div>
    \``}};const s={title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},tags:["stories-mdx"],includeStories:["tooltip","withHtmlContent","icon"]};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:v};const k=["tooltip","withHtmlContent","icon"];export{k as __namedExportsOrder,s as default,c as icon,a as tooltip,p as withHtmlContent};
//# sourceMappingURL=tooltip.stories-417577dd.js.map
