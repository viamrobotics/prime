import{M as j,C as o,S as p}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as y}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function S(a={}){const{wrapper:t}=Object.assign({},y(),a.components);return t?e.exports.jsx(t,{...a,children:e.exports.jsx(s,{})}):s();function s(){const r=Object.assign({h1:"h1",p:"p"},y(),a.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(j,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}}}),`
`,e.exports.jsx(r.h1,{children:"Slider"}),`
`,e.exports.jsx(r.p,{children:"For user triggered actions"}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"Slider",args:{min:0,max:100,step:10},children:({min:n,max:m,step:i})=>`
      <v-slider
        min='${n}'
        max='${m}'
        step='${i}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"Range",args:{min:0,max:100,start:10,end:90,step:10},children:({min:n,max:m,step:i,start:l,end:u})=>`
      <v-slider
        min='${n}'
        max='${m}'
        step='${i}'
        start='${l}'
        end='${u}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"Min range",args:{range:"min",min:0,max:100,value:30,step:10},children:({range:n,min:m,max:i,step:l,value:u})=>`
      <v-slider
        range='${n}'
        max='${i}'
        step='${l}'
        value='${u}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"Max range",args:{range:"max",min:0,max:100,value:70,step:10},children:({range:n,min:m,max:i,step:l,value:u})=>`
      <v-slider
        range='${n}'
        max='${i}'
        step='${l}'
        value='${u}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},children:({min:n,max:m,step:i,suffix:l})=>`
      <v-slider
        min='${n}'
        max='${m}'
        step='${i}'
        suffix='${l}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"With value",args:{min:0,max:100,step:10,value:0},children:({value:n,min:m,max:i,step:l})=>`
      <v-slider
        value='${n}'
        min='${m}'
        max='${i}'
        step='${l}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},children:({label:n,min:m,max:i,step:l})=>`
      <v-slider
        label='${n}'
        min='${m}'
        max='${i}'
        step='${l}'
      />
    `})}),`
`,e.exports.jsx(o,{children:e.exports.jsx(p,{name:"Disabled",args:{min:0,max:100,step:10,disabled:!0},children:({min:n,max:m,step:i,disabled:l})=>`
      <v-slider
        min='${n}'
        max='${m}'
        step='${i}'
        disabled='${l}'
      />
    `})})]})}}const d=({min:a,max:t,step:s})=>`
      <v-slider
        min='${a}'
        max='${t}'
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
    \``}};const $=({min:a,max:t,step:s,start:r,end:n})=>`
      <v-slider
        min='${a}'
        max='${t}'
        step='${s}'
        start='${r}'
        end='${n}'
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
    \``}};const c=({range:a,min:t,max:s,step:r,value:n})=>`
      <v-slider
        range='${a}'
        max='${s}'
        step='${r}'
        value='${n}'
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
    \``}};const v=({range:a,min:t,max:s,step:r,value:n})=>`
      <v-slider
        range='${a}'
        max='${s}'
        step='${r}'
        value='${n}'
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
    \``}};const g=({min:a,max:t,step:s,suffix:r})=>`
      <v-slider
        min='${a}'
        max='${t}'
        step='${s}'
        suffix='${r}'
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
    \``}};const b=({value:a,min:t,max:s,step:r})=>`
      <v-slider
        value='${a}'
        min='${t}'
        max='${s}'
        step='${r}'
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
    \``}};const f=({label:a,min:t,max:s,step:r})=>`
      <v-slider
        label='${a}'
        min='${t}'
        max='${s}'
        step='${r}'
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
    \``}};const h=({min:a,max:t,step:s,disabled:r})=>`
      <v-slider
        min='${a}'
        max='${t}'
        step='${s}'
        disabled='${r}'
      />
    `;h.storyName="Disabled";h.args={min:0,max:100,step:10,disabled:!0};h.parameters={storySource:{source:`({
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
    \``}};const x={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},tags:["mdx"],includeStories:["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled"]};x.parameters=x.parameters||{};x.parameters.docs={...x.parameters.docs||{},page:S};const G=["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled"];export{G as __namedExportsOrder,x as default,h as disabled,v as maxRange,c as minRange,$ as range,d as slider,f as withLabel,g as withSuffix,b as withValue};
//# sourceMappingURL=slider.stories-d8674365.js.map
