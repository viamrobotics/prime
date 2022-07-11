import"./index.5c7752e3.js";import{c as t,A as p,M as l,C as u,S as m}from"./Props.ed0d98fa.js";import"./iframe.175d2946.js";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},r.apply(this,arguments)}const h={},d="wrapper";function i({components:e,...n}){return t(d,r({},h,n,{components:e,mdxType:"MDXLayout"}),t(l,{title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},mdxType:"Meta"}),t("h1",null,"Switch"),t("p",null,"Used to handle binary input."),t(u,{mdxType:"Canvas"},t(m,{name:"Switch",mdxType:"Story"},({value:a})=>`
      <v-switch
        value='${a}'
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
    \``}};const o={title:"Elements/Switch",parameters:{actions:{handles:["input"]}},argTypes:{value:{control:{type:"select"},options:["on","off"],description:"Whether or not the switch is on.",defaultValue:"off",table:{defaultValue:{summary:"off"}}},onInput:{action:"onInput",description:"Callback that fires when input value changes."}},includeStories:["switchStory"]},y={Switch:"switchStory"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>t(p,{mdxStoryNameToKey:y,mdxComponentAnnotations:o},t(i,null))};const S=["switchStory"];export{S as __namedExportsOrder,o as default,c as switchStory};
//# sourceMappingURL=switch.stories.71b9e264.js.map
