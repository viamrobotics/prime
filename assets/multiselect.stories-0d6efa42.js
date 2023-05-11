import{M as T,C as p,S as c}from"./chunk-PCJTTTQV-f45470c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as W}from"./gpio-options-163ec0e5.js";import{j as t}from"./jsx-runtime-0360cb47.js";import{u as E}from"./index-8ca1bc58.js";import"./iframe-15c5bc93.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function P(o={}){const{wrapper:l}=Object.assign({},E(),o.components);return l?t.jsx(l,{...o,children:t.jsx(n,{})}):n();function n(){const i=Object.assign({h1:"h1",p:"p"},E(),o.components);return t.jsxs(t.Fragment,{children:[t.jsx(T,{title:"Elements/Select/Multiselect",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}}}),`
`,t.jsx(i.h1,{id:"multi-select",children:"Multi-Select"}),`
`,t.jsx(i.p,{children:"Dropdown that allows the user to select multiple choices."}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Default",args:{label:"Default multiselect",options:"happy, sad, angry"},children:({label:e,options:a})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
      />
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"With value and placeholder",args:{label:"With value and placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."},children:({label:e,options:a,value:s,placeholder:r})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  value='${s}'
  placeholder='${r}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"With button",args:{label:"With button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:e,options:a,withbutton:s,buttontext:r,buttonicon:u})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  withbutton='${s}'
  buttontext='${r}'
  buttonicon='${u}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"With heading",args:{label:"With heading",options:"a1, a2, a3, a4",heading:"A Values"},children:({label:e,options:a,heading:s})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  heading='${s}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"},children:({label:e,options:a,disabled:s,tooltip:r,state:u})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  disabled='${s}'
  tooltip='${r}'
  state='${u}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Readonly",args:{label:"Your options",options:"Option 1, Option 2, Option 3",readonly:"true",value:"Option 1, Option 2"},children:({label:e,options:a,readonly:s,value:r})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  readonly='${s}'
  value='${r}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"With tooltip",args:{label:"With tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:e,options:a,value:s,tooltip:r,state:u})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  value='${s}'
  tooltip='${r}'
  state='${u}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"With prefix",args:{label:"Options with prefixes",options:W,placeholder:"Select...",prefix:"true"},children:({label:e,options:a,placeholder:s,prefix:r})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  placeholder='${s}'
  prefix='${r}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Hide pills",args:{label:"Hide pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"},children:({label:e,options:a,value:s,showpill:r})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  value='${s}'
  showpill='${r}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Reduce search",args:{label:"Reduce search",options:"hello, hi, yo, halo",sortoption:"reduce"},children:({label:e,options:a,sortoption:s})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  sortoption='${s}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Do not search",args:{label:"Do not search",options:"hello, hi, yo, halo",sortoption:"off"},children:({label:e,options:a,sortoption:s})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  sortoption='${s}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Not clearable",args:{label:"Not clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"},children:({label:e,options:a,clearable:s,value:r})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  clearable='${s}'
  value='${r}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Error",args:{label:"Board",value:"",state:"error",options:"hello, hi, yo, halo",message:"Something went wrong."},children:({label:e,tooltip:a,value:s,options:r,state:u,message:N})=>`
<v-multiselect
  label='${e}'
  options='${r}'
  value='${s}'
  state='${u}'
  message='${N}'
/>
    `})}),`
`,t.jsx(p,{children:t.jsx(c,{name:"Warning",args:{label:"Board",value:"",state:"warn",options:"hello, hi, yo, halo",tooltip:"Uh oh"},children:({label:e,options:a,value:s,state:r,tooltip:u})=>`
<v-multiselect
  label='${e}'
  options='${a}'
  value='${s}'
  tooltip='${u}'
  state='${r}'
/>
    `})})]})}}const h=({label:o,options:l})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
      />
    `;h.storyName="Default";h.args={label:"Default multiselect",options:"happy, sad, angry"};h.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
      />
    \``}};const m=({label:o,options:l,value:n,placeholder:i})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  value='${n}'
  placeholder='${i}'
/>
    `;m.storyName="With value and placeholder";m.args={label:"With value and placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
  label,
  options,
  value,
  placeholder
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  value='\${value}'
  placeholder='\${placeholder}'
/>
    \``}};const b=({label:o,options:l,withbutton:n,buttontext:i,buttonicon:e})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  withbutton='${n}'
  buttontext='${i}'
  buttonicon='${e}'
/>
    `;b.storyName="With button";b.args={label:"With button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};b.parameters={storySource:{source:`({
  label,
  options,
  withbutton,
  buttontext,
  buttonicon
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  withbutton='\${withbutton}'
  buttontext='\${buttontext}'
  buttonicon='\${buttonicon}'
/>
    \``}};const $=({label:o,options:l,heading:n})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  heading='${n}'
