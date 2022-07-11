import"./index.5c7752e3.js";import{c as t,A as d,M as l,C as m,S as c}from"./Props.55eba346.js";import"./iframe.9a87bb0c.js";function r(){return r=Object.assign?Object.assign.bind():function(o){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o[n]=a[n])}return o},r.apply(this,arguments)}const u={},y="wrapper";function i({components:o,...e}){return t(y,r({},u,e,{components:o,mdxType:"MDXLayout"}),t(l,{title:"Elements/Radio",argTypes:{options:{description:"The list of options",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Radio"),t("p",null,"For user triggered actions"),t(m,{mdxType:"Canvas"},t(c,{name:"Radio",args:{options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:a,selected:n})=>`
      <v-radio
        options="${a}"
        selected="${n}"
      />
    `)))}i.isMDXComponent=!0;const p=({options:o,selected:e})=>`
      <v-radio
        options="${o}"
        selected="${e}"
      />
    `;p.storyName="Radio";p.args={options:"Opt 1, Opt 2",selected:"Opt 1"};p.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const s={title:"Elements/Radio",argTypes:{options:{description:"The list of options",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["radio"]},f={Radio:"radio"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>t(d,{mdxStoryNameToKey:f,mdxComponentAnnotations:s},t(i,null))};const T=["radio"];export{T as __namedExportsOrder,s as default,p as radio};
//# sourceMappingURL=radio.stories.f6bb620e.js.map
