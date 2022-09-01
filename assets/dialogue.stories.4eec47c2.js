import"./jsx-runtime.0733ae78.js";import{c as e,A as d,M as c,C as y,S as g}from"./Props.6d2f3d2b.js";import"./iframe.d09fda60.js";import"./es.map.constructor.44dfcf82.js";import"./es.number.to-fixed.bf390618.js";function l(){return l=Object.assign?Object.assign.bind():function(o){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(o[n]=a[n])}return o},l.apply(this,arguments)}const b={},v="wrapper";function u({components:o,...t}){return e(v,l({},b,t,{components:o,mdxType:"MDXLayout"}),e(c,{title:"Elements/dialogue",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether dialogue is open",control:{type:"boolean"}}},mdxType:"Meta"}),e("h1",null,"Dialogue"),e("p",null,"Creates a dialogue overlay"),e(y,{mdxType:"Canvas"},e(g,{name:"delete",args:{title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0},mdxType:"Story"},({title:a,message:n,variant:s,buttonText:m,open:p})=>`
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
    `)))}u.isMDXComponent=!0;const i=({title:o,message:t,variant:a,buttonText:n,open:s})=>`
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
    `;i.storyName="delete";i.args={title:"Delete example.",message:"Are you sure you want to delete this?",buttonText:"DELETE",variant:"danger",open:!0};i.parameters={storySource:{source:`({
  title,
  message,
  variant,
  buttonText,
  open
}) => \`
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
    \``}};const r={title:"Elements/dialogue",parameters:{actions:{handles:["toggle"]}},argTypes:{title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},buttonText:{description:"The button text",table:{defaultValue:{summary:"DELETE"}}},variant:{description:"The communicated action type of the button",control:"select",options:["primary","inverse-primary","success","danger","outline-danger"],table:{defaultValue:{summary:"primary"}}},open:{description:"Used to control whether dialogue is open",control:{type:"boolean"}}},includeStories:["deleteStory"]},T={delete:"deleteStory"};r.parameters=r.parameters||{};r.parameters.docs={...r.parameters.docs||{},page:()=>e(d,{mdxStoryNameToKey:T,mdxComponentAnnotations:r},e(u,null))};const D=["deleteStory"];export{D as __namedExportsOrder,r as default,i as deleteStory};
//# sourceMappingURL=dialogue.stories.4eec47c2.js.map
