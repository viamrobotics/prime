import{M as y,C as u,S as b}from"./chunk-PCJTTTQV-f45470c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as l}from"./jsx-runtime-0360cb47.js";import{u as $}from"./index-8ca1bc58.js";import"./iframe-15c5bc93.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function v(a={}){const{wrapper:s}=Object.assign({},$(),a.components);return s?l.jsx(s,{...a,children:l.jsx(r,{})}):r();function r(){const n=Object.assign({h1:"h1"},$(),a.components);return l.jsxs(l.Fragment,{children:[l.jsx(y,{title:"Elements/ListBox",parameters:{actions:{handles:["option-click","move"]}},argTypes:{left:{description:"The options appearing in the left",table:{defaultValue:{summary:""}}},right:{description:"The options appearing in the right",table:{defaultValue:{summary:""}}},leftlabel:{description:"The label appearing above the left box",table:{defaultValue:{summary:""}}},rightlabel:{description:"The label appearing above the right box",table:{defaultValue:{summary:""}}},disabled:{description:"Disables all buttons and click functionalities",table:{defaultValue:{summary:!1}},control:{type:"boolean"}},height:{description:"Height of component",table:{defaultValue:{summary:"200px"}}},suffix:{description:"Display suffix values. Assumes suffix portion is space-separated from intended value",table:{defaultValue:{summary:!1}},control:{type:"boolean"}},"on:option-click":{description:"Event fired whenever any option is clicked"},"on:move":{description:"Event fired whenever data is moved from one side to the other"}}}),`
`,l.jsx(n.h1,{id:"listbox",children:"ListBox"}),`
`,l.jsx(u,{children:l.jsx(b,{name:"Default",args:{left:"Charmander,Pikachu,Venusaur",right:"Nidoqueen,Butterfree,Ditto,Gyardos,Machamp",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!1},children:({left:e,right:t,leftlabel:i,rightlabel:o,disabled:f,height:h,suffix:d})=>`
<v-list-box
  left="${e}"
  right="${t}"
  leftlabel="${i}"
  rightlabel="${o}"
  disabled="${f}"
  height="${h}"
  suffix="${d}"
/>
    `})}),`
`,l.jsx(u,{children:l.jsx(b,{name:"Disabled",args:{left:"Charmander,Pikachu,Venusaur",right:"Nidoqueen,Butterfree,Ditto,Gyardos,Machamp",leftlabel:"Team",rightlabel:"Box 1",disabled:!0,height:"200px",suffix:!1},children:({left:e,right:t,leftlabel:i,rightlabel:o,disabled:f,height:h,suffix:d})=>`
<v-list-box
  left="${e}"
  right="${t}"
  leftlabel="${i}"
  rightlabel="${o}"
  disabled="${f}"
  height="${h}"
  suffix="${d}"
/>
    `})}),`
`,l.jsx(u,{children:l.jsx(b,{name:"Empty state",args:{left:"",right:"",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!1},children:({left:e,right:t,leftlabel:i,rightlabel:o,disabled:f,height:h,suffix:d})=>`
<v-list-box
  left="${e}"
  right="${t}"
  leftlabel="${i}"
  rightlabel="${o}"
  disabled="${f}"
  height="${h}"
  suffix="${d}"
>
  <div slot="left-empty">Left empty state</div>
  <div slot="right-empty">Right empty state</div>
</v-list-box>
    `})}),`
`,l.jsx(u,{children:l.jsx(b,{name:"With suffix",args:{left:"Charmander Fire,Pikachu Electric,Venusaur Grass",right:"Nidoqueen Poison,Butterfree Poison/Bug,Ditto Normal,Gyardos Water/Dragon,Machamp Fighting",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!0},children:({left:e,right:t,leftlabel:i,rightlabel:o,disabled:f,height:h,suffix:d})=>`
<v-list-box
  left="${e}"
  right="${t}"
  leftlabel="${i}"
  rightlabel="${o}"
  disabled="${f}"
  height="${h}"
  suffix="${d}"
/>
    `})})]})}}const m=({left:a,right:s,leftlabel:r,rightlabel:n,disabled:e,height:t,suffix:i})=>`
<v-list-box
  left="${a}"
  right="${s}"
  leftlabel="${r}"
  rightlabel="${n}"
  disabled="${e}"
  height="${t}"
  suffix="${i}"
/>
    `;m.storyName="Default";m.args={left:"Charmander,Pikachu,Venusaur",right:"Nidoqueen,Butterfree,Ditto,Gyardos,Machamp",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!1};m.parameters={storySource:{source:`({
  left,
  right,
  leftlabel,
  rightlabel,
  disabled,
  height,
  suffix
}) => \`
<v-list-box
  left="\${left}"
  right="\${right}"
  leftlabel="\${leftlabel}"
  rightlabel="\${rightlabel}"
  disabled="\${disabled}"
  height="\${height}"
  suffix="\${suffix}"
/>
    \``}};const p=({left:a,right:s,leftlabel:r,rightlabel:n,disabled:e,height:t,suffix:i})=>`
<v-list-box
  left="${a}"
  right="${s}"
  leftlabel="${r}"
  rightlabel="${n}"
  disabled="${e}"
  height="${t}"
  suffix="${i}"
/>
    `;p.storyName="Disabled";p.args={left:"Charmander,Pikachu,Venusaur",right:"Nidoqueen,Butterfree,Ditto,Gyardos,Machamp",leftlabel:"Team",rightlabel:"Box 1",disabled:!0,height:"200px",suffix:!1};p.parameters={storySource:{source:`({
  left,
  right,
  leftlabel,
  rightlabel,
  disabled,
  height,
  suffix
}) => \`
<v-list-box
  left="\${left}"
  right="\${right}"
  leftlabel="\${leftlabel}"
  rightlabel="\${rightlabel}"
  disabled="\${disabled}"
  height="\${height}"
  suffix="\${suffix}"
/>
    \``}};const c=({left:a,right:s,leftlabel:r,rightlabel:n,disabled:e,height:t,suffix:i})=>`
<v-list-box
  left="${a}"
  right="${s}"
  leftlabel="${r}"
  rightlabel="${n}"
  disabled="${e}"
  height="${t}"
  suffix="${i}"
>
  <div slot="left-empty">Left empty state</div>
  <div slot="right-empty">Right empty state</div>
</v-list-box>
    `;c.storyName="Empty state";c.args={left:"",right:"",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!1};c.parameters={storySource:{source:`({
  left,
  right,
  leftlabel,
  rightlabel,
  disabled,
  height,
  suffix
}) => \`
<v-list-box
  left="\${left}"
  right="\${right}"
  leftlabel="\${leftlabel}"
  rightlabel="\${rightlabel}"
  disabled="\${disabled}"
  height="\${height}"
  suffix="\${suffix}"
>
  <div slot="left-empty">Left empty state</div>
  <div slot="right-empty">Right empty state</div>
</v-list-box>
    \``}};const x=({left:a,right:s,leftlabel:r,rightlabel:n,disabled:e,height:t,suffix:i})=>`
<v-list-box
  left="${a}"
  right="${s}"
  leftlabel="${r}"
  rightlabel="${n}"
  disabled="${e}"
  height="${t}"
  suffix="${i}"
/>
    `;x.storyName="With suffix";x.args={left:"Charmander Fire,Pikachu Electric,Venusaur Grass",right:"Nidoqueen Poison,Butterfree Poison/Bug,Ditto Normal,Gyardos Water/Dragon,Machamp Fighting",leftlabel:"Team",rightlabel:"Box 1",disabled:!1,height:"200px",suffix:!0};x.parameters={storySource:{source:`({
  left,
  right,
  leftlabel,
  rightlabel,
  disabled,
  height,
  suffix
}) => \`
<v-list-box
  left="\${left}"
  right="\${right}"
  leftlabel="\${leftlabel}"
  rightlabel="\${rightlabel}"
  disabled="\${disabled}"
  height="\${height}"
  suffix="\${suffix}"
/>
    \``}};const g={title:"Elements/ListBox",parameters:{actions:{handles:["option-click","move"]}},argTypes:{left:{description:"The options appearing in the left",table:{defaultValue:{summary:""}}},right:{description:"The options appearing in the right",table:{defaultValue:{summary:""}}},leftlabel:{description:"The label appearing above the left box",table:{defaultValue:{summary:""}}},rightlabel:{description:"The label appearing above the right box",table:{defaultValue:{summary:""}}},disabled:{description:"Disables all buttons and click functionalities",table:{defaultValue:{summary:!1}},control:{type:"boolean"}},height:{description:"Height of component",table:{defaultValue:{summary:"200px"}}},suffix:{description:"Display suffix values. Assumes suffix portion is space-separated from intended value",table:{defaultValue:{summary:!1}},control:{type:"boolean"}},"on:option-click":{description:"Event fired whenever any option is clicked"},"on:move":{description:"Event fired whenever data is moved from one side to the other"}},tags:["stories-mdx"],includeStories:["defaultStory","disabled","emptyState","withSuffix"]};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:v};const P=["defaultStory","disabled","emptyState","withSuffix"];export{P as __namedExportsOrder,g as default,m as defaultStory,p as disabled,c as emptyState,x as withSuffix};
//# sourceMappingURL=list-box.stories-1486396a.js.map
