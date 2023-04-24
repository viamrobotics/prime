import{M as x,C as s,S as h}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-cb192941.js";import{u as w}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function b(e={}){const{wrapper:o}=Object.assign({},w(),e.components);return o?t.jsx(o,{...e,children:t.jsx(n,{})}):n();function n(){const l=Object.assign({h1:"h1",p:"p"},w(),e.components);return t.jsxs(t.Fragment,{children:[t.jsx(x,{title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}}}),`
`,t.jsx(l.h1,{id:"dropdown",children:"Dropdown"}),`
`,t.jsx(l.p,{children:"Gives target element the ability to open a dropdown below itself"}),`
`,t.jsx(s,{children:t.jsx(h,{name:"Dropdown with text content",args:{match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"},children:({content:a,match:d,open:p,controlled:m,target:v})=>`
<div style="padding: 50px 0px">
  <v-dropdown ${d?"match":""} ${p?"open":""}>
    <v-button label="${v}" slot="target"></v-button>
    <div 
      slot="content"
      style="background-color: black; color: white; padding: 10px;"
    >
      ${a}
    </div>
  </v-dropdown>
</div>
    `})}),`
`,t.jsx(s,{children:t.jsx(h,{name:"Dropdown with HTML content",args:{match:!1,content:"This is the dropdown content",open:!1},children:({content:a,match:d,open:p})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${d?"match":""} ${p?"open":""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            ${a}
          </div>
        </v-dropdown>
      </div>
    `})})]})}}const c=({content:e,match:o,open:n,controlled:l,target:a})=>`
<div style="padding: 50px 0px">
  <v-dropdown ${o?"match":""} ${n?"open":""}>
    <v-button label="${a}" slot="target"></v-button>
    <div 
      slot="content"
      style="background-color: black; color: white; padding: 10px;"
    >
      ${e}
    </div>
  </v-dropdown>
</div>
    `;c.storyName="Dropdown with text content";c.args={match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"};c.parameters={storySource:{source:`({
  content,
  match,
  open,
  controlled,
  target
}) => \`
<div style="padding: 50px 0px">
  <v-dropdown \${match ? "match" : ""} \${open ? "open" : ""}>
    <v-button label="\${target}" slot="target"></v-button>
    <div 
      slot="content"
      style="background-color: black; color: white; padding: 10px;"
    >
      \${content}
    </div>
  </v-dropdown>
</div>
    \``}};const i=({content:e,match:o,open:n})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${o?"match":""} ${n?"open":""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            ${e}
          </div>
        </v-dropdown>
      </div>
    `;i.storyName="Dropdown with HTML content";i.args={match:!1,content:"This is the dropdown content",open:!1};i.parameters={storySource:{source:`({
  content,
  match,
  open
}) => \`
      <div style="padding: 50px 0px">
        <v-dropdown \${match ? "match" : ""} \${open ? "open" : ""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            \${content}
          </div>
        </v-dropdown>
      </div>
    \``}};const r={title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},tags:["stories-mdx"],includeStories:["dropdownWithTextContent","dropdownWithHtmlContent"]};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:b};const E=["dropdownWithTextContent","dropdownWithHtmlContent"];export{E as __namedExportsOrder,r as default,i as dropdownWithHtmlContent,c as dropdownWithTextContent};
//# sourceMappingURL=dropdown.stories-e7611585.js.map
