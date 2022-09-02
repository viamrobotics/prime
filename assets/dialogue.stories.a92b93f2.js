import"./jsx-runtime.c53d8267.js";import{c as e,A as d,M as c,C as y,S as g}from"./Props.2476ec14.js";import"./iframe.501ffeae.js";import"./es.map.constructor.322186fb.js";import"./es.number.to-fixed.361e2a81.js";function l(){return l=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o[n]=a[n])}return o},l.apply(this,arguments)}const v={},b="wrapper";function u({components:o,...t}){return e(b,l({},v,t,{components:o,mdxType:"MDXLayout"}),e(c,{title:"Elements/Dialogue",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether dialogue is open",control:{type:"boolean"}}},mdxType:"Meta"}),e("h1",null,"Dialogue"),e("p",null,"Creates a dialogue overlay"),e(y,{mdxType:"Canvas"},e(g,{name:"Delete",args:{title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},mdxType:"Story"},({title:a,message:n,variant:s,buttonText:m,open:p})=>`
      <div style="height: 16rem">
        <v-dialogue
          ${p?"open":""}
          title='${a}'
          message='${n}'
        >
          <v-button
            class='ml-4'
            variant='${s}'
            label='${m}'
          />
        </v-dialogue>
      </div>
    `)))}u.isMDXComponent=!0;const i=({title:o,message:t,variant:a,buttonText:n,open:s})=>`
      <div style="height: 16rem">
        <v-dialogue
          ${s?"open":""}
          title='${o}'
          message='${t}'
        >
          <v-button
            class='ml-4'
            variant='${a}'
            label='${n}'
          />
        </v-dialogue>
      </div>
    `;i.storyName="Delete";i.args={title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0};i.parameters={storySource:{source:`({
  title,
  message,
  variant,
  buttonText,
  open
}) => \`
      <div style="height: 16rem">
        <v-dialogue
          \${open ? "open" : ""}
          title='\${title}'
          message='\${message}'
        >
          <v-button
            class='ml-4'
            variant='\${variant}'
            label='\${buttonText}'
          />
        </v-dialogue>
      </div>
    \``}};const r={title:"Elements/Dialogue",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether dialogue is open",control:{type:"boolean"}}},includeStories:["deleteStory"]},h={Delete:"deleteStory"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(d,{mdxStoryNameToKey:h,mdxComponentAnnotations:r},e(u,null))};const $=["deleteStory"];export{$ as __namedExportsOrder,r as default,i as deleteStory};
//# sourceMappingURL=dialogue.stories.a92b93f2.js.map
