import"./index.5c7752e3.js";import{c as t,A as i,M as d,C as l,S as m}from"./Props.e2ae650b.js";import"./iframe.5bf69ef9.js";const c={},u="wrapper";function n({components:o,...a}){return t(u,{...c,...a,components:o,mdxType:"MDXLayout"},t(d,{title:"Elements/Radio",argTypes:{options:{description:"The list of options",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Radio"),t("p",null,"For user triggered actions"),t(l,{mdxType:"Canvas"},t(m,{name:"Radio",args:{options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:r,selected:p})=>`
      <v-radio
        options="${r}"
        selected="${p}"
      />
    `)))}n.isMDXComponent=!0;const s=({options:o,selected:a})=>`
      <v-radio
        options="${o}"
        selected="${a}"
      />
    `;s.storyName="Radio";s.args={options:"Opt 1, Opt 2",selected:"Opt 1"};s.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const e={title:"Elements/Radio",argTypes:{options:{description:"The list of options",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["radio"]},y={Radio:"radio"};e.parameters=e.parameters||{};e.parameters.docs={...e.parameters.docs||{},page:()=>t(i,{mdxStoryNameToKey:y,mdxComponentAnnotations:e},t(n,null))};export{e as default,s as radio};
//# sourceMappingURL=radio.stories.a3eaa5ca.js.map
