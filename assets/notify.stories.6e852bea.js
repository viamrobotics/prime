import"./jsx-runtime.43511af8.js";import{c as t,A as T,M as w,C as r,S as o}from"./Props.57047784.js";import"./iframe.a5cfd064.js";import"./es.map.constructor.97246cdb.js";import"./es.number.to-fixed.74667566.js";function m(){return m=Object.assign?Object.assign.bind():function(a){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n])}return a},m.apply(this,arguments)}const x={},S="wrapper";function $({components:a,...s}){return t(S,m({},x,s,{components:a,mdxType:"MDXLayout"}),t(w,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},mdxType:"Meta"}),t("h1",null,"Notify"),t("p",null,"Notify message of type info, success, warning, or error"),t(r,{mdxType:"Canvas"},t(o,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:i})=>`
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
    `)),t(r,{mdxType:"Canvas"},t(o,{name:"White background",args:{variant:"error",title:"This is the title.",background:"white"},mdxType:"Story"},({title:e,variant:n,background:i})=>`
      <v-notify
        title='${e}'
        variant='${n}'
        background='${i}'
      />
    `)))}$.isMDXComponent=!0;const l=({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
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
    \``}};const c=({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
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
    \``}};const y=({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `;y.storyName="warning";y.args={variant:"warning",title:"This is the title.",message:"This is the message."};y.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const v=({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `;v.storyName="error";v.args={variant:"error",title:"This is the title.",message:"This is the message."};v.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const u=({title:a,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${a}'
      />
    `;u.storyName="no message info";u.args={variant:"info",title:"This is the title."};u.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const p=({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
      />
    `;p.storyName="no message success";p.args={variant:"success",title:"This is the title."};p.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=({title:a,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${a}'
      />
    `;f.storyName="no message warning";f.args={variant:"warning",title:"This is the title."};f.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const h=({title:a,variant:s})=>`
      <v-notify
        title='${a}'
        variant='${s}'
      />
    `;h.storyName="no message error";h.args={variant:"error",title:"This is the title."};h.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      />
    \``}};const d=({title:a,variant:s,background:e})=>`
      <v-notify
        title='${a}'
        variant='${s}'
        background='${e}'
      />
    `;d.storyName="White background";d.args={variant:"error",title:"This is the title.",background:"white"};d.parameters={storySource:{source:`({
  title,
  variant,
  background
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
        background='\${background}'
      />
    \``}};const g={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground"]},b={info:"info",success:"success",warning:"warning",error:"error","no message info":"noMessageInfo","no message success":"noMessageSuccess","no message warning":"noMessageWarning","no message error":"noMessageError","White background":"whiteBackground"};g.parameters=g.parameters||{};g.parameters.docs={...g.parameters.docs||{},page:()=>t(T,{mdxStoryNameToKey:b,mdxComponentAnnotations:g},t($,null))};const V=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground"];export{V as __namedExportsOrder,g as default,v as error,l as info,h as noMessageError,u as noMessageInfo,p as noMessageSuccess,f as noMessageWarning,c as success,y as warning,d as whiteBackground};
//# sourceMappingURL=notify.stories.6e852bea.js.map
