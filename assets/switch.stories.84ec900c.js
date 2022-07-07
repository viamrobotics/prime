import"./index.5c7752e3.js";import{c as t,A as i,M as c,C as l,S as u}from"./Props.2832cebf.js";import"./iframe.6a49ddc2.js";const p={},h="wrapper";function a({components:o,...s}){return t(h,{...p,...s,components:o,mdxType:"MDXLayout"},t(c,{title:"Elements/Switch",argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},mdxType:"Meta"}),t("h1",null,"Switch"),t("p",null,"Used to handle binary input."),t(l,{mdxType:"Canvas"},t(u,{name:"Switch",mdxType:"Story"},({value:r})=>`
      <v-switch
        value='${r}'
      />
    `)))}a.isMDXComponent=!0;const n=({value:o})=>`
      <v-switch
        value='${o}'
      />
    `;n.storyName="Switch";n.parameters={storySource:{source:`({
  value
}) => \`
      <v-switch
        value='\${value}'
      />
    \``}};const e={title:"Elements/Switch",argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},includeStories:["switchStory"]},m={Switch:"switchStory"};e.parameters=e.parameters||{};e.parameters.docs={...e.parameters.docs||{},page:()=>t(i,{mdxStoryNameToKey:m,mdxComponentAnnotations:e},t(a,null))};export{e as default,n as switchStory};
//# sourceMappingURL=switch.stories.84ec900c.js.map
