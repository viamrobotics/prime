var T=Object.defineProperty;var i=(n,o)=>T(n,"name",{value:o,configurable:!0});import"./jsx-runtime.62a5b3b9.js";import{c as l,A as O,M as g,C as s,S as r}from"./Props.c70c1159.js";import"./iframe.955807a8.js";import{g as v}from"./gpio-options.f92cd13d.js";import"./es.map.constructor.e721a4f2.js";import"./es.number.to-fixed.d6275c24.js";function u(){return u=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e])}return n},u.apply(this,arguments)}i(u,"_extends");const V={},P="wrapper";function w({components:n,...o}){return l(P,u({},V,o,{components:n,mdxType:"MDXLayout"}),l(g,{title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},mdxType:"Meta"}),l("h1",null,"Select"),l("p",null,"For a dropdown that allows the user to select a single option"),l(s,{mdxType:"Canvas"},l(r,{name:"Default Select",args:{label:"Default Select",options:"option 1, option 2, option 3"},mdxType:"Story"},({label:t,options:e})=>`
      <v-select
        label='${t}'
        options='${e}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"Select with Placeholder",args:{label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."},mdxType:"Story"},({label:t,options:e,placeholder:a})=>`
      <v-select
        label='${t}'
        options='${e}'
        placeholder='${a}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"With Value",args:{label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"},mdxType:"Story"},({label:t,options:e,value:a})=>`
      <v-select
        label='${t}'
        options='${e}'
        value='${a}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},mdxType:"Story"},({label:t,options:e,withbutton:a,buttontext:p,buttonicon:S})=>`
      <v-select
        label='${t}'
        options='${e}'
        withbutton='${a}'
        buttontext='${p}'
        buttonicon='${S}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"Disabled",args:{label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"},mdxType:"Story"},({label:t,options:e,disabled:a})=>`
      <v-select
        label='${t}'
        options='${e}'
        disabled='${a}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"Exact",args:{label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"},mdxType:"Story"},({label:t,options:e,exact:a})=>`
      <v-select
        label='${t}'
        options='${e}'
        exact='${a}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:t,options:e,tooltip:a,state:p})=>`
      <v-select
        label='${t}'
        options='${e}'
        tooltip='${a}'
        state='${p}'
      />
    `)),l(s,{mdxType:"Canvas"},l(r,{name:"With prefix",args:{label:"Your options",options:v,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:t,options:e,placeholder:a,prefix:p})=>`
      <v-select
        label='${t}'
        options='${e}'
        placeholder='${a}'
        prefix='${p}'
      />
    `)))}i(w,"MDXContent");w.isMDXComponent=!0;const d=i(({label:n,options:o})=>`
      <v-select
        label='${n}'
        options='${o}'
      />
    `,"defaultSelect");d.storyName="Default Select";d.args={label:"Default Select",options:"option 1, option 2, option 3"};d.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
      />
    \``}};const b=i(({label:n,options:o,placeholder:t})=>`
      <v-select
        label='${n}'
        options='${o}'
        placeholder='${t}'
      />
    `,"selectWithPlaceholder");b.storyName="Select with Placeholder";b.args={label:"Select with Placeholder",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",placeholder:"Some placeholder..."};b.parameters={storySource:{source:`({
  label,
  options,
  placeholder
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        placeholder='\${placeholder}'
      />
    \``}};const h=i(({label:n,options:o,value:t})=>`
      <v-select
        label='${n}'
        options='${o}'
        value='${t}'
      />
    `,"withValue");h.storyName="With Value";h.args={label:"Your options",options:"Option 1, Option 2, Option 3",value:"Option 3"};h.parameters={storySource:{source:`({
  label,
  options,
  value
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        value='\${value}'
      />
    \``}};const m=i(({label:n,options:o,withbutton:t,buttontext:e,buttonicon:a})=>`
      <v-select
        label='${n}'
        options='${o}'
        withbutton='${t}'
        buttontext='${e}'
        buttonicon='${a}'
      />
    `,"withButton");m.storyName="With Button";m.args={label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};m.parameters={storySource:{source:`({
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
    \``}};const y=i(({label:n,options:o,disabled:t})=>`
      <v-select
        label='${n}'
        options='${o}'
        disabled='${t}'
      />
    `,"disabled");y.storyName="Disabled";y.args={label:"Disabled",options:"Option 1, Option 2, Option 3",disabled:"true"};y.parameters={storySource:{source:`({
  label,
  options,
  disabled
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        disabled='\${disabled}'
      />
    \``}};const x=i(({label:n,options:o,exact:t})=>`
      <v-select
        label='${n}'
        options='${o}'
        exact='${t}'
      />
    `,"exact");x.storyName="Exact";x.args={label:"Exact Option",options:"Option 1, Option 2, Option 3",exact:"true"};x.parameters={storySource:{source:`({
  label,
  options,
  exact
}) => \`
      <v-select
        label='\${label}'
        options='\${options}'
        exact='\${exact}'
      />
    \``}};const f=i(({label:n,options:o,tooltip:t,state:e})=>`
      <v-select
        label='${n}'
        options='${o}'
        tooltip='${t}'
        state='${e}'
      />
    `,"tooltip");f.storyName="Tooltip";f.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",tooltip:"Warning: these options may not be your only options.",state:"warn"};f.parameters={storySource:{source:`({
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
    \``}};const $=i(({label:n,options:o,placeholder:t,prefix:e})=>`
      <v-select
        label='${n}'
        options='${o}'
        placeholder='${t}'
        prefix='${e}'
      />
    `,"withPrefix");$.storyName="With prefix";$.args={label:"Your options",options:v,placeholder:"Select...",prefix:"true"};$.parameters={storySource:{source:`({
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
    \``}};const c={title:"Elements/Select/Select",parameters:{actions:{handles:["input","button-click","search"]}},argTypes:{label:{description:"The input label",table:{defaultValue:{summary:""}},control:"text"},options:{description:"The list of options",table:{defaultValue:{summary:""}},control:"text"},value:{description:"The selected value",table:{defaultValue:{summary:""}},control:"text"},placeholder:{description:"The placeholder value",table:{defaultValue:{summary:""}},control:"text"},exact:{description:"If true, values can only be selected if an existing value matches what is inputted (single select ONLY)",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"}},control:{type:"boolean"}},buttontext:{description:"The text on the button",table:{defaultValue:{summary:"ENTER"}},control:"text"},buttonicon:{description:"The icon on the button, can use any from v-icon",table:{defaultValue:{summary:""}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},state:{description:"the state of the tooltip",table:{defaultValue:{summary:"info"},type:{summary:"string"}},options:["info","warn","error"],control:{type:"radio"},type:"text"},"on:input":{description:"Event fired when an option is selected"},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed"}},includeStories:["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","exact","tooltip","withPrefix"]},E={"Default Select":"defaultSelect","Select with Placeholder":"selectWithPlaceholder","With Value":"withValue","With Button":"withButton",Disabled:"disabled",Exact:"exact",Tooltip:"tooltip","With prefix":"withPrefix"};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:()=>l(O,{mdxStoryNameToKey:E,mdxComponentAnnotations:c},l(w,null))};const R=["defaultSelect","selectWithPlaceholder","withValue","withButton","disabled","exact","tooltip","withPrefix"];export{R as __namedExportsOrder,c as default,d as defaultSelect,y as disabled,x as exact,b as selectWithPlaceholder,f as tooltip,m as withButton,$ as withPrefix,h as withValue};
//# sourceMappingURL=select.stories.98112ebc.js.map
