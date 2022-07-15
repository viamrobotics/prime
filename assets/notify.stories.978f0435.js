import"./jsx-runtime.a71c9d3a.js";import{c as t,A as T,M as d,C as r,S as o}from"./Props.485ca562.js";import"./iframe.c317b4d1.js";function g(){return g=Object.assign?Object.assign.bind():function(s){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(s[n]=e[n])}return s},g.apply(this,arguments)}const M={},x="wrapper";function h({components:s,...a}){return t(x,g({},M,a,{components:s,mdxType:"MDXLayout"}),t(d,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Notify"),t("p",null,"Notify message of type info, success, warning, or error"),t(r,{mdxType:"Canvas"},t(o,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${e}'
        message='${n}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${e}'
        message='${n}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${e}'
        message='${n}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"error",args:{variant:"error",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${e}'
        message='${n}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"no message info",args:{variant:"info",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"no message success",args:{variant:"success",title:"This is the title."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
      <v-notify
        variant='${i}'
        title='${e}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"no message warning",args:{variant:"warning",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"no message error",args:{variant:"error",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        title='${e}'
        variant='${n}'
      />
    `)))}h.isMDXComponent=!0;const l=({title:s,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${s}'
        message='${a}'
      />
    `;l.storyName="info";l.args={variant:"info",title:"This is the title.",message:"This is the message."};l.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const c=({title:s,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${s}'
        message='${a}'
      />
    `;c.storyName="success";c.args={variant:"success",title:"This is the title.",message:"This is the message."};c.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const v=({title:s,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${s}'
        message='${a}'
      />
    `;v.storyName="warning";v.args={variant:"warning",title:"This is the title.",message:"This is the message."};v.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const y=({title:s,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${s}'
        message='${a}'
      />
    `;y.storyName="error";y.args={variant:"error",title:"This is the title.",message:"This is the message."};y.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const u=({title:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${s}'
      />
    `;u.storyName="no message info";u.args={variant:"info",title:"This is the title."};u.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=({title:s,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${s}'
      />
    `;f.storyName="no message success";f.args={variant:"success",title:"This is the title."};f.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const p=({title:s,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${s}'
      />
    `;p.storyName="no message warning";p.args={variant:"warning",title:"This is the title."};p.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const $=({title:s,variant:a})=>`
      <v-notify
        title='${s}'
        variant='${a}'
      />
    `;$.storyName="no message error";$.args={variant:"error",title:"This is the title."};$.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      />
    \``}};const m={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}}},includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError"]},S={info:"info",success:"success",warning:"warning",error:"error","no message info":"noMessageInfo","no message success":"noMessageSuccess","no message warning":"noMessageWarning","no message error":"noMessageError"};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:()=>t(T,{mdxStoryNameToKey:S,mdxComponentAnnotations:m},t(h,null))};const b=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError"];export{b as __namedExportsOrder,m as default,y as error,l as info,$ as noMessageError,u as noMessageInfo,f as noMessageSuccess,p as noMessageWarning,c as success,v as warning};
//# sourceMappingURL=notify.stories.978f0435.js.map
