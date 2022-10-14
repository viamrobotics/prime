var c=Object.defineProperty;var s=(t,e)=>c(t,"name",{value:e,configurable:!0});import"./jsx-runtime.463b8ded.js";import{c as a,A as y,M as v,C as b,S as g}from"./Props.88a4c731.js";import"./iframe.24dbdcb5.js";import"./es.map.constructor.d0b89e0d.js";import"./es.number.to-fixed.c34bc9f2.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},i.apply(this,arguments)}s(i,"_extends");const h={},T="wrapper";function d({components:t,...e}){return a(T,i({},h,e,{components:t,mdxType:"MDXLayout"}),a(v,{title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}}},mdxType:"Meta"}),a("h1",null,"Modal"),a("p",null,"Creates a modal overlay"),a(b,{mdxType:"Canvas"},a(g,{name:"Delete",args:{title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},mdxType:"Story"},({title:n,message:o,variant:l,buttonText:p,open:u})=>`
      <div style="height: 16rem">
        <v-modal
          ${u?"open":""}
          title='${n}'
          message='${o}'
        >
          <v-button
            class='ml-4'
            variant='${l}'
            label='${p}'
            slot='action'
          />
        </v-modal>
      </div>
    `)))}s(d,"MDXContent");d.isMDXComponent=!0;const m=s(({title:t,message:e,variant:n,buttonText:o,open:l})=>`
      <div style="height: 16rem">
        <v-modal
          ${l?"open":""}
          title='${t}'
          message='${e}'
        >
          <v-button
            class='ml-4'
            variant='${n}'
            label='${o}'
            slot='action'
          />
        </v-modal>
      </div>
    `,"deleteStory");m.storyName="Delete";m.args={title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0};m.parameters={storySource:{source:`({
  title,
  message,
  variant,
  buttonText,
  open
}) => \`
      <div style="height: 16rem">
        <v-modal
          \${open ? "open" : ""}
          title='\${title}'
          message='\${message}'
        >
          <v-button
            class='ml-4'
            variant='\${variant}'
            label='\${buttonText}'
            slot='action'
          />
        </v-modal>
      </div>
    \``}};const r={title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}}},includeStories:["deleteStory"]},x={Delete:"deleteStory"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>a(y,{mdxStoryNameToKey:x,mdxComponentAnnotations:r},a(d,null))};const C=["deleteStory"];export{C as __namedExportsOrder,r as default,m as deleteStory};
//# sourceMappingURL=modal.stories.9a8291c5.js.map
