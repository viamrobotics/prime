import"./index.5c7752e3.js";import{c as e,A as n,M as o,C as c,S as b}from"./Props.318fd20d.js";import"./iframe.831d7428.js";const d={},l="wrapper";function s({components:a,...m}){return e(l,{...d,...m,components:a,mdxType:"MDXLayout"},e(o,{title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Breadcrumbs"),e("p",null,"A navigation aid that helps users easily understand the relation between parents and children"),e(c,{mdxType:"Canvas"},e(b,{name:"Breadcrumbs",args:{crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({crumbs:u})=>`
      <v-breadcrumbs
        crumbs="${u}"
      />
    `)))}s.isMDXComponent=!0;const t=({crumbs:a})=>`
      <v-breadcrumbs
        crumbs="${a}"
      />
    `;t.storyName="Breadcrumbs";t.args={crumbs:"Crumb 1, Crumb 2"};t.parameters={storySource:{source:`({
  crumbs
}) => \`
      <v-breadcrumbs
        crumbs="\${crumbs}"
      />
    \``}};const r={title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",control:"text",defaultValue:"",table:{defaultValue:{summary:""}}}},includeStories:["breadcrumbs"]},p={Breadcrumbs:"breadcrumbs"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(n,{mdxStoryNameToKey:p,mdxComponentAnnotations:r},e(s,null))};export{t as breadcrumbs,r as default};
//# sourceMappingURL=breadcrumbs.stories.66092008.js.map
