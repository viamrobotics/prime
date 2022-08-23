import"./jsx-runtime.c0d303d7.js";import{c as t,A as s,M as m,C as c,S as d}from"./Props.41dab331.js";import"./iframe.de3f4ce1.js";import"./es.map.constructor.bb84b5b5.js";import"./es.number.to-fixed.4910efe3.js";function l(){return l=Object.assign?Object.assign.bind():function(o){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(o[i]=n[i])}return o},l.apply(this,arguments)}const y={},u="wrapper";function r({components:o,...e}){return t(u,l({},y,e,{components:o,mdxType:"MDXLayout"}),t(m,{title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Tooltip"),t("p",null,"Used to display text box when hovering over an element. "),t(c,{mdxType:"Canvas"},t(d,{name:"Tooltip",args:{text:"Test information for the tooltip",location:"top"},mdxType:"Story"},({text:n,location:i})=>`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='${n}' location="${i}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    `)))}r.isMDXComponent=!0;const p=({text:o,location:e})=>`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='${o}' location="${e}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    `;p.storyName="Tooltip";p.args={text:"Test information for the tooltip",location:"top"};p.parameters={storySource:{source:`({
  text,
  location
}) => \`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='\${text}' location="\${location}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    \``}};const a={title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},includeStories:["tooltip"]},h={Tooltip:"tooltip"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>t(s,{mdxStoryNameToKey:h,mdxComponentAnnotations:a},t(r,null))};const b=["tooltip"];export{b as __namedExportsOrder,a as default,p as tooltip};
//# sourceMappingURL=tooltip.stories.462af2d6.js.map