/>
    `;$.storyName="With heading";$.args={label:"With heading",options:"a1, a2, a3, a4",heading:"A Values"};$.parameters={storySource:{source:`({
  label,
  options,
  heading
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  heading='\${heading}'
/>
    \``}};const y=({label:o,options:l,disabled:n,tooltip:i,state:e})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  disabled='${n}'
  tooltip='${i}'
  state='${e}'
/>
    `;y.storyName="Disabled";y.args={label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"};y.parameters={storySource:{source:`({
  label,
  options,
  disabled,
  tooltip,
  state
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  disabled='\${disabled}'
  tooltip='\${tooltip}'
  state='\${state}'
/>
    \``}};const v=({label:o,options:l,readonly:n,value:i})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  readonly='${n}'
  value='${i}'
/>
    `;v.storyName="Readonly";v.args={label:"Your options",options:"Option 1, Option 2, Option 3",readonly:"true",value:"Option 1, Option 2"};v.parameters={storySource:{source:`({
  label,
  options,
  readonly,
  value
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  readonly='\${readonly}'
  value='\${value}'
/>
    \``}};const g=({label:o,options:l,value:n,tooltip:i,state:e})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  value='${n}'
  tooltip='${i}'
  state='${e}'
/>
    `;g.storyName="With tooltip";g.args={label:"With tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"};g.parameters={storySource:{source:`({
  label,
  options,
  value,
  tooltip,
  state
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  value='\${value}'
  tooltip='\${tooltip}'
  state='\${state}'
/>
    \``}};const f=({label:o,options:l,placeholder:n,prefix:i})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  placeholder='${n}'
  prefix='${i}'
/>
    `;f.storyName="With prefix";f.args={label:"Options with prefixes",options:W,placeholder:"Select...",prefix:"true"};f.parameters={storySource:{source:`({
  label,
  options,
  placeholder,
  prefix
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  placeholder='\${placeholder}'
  prefix='\${prefix}'
/>
    \``}};const x=({label:o,options:l,value:n,showpill:i})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  value='${n}'
  showpill='${i}'
/>
    `;x.storyName="Hide pills";x.args={label:"Hide pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"};x.parameters={storySource:{source:`({
  label,
  options,
  value,
  showpill
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  value='\${value}'
  showpill='\${showpill}'
/>
    \``}};const w=({label:o,options:l,sortoption:n})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  sortoption='${n}'
/>
    `;w.storyName="Reduce search";w.args={label:"Reduce search",options:"hello, hi, yo, halo",sortoption:"reduce"};w.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  sortoption='\${sortoption}'
/>
    \``}};const O=({label:o,options:l,sortoption:n})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  sortoption='${n}'
/>
    `;O.storyName="Do not search";O.args={label:"Do not search",options:"hello, hi, yo, halo",sortoption:"off"};O.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  sortoption='\${sortoption}'
/>
    \``}};const j=({label:o,options:l,clearable:n,value:i})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  clearable='${n}'
  value='${i}'
/>
    `;j.storyName="Not clearable";j.args={label:"Not clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"};j.parameters={storySource:{source:`({
  label,
  options,
  clearable,
  value
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  clearable='\${clearable}'
  value='\${value}'
/>
    \``}};const S=({label:o,tooltip:l,value:n,options:i,state:e,message:a})=>`
<v-multiselect
  label='${o}'
  options='${i}'
  value='${n}'
  state='${e}'
  message='${a}'
/>
    `;S.storyName="Error";S.args={label:"Board",value:"",state:"error",options:"hello, hi, yo, halo",message:"Something went wrong."};S.parameters={storySource:{source:`({
  label,
  tooltip,
  value,
  options,
  state,
  message
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  value='\${value}'
  state='\${state}'
  message='\${message}'
/>
    \``}};const V=({label:o,options:l,value:n,state:i,tooltip:e})=>`
<v-multiselect
  label='${o}'
  options='${l}'
  value='${n}'
  tooltip='${e}'
  state='${i}'
/>
    `;V.storyName="Warning";V.args={label:"Board",value:"",state:"warn",options:"hello, hi, yo, halo",tooltip:"Uh oh"};V.parameters={storySource:{source:`({
  label,
  options,
  value,
  state,
  tooltip
}) => \`
<v-multiselect
  label='\${label}'
  options='\${options}'
  value='\${value}'
  tooltip='\${tooltip}'
  state='\${state}'
/>
    \``}};const d={title:"Elements/Select/Multiselect",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}},tags:["stories-mdx"],includeStories:["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable","error","warning"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:P};const I=["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable","error","warning"];export{I as __namedExportsOrder,d as default,h as defaultStory,y as disabled,O as doNotSearch,S as error,x as hidePills,j as notClearable,v as readonly,w as reduceSearch,V as warning,b as withButton,$ as withHeading,f as withPrefix,g as withTooltip,m as withValueAndPlaceholder};
//# sourceMappingURL=multiselect.stories-0d6efa42.js.map
