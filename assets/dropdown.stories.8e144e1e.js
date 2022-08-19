import"./jsx-runtime.9362d9f6.js";import{c as o,A as v,M as m,C as i,S as s}from"./Props.f07bd32f.js";import"./iframe.563ef3a9.js";import"./es.map.constructor.74fd3ba3.js";import"./es.number.to-fixed.d4cf2875.js";function d(){return d=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])}return n},d.apply(this,arguments)}const b={},x="wrapper";function w({components:n,...e}){return o(x,d({},b,e,{components:n,mdxType:"MDXLayout"}),o(m,{title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},mdxType:"Meta"}),o("h1",null,"Dropdown"),o("p",null,"Gives target element the ability to open a dropdown below itself"),o(i,{mdxType:"Canvas"},o(s,{name:"Dropdown with text content",args:{match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"},mdxType:"Story"},({content:t,match:a,open:r,controlled:u,target:h})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${a?"match":""} ${r?"open":""}>
          <v-button label="${h}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${t}
          </div>
        </v-dropdown>
      </div>
    `)),o(i,{mdxType:"Canvas"},o(s,{name:"Dropdown with HTML content",args:{match:!1,content:"This is the dropdown content",open:!1},mdxType:"Story"},({content:t,match:a,open:r})=>`
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
            ${t}
          </div>
        </v-dropdown>
      </div>
    `)))}w.isMDXComponent=!0;const p=({content:n,match:e,open:t,controlled:a,target:r})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${e?"match":""} ${t?"open":""}>
          <v-button label="${r}" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${n}
          </div>
        </v-dropdown>
      </div>
    `;p.storyName="Dropdown with text content";p.args={match:!1,open:!1,content:"This is the dropdown content",target:"Dropdown target"};p.parameters={storySource:{source:`({
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
    \``}};const c=({content:n,match:e,open:t})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${e?"match":""} ${t?"open":""}>
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
            ${n}
          </div>
        </v-dropdown>
      </div>
    `;c.storyName="Dropdown with HTML content";c.args={match:!1,content:"This is the dropdown content",open:!1};c.parameters={storySource:{source:`({
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
    \``}};const l={title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},target:{description:"Dropdown target. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Used to control whether dropdown is open",control:{type:"boolean"}}},includeStories:["dropdownWithTextContent","dropdownWithHtmlContent"]},g={"Dropdown with text content":"dropdownWithTextContent","Dropdown with HTML content":"dropdownWithHtmlContent"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>o(v,{mdxStoryNameToKey:g,mdxComponentAnnotations:l},o(w,null))};const k=["dropdownWithTextContent","dropdownWithHtmlContent"];export{k as __namedExportsOrder,l as default,c as dropdownWithHtmlContent,p as dropdownWithTextContent};
//# sourceMappingURL=dropdown.stories.8e144e1e.js.map
