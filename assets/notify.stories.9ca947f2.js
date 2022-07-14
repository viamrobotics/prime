import"./index.5c7752e3.js";import{c as n,A as x,M as T,C as o,S as i}from"./Props.18bc2ebe.js";import"./iframe.156ce600.js";function y(){return y=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s])}return t},y.apply(this,arguments)}const M={},S="wrapper";function p({components:t,...a}){return n(S,y({},M,a,{components:t,mdxType:"MDXLayout"}),n(T,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",defaultValue:"info",table:{defaultValue:{summary:""}}},title:{description:"Title",control:"title text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},message:{description:"Message",control:"message text",defaultValue:"This is the message.",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),n("h1",null,"Notify"),n("p",null,"Notify message of type info, success, warning, or error"),n(o,{mdxType:"Canvas"},n(i,{name:"info",mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"success",args:{variant:"success"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"warning",args:{variant:"warning"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"error",args:{variant:"error"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        message='${s}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"no message info",mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"no message success",args:{variant:"success"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"no message warning",args:{variant:"warning"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        variant='${r}'
      >
      </v-notify>
    `)),n(o,{mdxType:"Canvas"},n(i,{name:"no message error",args:{variant:"error"},mdxType:"Story"},({title:e,message:s,variant:r})=>`
      <v-notify
        title='${e}'
        variant='${r}'
      >
      </v-notify>
    `)))}p.isMDXComponent=!0;const $=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;$.storyName="info";$.parameters={storySource:{source:`({
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
    \``}};const g=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;g.storyName="success";g.args={variant:"success"};g.parameters={storySource:{source:`({
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
    \``}};const v=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;v.storyName="warning";v.args={variant:"warning"};v.parameters={storySource:{source:`({
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
    \``}};const l=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        message='${a}'
        variant='${e}'
      >
      </v-notify>
    `;l.storyName="error";l.args={variant:"error"};l.parameters={storySource:{source:`({
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
    \``}};const d=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        variant='${e}'
      >
      </v-notify>
    `;d.storyName="no message info";d.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const c=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        variant='${e}'
      >
      </v-notify>
    `;c.storyName="no message success";c.args={variant:"success"};c.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const f=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        variant='${e}'
      >
      </v-notify>
    `;f.storyName="no message warning";f.args={variant:"warning"};f.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const u=({title:t,message:a,variant:e})=>`
      <v-notify
        title='${t}'
        variant='${e}'
      >
      </v-notify>
    `;u.storyName="no message error";u.args={variant:"error"};u.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      >
      </v-notify>
    \``}};const m={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",defaultValue:"info",table:{defaultValue:{summary:""}}},title:{description:"Title",control:"title text",defaultValue:"This is the title.",table:{defaultValue:{summary:""}}},message:{description:"Message",control:"message text",defaultValue:"This is the message.",table:{defaultValue:{summary:""}}}},includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError"]},w={info:"info",success:"success",warning:"warning",error:"error","no message info":"noMessageInfo","no message success":"noMessageSuccess","no message warning":"noMessageWarning","no message error":"noMessageError"};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:()=>n(x,{mdxStoryNameToKey:w,mdxComponentAnnotations:m},n(p,null))};const V=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError"];export{V as __namedExportsOrder,m as default,l as error,$ as info,u as noMessageError,d as noMessageInfo,c as noMessageSuccess,f as noMessageWarning,g as success,v as warning};
//# sourceMappingURL=notify.stories.9ca947f2.js.map
