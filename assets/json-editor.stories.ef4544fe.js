import"./jsx-runtime.c53d8267.js";import{c as e,A as c,M as h,C as y,S as f}from"./Props.2476ec14.js";import"./iframe.501ffeae.js";import{j as m}from"./json-code-example.e31aa41c.js";import"./es.map.constructor.322186fb.js";import"./es.number.to-fixed.361e2a81.js";const d=JSON.stringify({$schema:"http://json-schema.org/draft-04/schema#",$ref:"#/definitions/AttrConfig",definitions:{AttrConfig:{required:["token","host"],properties:{token:{type:"string",description:"string"},host:{type:"string",description:"string"}},additionalProperties:!1,type:"object"}}});function r(){return r=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(n[o]=a[o])}return n},r.apply(this,arguments)}const v={},g="wrapper";function l({components:n,...t}){return e(g,r({},v,t,{components:n,mdxType:"MDXLayout"}),e(h,{title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Code Editor"),e("p",null,"Uses ",e("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),e(y,{mdxType:"Canvas"},e(f,{name:"With validation",args:{value:m,schema:d},mdxType:"Story"},({value:a,theme:o,minimap:p,schema:u})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${a}'
        theme='${o}'
        minimap='${p}'
        schema='${u}'
      />
    </div>
    `)))}l.isMDXComponent=!0;const s=({value:n,theme:t,minimap:a,schema:o})=>`
    <div style='width: 400px; height: 400px;'>
      <v-json-editor
        value='${n}'
        theme='${t}'
        minimap='${a}'
        schema='${o}'
      />
    </div>
    `;s.storyName="With validation";s.args={value:m,schema:d};s.parameters={storySource:{source:`({
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
    \``}};const i={title:"Elements/JSON Editor",parameters:{actions:{handles:["blur","destroy","input","resize","update-markers","update-model"]}},argTypes:{value:{description:"The content for the editor",table:{defaultValue:{summary:""}}},theme:{description:"The `monaco` theme to use",control:{type:"select"},options:["vs","vs-dark"],table:{defaultValue:{summary:"vs"}}},minimap:{description:"Determines if the editor should render the minimap",control:{type:"select"},options:["true","false"],table:{defaultValue:{summary:"false"}}},uri:{description:"When defined, is passed to `window.monaco.editor.createModel`",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["withValidation"]},x={"With validation":"withValidation"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:x,mdxComponentAnnotations:i},e(l,null))};const V=["withValidation"];export{V as __namedExportsOrder,i as default,s as withValidation};
//# sourceMappingURL=json-editor.stories.ef4544fe.js.map
