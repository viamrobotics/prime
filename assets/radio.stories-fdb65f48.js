import{M as O,C as p,S as r}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as h}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function f(e={}){const{wrapper:o}=Object.assign({},h(),e.components);return o?t.exports.jsx(o,{...e,children:t.exports.jsx(s,{})}):s();function s(){const l=Object.assign({h1:"h1",p:"p"},h(),e.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(O,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position for the optional label",table:{defaultValue:{summary:"top"}},control:{type:"radio"},options:["top","left"],type:"text"},tooltip:{description:"An optional tooltip",table:{defaultValue:{summary:""}}},state:{description:"The state for the optional tooltip (determines the icon type)",table:{defaultValue:{summary:"info"}},control:{type:"radio"},options:["info","warn","error"],type:"text"},"on:input":{description:"Event fired when an option is selected"}}}),`
`,t.exports.jsx(l.h1,{children:"Radio"}),`
`,t.exports.jsx(l.p,{children:"For user triggered actions"}),`
`,t.exports.jsx(p,{children:t.exports.jsx(r,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},children:({options:i,selected:n})=>`
      <v-radio
        options="${i}"
        selected="${n}"
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(r,{name:"With label",args:{label:"These are your options",labelposition:"top",options:"Opt 1, Opt 2",selected:"Opt 1"},children:({options:i,selected:n,label:a,labelposition:c})=>`
      <v-radio
        label='${a}'
        labelposition='${c}'
        options='${i}'
        selected='${n}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(r,{name:"Tooltip and state",args:{label:"Your options",labelposition:"top",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:i,labelposition:n,options:a,selected:c,placeholder:g,tooltip:$,state:x})=>`
      <v-radio
        label='${i}'
        labelposition='${n}'
        selected='${c}'
        options='${a}'
        tooltip='${$}'
        state='${x}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(r,{name:"Readonly",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1",readonly:"true"},children:({options:i,selected:n,readonly:a})=>`
      <v-radio
        options='${i}'
        selected='${n}'
        readonly='${a}'
      />
    `})})]})}}const m=({options:e,selected:o})=>`
      <v-radio
        options="${e}"
        selected="${o}"
      />
    `;m.storyName="Radio";m.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"};m.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const u=({options:e,selected:o,label:s,labelposition:l})=>`
      <v-radio
        label='${s}'
        labelposition='${l}'
        options='${e}'
        selected='${o}'
      />
    `;u.storyName="With label";u.args={label:"These are your options",labelposition:"top",options:"Opt 1, Opt 2",selected:"Opt 1"};u.parameters={storySource:{source:`({
  options,
  selected,
  label,
  labelposition
}) => \`
      <v-radio
        label='\${label}'
        labelposition='\${labelposition}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const b=({label:e,labelposition:o,options:s,selected:l,placeholder:i,tooltip:n,state:a})=>`
      <v-radio
        label='${e}'
        labelposition='${o}'
        selected='${l}'
        options='${s}'
        tooltip='${n}'
        state='${a}'
      />
    `;b.storyName="Tooltip and state";b.args={label:"Your options",labelposition:"top",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"};b.parameters={storySource:{source:`({
  label,
  labelposition,
  options,
  selected,
  placeholder,
  tooltip,
  state
}) => \`
      <v-radio
        label='\${label}'
        labelposition='\${labelposition}'
        selected='\${selected}'
        options='\${options}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const y=({options:e,selected:o,readonly:s})=>`
      <v-radio
        options='${e}'
        selected='${o}'
        readonly='${s}'
      />
    `;y.storyName="Readonly";y.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1",readonly:"true"};y.parameters={storySource:{source:`({
  options,
  selected,
  readonly
}) => \`
      <v-radio
        options='\${options}'
        selected='\${selected}'
        readonly='\${readonly}'
      />
    \``}};const d={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position for the optional label",table:{defaultValue:{summary:"top"}},control:{type:"radio"},options:["top","left"],type:"text"},tooltip:{description:"An optional tooltip",table:{defaultValue:{summary:""}}},state:{description:"The state for the optional tooltip (determines the icon type)",table:{defaultValue:{summary:"info"}},control:{type:"radio"},options:["info","warn","error"],type:"text"},"on:input":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["radio","withLabel","tooltipAndState","readonly"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:f};const q=["radio","withLabel","tooltipAndState","readonly"];export{q as __namedExportsOrder,d as default,m as radio,y as readonly,b as tooltipAndState,u as withLabel};
//# sourceMappingURL=radio.stories-fdb65f48.js.map
