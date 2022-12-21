import{M as $,C as l,S as d}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as b}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function O(e={}){const{wrapper:o}=Object.assign({},b(),e.components);return o?t.exports.jsx(o,{...e,children:t.exports.jsx(i,{})}):i();function i(){const r=Object.assign({h1:"h1",p:"p"},b(),e.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx($,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}}}),`
`,t.exports.jsx(r.h1,{children:"Radio"}),`
`,t.exports.jsx(r.p,{children:"For user triggered actions"}),`
`,t.exports.jsx(l,{children:t.exports.jsx(d,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},children:({options:s,selected:n})=>`
      <v-radio
        options="${s}"
        selected="${n}"
      />
    `})}),`
`,t.exports.jsx(l,{children:t.exports.jsx(d,{name:"With label",args:{label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"},children:({options:s,selected:n,label:p})=>`
      <v-radio
        label='${p}'
        options='${s}'
        selected='${n}'
      />
    `})}),`
`,t.exports.jsx(l,{children:t.exports.jsx(d,{name:"Tooltip and state",args:{label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:s,options:n,selected:p,placeholder:y,tooltip:h,state:x})=>`
      <v-radio
        label='${s}'
        selected='${p}'
        options='${n}'
        tooltip='${h}'
        state='${x}'
      />
    `})})]})}}const c=({options:e,selected:o})=>`
      <v-radio
        options="${e}"
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
    \``}};const m=({options:e,selected:o,label:i})=>`
      <v-radio
        label='${i}'
        options='${e}'
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
    \``}};const u=({label:e,options:o,selected:i,placeholder:r,tooltip:s,state:n})=>`
      <v-radio
        label='${e}'
        selected='${i}'
        options='${o}'
        tooltip='${s}'
        state='${n}'
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
    \``}};const a={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["radio","withLabel","tooltipAndState"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:O};const Y=["radio","withLabel","tooltipAndState"];export{Y as __namedExportsOrder,a as default,c as radio,u as tooltipAndState,m as withLabel};
//# sourceMappingURL=radio.stories-34a77ba4.js.map
