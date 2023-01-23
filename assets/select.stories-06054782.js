import{M as S,C as r,S as p}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as w}from"./gpio-options-163ec0e5.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as O}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function j(e={}){const{wrapper:o}=Object.assign({},O(),e.components);return o?t.exports.jsx(o,{...e,children:t.exports.jsx(l,{})}):l();function l(){const i=Object.assign({h1:"h1",p:"p"},O(),e.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(S,{title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}}}),`
`,t.exports.jsx(i.h1,{children:"Select"}),`
`,t.exports.jsx(i.p,{children:"For a dropdown that allows the user to select a single option"}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Default Select",args:{label:"Default Select",options:"option 1, option 2, option 3"},children:({label:n,options:a})=>`
      <v-select
        label='${n}'
        options='${a}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Select with Placeholder",args:{label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},children:({label:n,options:a,placeholder:s})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${s}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"With Value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"},children:({label:n,options:a,value:s})=>`
      <v-select
        label='${n}'
        options='${a}'
        value='${s}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:n,options:a,withbutton:s,buttontext:c,buttonicon:g})=>`
      <v-select
        label='${n}'
        options='${a}'
        withbutton='${s}'
        buttontext='${c}'
        buttonicon='${g}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Disabled",args:{label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"},children:({label:n,options:a,disabled:s})=>`
      <v-select
        label='${n}'
        options='${a}'
        disabled='${s}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Readonly",args:{label:"Readonly",options:"Option 1, Option 2, Option 3",readonly:"readonly",value:"Option 1"},children:({label:n,options:a,readonly:s,value:c})=>`
      <v-select
        label='${n}'
        options='${a}'
        readonly='${s}'
        value='${c}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Exact",args:{label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"},children:({label:n,options:a,exact:s})=>`
      <v-select
        label='${n}'
        options='${a}'
        exact='${s}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:n,options:a,tooltip:s,state:c})=>`
      <v-select
        label='${n}'
        options='${a}'
        tooltip='${s}'
        state='${c}'
      />
    `})}),`
`,t.exports.jsx(r,{children:t.exports.jsx(p,{name:"With prefix",args:{label:"Your options",options:w,placeholder:"Select...",prefix:"true"},children:({label:n,options:a,placeholder:s,prefix:c})=>`
      <v-select
        label='${n}'
        options='${a}'
        placeholder='${s}'
        prefix='${c}'
      />
    `})})]})}}const d=({label:e,options:o})=>`
      <v-select
        label='${e}'
        options='${o}'
      />
    `;d.storyName="Default Select";d.args={label:"Default Select",options:"option 1, option 2, option 3"};d.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
      />
    \``}};const b=({label:e,options:o,placeholder:l})=>`
      <v-select
        label='${e}'
        options='${o}'
        placeholder='${l}'
      />
    `;b.storyName="Select with Placeholder";b.args={label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};b.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const h=({label:e,options:o,value:l})=>`
      <v-select
        label='${e}'
        options='${o}'
        value='${l}'
      />
    `;h.storyName="With Value";h.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"};h.parameters={storySource:{source:`({
  label,
  options,
  value
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
      />
    \``}};const m=({label:e,options:o,withbutton:l,buttontext:i,buttonicon:n})=>`
      <v-select
        label='${e}'
        options='${o}'
        withbutton='${l}'
        buttontext='${i}'
        buttonicon='${n}'
      />
    `;m.storyName="With Button";m.args={label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};m.parameters={storySource:{source:`({
  label,
  options,
  withbutton,
  buttontext,
  buttonicon
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        withbutton='\${withbutton}'
        buttontext='\${buttontext}'
        buttonicon='\${buttonicon}'
      />
    \``}};const x=({label:e,options:o,disabled:l})=>`
      <v-select
        label='${e}'
        options='${o}'
        disabled='${l}'
      />
    `;x.storyName="Disabled";x.args={label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"};x.parameters={storySource:{source:`({
  label,
  options,
  disabled
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        disabled='\${disabled}'
      />
    \``}};const y=({label:e,options:o,readonly:l,value:i})=>`
      <v-select
        label='${e}'
        options='${o}'
        readonly='${l}'
        value='${i}'
      />
    `;y.storyName="Readonly";y.args={label:"Readonly",options:"Option 1, Option 2, Option 3",readonly:"readonly",value:"Option 1"};y.parameters={storySource:{source:`({
  label,
  options,
  readonly,
  value
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        readonly='\${readonly}'
        value='\${value}'
      />
    \``}};const $=({label:e,options:o,exact:l})=>`
      <v-select
        label='${e}'
        options='${o}'
        exact='${l}'
      />
    `;$.storyName="Exact";$.args={label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"};$.parameters={storySource:{source:`({
  label,
  options,
  exact
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        exact='\${exact}'
      />
    \``}};const f=({label:e,options:o,tooltip:l,state:i})=>`
      <v-select
        label='${e}'
        options='${o}'
        tooltip='${l}'
        state='${i}'
      />
    `;f.storyName="Tooltip";f.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"};f.parameters={storySource:{source:`({
  label,
  options,
  tooltip,
  state
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const v=({label:e,options:o,placeholder:l,prefix:i})=>`
      <v-select
        label='${e}'
        options='${o}'
        placeholder='${l}'
        prefix='${i}'
      />
    `;v.storyName="With prefix";v.args={label:"Your options",options:w,placeholder:"Select...",prefix:"true"};v.parameters={storySource:{source:`({
  label,
  options,
  placeholder,
  prefix
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
        prefix='\${prefix}'
      />
    \``}};const u={title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},tags:["mdx"],includeStories:["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","withPrefix"]};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:j};const K=["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","withPrefix"];export{K as __namedExportsOrder,u as default,d as defaultSelect,x as disabled,$ as exact,y as readonly,b as selectWithPlaceholder,f as tooltip,m as withButton,v as withPrefix,h as withValue};
//# sourceMappingURL=select.stories-06054782.js.map
