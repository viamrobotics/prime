import{M as f,C as p,S as r}from"./chunk-PCJTTTQV-8bd841a0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-16962e30.js";import{u as h}from"./index-d35af5a3.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function x(e={}){const{wrapper:o}=Object.assign({},h(),e.components);return o?t.jsx(o,{...e,children:t.jsx(i,{})}):i();function i(){const l=Object.assign({h1:"h1",p:"p"},h(),e.components);return t.jsxs(t.Fragment,{children:[t.jsx(f,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position for the optional label",table:{defaultValue:{summary:"top"}},control:{type:"radio"},options:["top","left"],type:"text"},tooltip:{description:"An optional tooltip",table:{defaultValue:{summary:""}}},state:{description:"The state for the optional tooltip (determines the icon type)",table:{defaultValue:{summary:"info"}},control:{type:"radio"},options:["info","warn","error"],type:"text"},"on:input":{description:"Event fired when an option is selected"}}}),`
`,t.jsx(l.h1,{id:"radio",children:"Radio"}),`
`,t.jsx(l.p,{children:"For user triggered actions"}),`
`,t.jsx(p,{children:t.jsx(r,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},children:({options:s,selected:n})=>`
<v-radio
  options="${s}"
  selected="${n}"
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(r,{name:"With label",args:{label:"These are your options",labelposition:"top",options:"Opt 1, Opt 2",selected:"Opt 1"},children:({options:s,selected:n,label:a,labelposition:c})=>`
      <v-radio
        label='${a}'
        labelposition='${c}'
        options='${s}'
        selected='${n}'
      />
    `})}),`
`,t.jsx(p,{children:t.jsx(r,{name:"Tooltip and state",args:{label:"Your options",labelposition:"top",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:s,labelposition:n,options:a,selected:c,placeholder:g,tooltip:$,state:O})=>`
<v-radio
  label='${s}'
  labelposition='${n}'
  selected='${c}'
  options='${a}'
  tooltip='${$}'
  state='${O}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(r,{name:"Readonly",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1",readonly:"true"},children:({options:s,selected:n,readonly:a})=>`
<v-radio
  options='${s}'
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
    \``}};const u=({options:e,selected:o,label:i,labelposition:l})=>`
      <v-radio
        label='${i}'
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
    \``}};const b=({label:e,labelposition:o,options:i,selected:l,placeholder:s,tooltip:n,state:a})=>`
<v-radio
  label='${e}'
  labelposition='${o}'
  selected='${l}'
  options='${i}'
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
    \``}};const y=({options:e,selected:o,readonly:i})=>`
<v-radio
  options='${e}'
  selected='${o}'
  readonly='${i}'
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
    \``}};const d={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},labelposition:{description:"The position for the optional label",table:{defaultValue:{summary:"top"}},control:{type:"radio"},options:["top","left"],type:"text"},tooltip:{description:"An optional tooltip",table:{defaultValue:{summary:""}}},state:{description:"The state for the optional tooltip (determines the icon type)",table:{defaultValue:{summary:"info"}},control:{type:"radio"},options:["info","warn","error"],type:"text"},"on:input":{description:"Event fired when an option is selected"}},tags:["stories-mdx"],includeStories:["radio","withLabel","tooltipAndState","readonly"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:x};const L=["radio","withLabel","tooltipAndState","readonly"];export{L as __namedExportsOrder,d as default,m as radio,y as readonly,b as tooltipAndState,u as withLabel};
//# sourceMappingURL=radio.stories-60aaad4a.js.map
