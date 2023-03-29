import{M as V,C as o,S as p}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-c27a426b.js";import{u as j}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function w(a={}){const{wrapper:r}=Object.assign({},j(),a.components);return r?n.exports.jsx(r,{...a,children:n.exports.jsx(s,{})}):s();function s(){const t=Object.assign({h1:"h1",p:"p"},j(),a.components);return n.exports.jsxs(n.exports.Fragment,{children:[n.exports.jsx(V,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}}}),`
`,n.exports.jsx(t.h1,{children:"Slider"}),`
`,n.exports.jsx(t.p,{children:"For user triggered actions"}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Slider",args:{min:0,max:100,step:10},children:({min:e,max:i,step:m})=>`
      <v-slider
        min='${e}'
        max='${i}'
        step='${m}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Range",args:{min:0,max:100,start:10,end:90,step:10},children:({min:e,max:i,step:m,start:l,end:u})=>`
      <v-slider
        min='${e}'
        max='${i}'
        step='${m}'
        start='${l}'
        end='${u}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Min range",args:{range:"min",min:0,max:100,value:30,step:10},children:({range:e,min:i,max:m,step:l,value:u})=>`
      <v-slider
        range='${e}'
        max='${m}'
        step='${l}'
        value='${u}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Max range",args:{range:"max",min:0,max:100,value:70,step:10},children:({range:e,min:i,max:m,step:l,value:u})=>`
      <v-slider
        range='${e}'
        max='${m}'
        step='${l}'
        value='${u}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},children:({min:e,max:i,step:m,suffix:l})=>`
      <v-slider
        min='${e}'
        max='${i}'
        step='${m}'
        suffix='${l}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"With value",args:{min:0,max:100,step:10,value:0},children:({value:e,min:i,max:m,step:l})=>`
      <v-slider
        value='${e}'
        min='${i}'
        max='${m}'
        step='${l}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},children:({label:e,min:i,max:m,step:l})=>`
      <v-slider
        label='${e}'
        min='${i}'
        max='${m}'
        step='${l}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Disabled",args:{min:0,max:100,step:10,disabled:!0},children:({min:e,max:i,step:m,disabled:l})=>`
      <v-slider
        min='${e}'
        max='${i}'
        step='${m}'
        disabled='${l}'
      />
    `})}),`
`,n.exports.jsx(o,{children:n.exports.jsx(p,{name:"Readonly",args:{range:"min",max:100,step:10,value:30,readonly:"true",label:"readonly"},children:({range:e,max:i,step:m,value:l,readonly:u,label:S})=>`
      <v-slider
        range='${e}'
        max='${i}'
        step='${m}'
        value='${l}'
        readonly='${u}'
        label='${S}'
      />
    `})})]})}}const d=({min:a,max:r,step:s})=>`
      <v-slider
        min='${a}'
        max='${r}'
        step='${s}'
      />
    `;d.storyName="Slider";d.args={min:0,max:100,step:10};d.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
      />
    \``}};const $=({min:a,max:r,step:s,start:t,end:e})=>`
      <v-slider
        min='${a}'
        max='${r}'
        step='${s}'
        start='${t}'
        end='${e}'
      />
    `;$.storyName="Range";$.args={min:0,max:100,start:10,end:90,step:10};$.parameters={storySource:{source:`({
  min,
  max,
  step,
  start,
  end
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
        start='\${start}'
        end='\${end}'
      />
    \``}};const c=({range:a,min:r,max:s,step:t,value:e})=>`
      <v-slider
        range='${a}'
        max='${s}'
        step='${t}'
        value='${e}'
      />
    `;c.storyName="Min range";c.args={range:"min",min:0,max:100,value:30,step:10};c.parameters={storySource:{source:`({
  range,
  min,
  max,
  step,
  value
}) => \`
      <v-slider
        range='\${range}'
        max='\${max}'
        step='\${step}'
        value='\${value}'
      />
    \``}};const v=({range:a,min:r,max:s,step:t,value:e})=>`
      <v-slider
        range='${a}'
        max='${s}'
        step='${t}'
        value='${e}'
      />
    `;v.storyName="Max range";v.args={range:"max",min:0,max:100,value:70,step:10};v.parameters={storySource:{source:`({
  range,
  min,
  max,
  step,
  value
}) => \`
      <v-slider
        range='\${range}'
        max='\${max}'
        step='\${step}'
        value='\${value}'
      />
    \``}};const g=({min:a,max:r,step:s,suffix:t})=>`
      <v-slider
        min='${a}'
        max='${r}'
        step='${s}'
        suffix='${t}'
      />
    `;g.storyName="With suffix";g.args={min:0,max:100,step:10,suffix:"ml"};g.parameters={storySource:{source:`({
  min,
  max,
  step,
  suffix
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
        suffix='\${suffix}'
      />
    \``}};const b=({value:a,min:r,max:s,step:t})=>`
      <v-slider
        value='${a}'
        min='${r}'
        max='${s}'
        step='${t}'
      />
    `;b.storyName="With value";b.args={min:0,max:100,step:10,value:0};b.parameters={storySource:{source:`({
  value,
  min,
  max,
  step
}) => \`
      <v-slider
        value='\${value}'
        min='\${min}'
        max='\${max}'
        step='\${step}'
      />
    \``}};const f=({label:a,min:r,max:s,step:t})=>`
      <v-slider
        label='${a}'
        min='${r}'
        max='${s}'
        step='${t}'
      />
    `;f.storyName="With label";f.args={min:0,max:100,step:10,label:"Soups eaten per day"};f.parameters={storySource:{source:`({
  label,
  min,
  max,
  step
}) => \`
      <v-slider
        label='\${label}'
        min='\${min}'
        max='\${max}'
        step='\${step}'
      />
    \``}};const y=({min:a,max:r,step:s,disabled:t})=>`
      <v-slider
        min='${a}'
        max='${r}'
        step='${s}'
        disabled='${t}'
      />
    `;y.storyName="Disabled";y.args={min:0,max:100,step:10,disabled:!0};y.parameters={storySource:{source:`({
  min,
  max,
  step,
  disabled
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
        disabled='\${disabled}'
      />
    \``}};const h=({range:a,max:r,step:s,value:t,readonly:e,label:i})=>`
      <v-slider
        range='${a}'
        max='${r}'
        step='${s}'
        value='${t}'
        readonly='${e}'
        label='${i}'
      />
    `;h.storyName="Readonly";h.args={range:"min",max:100,step:10,value:30,readonly:"true",label:"readonly"};h.parameters={storySource:{source:`({
  range,
  max,
  step,
  value,
  readonly,
  label
}) => \`
      <v-slider
        range='\${range}'
        max='\${max}'
        step='\${step}'
        value='\${value}'
        readonly='\${readonly}'
        label='\${label}'
      />
    \``}};const x={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled","readonly"]};x.parameters=x.parameters||{};x.parameters.docs={...x.parameters.docs||{},page:w};const I=["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled","readonly"];export{I as __namedExportsOrder,x as default,y as disabled,v as maxRange,c as minRange,$ as range,h as readonly,d as slider,f as withLabel,g as withSuffix,b as withValue};
//# sourceMappingURL=slider.stories-ff9ef828.js.map
