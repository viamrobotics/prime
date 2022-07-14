import"./index.5c7752e3.js";import{c as r,A as c,M as b,C as d,S as l}from"./Props.18bc2ebe.js";import"./iframe.156ce600.js";function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},m.apply(this,arguments)}const p={},i="wrapper";function o({components:e,...t}){return r(i,m({},p,t,{components:e,mdxType:"MDXLayout"}),r(b,{title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),r("h1",null,"Breadcrumbs"),r("p",null,"A navigation aid that helps users easily understand the relation between parents and children"),r(d,{mdxType:"Canvas"},r(l,{name:"Breadcrumbs",args:{crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({crumbs:a})=>`
      <v-breadcrumbs
        crumbs="${a}"
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
    \``}};const s={title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["breadcrumbs"]},y={Breadcrumbs:"breadcrumbs"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>r(c,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},r(o,null))};const C=["breadcrumbs"];export{C as __namedExportsOrder,u as breadcrumbs,s as default};
//# sourceMappingURL=breadcrumbs.stories.a66cbc63.js.map
