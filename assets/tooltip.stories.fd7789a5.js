var m=Object.defineProperty;var l=(e,t)=>m(e,"name",{value:t,configurable:!0});import"./jsx-runtime.62a5b3b9.js";import{c as o,A as c,M as d,C as y,S as u}from"./Props.c70c1159.js";import"./iframe.955807a8.js";import"./es.map.constructor.e721a4f2.js";import"./es.number.to-fixed.d6275c24.js";function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},p.apply(this,arguments)}l(p,"_extends");const h={},x="wrapper";function s({components:e,...t}){return o(x,p({},h,t,{components:e,mdxType:"MDXLayout"}),o(d,{title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),o("h1",null,"Tooltip"),o("p",null,"Used to display text box when hovering over an element. "),o(y,{mdxType:"Canvas"},o(u,{name:"Tooltip",args:{text:"Test information for the tooltip",location:"top"},mdxType:"Story"},({text:n,location:i})=>`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='${n}' location="${i}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    `)))}l(s,"MDXContent");s.isMDXComponent=!0;const r=l(({text:e,location:t})=>`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='${e}' location="${t}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    `,"tooltip");r.storyName="Tooltip";r.args={text:"Test information for the tooltip",location:"top"};r.parameters={storySource:{source:`({
  text,
  location
}) => \`
    <div style="width: 100%; height: 200px; display: flex; align-items: center; justify-content:center">
        <v-tooltip text='\${text}' location="\${location}">
          <p>Hover here</p>
        </v-tooltip>
    <div>
    \``}};const a={title:"Elements/Tooltip",argTypes:{location:{description:"The placement of the tooltip/tooltip direction",control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"top"}}},text:{description:"The message displayed within the tooltip",table:{defaultValue:{summary:""}}}},includeStories:["tooltip"]},f={Tooltip:"tooltip"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>o(c,{mdxStoryNameToKey:f,mdxComponentAnnotations:a},o(s,null))};const C=["tooltip"];export{C as __namedExportsOrder,a as default,r as tooltip};
//# sourceMappingURL=tooltip.stories.fd7789a5.js.map
