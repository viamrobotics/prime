import"./jsx-runtime.4fc96cdb.js";import{c as t,A as $,M as f,C as p,S as u}from"./Props.747abe38.js";import"./iframe.c1607b9f.js";function b(){return b=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&(n[l]=e[l])}return n},b.apply(this,arguments)}const x={},T="wrapper";function v({components:n,...a}){return t(T,b({},x,a,{components:n,mdxType:"MDXLayout"}),t(f,{title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},mdxType:"Meta"}),t("h1",null,"Input"),t("p",null,"Used for all text single-line user inputs."),t(p,{mdxType:"Canvas"},t(u,{name:"Text",args:{type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Number",args:{type:"number",label:"Amount of soup",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"No label",args:{type:"number",placeholder:"0",value:""},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r})=>`
      <v-input
        type='${e}'
        placeholder='${o}'
        value='${r}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label",args:{label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r,labelPosition:i})=>`
      <v-input
        label='${l}'
        placeholder='${o}'
        value='${r}'
        labelposition='${i}'
      />
    `)),t(p,{mdxType:"Canvas"},t(u,{name:"Left label with number",args:{type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"},mdxType:"Story"},({type:e,label:l,placeholder:o,value:r,labelPosition:i})=>`
      <v-input
        type='${e}'
        label='${l}'
        placeholder='${o}'
        value='${r}'
        labelposition='${i}'
      />
    `)))}v.isMDXComponent=!0;const m=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${l}'
      />
    `;m.storyName="Text";m.args={type:"text",label:"Favorite soup",placeholder:"Enter soup here",value:"Minestrone"};m.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
      <v-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
      />
    \``}};const c=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${l}'
      />
    `;c.storyName="Number";c.args={type:"number",label:"Amount of soup",placeholder:"0",value:""};c.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
      <v-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
      />
    \``}};const d=({type:n,label:a,placeholder:e,value:l})=>`
      <v-input
        type='${n}'
        placeholder='${e}'
        value='${l}'
      />
    `;d.storyName="No label";d.args={type:"number",placeholder:"0",value:""};d.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value
}) => \`
      <v-input
        type='\${type}'
        placeholder='\${placeholder}'
        value='\${value}'
      />
    \``}};const y=({type:n,label:a,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        label='${a}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;y.storyName="Left label";y.args={label:"Whose soup?",placeholder:"Enter name",value:"",labelPosition:"left"};y.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  labelPosition
}) => \`
      <v-input
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
        labelposition='\${labelPosition}'
      />
    \``}};const h=({type:n,label:a,placeholder:e,value:l,labelPosition:o})=>`
      <v-input
        type='${n}'
        label='${a}'
        placeholder='${e}'
        value='${l}'
        labelposition='${o}'
      />
    `;h.storyName="Left label with number";h.args={type:"number",label:"Soups?",placeholder:"Enter name",value:"",labelPosition:"left"};h.parameters={storySource:{source:`({
  type,
  label,
  placeholder,
  value,
  labelPosition
}) => \`
      <v-input
        type='\${type}'
        label='\${label}'
        placeholder='\${placeholder}'
        value='\${value}'
        labelposition='\${labelPosition}'
      />
    \``}};const s={title:"Elements/Input",parameters:{actions:{handles:["input"]}},argTypes:{type:{description:"The input type",control:"select",options:["text","email","number"],table:{defaultValue:{summary:"text"}}},label:{description:"The input label",table:{defaultValue:{summary:""}}},placeholder:{description:"The input placeholder text",table:{defaultValue:{summary:""}}},value:{description:"The starting input value",table:{defaultValue:{summary:""}}},labelposition:{description:"The label position",control:{type:"select"},options:["top","left"],table:{defaultValue:{summary:"top"}}},"on:input":{description:"Event fired whenever the input changes"}},includeStories:["text","number","noLabel","leftLabel","leftLabelWithNumber"]},g={Text:"text",Number:"number","No label":"noLabel","Left label":"leftLabel","Left label with number":"leftLabelWithNumber"};s.parameters=s.parameters||{};s.parameters.docs={...s.parameters.docs||{},page:()=>t($,{mdxStoryNameToKey:g,mdxComponentAnnotations:s},t(v,null))};const E=["text","number","noLabel","leftLabel","leftLabelWithNumber"];export{E as __namedExportsOrder,s as default,y as leftLabel,h as leftLabelWithNumber,d as noLabel,c as number,m as text};
//# sourceMappingURL=input.stories.0fdfde9e.js.map
