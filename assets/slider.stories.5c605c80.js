import"./jsx-runtime.d1b9f538.js";import{c as n,A as b,M as h,C as i,S as l}from"./Props.c55b6364.js";import"./iframe.2892b64b.js";import"./es.map.constructor.45a3d33c.js";import"./es.number.to-fixed.7fc33d5d.js";function p(){return p=Object.assign?Object.assign.bind():function(s){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(s[a]=e[a])}return s},p.apply(this,arguments)}const S={},T="wrapper";function f({components:s,...r}){return n(T,p({},S,r,{components:s,mdxType:"MDXLayout"}),n(h,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),n("h1",null,"Slider"),n("p",null,"For user triggered actions"),n(i,{mdxType:"Canvas"},n(l,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:e,max:a,step:t})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${t}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"Range",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:e,max:a,step:t,start:m,end:o})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${t}'
        start='${m}'
        end='${o}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"Min range",args:{range:"min",min:0,max:100,value:30,step:10},mdxType:"Story"},({range:e,min:a,max:t,step:m,value:o})=>`
      <v-slider
        range='${e}'
        max='${t}'
        step='${m}'
        value='${o}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"Max range",args:{range:"max",min:0,max:100,value:70,step:10},mdxType:"Story"},({range:e,min:a,max:t,step:m,value:o})=>`
      <v-slider
        range='${e}'
        max='${t}'
        step='${m}'
        value='${o}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},mdxType:"Story"},({min:e,max:a,step:t,suffix:m})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${t}'
        suffix='${m}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"With value",args:{min:0,max:100,step:10,value:0},mdxType:"Story"},({value:e,min:a,max:t,step:m})=>`
      <v-slider
        value='${e}'
        min='${a}'
        max='${t}'
        step='${m}'
      />
    `)),n(i,{mdxType:"Canvas"},n(l,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},mdxType:"Story"},({label:e,min:a,max:t,step:m})=>`
      <v-slider
        label='${e}'
        min='${a}'
        max='${t}'
        step='${m}'
      />
    `)))}f.isMDXComponent=!0;const x=({min:s,max:r,step:e})=>`
      <v-slider
        min='${s}'
        max='${r}'
        step='${e}'
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
    \``}};const d=({min:s,max:r,step:e,start:a,end:t})=>`
      <v-slider
        min='${s}'
        max='${r}'
        step='${e}'
        start='${a}'
        end='${t}'
      />
    `;d.storyName="Range";d.args={min:0,max:100,start:10,end:90,step:10};d.parameters={storySource:{source:`({
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
    \``}};const $=({range:s,min:r,max:e,step:a,value:t})=>`
      <v-slider
        range='${s}'
        max='${e}'
        step='${a}'
        value='${t}'
      />
    `;$.storyName="Min range";$.args={range:"min",min:0,max:100,value:30,step:10};$.parameters={storySource:{source:`({
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
    \``}};const c=({range:s,min:r,max:e,step:a,value:t})=>`
      <v-slider
        range='${s}'
        max='${e}'
        step='${a}'
        value='${t}'
      />
    `;c.storyName="Max range";c.args={range:"max",min:0,max:100,value:70,step:10};c.parameters={storySource:{source:`({
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
    \``}};const v=({min:s,max:r,step:e,suffix:a})=>`
      <v-slider
        min='${s}'
        max='${r}'
        step='${e}'
        suffix='${a}'
      />
    `;v.storyName="With suffix";v.args={min:0,max:100,step:10,suffix:"ml"};v.parameters={storySource:{source:`({
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
    \``}};const y=({value:s,min:r,max:e,step:a})=>`
      <v-slider
        value='${s}'
        min='${r}'
        max='${e}'
        step='${a}'
      />
    `;y.storyName="With value";y.args={min:0,max:100,step:10,value:0};y.parameters={storySource:{source:`({
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
    \``}};const g=({label:s,min:r,max:e,step:a})=>`
      <v-slider
        label='${s}'
        min='${r}'
        max='${e}'
        step='${a}'
      />
    `;g.storyName="With label";g.args={min:0,max:100,step:10,label:"Soups eaten per day"};g.parameters={storySource:{source:`({
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
    \``}};const u={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["slider","range","minRange","maxRange","withSuffix","withValue","withLabel"]},w={Slider:"slider",Range:"range","Min range":"minRange","Max range":"maxRange","With suffix":"withSuffix","With value":"withValue","With label":"withLabel"};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:()=>n(b,{mdxStoryNameToKey:w,mdxComponentAnnotations:u},n(f,null))};const N=["slider","range","minRange","maxRange","withSuffix","withValue","withLabel"];export{N as __namedExportsOrder,u as default,c as maxRange,$ as minRange,d as range,x as slider,g as withLabel,v as withSuffix,y as withValue};
//# sourceMappingURL=slider.stories.5c605c80.js.map
