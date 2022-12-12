var P=Object.defineProperty;var i=(l,o)=>P(l,"name",{value:o,configurable:!0});import"./jsx-runtime.f0857561.js";import{c as n,A as V,M as C,C as r,S as p}from"./Props.3d2740a5.js";import"./iframe.f87997e8.js";import{g as T}from"./gpio-options.f92cd13d.js";import"./es.map.constructor.905eaff3.js";import"./es.number.to-fixed.8cacef64.js";function d(){return d=Object.assign?Object.assign.bind():function(l){for(var o=1;o<arguments.length;o++){var e=arguments[o];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(l[t]=e[t])}return l},d.apply(this,arguments)}i(d,"_extends");const N={},W="wrapper";function O({components:l,...o}){return n(W,d({},N,o,{components:l,mdxType:"MDXLayout"}),n(C,{title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}},mdxType:"Meta"}),n("h1",null,"Multi-Select"),n("p",null,"Dropdown that allows the user to select multiple choices."),n(r,{mdxType:"Canvas"},n(p,{name:"Default",args:{label:"Default Multi-select",options:"happy, sad, angry"},mdxType:"Story"},({label:e,options:t})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"With Value and Placeholder",args:{label:"With Value and Placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."},mdxType:"Story"},({label:e,options:t,value:a,placeholder:s})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        value='${a}'
        placeholder='${s}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"With Button",args:{label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"},mdxType:"Story"},({label:e,options:t,withbutton:a,buttontext:s,buttonicon:u})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        withbutton='${a}'
        buttontext='${s}'
        buttonicon='${u}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"With Heading",args:{label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"},mdxType:"Story"},({label:e,options:t,heading:a})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        heading='${a}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"Disabled",args:{label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"},mdxType:"Story"},({label:e,options:t,disabled:a,tooltip:s,state:u})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        disabled='${a}'
        tooltip='${s}'
        state='${u}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"With Tooltip",args:{label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:t,value:a,tooltip:s,state:u})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        value='${a}'
        tooltip='${s}'
        state='${u}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"With prefix",args:{label:"Options With Prefixes",options:T,placeholder:"Select...",prefix:"true"},mdxType:"Story"},({label:e,options:t,placeholder:a,prefix:s})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        placeholder='${a}'
        prefix='${s}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"Hide Pills",args:{label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"},mdxType:"Story"},({label:e,options:t,value:a,showpill:s})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        value='${a}'
        showpill='${s}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"Reduce Search",args:{label:"Reduce Search",options:"hello, hi, yo, halo",sortoption:"reduce"},mdxType:"Story"},({label:e,options:t,sortoption:a})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        sortoption='${a}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"Do Not Search",args:{label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"},mdxType:"Story"},({label:e,options:t,sortoption:a})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        sortoption='${a}'
      />
    `)),n(r,{mdxType:"Canvas"},n(p,{name:"Not Clearable",args:{label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"},mdxType:"Story"},({label:e,options:t,clearable:a,value:s})=>`
      <v-multiselect
        label='${e}'
        options='${t}'
        clearable='${a}'
        value='${s}'
      />
    `)))}i(O,"MDXContent");O.isMDXComponent=!0;const m=i(({label:l,options:o})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
      />
    `,"defaultStory");m.storyName="Default";m.args={label:"Default Multi-select",options:"happy, sad, angry"};m.parameters={storySource:{source:`({
  label,
  options
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
      />
    \``}};const h=i(({label:l,options:o,value:e,placeholder:t})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        value='${e}'
        placeholder='${t}'
      />
    `,"withValueAndPlaceholder");h.storyName="With Value and Placeholder";h.args={label:"With Value and Placeholder",options:"Option 1, Option 2, Option 3",value:"Option 1, Option 3",placeholder:"Some placeholder..."};h.parameters={storySource:{source:`({
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
    \``}};const b=i(({label:l,options:o,withbutton:e,buttontext:t,buttonicon:a})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        withbutton='${e}'
        buttontext='${t}'
        buttonicon='${a}'
      />
    `,"withButton");b.storyName="With Button";b.args={label:"With Button",options:"Photo 1, Photo 2, Photo 3",withbutton:"true",buttontext:"TAKE PHOTO",buttonicon:"camera"};b.parameters={storySource:{source:`({
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
    \``}};const y=i(({label:l,options:o,heading:e})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        heading='${e}'
      />
    `,"withHeading");y.storyName="With Heading";y.args={label:"With Heading",options:"a1, a2, a3, a4",heading:"A Values"};y.parameters={storySource:{source:`({
  label,
  options,
  heading
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        heading='\${heading}'
      />
    \``}};const $=i(({label:l,options:o,disabled:e,tooltip:t,state:a})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        disabled='${e}'
        tooltip='${t}'
        state='${a}'
      />
    `,"disabled");$.storyName="Disabled";$.args={label:"Your options",options:"Option 1, Option 2, Option 3",disabled:"true",tooltip:"This is disabled.",state:"error"};$.parameters={storySource:{source:`({
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
    \``}};const v=i(({label:l,options:o,value:e,tooltip:t,state:a})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        value='${e}'
        tooltip='${t}'
        state='${a}'
      />
    `,"withTooltip");v.storyName="With Tooltip";v.args={label:"With Tooltip",options:"Option 1, Option 2, Option 3",value:"Option",tooltip:"Warning: these options may not be your only options.",state:"warn"};v.parameters={storySource:{source:`({
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
    \``}};const f=i(({label:l,options:o,placeholder:e,prefix:t})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        placeholder='${e}'
        prefix='${t}'
      />
    `,"withPrefix");f.storyName="With prefix";f.args={label:"Options With Prefixes",options:T,placeholder:"Select...",prefix:"true"};f.parameters={storySource:{source:`({
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
    \``}};const g=i(({label:l,options:o,value:e,showpill:t})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        value='${e}'
        showpill='${t}'
      />
    `,"hidePills");g.storyName="Hide Pills";g.args={label:"Hide Pills",options:"Bob, Sally, Jimothy, Raechel, Apple, Andy, Robert",value:"Jimothy, Apple",showpill:"false"};g.parameters={storySource:{source:`({
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
    \``}};const x=i(({label:l,options:o,sortoption:e})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        sortoption='${e}'
      />
    `,"reduceSearch");x.storyName="Reduce Search";x.args={label:"Reduce Search",options:"hello, hi, yo, halo",sortoption:"reduce"};x.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        sortoption='\${sortoption}'
      />
    \``}};const w=i(({label:l,options:o,sortoption:e})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        sortoption='${e}'
      />
    `,"doNotSearch");w.storyName="Do Not Search";w.args={label:"Do Not Search",options:"hello, hi, yo, halo",sortoption:"off"};w.parameters={storySource:{source:`({
  label,
  options,
  sortoption
}) => \`
      <v-multiselect
        label='\${label}'
        options='\${options}'
        sortoption='\${sortoption}'
      />
    \``}};const S=i(({label:l,options:o,clearable:e,value:t})=>`
      <v-multiselect
        label='${l}'
        options='${o}'
        clearable='${e}'
        value='${t}'
      />
    `,"notClearable");S.storyName="Not Clearable";S.args={label:"Not Clearable",options:"hello, hi, yo, halo",value:"hi, halo",clearable:"false"};S.parameters={storySource:{source:`({
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
    \``}};const c={title:"Elements/Select/Multi-Select",parameters:{actions:{handles:["input","button-click","search","clear-all-click","enter-press","open","close"]}},argTypes:{label:{description:"The label of the multiselect",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},options:{description:"The list of options that can be selected from, separated by commas",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},value:{description:"Options that are selected",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},placeholder:{description:"The placeholder value in input",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},showpill:{description:"The option to not show pills representing selected values",table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},clearable:{description:'Option to have "Clear all" button to deselect all options',table:{defaultValue:{summary:"true"},type:{summary:"boolean"}},control:{type:"boolean"}},withbutton:{description:"Whether a button exists at the bottom to conduct an action",table:{defaultValue:{summary:"false"},type:{summary:"boolean"}},control:{type:"boolean"}},buttontext:{description:"Text on the button",table:{defaultValue:{summary:"ENTER"},type:{summary:"string"}},control:"text"},buttonicon:{description:"Icon on the button, can use any from v-icon",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},sortoption:{description:"how we want the values to be searched and sorted inside the component",table:{defaultValue:{summary:"default"},type:{summary:"string"}},options:["default","reduce","off"],control:{type:"radio"},type:"text"},heading:{description:"Subheading inside the dropdown to describe the information",table:{defaultValue:{summary:""},type:{summary:"string"}},control:"text"},"on:input":{description:"Event fired when an option is selected",table:{type:{summary:"object"}}},"on:button-click":{description:"Event fired when button is clicked"},"on:search":{description:"Event fired when the search input is changed",table:{type:{summary:"string"}}},"on:enter-press":{description:"Event fired when enter button is pressed"},"on:open":{description:"Event fired when dropdown opens"},"on:close":{description:"Event fired when dropdown closes"},"on:clear-all-click":{description:'Event fired when "Clear All" is pressed and values are cleared'}},includeStories:["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable"]},E={Default:"defaultStory","With Value and Placeholder":"withValueAndPlaceholder","With Button":"withButton","With Heading":"withHeading",Disabled:"disabled","With Tooltip":"withTooltip","With prefix":"withPrefix","Hide Pills":"hidePills","Reduce Search":"reduceSearch","Do Not Search":"doNotSearch","Not Clearable":"notClearable"};c.parameters=c.parameters||{};c.parameters.docs={...c.parameters.docs||{},page:()=>n(V,{mdxStoryNameToKey:E,mdxComponentAnnotations:c},n(O,null))};const j=["defaultStory","withValueAndPlaceholder","withButton","withHeading","disabled","withTooltip","withPrefix","hidePills","reduceSearch","doNotSearch","notClearable"];export{j as __namedExportsOrder,c as default,m as defaultStory,$ as disabled,w as doNotSearch,g as hidePills,S as notClearable,x as reduceSearch,b as withButton,y as withHeading,f as withPrefix,v as withTooltip,h as withValueAndPlaceholder};
//# sourceMappingURL=multiselect.stories.3068b9c0.js.map
