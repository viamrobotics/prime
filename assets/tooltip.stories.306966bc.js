import"./jsx-runtime.075e6adc.js";import{c as t,A as f,M as d,C as p,S as r}from"./Props.45ffb380.js";import"./iframe.a076ae40.js";function l(){return l=Object.assign?Object.assign.bind():function(o){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(o[i]=n[i])}return o},l.apply(this,arguments)}const h={},v="wrapper";function y({components:o,...e}){return t(v,l({},h,e,{components:o,mdxType:"MDXLayout"}),t(d,{title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Tooltip"),t("p",null,"Used to display text box when hovering over an element. "),t(p,{mdxType:"Canvas"},t(r,{name:"top",args:{text:"Test information for the tooltip"},mdxType:"Story"},({text:n})=>`
      <v-tooltip text='${n}'>
        <p>Hover here</p>
      </v-tooltip>
    `)),t(p,{mdxType:"Canvas"},t(r,{name:"Bottom",args:{location:"bottom",text:"Test information for the tooltip"},mdxType:"Story"},({location:n,text:i})=>`
      <v-tooltip
        location='${n}'
        text='${i}'
      >
        <p>Text</p>
      </v-tooltip>
    `)),t(p,{mdxType:"Canvas"},t(r,{name:"right",args:{location:"right",text:"Test information for the tooltip"},mdxType:"Story"},({location:n,text:i})=>`
      <v-tooltip
        location='${n}'
        text='${i}'
      >
        <p>Text</p>
      </v-tooltip>
    `)),t(p,{mdxType:"Canvas"},t("div",null),t(r,{name:"Left",args:{location:"left",text:"Test information for the tooltip"},mdxType:"Story"},({location:n,text:i})=>`
      <v-tooltip
        location='${n}'
        text='${i}'
      >
        <p>Text</p>
      </v-tooltip>
    `)))}y.isMDXComponent=!0;const s=({text:o})=>`
      <v-tooltip text='${o}'>
        <p>Hover here</p>
      </v-tooltip>
    `;s.storyName="top";s.args={text:"Test information for the tooltip"};s.parameters={storySource:{source:`({
  text
}) => \`
      <v-tooltip text='\${text}'>
        <p>Hover here</p>
      </v-tooltip>
    \``}};const m=({location:o,text:e})=>`
      <v-tooltip
        location='${o}'
        text='${e}'
      >
        <p>Text</p>
      </v-tooltip>
    `;m.storyName="Bottom";m.args={location:"bottom",text:"Test information for the tooltip"};m.parameters={storySource:{source:`({
  location,
  text
}) => \`
      <v-tooltip
        location='\${location}'
        text='\${text}'
      >
        <p>Text</p>
      </v-tooltip>
    \``}};const c=({location:o,text:e})=>`
      <v-tooltip
        location='${o}'
        text='${e}'
      >
        <p>Text</p>
      </v-tooltip>
    `;c.storyName="right";c.args={location:"right",text:"Test information for the tooltip"};c.parameters={storySource:{source:`({
  location,
  text
}) => \`
      <v-tooltip
        location='\${location}'
        text='\${text}'
      >
        <p>Text</p>
      </v-tooltip>
    \``}};const x=({location:o,text:e})=>`
      <v-tooltip
        location='${o}'
        text='${e}'
      >
        <p>Text</p>
      </v-tooltip>
    `;x.storyName="Left";x.args={location:"left",text:"Test information for the tooltip"};x.parameters={storySource:{source:`({
  location,
  text
}) => \`
      <v-tooltip
        location='\${location}'
        text='\${text}'
      >
        <p>Text</p>
      </v-tooltip>
    \``}};const a={title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},includeStories:["top","bottom","right","left"]},T={top:"top",Bottom:"bottom",right:"right",Left:"left"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>t(f,{mdxStoryNameToKey:T,mdxComponentAnnotations:a},t(y,null))};const b=["top","bottom","right","left"];export{b as __namedExportsOrder,m as bottom,a as default,x as left,c as right,s as top};
//# sourceMappingURL=tooltip.stories.306966bc.js.map
