var m=Object.defineProperty;var l=(e,t)=>m(e,"name",{value:t,configurable:!0});import"./jsx-runtime.edd43df9.js";import{c as n,A as b,M as x,C as s,S as w}from"./Props.d1f8dbc1.js";import"./iframe.eab4e074.js";import"./es.map.constructor.79cbb541.js";import"./es.number.to-fixed.3f3eb80b.js";function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a])}return e},p.apply(this,arguments)}l(p,"_extends");const g={},u="wrapper";function h({components:e,...t}){return n(u,p({},g,t,{components:e,mdxType:"MDXLayout"}),n(x,{title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},mdxType:"Meta"}),n("h1",null,"Dropdown"),n("p",null,"Gives target element the ability to open a dropdown below itself"),n(s,{mdxType:"Canvas"},n(w,{name:"Dropdown with text content",args:{match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"},mdxType:"Story"},({content:o,match:a,open:r,controlled:f,target:v})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${a?"match":""} ${r?"open":""}>
          <v-button label="${v}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${o}
          </div>
        </v-dropdown>
      </div>
    `)),n(s,{mdxType:"Canvas"},n(w,{name:"Dropdown with HTML content",args:{match:!1,content:"This is the dropdown content",open:!1},mdxType:"Story"},({content:o,match:a,open:r})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${a?"match":""} ${r?"open":""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            ${o}
          </div>
        </v-dropdown>
      </div>
    `)))}l(h,"MDXContent");h.isMDXComponent=!0;const c=l(({content:e,match:t,open:o,controlled:a,target:r})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${t?"match":""} ${o?"open":""}>
          <v-button label="${r}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${e}
          </div>
        </v-dropdown>
      </div>
    `,"dropdownWithTextContent");c.storyName="Dropdown with text content";c.args={match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"};c.parameters={storySource:{source:`({
  content,
  match,
  open,
  controlled,
  target
}) => \`
      <div style="padding: 50px 0px">
        <v-dropdown \${match ? "match" : ""} \${open ? "open" : ""}>
          <v-button label="\${target}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            \${content}
          </div>
        </v-dropdown>
      </div>
    \``}};const i=l(({content:e,match:t,open:o})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${t?"match":""} ${o?"open":""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            ${e}
          </div>
        </v-dropdown>
      </div>
    `,"dropdownWithHtmlContent");i.storyName="Dropdown with HTML content";i.args={match:!1,content:"This is the dropdown content",open:!1};i.parameters={storySource:{source:`({
  content,
  match,
  open
}) => \`
      <div style="padding: 50px 0px">
        <v-dropdown \${match ? "match" : ""} \${open ? "open" : ""}>
          <v-button label="Choose your character" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Wall-E</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>John Connor</label>
            </div>
            <div class="flex flex-row gap-2 whitespace-nowrap">
              <input type="checkbox"/> 
              <label>Johnny 5</label>
            </div>
            \${content}
          </div>
        </v-dropdown>
      </div>
    \``}};const d={title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},includeStories:["dropdownWithTextContent","dropdownWithHtmlContent"]},y={"Dropdown with text content":"dropdownWithTextContent","Dropdown with HTML content":"dropdownWithHtmlContent"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>n(b,{mdxStoryNameToKey:y,mdxComponentAnnotations:d},n(h,null))};const H=["dropdownWithTextContent","dropdownWithHtmlContent"];export{H as __namedExportsOrder,d as default,i as dropdownWithHtmlContent,c as dropdownWithTextContent};
//# sourceMappingURL=dropdown.stories.aae3adbe.js.map
