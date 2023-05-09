import{M as V,C as p,S as c}from"./chunk-PCJTTTQV-8bd841a0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{g as j}from"./gpio-options-163ec0e5.js";import{j as e}from"./jsx-runtime-16962e30.js";import{u as S}from"./index-d35af5a3.js";import"./iframe-7b1e4bad.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function E(t={}){const{wrapper:n}=Object.assign({},S(),t.components);return n?e.jsx(n,{...t,children:e.jsx(l,{})}):l();function l(){const s=Object.assign({h1:"h1",p:"p"},S(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(V,{title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},heading:{description:"a heading that will be displayed inside of the select",table:{defaultValue:{summary:""}},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"},"on:change":{description:"Event fired when an option is selected"}}}),`
`,e.jsx(s.h1,{id:"select",children:"Select"}),`
`,e.jsx(s.p,{children:"For a dropdown that allows the user to select a single option"}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Default select",args:{label:"Default select",options:"option 1, option 2, option 3"},children:({label:o,options:a})=>`
      <v-select
        label='${o}'
        options='${a}'
      />
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Select with placeholder",args:{label:"Select with placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},children:({label:o,options:a,placeholder:i})=>`
<v-select
  label='${o}'
  options='${a}'
  placeholder='${i}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"With value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"},children:({label:o,options:a,value:i})=>`
<v-select
  label='${o}'
  options='${a}'
  value='${i}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"With button",args:{label:"With button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},children:({label:o,options:a,withbutton:i,buttontext:r,buttonicon:d})=>`
<v-select
  label='${o}'
  options='${a}'
  withbutton='${i}'
  buttontext='${r}'
  buttonicon='${d}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Disabled",args:{label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"},children:({label:o,options:a,disabled:i})=>`
<v-select
  label='${o}'
  options='${a}'
  disabled='${i}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Readonly",args:{label:"Readonly",options:"Option 1, Option 2, Option 3",readonly:"readonly",value:"Option 1"},children:({label:o,options:a,readonly:i,value:r})=>`
<v-select
  label='${o}'
  options='${a}'
  readonly='${i}'
  value='${r}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Exact",args:{label:"Exact option",options:"Option 1, Option 2, Option 3",exact:"true"},children:({label:o,options:a,exact:i})=>`
<v-select
  label='${o}'
  options='${a}'
  exact='${i}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Tooltip",args:{label:"With tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"},children:({label:o,options:a,tooltip:i,state:r})=>`
<v-select
  label='${o}'
  options='${a}'
  tooltip='${i}'
  state='${r}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"Error",args:{label:"Board",value:"",state:"error",message:"Something went wrong.",options:"Option 1, Option 2, Option 3"},children:({label:o,message:a,value:i,options:r,state:d})=>`
<v-select
  label='${o}'
  options='${r}'
  message='${a}'
  
  state='${d}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"With prefix",args:{label:"Your options",options:j,placeholder:"Select...",prefix:"true"},children:({label:o,options:a,placeholder:i,prefix:r})=>`
<v-select
  label='${o}'
  options='${a}'
  placeholder='${i}'
  prefix='${r}'
/>
    `})}),`
`,e.jsx(p,{children:e.jsx(c,{name:"With heading",args:{label:"With heading",options:"Option 1, Option 2, Option 3",heading:"Test",value:"Option 3"},children:({label:o,options:a,value:i,heading:r})=>`
<v-select
  label='${o}'
  options='${a}'
  value='${i}'
  heading='${r}'
/>
    `})})]})}}const h=({label:t,options:n})=>`
      <v-select
        label='${t}'
        options='${n}'
      />
    `;h.storyName="Default select";h.args={label:"Default select",options:"option 1, option 2, option 3"};h.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
      />
    \``}};const b=({label:t,options:n,placeholder:l})=>`
<v-select
  label='${t}'
  options='${n}'
  placeholder='${l}'
/>
    `;b.storyName="Select with placeholder";b.args={label:"Select with placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};b.parameters={storySource:{source:`({
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
    `;m.storyName="With value";m.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"};m.parameters={storySource:{source:`({
  label,
  options,
  value
}) => \`
<v-select
  label='\${label}'
  options='\${options}'
  value='\${value}'
/>
    \``}};const $=({label:t,options:n,withbutton:l,buttontext:s,buttonicon:o})=>`
<v-select
  label='${t}'
  options='${n}'
  withbutton='${l}'
  buttontext='${s}'
  buttonicon='${o}'
/>
    `;$.storyName="With button";$.args={label:"With button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};$.parameters={storySource:{source:`({
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
    \``}};const y=({label:t,options:n,disabled:l})=>`
<v-select
  label='${t}'
  options='${n}'
  disabled='${l}'
/>
    `;y.storyName="Disabled";y.args={label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"};y.parameters={storySource:{source:`({
  label,
  options,
  disabled
}) => \`
<v-select
  label='\${label}'
  options='\${options}'
  disabled='\${disabled}'
/>
    \``}};const x=({label:t,options:n,readonly:l,value:s})=>`
<v-select
  label='${t}'
  options='${n}'
  readonly='${l}'
  value='${s}'
/>
    `;x.storyName="Readonly";x.args={label:"Readonly",options:"Option 1, Option 2, Option 3",readonly:"readonly",value:"Option 1"};x.parameters={storySource:{source:`({
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
    `;f.storyName="Exact";f.args={label:"Exact option",options:"Option 1, Option 2, Option 3",exact:"true"};f.parameters={storySource:{source:`({
  label,
  options,
  exact
}) => \`
<v-select
  label='\${label}'
  options='\${options}'
  exact='\${exact}'
/>
    \``}};const v=({label:t,options:n,tooltip:l,state:s})=>`
<v-select
  label='${t}'
  options='${n}'
  tooltip='${l}'
  state='${s}'
/>
    `;v.storyName="Tooltip";v.args={label:"With tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"};v.parameters={storySource:{source:`({
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
    \``}};const g=({label:t,message:n,value:l,options:s,state:o})=>`
<v-select
  label='${t}'
  options='${s}'
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
    \``}};const O=({label:t,options:n,placeholder:l,prefix:s})=>`
<v-select
  label='${t}'
  options='${n}'
  placeholder='${l}'
  prefix='${s}'
/>
    `;O.storyName="With prefix";O.args={label:"Your options",options:j,placeholder:"Select...",prefix:"true"};O.parameters={storySource:{source:`({
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
    \``}};const w=({label:t,options:n,value:l,heading:s})=>`
<v-select
  label='${t}'
  options='${n}'
  value='${l}'
  heading='${s}'
/>
    `;w.storyName="With heading";w.args={label:"With heading",options:"Option 1, Option 2, Option 3",heading:"Test",value:"Option 3"};w.parameters={storySource:{source:`({
  label,
  options,
  value,
  heading
}) => \`
<v-select
  label='\${label}'
  options='\${options}'
  value='\${value}'
  heading='\${heading}'
/>
    \``}};const u={title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},heading:{description:"a heading that will be displayed inside of the select",table:{defaultValue:{summary:""}},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"},"on:change":{description:"Event fired when an option is selected"}},tags:["stories-mdx"],includeStories:["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","error","withPrefix","withHeading"]};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:E};const H=["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","readonly","exact","tooltip","error","withPrefix","withHeading"];export{H as __namedExportsOrder,u as default,h as defaultSelect,y as disabled,g as error,f as exact,x as readonly,b as selectWithPlaceholder,v as tooltip,$ as withButton,w as withHeading,O as withPrefix,m as withValue};
//# sourceMappingURL=select.stories-d7277202.js.map
