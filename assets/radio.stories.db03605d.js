var h=Object.defineProperty;var s=(o,t)=>h(o,"name",{value:t,configurable:!0});import"./jsx-runtime.207dc377.js";import{c as n,A as T,M as f,C as p,S as r}from"./Props.7e08bb99.js";import"./iframe.330dd21f.js";import"./es.map.constructor.32a4fa87.js";import"./es.number.to-fixed.af02e979.js";function d(){return d=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(o[a]=e[a])}return o},d.apply(this,arguments)}s(d,"_extends");const g={},v="wrapper";function b({components:o,...t}){return n(v,d({},g,t,{components:o,mdxType:"MDXLayout"}),n(f,{title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},mdxType:"Meta"}),n("h1",null,"Radio"),n("p",null,"For user triggered actions"),n(p,{mdxType:"Canvas"},n(r,{name:"Radio",args:{options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"},mdxType:"Story"},({options:e,selected:a})=>`
      <v-radio
        options="${e}"
        selected="${a}"
      />
    `)),n(p,{mdxType:"Canvas"},n(r,{name:"With label",args:{label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"},mdxType:"Story"},({options:e,selected:a,label:i})=>`
      <v-radio
        label='${i}'
        options='${e}'
        selected='${a}'
      />
    `)),n(p,{mdxType:"Canvas"},n(r,{name:"Tooltip and state",args:{label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"},mdxType:"Story"},({label:e,options:a,selected:i,placeholder:y,tooltip:$,state:O})=>`
      <v-radio
        label='${e}'
        selected='${i}'
        options='${a}'
        tooltip='${$}'
        state='${O}'
      />
    `)))}s(b,"MDXContent");b.isMDXComponent=!0;const c=s(({options:o,selected:t})=>`
      <v-radio
        options="${o}"
        selected="${t}"
      />
    `,"radio");c.storyName="Radio";c.args={options:"Opt 1, Opt 2, Opt 3",selected:"Opt 1"};c.parameters={storySource:{source:`({
  options,
  selected
}) => \`
      <v-radio
        options="\${options}"
        selected="\${selected}"
      />
    \``}};const m=s(({options:o,selected:t,label:e})=>`
      <v-radio
        label='${e}'
        options='${o}'
        selected='${t}'
      />
    `,"withLabel");m.storyName="With label";m.args={label:"These are your options",options:"Opt 1, Opt 2",selected:"Opt 1"};m.parameters={storySource:{source:`({
  options,
  selected,
  label
}) => \`
      <v-radio
        label='\${label}'
        options='\${options}'
        selected='\${selected}'
      />
    \``}};const u=s(({label:o,options:t,selected:e,placeholder:a,tooltip:i,state:y})=>`
      <v-radio
        label='${o}'
        selected='${e}'
        options='${t}'
        tooltip='${i}'
        state='${y}'
      />
    `,"tooltipAndState");u.storyName="Tooltip and state";u.args={label:"Your options",options:"Option 1, Option 2, Option 3",selected:"Option 1",tooltip:"Warning: these options may not be your only options.",state:"warn"};u.parameters={storySource:{source:`({
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
    \``}};const l={title:"Elements/Radio",parameters:{actions:{handles:["input"]}},argTypes:{options:{description:"The list of options",table:{defaultValue:{summary:""}}},selected:{description:"The selected option",table:{defaultValue:{summary:""}}},label:{description:"An optional label",table:{defaultValue:{summary:""}}},"on:input":{description:"Event fired when an option is selected"}},includeStories:["radio","withLabel","tooltipAndState"]},x={Radio:"radio","With label":"withLabel","Tooltip and state":"tooltipAndState"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>n(T,{mdxStoryNameToKey:x,mdxComponentAnnotations:l},n(b,null))};const L=["radio","withLabel","tooltipAndState"];export{L as __namedExportsOrder,l as default,c as radio,u as tooltipAndState,m as withLabel};
//# sourceMappingURL=radio.stories.db03605d.js.map
