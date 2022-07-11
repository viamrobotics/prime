import"./index.5c7752e3.js";import{c as e,A as u,M as y,C as p,S as d}from"./Props.ed0d98fa.js";import"./iframe.175d2946.js";function r(){return r=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])}return a},r.apply(this,arguments)}const b={},h="wrapper";function c({components:a,...t}){return e(h,r({},b,t,{components:a,mdxType:"MDXLayout"}),e(y,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",control:"text",table:{defaultValue:{summary:""}}},label:{description:"An optional label",control:"text",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(p,{mdxType:"Canvas"},e(d,{name:"Radio",args:{options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:o,selected:n})=>`
      <v-radio
        options="${o}"
        selected="${n}"
      />
    `)),e(p,{mdxType:"Canvas"},e(d,{name:"With label",args:{label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:o,selected:n,label:m})=>`
      <v-radio
        label='${m}'
        options='${o}'
        selected='${n}'
      />
    `)))}c.isMDXComponent=!0;const l=({options:a,selected:t})=>`
      <v-radio
        options="${a}"
        selected="${t}"
      />
    `;l.storyName="Radio";l.args={options:"Opt 1, Opt 2",selected:"Opt 1"};l.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const i=({options:a,selected:t,label:o})=>`
      <v-radio
        label='${o}'
        options='${a}'
        selected='${t}'
      />
    `;i.storyName="With label";i.args={label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"};i.parameters={storySource:{source:`({
  options,
  selected,
  label
}) => \`
      <v-radio
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const s={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",control:"text",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",control:"text",table:{defaultValue:{summary:""}}},label:{description:"An optional label",control:"text",table:{defaultValue:{summary:""}}}},includeStories:["radio","withLabel"]},x={Radio:"radio","With label":"withLabel"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:x,mdxComponentAnnotations:s},e(c,null))};const $=["radio","withLabel"];export{$ as __namedExportsOrder,s as default,l as radio,i as withLabel};
//# sourceMappingURL=radio.stories.1f57698e.js.map
