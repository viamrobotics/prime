import"./jsx-runtime.075e6adc.js";import{c as t,A as y,M as b,C as r,S as l}from"./Props.45ffb380.js";import"./iframe.a076ae40.js";function o(){return o=Object.assign?Object.assign.bind():function(s){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(s[a]=e[a])}return s},o.apply(this,arguments)}const h={},S="wrapper";function f({components:s,...n}){return t(S,o({},h,n,{components:s,mdxType:"MDXLayout"}),t(b,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Slider"),t("p",null,"For user triggered actions"),t(r,{mdxType:"Canvas"},t(l,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:e,max:a,step:i})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${i}'
      />
    `)),t(r,{mdxType:"Canvas"},t(l,{name:"Multivalue",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:e,max:a,step:i,start:m,end:v})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${i}'
        start='${m}'
        end='${v}'
      />
    `)),t(r,{mdxType:"Canvas"},t(l,{name:"With suffix",args:{min:0,max:100,step:10,suffix:"ml"},mdxType:"Story"},({min:e,max:a,step:i,suffix:m})=>`
      <v-slider
        min='${e}'
        max='${a}'
        step='${i}'
        suffix='${m}'
      />
    `)),t(r,{mdxType:"Canvas"},t(l,{name:"With value",args:{min:0,max:100,step:10,value:0},mdxType:"Story"},({value:e,min:a,max:i,step:m})=>`
      <v-slider
        value='${e}'
        min='${a}'
        max='${i}'
        step='${m}'
      />
    `)),t(r,{mdxType:"Canvas"},t(l,{name:"With label",args:{min:0,max:100,step:10,label:"Soups eaten per day"},mdxType:"Story"},({label:e,min:a,max:i,step:m})=>`
      <v-slider
        label='${e}'
        min='${a}'
        max='${i}'
        step='${m}'
      />
    `)))}f.isMDXComponent=!0;const p=({min:s,max:n,step:e})=>`
      <v-slider
        min='${s}'
        max='${n}'
        step='${e}'
      />
    `;p.storyName="Slider";p.args={min:0,max:100,step:10};p.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min='\${min}'
        max='\${max}'
        step='\${step}'
      />
    \``}};const d=({min:s,max:n,step:e,start:a,end:i})=>`
      <v-slider
        min='${s}'
        max='${n}'
        step='${e}'
        start='${a}'
        end='${i}'
      />
    `;d.storyName="Multivalue";d.args={min:0,max:100,start:10,end:90,step:10};d.parameters={storySource:{source:`({
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
    \``}};const x=({min:s,max:n,step:e,suffix:a})=>`
      <v-slider
        min='${s}'
        max='${n}'
        step='${e}'
        suffix='${a}'
      />
    `;x.storyName="With suffix";x.args={min:0,max:100,step:10,suffix:"ml"};x.parameters={storySource:{source:`({
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
    \``}};const c=({value:s,min:n,max:e,step:a})=>`
      <v-slider
        value='${s}'
        min='${n}'
        max='${e}'
        step='${a}'
      />
    `;c.storyName="With value";c.args={min:0,max:100,step:10,value:0};c.parameters={storySource:{source:`({
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
    \``}};const $=({label:s,min:n,max:e,step:a})=>`
      <v-slider
        label='${s}'
        min='${n}'
        max='${e}'
        step='${a}'
      />
    `;$.storyName="With label";$.args={min:0,max:100,step:10,label:"Soups eaten per day"};$.parameters={storySource:{source:`({
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
    \``}};const u={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:0}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:100}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:1}}},value:{description:"An optional starting value",control:"number",table:{defaultValue:{summary:"(min + max) / 2"}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},suffix:{description:"An optional suffix",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["slider","multivalue","withSuffix","withValue","withLabel"]},g={Slider:"slider",Multivalue:"multivalue","With suffix":"withSuffix","With value":"withValue","With label":"withLabel"};u.parameters=u.parameters||{};u.parameters.docs={...u.parameters.docs||{},page:()=>t(y,{mdxStoryNameToKey:g,mdxComponentAnnotations:u},t(f,null))};const A=["slider","multivalue","withSuffix","withValue","withLabel"];export{A as __namedExportsOrder,u as default,d as multivalue,p as slider,$ as withLabel,x as withSuffix,c as withValue};
//# sourceMappingURL=slider.stories.8a900fb9.js.map
