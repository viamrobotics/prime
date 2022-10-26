var b=Object.defineProperty;var n=(r,t)=>b(r,"name",{value:t,configurable:!0});import"./jsx-runtime.7c956129.js";import{c as e,A as d,M as p,C as i,S as l}from"./Props.56b8c1bc.js";import"./iframe.169a578e.js";import"./es.map.constructor.4ff1da2c.js";import"./es.number.to-fixed.f7388daa.js";function o(){return o=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var m in a)Object.prototype.hasOwnProperty.call(a,m)&&(r[m]=a[m])}return r},o.apply(this,arguments)}n(o,"_extends");const y={},f="wrapper";function c({components:r,...t}){return e(f,o({},y,t,{components:r,mdxType:"MDXLayout"}),e(p,{title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Breadcrumbs"),e("p",null,"A navigation aid that helps users easily understand the relation between parents and children"),e(i,{mdxType:"Canvas"},e(l,{name:"Breadcrumbs",args:{crumbs:"Crumb 1, Crumb 2"},mdxType:"Story"},({crumbs:a})=>`
      <v-breadcrumbs
        crumbs="${a}"
      />
    `)))}n(c,"MDXContent");c.isMDXComponent=!0;const u=n(({crumbs:r})=>`
      <v-breadcrumbs
        crumbs="${r}"
      />
    `,"breadcrumbs");u.storyName="Breadcrumbs";u.args={crumbs:"Crumb 1, Crumb 2"};u.parameters={storySource:{source:`({
  crumbs
}) => \`
      <v-breadcrumbs
        crumbs="\${crumbs}"
      />
    \``}};const s={title:"Elements/Breadcrumbs",argTypes:{crumbs:{description:"A list of breadcrumbs",table:{defaultValue:{summary:""}}}},includeStories:["breadcrumbs"]},g={Breadcrumbs:"breadcrumbs"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(d,{mdxStoryNameToKey:g,mdxComponentAnnotations:s},e(c,null))};const S=["breadcrumbs"];export{S as __namedExportsOrder,u as breadcrumbs,s as default};
//# sourceMappingURL=breadcrumbs.stories.0b476fd2.js.map
