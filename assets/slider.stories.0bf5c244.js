import"./jsx-runtime.c0e8ee6e.js";import{c as t,A as y,M as v,C as u,S as p}from"./Props.86b94550.js";import"./iframe.5bc893a2.js";function i(){return i=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a])}return r},i.apply(this,arguments)}const $={},b="wrapper";function d({components:r,...n}){return t(b,i({},$,n,{components:r,mdxType:"MDXLayout"}),t(v,{title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:""}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),t("h1",null,"Slider"),t("p",null,"For user triggered actions"),t(u,{mdxType:"Canvas"},t(p,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:e,max:a,step:s})=>`
      <v-slider
        min="${e}"
        max="${a}"
        step="${s}"
      />
    `)),t(u,{mdxType:"Canvas"},t(p,{name:"Multivalue",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:e,max:a,step:s,start:c,end:x})=>`
      <v-slider
        min="${e}"
        max="${a}"
        step="${s}"
        start="${c}"
        end="${x}"
      />
    `)))}d.isMDXComponent=!0;const o=({min:r,max:n,step:e})=>`
      <v-slider
        min="${r}"
        max="${n}"
        step="${e}"
      />
    `;o.storyName="Slider";o.args={min:0,max:100,step:10};o.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min="\${min}"
        max="\${max}"
        step="\${step}"
      />
    \``}};const l=({min:r,max:n,step:e,start:a,end:s})=>`
      <v-slider
        min="${r}"
        max="${n}"
        step="${e}"
        start="${a}"
        end="${s}"
      />
    `;l.storyName="Multivalue";l.args={min:0,max:100,start:10,end:90,step:10};l.parameters={storySource:{source:`({
  min,
  max,
  step,
  start,
  end
}) => \`
      <v-slider
        min="\${min}"
        max="\${max}"
        step="\${step}"
        start="\${start}"
        end="\${end}"
      />
    \``}};const m={title:"Elements/Slider",parameters:{actions:{handles:["input","click"]}},argTypes:{min:{description:"The minimum value",control:"number",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",table:{defaultValue:{summary:""}}},step:{description:"An optional discrete step between values",control:"number",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["slider","multivalue"]},f={Slider:"slider",Multivalue:"multivalue"};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:()=>t(y,{mdxStoryNameToKey:f,mdxComponentAnnotations:m},t(d,null))};const h=["slider","multivalue"];export{h as __namedExportsOrder,m as default,l as multivalue,o as slider};
//# sourceMappingURL=slider.stories.0bf5c244.js.map
