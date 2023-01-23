import{M as P,C as p,S as c}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as V}from"./gpio-options-163ec0e5.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as j}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function T(o={}){const{wrapper:l}=Object.assign({},j(),o.components);return l?e.exports.jsx(l,{...o,children:e.exports.jsx(n,{})}):n();function n(){const i=Object.assign({h1:"h1",p:"p"},j(),o.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(P,{title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}}}),`
`,e.exports.jsx(i.h1,{children:"Multi-Select"}),`
`,e.exports.jsx(i.p,{children:"Dropdown that allows the user to select multiple choices."}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Default",args:{label:"Default Multi-select",options:"happy, sad, angry"},children:({label:t,options:a})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"With Value and Placeholder",args:{label:"With Value and Placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."},children:({label:t,options:a,value:s,placeholder:r})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        value='${s}'
        placeholder='${r}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:t,options:a,withbutton:s,buttontext:r,buttonicon:u})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        withbutton='${s}'
        buttontext='${r}'
        buttonicon='${u}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"With Heading",args:{label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"},children:({label:t,options:a,heading:s})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        heading='${s}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"},children:({label:t,options:a,disabled:s,tooltip:r,state:u})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        disabled='${s}'
        tooltip='${r}'
        state='${u}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Readonly",args:{label:"Your options",options:"Option 1, Option 2, Option 3",readonly:"true",value:"Option 1, Option 2"},children:({label:t,options:a,readonly:s,value:r})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        readonly='${s}'
        value='${r}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"With Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:t,options:a,value:s,tooltip:r,state:u})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        value='${s}'
        tooltip='${r}'
        state='${u}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"With prefix",args:{label:"Options With Prefixes",options:V,placeholder:"Select...",prefix:"true"},children:({label:t,options:a,placeholder:s,prefix:r})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        placeholder='${s}'
        prefix='${r}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Hide Pills",args:{label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"},children:({label:t,options:a,value:s,showpill:r})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        value='${s}'
        showpill='${r}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Reduce Search",args:{label:"Reduce Search",options:"hello, hi, yo, halo",sortoption:"reduce"},children:({label:t,options:a,sortoption:s})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        sortoption='${s}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Do Not Search",args:{label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"},children:({label:t,options:a,sortoption:s})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        sortoption='${s}'
      />
    `})}),`
`,e.exports.jsx(p,{children:e.exports.jsx(c,{name:"Not Clearable",args:{label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"},children:({label:t,options:a,clearable:s,value:r})=>`
      <v-multiselect
        label='${t}'
        options='${a}'
        clearable='${s}'
        value='${r}'
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
    \``}};const b=({label:o,options:l,withbutton:n,buttontext:i,buttonicon:t})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        withbutton='${n}'
        buttontext='${i}'
        buttonicon='${t}'
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
    \``}};const y=({label:o,options:l,heading:n})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        heading='${n}'
      />
    `;y.storyName="With Heading";y.args={label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"};y.parameters={storySource:{source:`({
  label,
  options,
  heading
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        heading='\${heading}'
      />
    \``}};const $=({label:o,options:l,disabled:n,tooltip:i,state:t})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        disabled='${n}'
        tooltip='${i}'
        state='${t}'
      />
    `;$.storyName="Disabled";$.args={label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"};$.parameters={storySource:{source:`({
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
    \``}};const x=({label:o,options:l,readonly:n,value:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        readonly='${n}'
        value='${i}'
      />
    `;x.storyName="Readonly";x.args={label:"Your options",options:"Option 1, Option 2, Option 3",readonly:"true",value:"Option 1, Option 2"};x.parameters={storySource:{source:`({
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
    \``}};const v=({label:o,options:l,value:n,tooltip:i,state:t})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        value='${n}'
        tooltip='${i}'
        state='${t}'
      />
    `;v.storyName="With Tooltip";v.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"};v.parameters={storySource:{source:`({
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
    `;f.storyName="With prefix";f.args={label:"Options With Prefixes",options:V,placeholder:"Select...",prefix:"true"};f.parameters={storySource:{source:`({
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
    \``}};const g=({label:o,options:l,value:n,showpill:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        value='${n}'
        showpill='${i}'
      />
    `;g.storyName="Hide Pills";g.args={label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"};g.parameters={storySource:{source:`({
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
    \``}};const O=({label:o,options:l,sortoption:n})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        sortoption='${n}'
      />
    `;O.storyName="Do Not Search";O.args={label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"};O.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        sortoption='\${sortoption}'
      />
    \``}};const S=({label:o,options:l,clearable:n,value:i})=>`
      <v-multiselect
        label='${o}'
        options='${l}'
        clearable='${n}'
        value='${i}'
      />
    `;S.storyName="Not Clearable";S.args={label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"};S.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}},tags:["mdx"],includeStories:["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable"]};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:T};const G=["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","readonly","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable"];export{G as __namedExportsOrder,d as default,h as defaultStory,$ as disabled,O as doNotSearch,g as hidePills,S as notClearable,x as readonly,w as reduceSearch,b as withButton,y as withHeading,f as withPrefix,v as withTooltip,m as withValueAndPlaceholder};
//# sourceMappingURL=multiselect.stories-bff5a797.js.map
