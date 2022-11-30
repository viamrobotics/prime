var h=Object.defineProperty;var r=(a,e)=>h(a,"name",{value:e,configurable:!0});import"./jsx-runtime.edd43df9.js";import{c as t,A as y,M as f,C as v,S as g}from"./Props.d1f8dbc1.js";import"./iframe.eab4e074.js";import{j as d}from"./json-code-example.e31aa41c.js";import"./es.map.constructor.79cbb541.js";import"./es.number.to-fixed.3f3eb80b.js";const l=JSON.stringify({$schema:"http://json-schema.org/draft-04/schema#",$ref:"#/definitions/AttrConfig",definitions:{AttrConfig:{required:["token","host"],properties:{token:{type:"string",description:"string"},host:{type:"string",description:"string"}},additionalProperties:!1,type:"object"}}});function s(){return s=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])}return a},s.apply(this,arguments)}r(s,"_extends");const x={},b="wrapper";function p({components:a,...e}){return t(b,s({},x,e,{components:a,mdxType:"MDXLayout"}),t(f,{title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Code Editor"),t("p",null,"Uses ",t("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),t(v,{mdxType:"Canvas"},t(g,{name:"With validation",args:{value:d,schema:l},mdxType:"Story"},({value:o,theme:n,minimap:u,schema:c})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${o}'
        theme='${n}'
        minimap='${u}'
        schema='${c}'
      />
    </div>
    `)))}r(p,"MDXContent");p.isMDXComponent=!0;const m=r(({value:a,theme:e,minimap:o,schema:n})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${a}'
        theme='${e}'
        minimap='${o}'
        schema='${n}'
      />
    </div>
    `,"withValidation");m.storyName="With validation";m.args={value:d,schema:l};m.parameters={storySource:{source:`({
  value,
  theme,
  minimap,
  schema
}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='\${value}'
        theme='\${theme}'
        minimap='\${minimap}'
        schema='\${schema}'
      />
    </div>
    \``}};const i={title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["withValidation"]},$={"With validation":"withValidation"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>t(y,{mdxStoryNameToKey:$,mdxComponentAnnotations:i},t(p,null))};const E=["withValidation"];export{E as __namedExportsOrder,i as default,m as withValidation};
//# sourceMappingURL=json-editor.stories.5dcd32c6.js.map
