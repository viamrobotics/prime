var x=Object.defineProperty;var i=(a,s)=>x(a,"name",{value:s,configurable:!0});import"./jsx-runtime.6e777b16.js";import{c as t,A as w,M as b,C as o,S as l}from"./Props.545a03b6.js";import"./iframe.c30d9a2a.js";import"./es.map.constructor.f1864e09.js";import"./es.number.to-fixed.e109b206.js";function g(){return g=Object.assign?Object.assign.bind():function(a){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n])}return a},g.apply(this,arguments)}i(g,"_extends");const M={},N="wrapper";function T({components:a,...s}){return t(N,g({},M,s,{components:a,mdxType:"MDXLayout"}),t(b,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},mdxType:"Meta"}),t("h1",null,"Notify"),t("p",null,"Notify message of type info, success, warning, or error"),t(o,{mdxType:"Canvas"},t(l,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"error",args:{variant:"error",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"no message info",args:{variant:"info",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"no message success",args:{variant:"success",title:"This is the title."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"no message warning",args:{variant:"warning",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"no message error",args:{variant:"error",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        title='${e}'
        variant='${n}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"White background",args:{variant:"error",title:"This is the title.",background:"white"},mdxType:"Story"},({title:e,variant:n,background:r})=>`
      <v-notify
        title='${e}'
        variant='${n}'
        background='${r}'
      />
    `)),t(o,{mdxType:"Canvas"},t(l,{name:"Slot",mdxType:"Story"},()=>`
      <v-notify>Slot example</v-notify>
    `)))}i(T,"MDXContent");T.isMDXComponent=!0;const c=i(({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `,"info");c.storyName="info";c.args={variant:"info",title:"This is the title.",message:"This is the message."};c.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const y=i(({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `,"success");y.storyName="success";y.args={variant:"success",title:"This is the title.",message:"This is the message."};y.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const v=i(({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `,"warning");v.storyName="warning";v.args={variant:"warning",title:"This is the title.",message:"This is the message."};v.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const u=i(({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
        message='${s}'
      />
    `,"error");u.storyName="error";u.args={variant:"error",title:"This is the title.",message:"This is the message."};u.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
        message='\${message}'
      />
    \``}};const p=i(({title:a,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${a}'
      />
    `,"noMessageInfo");p.storyName="no message info";p.args={variant:"info",title:"This is the title."};p.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=i(({title:a,message:s,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${a}'
      />
    `,"noMessageSuccess");f.storyName="no message success";f.args={variant:"success",title:"This is the title."};f.parameters={storySource:{source:`({
  title,
  message,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const d=i(({title:a,variant:s})=>`
      <v-notify
        variant='${s}'
        title='${a}'
      />
    `,"noMessageWarning");d.storyName="no message warning";d.args={variant:"warning",title:"This is the title."};d.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const h=i(({title:a,variant:s})=>`
      <v-notify
        title='${a}'
        variant='${s}'
      />
    `,"noMessageError");h.storyName="no message error";h.args={variant:"error",title:"This is the title."};h.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      />
    \``}};const $=i(({title:a,variant:s,background:e})=>`
      <v-notify
        title='${a}'
        variant='${s}'
        background='${e}'
      />
    `,"whiteBackground");$.storyName="White background";$.args={variant:"error",title:"This is the title.",background:"white"};$.parameters={storySource:{source:`({
  title,
  variant,
  background
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
        background='\${background}'
      />
    \``}};const S=i(()=>`
      <v-notify>Slot example</v-notify>
    `,"slot");S.storyName="Slot";S.parameters={storySource:{source:"() => `\n      <v-notify>Slot example</v-notify>\n    `"}};const m={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"]},k={info:"info",success:"success",warning:"warning",error:"error","no message info":"noMessageInfo","no message success":"noMessageSuccess","no message warning":"noMessageWarning","no message error":"noMessageError","White background":"whiteBackground",Slot:"slot"};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:()=>t(w,{mdxStoryNameToKey:k,mdxComponentAnnotations:m},t(T,null))};const D=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground","slot"];export{D as __namedExportsOrder,m as default,u as error,c as info,h as noMessageError,p as noMessageInfo,f as noMessageSuccess,d as noMessageWarning,S as slot,y as success,v as warning,$ as whiteBackground};
//# sourceMappingURL=notify.stories.ad241d63.js.map
