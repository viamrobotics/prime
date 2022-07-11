import"./index.5c7752e3.js";import{c as t,A as y,M as $,C as o,S as d}from"./Props.55eba346.js";import"./iframe.9a87bb0c.js";function l(){return l=Object.assign?Object.assign.bind():function(r){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n])}return r},l.apply(this,arguments)}const v={},f="wrapper";function p({components:r,...a}){return t(f,l({},v,a,{components:r,mdxType:"MDXLayout"}),t($,{title:"Elements/Slider",argTypes:{min:{description:"The minimum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Radio"),t("p",null,"For user triggered actions"),t(o,{mdxType:"Canvas"},t(d,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:e,max:n,step:m})=>`
      <v-slider
        min="${e}"
        max="${n}"
        step="${m}"
      />
    `)),t(o,{mdxType:"Canvas"},t(d,{name:"Multivalue",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:e,max:n,step:m,start:c,end:x})=>`
      <v-slider
        min="${e}"
        max="${n}"
        step="${m}"
        start="${c}"
        end="${x}"
      />
    `)))}p.isMDXComponent=!0;const i=({min:r,max:a,step:e})=>`
      <v-slider
        min="${r}"
        max="${a}"
        step="${e}"
      />
    `;i.storyName="Slider";i.args={min:0,max:100,step:10};i.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min="\${min}"
        max="\${max}"
        step="\${step}"
      />
    \``}};const u=({min:r,max:a,step:e,start:n,end:m})=>`
      <v-slider
        min="${r}"
        max="${a}"
        step="${e}"
        start="${n}"
        end="${m}"
      />
    `;u.storyName="Multivalue";u.args={min:0,max:100,start:10,end:90,step:10};u.parameters={storySource:{source:`({
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
    \``}};const s={title:"Elements/Slider",argTypes:{min:{description:"The minimum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["slider","multivalue"]},g={Slider:"slider",Multivalue:"multivalue"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>t(y,{mdxStoryNameToKey:g,mdxComponentAnnotations:s},t(p,null))};const M=["slider","multivalue"];export{M as __namedExportsOrder,s as default,u as multivalue,i as slider};
//# sourceMappingURL=slider.stories.43a11b8d.js.map
