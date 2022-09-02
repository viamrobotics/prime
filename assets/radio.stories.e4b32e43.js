import"./jsx-runtime.c53d8267.js";import{c as e,A as O,M as h,C as l,S as p}from"./Props.2476ec14.js";import"./iframe.501ffeae.js";import"./es.map.constructor.322186fb.js";import"./es.number.to-fixed.361e2a81.js";function r(){return r=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])}return n},r.apply(this,arguments)}const T={},f="wrapper";function y({components:n,...o}){return e(f,r({},T,o,{components:n,mdxType:"MDXLayout"}),e(h,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),e("h1",null,"Radio"),e("p",null,"For user triggered actions"),e(l,{mdxType:"Canvas"},e(p,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},mdxType:"Story"},({options:t,selected:a})=>`
      <v-radio
        options="${t}"
        selected="${a}"
      />
    `)),e(l,{mdxType:"Canvas"},e(p,{name:"With label",args:{label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:t,selected:a,label:s})=>`
      <v-radio
        label='${s}'
        options='${t}'
        selected='${a}'
      />
    `)),e(l,{mdxType:"Canvas"},e(p,{name:"Tooltip and state",args:{label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:t,options:a,selected:s,placeholder:u,tooltip:b,state:$})=>`
      <v-radio
        label='${t}'
        selected='${s}'
        options='${a}'
        tooltip='${b}'
        state='${$}'
      />
    `)))}y.isMDXComponent=!0;const d=({options:n,selected:o})=>`
      <v-radio
        options="${n}"
        selected="${o}"
      />
    `;d.storyName="Radio";d.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"};d.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const c=({options:n,selected:o,label:t})=>`
      <v-radio
        label='${t}'
        options='${n}'
        selected='${o}'
      />
    `;c.storyName="With label";c.args={label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"};c.parameters={storySource:{source:`({
  options,
  selected,
  label
}) => \`
      <v-radio
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const m=({label:n,options:o,selected:t,placeholder:a,tooltip:s,state:u})=>`
      <v-radio
        label='${n}'
        selected='${t}'
        options='${o}'
        tooltip='${s}'
        state='${u}'
      />
    `;m.storyName="Tooltip and state";m.args={label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"};m.parameters={storySource:{source:`({
  label,
  options,
  selected,
  placeholder,
  tooltip,
  state
}) => \`
      <v-radio
        label='\${label}'
        selected='\${selected}'
        options='\${options}'
        tooltip='\${tooltip}'
        state='\${state}'
      />
    \``}};const i={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["radio","withLabel","tooltipAndState"]},g={Radio:"radio","With label":"withLabel","Tooltip and state":"tooltipAndState"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>e(O,{mdxStoryNameToKey:g,mdxComponentAnnotations:i},e(y,null))};const C=["radio","withLabel","tooltipAndState"];export{C as __namedExportsOrder,i as default,d as radio,m as tooltipAndState,c as withLabel};
//# sourceMappingURL=radio.stories.e4b32e43.js.map
