import"./jsx-runtime.9bd372df.js";import{c as r,A as c,M as b,C as d,S as p}from"./Props.fa366eda.js";import"./iframe.fb1d1e64.js";import"./es.map.constructor.3305660c.js";import"./es.number.to-fixed.79c9486b.js";function m(){return m=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},m.apply(this,arguments)}const i={},l="wrapper";function u({components:e,...t}){return r(l,m({},i,t,{components:e,mdxType:"MDXLayout"}),r(b,{title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),r("h1",null,"Breadcrumbs"),r("p",null,"A navigation aid that helps users easily understand the relation between parents and children"),r(d,{mdxType:"Canvas"},r(p,{name:"Breadcrumbs",args:{crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({crumbs:a})=>`
      <v-breadcrumbs
        crumbs="${a}"
      />
    `)))}u.isMDXComponent=!0;const o=({crumbs:e})=>`
      <v-breadcrumbs
        crumbs="${e}"
      />
    `;o.storyName="Breadcrumbs";o.args={crumbs:"Crumb 1, Crumb 2"};o.parameters={storySource:{source:`({
  crumbs
}) => \`
      <v-breadcrumbs
        crumbs="\${crumbs}"
      />
    \``}};const s={title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},includeStories:["breadcrumbs"]},y={Breadcrumbs:"breadcrumbs"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>r(c,{mdxStoryNameToKey:y,mdxComponentAnnotations:s},r(u,null))};const h=["breadcrumbs"];export{h as __namedExportsOrder,o as breadcrumbs,s as default};
//# sourceMappingURL=breadcrumbs.stories.745442bf.js.map
