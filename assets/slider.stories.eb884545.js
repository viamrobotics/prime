import"./index.5c7752e3.js";import{c as e,A as c,M as y,C as u,S as o}from"./Props.e1f17ce8.js";import"./iframe.590f1be5.js";const $={},v="wrapper";function d({components:a,...n}){return e(v,{...$,...n,components:a,mdxType:"MDXLayout"},e(y,{title:"Elements/Slider",argTypes:{min:{description:"The minimum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(u,{mdxType:"Canvas"},e(o,{name:"Slider",args:{min:0,max:100,step:10},mdxType:"Story"},({min:t,max:m,step:r})=>`
      <v-slider
        min="${t}"
        max="${m}"
        step="${r}"
      />
    `)),e(u,{mdxType:"Canvas"},e(o,{name:"Multivalue",args:{min:0,max:100,start:10,end:90,step:10},mdxType:"Story"},({min:t,max:m,step:r,start:p,end:x})=>`
      <v-slider
        min="${t}"
        max="${m}"
        step="${r}"
        start="${p}"
        end="${x}"
      />
    `)))}d.isMDXComponent=!0;const l=({min:a,max:n,step:t})=>`
      <v-slider
        min="${a}"
        max="${n}"
        step="${t}"
      />
    `;l.storyName="Slider";l.args={min:0,max:100,step:10};l.parameters={storySource:{source:`({
  min,
  max,
  step
}) => \`
      <v-slider
        min="\${min}"
        max="\${max}"
        step="\${step}"
      />
    \``}};const i=({min:a,max:n,step:t,start:m,end:r})=>`
      <v-slider
        min="${a}"
        max="${n}"
        step="${t}"
        start="${m}"
        end="${r}"
      />
    `;i.storyName="Multivalue";i.args={min:0,max:100,start:10,end:90,step:10};i.parameters={storySource:{source:`({
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
    \``}};const s={title:"Elements/Slider",argTypes:{min:{description:"The minimum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}},max:{description:"The maxiumum value",control:"number",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["slider","multivalue"]},S={Slider:"slider",Multivalue:"multivalue"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:S,mdxComponentAnnotations:s},e(d,null))};export{s as default,i as multivalue,l as slider};
//# sourceMappingURL=slider.stories.eb884545.js.map
