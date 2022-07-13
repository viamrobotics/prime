import"./index.5c7752e3.js";import{c as t,A as g,M as p,C as o,S as l}from"./Props.a7eef7fb.js";import"./iframe.fcd91b50.js";function m(){return m=Object.assign?Object.assign.bind():function(n){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s])}return n},m.apply(this,arguments)}const d={},$="wrapper";function f({components:n,...a}){return t($,m({},d,a,{components:n,mdxType:"MDXLayout"}),t(p,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",defaultValue:"info",table:{defaultValue:{summary:""}}},title:{description:"Title",control:"title text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},message:{description:"Message",control:"message text",defaultValue:"This is the message.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Notify"),t("p",null,"Notify message of type info, success, warning, or error"),t(o,{mdxType:"Canvas"},t(l,{name:"info",mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"success",args:{variant:"success"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"warning",args:{variant:"warning"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"error",args:{variant:"error"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)))}f.isMDXComponent=!0;const v=({title:n,message:a,variant:e})=>`
      <v-notify
        title='${n}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;v.storyName="info";v.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        message='\${message}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const y=({title:n,message:a,variant:e})=>`
      <v-notify
        title='${n}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;y.storyName="success";y.args={variant:"success"};y.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        message='\${message}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const c=({title:n,message:a,variant:e})=>`
      <v-notify
        title='${n}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;c.storyName="warning";c.args={variant:"warning"};c.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        message='\${message}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const u=({title:n,message:a,variant:e})=>`
      <v-notify
        title='${n}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;u.storyName="error";u.args={variant:"error"};u.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        message='\${message}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const i={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",defaultValue:"info",table:{defaultValue:{summary:""}}},title:{description:"Title",control:"title text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},message:{description:"Message",control:"message text",defaultValue:"This is the message.",table:{defaultValue:{summary:""}}}},includeStories:["info","success","warning","error"]},x={info:"info",success:"success",warning:"warning",error:"error"};i.parameters=i.parameters||{};i.parameters.docs={...i.parameters.docs||{},page:()=>t(g,{mdxStoryNameToKey:x,mdxComponentAnnotations:i},t(f,null))};const S=["info","success","warning","error"];export{S as __namedExportsOrder,i as default,u as error,v as info,y as success,c as warning};
//# sourceMappingURL=notify.stories.42ab8525.js.map
