import"./jsx-runtime.075e6adc.js";import{c as a,A as c,M as p,C as l,S as u}from"./Props.45ffb380.js";import"./iframe.a076ae40.js";function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},o.apply(this,arguments)}const y={},d="wrapper";function i({components:t,...e}){return a(d,o({},y,e,{components:t,mdxType:"MDXLayout"}),a(p,{title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},mdxType:"Meta"}),a("h1",null,"Icon"),a(l,{mdxType:"Canvas"},a(u,{name:"gray",args:{name:"camera",size:"base"},mdxType:"Story"},({name:n,size:s})=>`
      <v-icon
        name='${n}'
        size='${s}'
      />
    `)))}i.isMDXComponent=!0;const m=({name:t,size:e})=>`
      <v-icon
        name='${t}'
        size='${e}'
      />
    `;m.storyName="gray";m.args={name:"camera",size:"base"};m.parameters={storySource:{source:`({
  name,
  size
}) => \`
      <v-icon
        name='\${name}'
        size='\${size}'
      />
    \``}};const r={title:"Elements/Icon",argTypes:{name:{description:"The icon name",table:{defaultValue:{summary:""}}},size:{description:"The badge status",control:{type:"select"},options:["xs","sm","base","lg","xl"],table:{defaultValue:{summary:"base"}}}},includeStories:["gray"]},g={gray:"gray"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>a(c,{mdxStoryNameToKey:g,mdxComponentAnnotations:r},a(i,null))};const T=["gray"];export{T as __namedExportsOrder,r as default,m as gray};
//# sourceMappingURL=icon.stories.892fc0fc.js.map
