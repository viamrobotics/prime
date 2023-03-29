import{M as W,C as p,S as c}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as P}from"./gpio-options-163ec0e5.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as N}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function E(o={}){const{wrapper:l}=Object.assign({},N(),o.components);return l?t.exports.jsx(l,{...o,children:t.exports.jsx(n,{})}):n();function n(){const i=Object.assign({h1:"h1",p:"p"},N(),o.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(W,{title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}}}),`
`,t.exports.jsx(i.h1,{children:"Multi-Select"}),`
`,t.exports.jsx(i.p,{children:"Dropdown that allows the user to select multiple choices."}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Default",args:{label:"Default Multi-select",options:"happy, sad, angry"},children:({label:e,options:a})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"With Value and Placeholder",args:{label:"With Value and Placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."},children:({label:e,options:a,value:s,placeholder:r})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        value='${s}'
        placeholder='${r}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:e,options:a,withbutton:s,buttontext:r,buttonicon:u})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        withbutton='${s}'
        buttontext='${r}'
        buttonicon='${u}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"With Heading",args:{label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"},children:({label:e,options:a,heading:s})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        heading='${s}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"},children:({label:e,options:a,disabled:s,tooltip:r,state:u})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        disabled='${s}'
        tooltip='${r}'
        state='${u}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Readonly",args:{label:"Your options",options:"Option 1, Option 2, Option 3",readonly:"true",value:"Option 1, Option 2"},children:({label:e,options:a,readonly:s,value:r})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        readonly='${s}'
        value='${r}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"With Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:e,options:a,value:s,tooltip:r,state:u})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        value='${s}'
        tooltip='${r}'
        state='${u}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"With prefix",args:{label:"Options With Prefixes",options:P,placeholder:"Select...",prefix:"true"},children:({label:e,options:a,placeholder:s,prefix:r})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        placeholder='${s}'
        prefix='${r}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Hide Pills",args:{label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"},children:({label:e,options:a,value:s,showpill:r})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        value='${s}'
        showpill='${r}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Reduce Search",args:{label:"Reduce Search",options:"hello, hi, yo, halo",sortoption:"reduce"},children:({label:e,options:a,sortoption:s})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        sortoption='${s}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Do Not Search",args:{label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"},children:({label:e,options:a,sortoption:s})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        sortoption='${s}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Not Clearable",args:{label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"},children:({label:e,options:a,clearable:s,value:r})=>`
      <v-multiselect
        label='${e}'
        options='${a}'
        clearable='${s}'
        value='${r}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Error",args:{label:"Board",value:"",state:"error",options:"hello, hi, yo, halo",message:"Something went wrong."},children:({label:e,tooltip:a,value:s,options:r,state:u,message:T})=>`
      <v-multiselect
        label='${e}'
        options='${r}'
        value='${s}'
        state='${u}'
        message='${T}'
      />
    `})}),`
`,t.exports.jsx(p,{children:t.exports.jsx(c,{name:"Warning",args:{label:"Board",value:"",state:"warn",options:"hello, hi, yo, halo",tooltip:"Uh oh"},children:({label:e,options:a,value:s,state:r,tooltip:u})=>`
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
    `;h.storyName="Default";h.args={label:"Default Multi-select",options:"happy, sad, angry"};h.parameters={storySource:{source:`({
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
    `;m.storyName="With Value and Placeholder";m.args={label:"With Value and Placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."};m.parameters={storySource:{source:`({
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
    `;b.storyName="With Button";b.args={label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};b.parameters={storySource:{source:`({
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
    `;$.storyName="With Heading";$.args={label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"};$.parameters={storySource:{source:`({
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
    \``}};const x=({label:o,options:l,value:n,tooltip:i,state:e})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        value='${n}'
        tooltip='${i}'
        state='${e}'
      />
    `;x.storyName="With Tooltip";x.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"};x.parameters={storySource:{source:`({
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
    \``}};const g=({label:o,options:l,placeholder:n,prefix:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        placeholder='${n}'
        prefix='${i}'
      />
    `;g.storyName="With prefix";g.args={label:"Options With Prefixes",options:P,placeholder:"Select...",prefix:"true"};g.parameters={storySource:{source:`({
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
    \``}};const f=({label:o,options:l,value:n,showpill:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        value='${n}'
        showpill='${i}'
      />
    `;f.storyName="Hide Pills";f.args={label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"};f.parameters={storySource:{source:`({
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
    `;w.storyName="Reduce Search";w.args={label:"Reduce Search",options:"hello, hi, yo, halo",sortoption:"reduce"};w.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        sortoption='\${sortoption}'
      />
    \``}};const S=({label:o,options:l,sortoption:n})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        sortoption='${n}'
      />
    `;S.storyName="Do Not Search";S.args={label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"};S.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        sortoption='\${sortoption}'
      />
    \``}};const O=({label:o,options:l,clearable:n,value:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        clearable='${n}'
        value='${i}'
      />
    `;O.storyName="Not Clearable";O.args={label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"};O.parameters={storySource:{source:`({
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
    \``}};const j=({label:o,tooltip:l,value:n,options:i,state:e,message:a})=>`
      <v-multiselect
        label='${o}'
        options='${i}'
        value='${n}'
        state='${e}'
        message='${a}'
      />
    `;j.storyName="Error";j.args={label:"Board",value:"",state:"error",options:"hello, hi, yo, halo",message:"Something went wrong."};j.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}},tags:["mdx"],includeStories:["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable","error","warning"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:E};const Z=["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable","error","warning"];export{Z as __namedExportsOrder,d as default,h as defaultStory,y as disabled,S as doNotSearch,j as error,f as hidePills,O as notClearable,v as readonly,w as reduceSearch,V as warning,b as withButton,$ as withHeading,g as withPrefix,x as withTooltip,m as withValueAndPlaceholder};
//# sourceMappingURL=multiselect.stories-8d7a3f41.js.map
