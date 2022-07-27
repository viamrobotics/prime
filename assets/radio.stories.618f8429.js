import"./jsx-runtime.feedc71a.js";import{c as e,A as u,M as y,C as p,S as d}from"./Props.9904186e.js";import"./iframe.7c357ea0.js";import"./es.map.constructor.60f2ba11.js";import"./es.number.to-fixed.37ffc8e7.js";function r(){return r=Object.assign?Object.assign.bind():function(a){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])}return a},r.apply(this,arguments)}const b={},h="wrapper";function c({components:a,...t}){return e(h,r({},b,t,{components:a,mdxType:"MDXLayout"}),e(y,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(p,{mdxType:"Canvas"},e(d,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},mdxType:"Story"},({options:o,selected:n})=>`
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
    `)))}c.isMDXComponent=!0;const i=({options:a,selected:t})=>`
      <v-radio
        options="${a}"
        selected="${t}"
      />
    `;i.storyName="Radio";i.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"};i.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const l=({options:a,selected:t,label:o})=>`
      <v-radio
        label='${o}'
        options='${a}'
        selected='${t}'
      />
    `;l.storyName="With label";l.args={label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"};l.parameters={storySource:{source:`({
  options,
  selected,
  label
}) => \`
      <v-radio
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const s={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["radio","withLabel"]},O={Radio:"radio","With label":"withLabel"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:O,mdxComponentAnnotations:s},e(c,null))};const x=["radio","withLabel"];export{x as __namedExportsOrder,s as default,i as radio,l as withLabel};
//# sourceMappingURL=radio.stories.618f8429.js.map
