import"./jsx-runtime.075e6adc.js";import{c as r,A as c,M as b,C as d,S as p}from"./Props.45ffb380.js";import"./iframe.a076ae40.js";function m(){return m=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},m.apply(this,arguments)}const l={},i="wrapper";function o({components:e,...a}){return r(i,m({},l,a,{components:e,mdxType:"MDXLayout"}),r(b,{title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),r("h1",null,"Breadcrumbs"),r("p",null,"A navigation aid that helps users easily understand the relation between parents and children"),r(d,{mdxType:"Canvas"},r(p,{name:"Breadcrumbs",args:{crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({crumbs:t})=>`
      <v-breadcrumbs
        crumbs="${t}"
      />
    `)))}o.isMDXComponent=!0;const u=({crumbs:e})=>`
      <v-breadcrumbs
        crumbs="${e}"
      />
    `;u.storyName="Breadcrumbs";u.args={crumbs:"Crumb 1, Crumb 2"};u.parameters={storySource:{source:`({
  crumbs
}) => \`
      <v-breadcrumbs
        crumbs="\${crumbs}"
      />
    \``}};const s={title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},includeStories:["breadcrumbs"]},y={Breadcrumbs:"breadcrumbs"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>r(c,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},r(o,null))};const C=["breadcrumbs"];export{C as __namedExportsOrder,u as breadcrumbs,s as default};
//# sourceMappingURL=breadcrumbs.stories.52b67ac5.js.map
