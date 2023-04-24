import{M as V,C as o,S as u}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-cb192941.js";import{u as j}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function w(a={}){const{wrapper:r}=Object.assign({},j(),a.components);return r?n.jsx(r,{...a,children:n.jsx(s,{})}):s();function s(){const t=Object.assign({h1:"h1",p:"p"},j(),a.components);return n.jsxs(n.Fragment,{children:[n.jsx(V,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}}}),`
`,n.jsx(t.h1,{id:"slider",children:"Slider"}),`
`,n.jsx(t.p,{children:"For user triggered actions"}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Slider",args:{min:0,max:100,step:10},children:({min:e,max:i,step:m})=>`
<v-slider
  min='${e}'
  max='${i}'
  step='${m}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Range",args:{min:0,max:100,start:10,end:90,step:10},children:({min:e,max:i,step:m,start:l,end:d})=>`
<v-slider
  min='${e}'
  max='${i}'
  step='${m}'
  start='${l}'
  end='${d}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Min range",args:{range:"min",min:0,max:100,value:30,step:10},children:({range:e,min:i,max:m,step:l,value:d})=>`
<v-slider
  range='${e}'
  max='${m}'
  step='${l}'
  value='${d}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Max range",args:{range:"max",min:0,max:100,value:70,step:10},children:({range:e,min:i,max:m,step:l,value:d})=>`
<v-slider
  range='${e}'
  max='${m}'
  step='${l}'
  value='${d}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},children:({min:e,max:i,step:m,suffix:l})=>`
<v-slider
  min='${e}'
  max='${i}'
  step='${m}'
  suffix='${l}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"With value",args:{min:0,max:100,step:10,value:0},children:({value:e,min:i,max:m,step:l})=>`
<v-slider
  value='${e}'
  min='${i}'
  max='${m}'
  step='${l}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},children:({label:e,min:i,max:m,step:l})=>`
<v-slider
  label='${e}'
  min='${i}'
  max='${m}'
  step='${l}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Disabled",args:{min:0,max:100,step:10,disabled:!0},children:({min:e,max:i,step:m,disabled:l})=>`
<v-slider
  min='${e}'
  max='${i}'
  step='${m}'
  disabled='${l}'
/>
    `})}),`
`,n.jsx(o,{children:n.jsx(u,{name:"Readonly",args:{range:"min",max:100,step:10,value:30,readonly:"true",label:"readonly"},children:({range:e,max:i,step:m,value:l,readonly:d,label:S})=>`
<v-slider
  range='${e}'
  max='${i}'
  step='${m}'
  value='${l}'
  readonly='${d}'
  label='${S}'
/>
    `})})]})}}const x=({min:a,max:r,step:s})=>`
<v-slider
  min='${a}'
  max='${r}'
  step='${s}'
/>
    `;x.storyName="Slider";x.args={min:0,max:100,step:10};x.parameters={storySource:{source:`({
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
    \``}};const p={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},tags:["stories-mdx"],includeStories:["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled","readonly"]};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:w};const O=["slider","range","minRange","maxRange","withSuffix","withValue","withLabel","disabled","readonly"];export{O as __namedExportsOrder,p as default,y as disabled,v as maxRange,c as minRange,$ as range,h as readonly,x as slider,f as withLabel,g as withSuffix,b as withValue};
//# sourceMappingURL=slider.stories-ee35309f.js.map
