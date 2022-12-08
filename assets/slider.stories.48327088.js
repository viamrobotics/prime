var h=Object.defineProperty;var i=(n,s)=>h(n,"name",{value:s,configurable:!0});import"./jsx-runtime.0513aa1a.js";import{c as t,A as S,M as T,C as l,S as o}from"./Props.18bf6f89.js";import"./iframe.b7fa8eb1.js";import"./es.map.constructor.96594e57.js";import"./es.number.to-fixed.358595f4.js";function x(){return x=Object.assign?Object.assign.bind():function(n){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a])}return n},x.apply(this,arguments)}i(x,"_extends");const w={},V="wrapper";function b({components:n,...s}){return t(V,x({},w,s,{components:n,mdxType:"MDXLayout"}),t(T,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Slider"),t("p",null,"For user triggered actions"),t(l,{mdxType:"Canvas"},t(o,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:e,max:a,step:r})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${r}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"Range",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:e,max:a,step:r,start:m,end:u})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${r}'
        start='${m}'
        end='${u}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"Min range",args:{range:"min",min:0,max:100,value:30,step:10},mdxType:"Story"},({range:e,min:a,max:r,step:m,value:u})=>`
      <v-slider
        range='${e}'
        max='${r}'
        step='${m}'
        value='${u}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"Max range",args:{range:"max",min:0,max:100,value:70,step:10},mdxType:"Story"},({range:e,min:a,max:r,step:m,value:u})=>`
      <v-slider
        range='${e}'
        max='${r}'
        step='${m}'
        value='${u}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},mdxType:"Story"},({min:e,max:a,step:r,suffix:m})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${r}'
        suffix='${m}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"With value",args:{min:0,max:100,step:10,value:0},mdxType:"Story"},({value:e,min:a,max:r,step:m})=>`
      <v-slider
        value='${e}'
        min='${a}'
        max='${r}'
        step='${m}'
      />
    `)),t(l,{mdxType:"Canvas"},t(o,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},mdxType:"Story"},({label:e,min:a,max:r,step:m})=>`
      <v-slider
        label='${e}'
        min='${a}'
        max='${r}'
        step='${m}'
      />
    `)))}i(b,"MDXContent");b.isMDXComponent=!0;const d=i(({min:n,max:s,step:e})=>`
      <v-slider
        min='${n}'
        max='${s}'
        step='${e}'
      />
    `,"slider");d.storyName="Slider";d.args={min:0,max:100,step:10};d.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
      />
    \``}};const $=i(({min:n,max:s,step:e,start:a,end:r})=>`
      <v-slider
        min='${n}'
        max='${s}'
        step='${e}'
        start='${a}'
        end='${r}'
      />
    `,"range");$.storyName="Range";$.args={min:0,max:100,start:10,end:90,step:10};$.parameters={storySource:{source:`({
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
    \``}};const c=i(({range:n,min:s,max:e,step:a,value:r})=>`
      <v-slider
        range='${n}'
        max='${e}'
        step='${a}'
        value='${r}'
      />
    `,"minRange");c.storyName="Min range";c.args={range:"min",min:0,max:100,value:30,step:10};c.parameters={storySource:{source:`({
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
    \``}};const v=i(({range:n,min:s,max:e,step:a,value:r})=>`
      <v-slider
        range='${n}'
        max='${e}'
        step='${a}'
        value='${r}'
      />
    `,"maxRange");v.storyName="Max range";v.args={range:"max",min:0,max:100,value:70,step:10};v.parameters={storySource:{source:`({
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
    \``}};const y=i(({min:n,max:s,step:e,suffix:a})=>`
      <v-slider
        min='${n}'
        max='${s}'
        step='${e}'
        suffix='${a}'
      />
    `,"withSuffix");y.storyName="With suffix";y.args={min:0,max:100,step:10,suffix:"ml"};y.parameters={storySource:{source:`({
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
    \``}};const g=i(({value:n,min:s,max:e,step:a})=>`
      <v-slider
        value='${n}'
        min='${s}'
        max='${e}'
        step='${a}'
      />
    `,"withValue");g.storyName="With value";g.args={min:0,max:100,step:10,value:0};g.parameters={storySource:{source:`({
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
    \``}};const f=i(({label:n,min:s,max:e,step:a})=>`
      <v-slider
        label='${n}'
        min='${s}'
        max='${e}'
        step='${a}'
      />
    `,"withLabel");f.storyName="With label";f.args={min:0,max:100,step:10,label:"Soups eaten per day"};f.parameters={storySource:{source:`({
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
    \``}};const p={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["slider","range","minRange","maxRange","withSuffix","withValue","withLabel"]},M={Slider:"slider",Range:"range","Min range":"minRange","Max range":"maxRange","With suffix":"withSuffix","With value":"withValue","With label":"withLabel"};p.parameters=p.parameters||{};p.parameters.docs={...p.parameters.docs||{},page:()=>t(S,{mdxStoryNameToKey:M,mdxComponentAnnotations:p},t(b,null))};const L=["slider","range","minRange","maxRange","withSuffix","withValue","withLabel"];export{L as __namedExportsOrder,p as default,v as maxRange,c as minRange,$ as range,d as slider,f as withLabel,y as withSuffix,g as withValue};
//# sourceMappingURL=slider.stories.48327088.js.map
