import"./index.5c7752e3.js";import{c as t,A as l,M as p,C as u,S as m}from"./Props.55eba346.js";import"./iframe.9a87bb0c.js";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s])}return e},r.apply(this,arguments)}const h={},d="wrapper";function i({components:e,...n}){return t(d,r({},h,n,{components:e,mdxType:"MDXLayout"}),t(p,{title:"Elements/Switch",argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},mdxType:"Meta"}),t("h1",null,"Switch"),t("p",null,"Used to handle binary input."),t(u,{mdxType:"Canvas"},t(m,{name:"Switch",mdxType:"Story"},({value:o})=>`
      <v-switch
        value='${o}'
      />
    `)))}i.isMDXComponent=!0;const c=({value:e})=>`
      <v-switch
        value='${e}'
      />
    `;c.storyName="Switch";c.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const a={title:"Elements/Switch",argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},includeStories:["switchStory"]},y={Switch:"switchStory"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>t(l,{mdxStoryNameToKey:y,mdxComponentAnnotations:a},t(i,null))};const S=["switchStory"];export{S as __namedExportsOrder,a as default,c as switchStory};
//# sourceMappingURL=switch.stories.8deeb379.js.map
