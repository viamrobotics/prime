import"./jsx-runtime.e4e9cc55.js";import{c as a,A as c,M as p,C as l,S as u}from"./Props.2328207e.js";import"./iframe.6ccd6cc5.js";import"./es.map.constructor.aa538d5c.js";import"./es.number.to-fixed.4d2c66cd.js";function r(){return r=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(n[s]=t[s])}return n},r.apply(this,arguments)}const d={},y="wrapper";function i({components:n,...e}){return a(y,r({},d,e,{components:n,mdxType:"MDXLayout"}),a(p,{title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},mdxType:"Meta"}),a("h1",null,"Icon"),a(l,{mdxType:"Canvas"},a(u,{name:"Icon",args:{name:"camera",size:"base"},mdxType:"Story"},({name:t,size:s})=>`
      <v-icon
        name='${t}'
        size='${s}'
      />
    `)))}i.isMDXComponent=!0;const m=({name:n,size:e})=>`
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
    \``}};const o={title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},includeStories:["icon"]},b={Icon:"icon"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>a(c,{mdxStoryNameToKey:b,mdxComponentAnnotations:o},a(i,null))};const h=["icon"];export{h as __namedExportsOrder,o as default,m as icon};
//# sourceMappingURL=icon.stories.ee133e31.js.map
