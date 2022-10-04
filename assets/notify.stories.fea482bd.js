var w=Object.defineProperty;var i=(t,a)=>w(t,"name",{value:a,configurable:!0});import"./jsx-runtime.cfb825f3.js";import{c as s,A as x,M as S,C as o,S as g}from"./Props.2d443bab.js";import"./iframe.ab471664.js";import"./es.map.constructor.5cc9a37b.js";import"./es.number.to-fixed.e10b300b.js";function l(){return l=Object.assign?Object.assign.bind():function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},l.apply(this,arguments)}i(l,"_extends");const b={},M="wrapper";function T({components:t,...a}){return s(M,l({},b,a,{components:t,mdxType:"MDXLayout"}),s(S,{title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},mdxType:"Meta"}),s("h1",null,"Notify"),s("p",null,"Notify message of type info, success, warning, or error"),s(o,{mdxType:"Canvas"},s(g,{name:"info",args:{variant:"info",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"success",args:{variant:"success",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"warning",args:{variant:"warning",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"error",args:{variant:"error",title:"This is the title.",message:"This is the message."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
        message='${n}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"no message info",args:{variant:"info",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"no message success",args:{variant:"success",title:"This is the title."},mdxType:"Story"},({title:e,message:n,variant:r})=>`
      <v-notify
        variant='${r}'
        title='${e}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"no message warning",args:{variant:"warning",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        variant='${n}'
        title='${e}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"no message error",args:{variant:"error",title:"This is the title."},mdxType:"Story"},({title:e,variant:n})=>`
      <v-notify
        title='${e}'
        variant='${n}'
      />
    `)),s(o,{mdxType:"Canvas"},s(g,{name:"White background",args:{variant:"error",title:"This is the title.",background:"white"},mdxType:"Story"},({title:e,variant:n,background:r})=>`
      <v-notify
        title='${e}'
        variant='${n}'
        background='${r}'
      />
    `)))}i(T,"MDXContent");T.isMDXComponent=!0;const c=i(({title:t,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${t}'
        message='${a}'
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
    \``}};const y=i(({title:t,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${t}'
        message='${a}'
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
    \``}};const v=i(({title:t,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${t}'
        message='${a}'
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
    \``}};const u=i(({title:t,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${t}'
        message='${a}'
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
    \``}};const p=i(({title:t,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${t}'
      />
    `,"noMessageInfo");p.storyName="no message info";p.args={variant:"info",title:"This is the title."};p.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const f=i(({title:t,message:a,variant:e})=>`
      <v-notify
        variant='${e}'
        title='${t}'
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
    \``}};const h=i(({title:t,variant:a})=>`
      <v-notify
        variant='${a}'
        title='${t}'
      />
    `,"noMessageWarning");h.storyName="no message warning";h.args={variant:"warning",title:"This is the title."};h.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        variant='\${variant}'
        title='\${title}'
      />
    \``}};const d=i(({title:t,variant:a})=>`
      <v-notify
        title='${t}'
        variant='${a}'
      />
    `,"noMessageError");d.storyName="no message error";d.args={variant:"error",title:"This is the title."};d.parameters={storySource:{source:`({
  title,
  variant
}) => \`
      <v-notify
        title='\${title}'
        variant='\${variant}'
      />
    \``}};const $=i(({title:t,variant:a,background:e})=>`
      <v-notify
        title='${t}'
        variant='${a}'
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
    \``}};const m={title:"Elements/Notify",parameters:{actions:{handles:["toggle"]}},argTypes:{variant:{control:{type:"select"},options:["error","warning","success","info"],description:"Notification type",table:{defaultValue:{summary:"info"}}},title:{description:"Title",table:{defaultValue:{summary:""}}},message:{description:"Message",table:{defaultValue:{summary:""}}},background:{description:"The background color",control:{type:"select"},options:["gray","white"],table:{defaultValue:{summary:"gray"}}}},includeStories:["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground"]},N={info:"info",success:"success",warning:"warning",error:"error","no message info":"noMessageInfo","no message success":"noMessageSuccess","no message warning":"noMessageWarning","no message error":"noMessageError","White background":"whiteBackground"};m.parameters=m.parameters||{};m.parameters.docs={...m.parameters.docs||{},page:()=>s(x,{mdxStoryNameToKey:N,mdxComponentAnnotations:m},s(T,null))};const B=["info","success","warning","error","noMessageInfo","noMessageSuccess","noMessageWarning","noMessageError","whiteBackground"];export{B as __namedExportsOrder,m as default,u as error,c as info,d as noMessageError,p as noMessageInfo,f as noMessageSuccess,h as noMessageWarning,y as success,v as warning,$ as whiteBackground};
//# sourceMappingURL=notify.stories.fea482bd.js.map
