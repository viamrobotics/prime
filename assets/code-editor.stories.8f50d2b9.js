import"./jsx-runtime.39a69237.js";import{c as e,A as p,M as m,C as l,S as c}from"./Props.43cc716d.js";import"./iframe.d6834302.js";import"./es.map.constructor.c2e9bd1b.js";import"./es.number.to-fixed.734c4025.js";function s(){return s=Object.assign?Object.assign.bind():function(r){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(r[a]=n[a])}return r},s.apply(this,arguments)}const u={},g="wrapper";function d({components:r,...t}){return e(g,s({},u,t,{components:r,mdxType:"MDXLayout"}),e(m,{title:"Elements/Code Editor",parameters:{},argTypes:{},mdxType:"Meta"}),e("h1",null,"Code Editor"),e("p",null,"Uses ",e("inlineCode",{parentName:"p"},"monaco")," for syntax-highlighting."),e(l,{mdxType:"Canvas"},e(c,{name:"JSON editor",args:{},mdxType:"Story"},({})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='{ foo: "bar" }'
        language='json'
      />
    </div>
    `)))}d.isMDXComponent=!0;const i=({})=>`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='{ foo: "bar" }'
        language='json'
      />
    </div>
    `;i.storyName="JSON editor";i.args={};i.parameters={storySource:{source:`({}) => \`
    <div style='width: 400px; height: 400px;'>
      <v-code-editor 
        value='{ foo: "bar" }'
        language='json'
      />
    </div>
    \``}};const o={title:"Elements/Code Editor",parameters:{},argTypes:{},includeStories:["jsonEditor"]},y={"JSON editor":"jsonEditor"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(p,{mdxStoryNameToKey:y,mdxComponentAnnotations:o},e(d,null))};const E=["jsonEditor"];export{E as __namedExportsOrder,o as default,i as jsonEditor};
//# sourceMappingURL=code-editor.stories.8f50d2b9.js.map
