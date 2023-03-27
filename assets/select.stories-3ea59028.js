import{M as j,C as r,S as p}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as S}from"./gpio-options-163ec0e5.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as w}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function V(t={}){const{wrapper:n}=Object.assign({},w(),t.components);return n?e.exports.jsx(n,{...t,children:e.exports.jsx(l,{})}):l();function l(){const i=Object.assign({h1:"h1",p:"p"},w(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(j,{title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}}}),`
`,e.exports.jsx(i.h1,{children:"Select"}),`
`,e.exports.jsx(i.p,{children:"For a dropdown that allows the user to select a single option"}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Default Select",args:{label:"Default Select",options:"option 1, option 2, option 3"},children:({label:o,options:a})=>`
      <v-select
        label='${o}'
        options='${a}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Select with Placeholder",args:{label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},children:({label:o,options:a,placeholder:s})=>`
      <v-select
        label='${o}'
        options='${a}'
        placeholder='${s}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"With Value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"},children:({label:o,options:a,value:s})=>`
      <v-select
        label='${o}'
        options='${a}'
        value='${s}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:o,options:a,withbutton:s,buttontext:c,buttonicon:d})=>`
      <v-select
        label='${o}'
        options='${a}'
        withbutton='${s}'
        buttontext='${c}'
        buttonicon='${d}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Disabled",args:{label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"},children:({label:o,options:a,disabled:s})=>`
      <v-select
        label='${o}'
        options='${a}'
        disabled='${s}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Readonly",args:{label:"Readonly",options:"Option 1, Option 2, Option 3",readonly:"readonly",value:"Option 1"},children:({label:o,options:a,readonly:s,value:c})=>`
      <v-select
        label='${o}'
        options='${a}'
        readonly='${s}'
        value='${c}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Exact",args:{label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"},children:({label:o,options:a,exact:s})=>`
      <v-select
        label='${o}'
        options='${a}'
        exact='${s}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:o,options:a,tooltip:s,state:c})=>`
      <v-select
        label='${o}'
        options='${a}'
        tooltip='${s}'
        state='${c}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"Error",args:{label:"Board",value:"",state:"error",message:"Something went wrong.",options:"Option 1, Option 2, Option 3"},children:({label:o,message:a,value:s,options:c,state:d})=>`
      <v-select
        label='${o}'
        options='${c}'
        message='${a}'
        
        state='${d}'
      />
    `})}),`
`,e.exports.jsx(r,{children:e.exports.jsx(p,{name:"With prefix",args:{label:"Your options",options:S,placeholder:"Select...",prefix:"true"},children:({label:o,options:a,placeholder:s,prefix:c})=>`
      <v-select
        label='${o}'
        options='${a}'
        placeholder='${s}'
        prefix='${c}'
      />
    `})})]})}}const b=({label:t,options:n})=>`
      <v-select
        label='${t}'
        options='${n}'
      />
    `;b.storyName="Default Select";b.args={label:"Default Select",options:"option 1, option 2, option 3"};b.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
      />
    \``}};const h=({label:t,options:n,placeholder:l})=>`
      <v-select
        label='${t}'
        options='${n}'
        placeholder='${l}'
      />
    `;h.storyName="Select with Placeholder";h.args={label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};h.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const m=({label:t,options:n,value:l})=>`
      <v-select
        label='${t}'
        options='${n}'
        value='${l}'
      />
    `;m.storyName="With Value";m.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"};m.parameters={storySource:{source:`({
  label,
  options,
  value
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
      />
    \``}};const x=({label:t,options:n,withbutton:l,buttontext:i,buttonicon:o})=>`
      <v-select
        label='${t}'
        options='${n}'
        withbutton='${l}'
        buttontext='${i}'
        buttonicon='${o}'
      />
    `;x.storyName="With Button";x.args={label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};x.parameters={storySource:{source:`({
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
    \``}};const $=({label:t,options:n,disabled:l})=>`
      <v-select
        label='${t}'
        options='${n}'
        disabled='${l}'
      />
    `;$.storyName="Disabled";$.args={label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"};$.parameters={storySource:{source:`({
  label,
  options,
  disabled
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        disabled='\${disabled}'
      />
    \``}};const y=({label:t,options:n,readonly:l,value:i})=>`
      <v-select
        label='${t}'
        options='${n}'
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
    \``}};const f=({label:t,options:n,exact:l})=>`
      <v-select
        label='${t}'
        options='${n}'
        exact='${l}'
      />
    `;f.storyName="Exact";f.args={label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"};f.parameters={storySource:{source:`({
  label,
  options,
  exact
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        exact='\${exact}'
      />
    \``}};const v=({label:t,options:n,tooltip:l,state:i})=>`
      <v-select
        label='${t}'
        options='${n}'
        tooltip='${l}'
        state='${i}'
      />
    `;v.storyName="Tooltip";v.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"};v.parameters={storySource:{source:`({
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
    \``}};const g=({label:t,message:n,value:l,options:i,state:o})=>`
      <v-select
        label='${t}'
        options='${i}'
        message='${n}'
        
        state='${o}'
      />
    `;g.storyName="Error";g.args={label:"Board",value:"",state:"error",message:"Something went wrong.",options:"Option 1, Option 2, Option 3"};g.parameters={storySource:{source:`({
  label,
  message,
  value,
  options,
  state
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        message='\${message}'
        
        state='\${state}'
      />
    \``}};const O=({label:t,options:n,placeholder:l,prefix:i})=>`
      <v-select
        label='${t}'
        options='${n}'
        placeholder='${l}'
        prefix='${i}'
      />
    `;O.storyName="With prefix";O.args={label:"Your options",options:S,placeholder:"Select...",prefix:"true"};O.parameters={storySource:{source:`({
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
    \``}};const u={title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},tags:["mdx"],includeStories:["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","error","withPrefix"]};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:V};const q=["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","error","withPrefix"];export{q as __namedExportsOrder,u as default,b as defaultSelect,$ as disabled,g as error,f as exact,y as readonly,h as selectWithPlaceholder,v as tooltip,x as withButton,O as withPrefix,m as withValue};
//# sourceMappingURL=select.stories-3ea59028.js.map
