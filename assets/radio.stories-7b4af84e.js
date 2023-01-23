import{M as b,C as i,S as p}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as y}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function O(t={}){const{wrapper:o}=Object.assign({},y(),t.components);return o?e.exports.jsx(o,{...t,children:e.exports.jsx(a,{})}):a();function a(){const d=Object.assign({h1:"h1",p:"p"},y(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(b,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}}}),`
`,e.exports.jsx(d.h1,{children:"Radio"}),`
`,e.exports.jsx(d.p,{children:"For user triggered actions"}),`
`,e.exports.jsx(i,{children:e.exports.jsx(p,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},children:({options:n,selected:s})=>`
      <v-radio
        options="${n}"
        selected="${s}"
      />
    `})}),`
`,e.exports.jsx(i,{children:e.exports.jsx(p,{name:"With label",args:{label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"},children:({options:n,selected:s,label:r})=>`
      <v-radio
        label='${r}'
        options='${n}'
        selected='${s}'
      />
    `})}),`
`,e.exports.jsx(i,{children:e.exports.jsx(p,{name:"Tooltip and state",args:{label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:n,options:s,selected:r,placeholder:g,tooltip:h,state:x})=>`
      <v-radio
        label='${n}'
        selected='${r}'
        options='${s}'
        tooltip='${h}'
        state='${x}'
      />
    `})}),`
`,e.exports.jsx(i,{children:e.exports.jsx(p,{name:"Readonly",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1",readonly:"true"},children:({options:n,selected:s,readonly:r})=>`
      <v-radio
        options='${n}'
        selected='${s}'
        readonly='${r}'
      />
    `})})]})}}const c=({options:t,selected:o})=>`
      <v-radio
        options="${t}"
        selected="${o}"
      />
    `;c.storyName="Radio";c.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"};c.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const m=({options:t,selected:o,label:a})=>`
      <v-radio
        label='${a}'
        options='${t}'
        selected='${o}'
      />
    `;m.storyName="With label";m.args={label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"};m.parameters={storySource:{source:`({
  options,
  selected,
  label
}) => \`
      <v-radio
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const u=({label:t,options:o,selected:a,placeholder:d,tooltip:n,state:s})=>`
      <v-radio
        label='${t}'
        selected='${a}'
        options='${o}'
        tooltip='${n}'
        state='${s}'
      />
    `;u.storyName="Tooltip and state";u.args={label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"};u.parameters={storySource:{source:`({
  label,
  options,
  selected,
  placeholder,
  tooltip,
  state
}) => \`
      <v-radio
        label='\${label}'
        selected='\${selected}'
        options='\${options}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const $=({options:t,selected:o,readonly:a})=>`
      <v-radio
        options='${t}'
        selected='${o}'
        readonly='${a}'
      />
    `;$.storyName="Readonly";$.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1",readonly:"true"};$.parameters={storySource:{source:`({
  options,
  selected,
  readonly
}) => \`
      <v-radio
        options='\${options}'
        selected='\${selected}'
        readonly='\${readonly}'
      />
    \``}};const l={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["radio","withLabel","tooltipAndState","readonly"]};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:O};const k=["radio","withLabel","tooltipAndState","readonly"];export{k as __namedExportsOrder,l as default,c as radio,$ as readonly,u as tooltipAndState,m as withLabel};
//# sourceMappingURL=radio.stories-7b4af84e.js.map
