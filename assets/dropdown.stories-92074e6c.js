import{M as m,C as c,S as h}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as w}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function v(o={}){const{wrapper:e}=Object.assign({},w(),o.components);return e?t.exports.jsx(e,{...o,children:t.exports.jsx(n,{})}):n();function n(){const p=Object.assign({h1:"h1",p:"p"},w(),o.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(m,{title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}}}),`
`,t.exports.jsx(p.h1,{children:"Dropdown"}),`
`,t.exports.jsx(p.p,{children:"Gives target element the ability to open a dropdown below itself"}),`
`,t.exports.jsx(c,{children:t.exports.jsx(h,{name:"Dropdown with text content",args:{match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"},children:({content:r,match:l,open:d,controlled:b,target:x})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${l?"match":""} ${d?"open":""}>
          <v-button label="${x}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${r}
          </div>
        </v-dropdown>
      </div>
    `})}),`
`,t.exports.jsx(c,{children:t.exports.jsx(h,{name:"Dropdown with HTML content",args:{match:!1,content:"This is the dropdown content",open:!1},children:({content:r,match:l,open:d})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${l?"match":""} ${d?"open":""}>
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
            ${r}
          </div>
        </v-dropdown>
      </div>
    `})})]})}}const s=({content:o,match:e,open:n,controlled:p,target:r})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${e?"match":""} ${n?"open":""}>
          <v-button label="${r}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${o}
          </div>
        </v-dropdown>
      </div>
    `;s.storyName="Dropdown with text content";s.args={match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"};s.parameters={storySource:{source:`({
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
    \``}};const i=({content:o,match:e,open:n})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${e?"match":""} ${n?"open":""}>
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
            ${o}
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
    \``}};const a={title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},tags:["mdx"],includeStories:["dropdownWithTextContent","dropdownWithHtmlContent"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:v};const F=["dropdownWithTextContent","dropdownWithHtmlContent"];export{F as __namedExportsOrder,a as default,i as dropdownWithHtmlContent,s as dropdownWithTextContent};
//# sourceMappingURL=dropdown.stories-92074e6c.js.map
