import"./jsx-runtime.d3dc9ec1.js";import{c as e,A as u,M as c,C as y,S as v}from"./Props.3806e6d4.js";import"./iframe.c7f61d24.js";import"./es.map.constructor.345c58da.js";import"./es.number.to-fixed.c899f12d.js";function l(){return l=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o[n]=a[n])}return o},l.apply(this,arguments)}const b={},g="wrapper";function m({components:o,...t}){return e(g,l({},b,t,{components:o,mdxType:"MDXLayout"}),e(c,{title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}}},mdxType:"Meta"}),e("h1",null,"Modal"),e("p",null,"Creates a modal overlay"),e(y,{mdxType:"Canvas"},e(v,{name:"Delete",args:{title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},mdxType:"Story"},({title:a,message:n,variant:s,buttonText:d,open:p})=>`
      <div style="height: 16rem">
        <v-modal
          ${p?"open":""}
          title='${a}'
          message='${n}'
        >
          <v-button
            class='ml-4'
            variant='${s}'
            label='${d}'
            slot='action'
          />
        </v-modal>
      </div>
    `)))}m.isMDXComponent=!0;const i=({title:o,message:t,variant:a,buttonText:n,open:s})=>`
      <div style="height: 16rem">
        <v-modal
          ${s?"open":""}
          title='${o}'
          message='${t}'
        >
          <v-button
            class='ml-4'
            variant='${a}'
            label='${n}'
            slot='action'
          />
        </v-modal>
      </div>
    `;i.storyName="Delete";i.args={title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0};i.parameters={storySource:{source:`({
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
    \``}};const r={title:"Elements/Modal",parameters:{actions:{handles:["close"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether modal is open",control:{type:"boolean"}}},includeStories:["deleteStory"]},h={Delete:"deleteStory"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(u,{mdxStoryNameToKey:h,mdxComponentAnnotations:r},e(m,null))};const D=["deleteStory"];export{D as __namedExportsOrder,r as default,i as deleteStory};
//# sourceMappingURL=modal.stories.6a2e1fb2.js.map
