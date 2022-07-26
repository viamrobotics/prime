import"./jsx-runtime.df297713.js";import{c as a,A as i,M as p,C as l,S as u}from"./Props.60be290b.js";import"./iframe.55ee7d4e.js";function r(){return r=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},r.apply(this,arguments)}const d={},y="wrapper";function c({components:n,...e}){return a(y,r({},d,e,{components:n,mdxType:"MDXLayout"}),a(p,{title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},mdxType:"Meta"}),a("h1",null,"Icon"),a(l,{mdxType:"Canvas"},a(u,{name:"Icon",args:{name:"camera",size:"base"},mdxType:"Story"},({name:t,size:s})=>`
      <v-icon
        name='${t}'
        size='${s}'
      />
    `)))}c.isMDXComponent=!0;const m=({name:n,size:e})=>`
      <v-icon
        name='${n}'
        size='${e}'
      />
    `;m.storyName="Icon";m.args={name:"camera",size:"base"};m.parameters={storySource:{source:`({
  name,
  size
}) => \`
      <v-icon
        name='\${name}'
        size='\${size}'
      />
    \``}};const o={title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},includeStories:["icon"]},b={Icon:"icon"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(i,{mdxStoryNameToKey:b,mdxComponentAnnotations:o},a(c,null))};const T=["icon"];export{T as __namedExportsOrder,o as default,m as icon};
//# sourceMappingURL=icon.stories.2cbcc7a8.js.map
