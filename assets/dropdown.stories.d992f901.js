import"./jsx-runtime.baa5337d.js";import{c as o,A as w,M as m,C as i,S as s}from"./Props.dad31dbf.js";import"./iframe.54214fd3.js";import"./es.map.constructor.098ca669.js";import"./es.number.to-fixed.18eda169.js";function d(){return d=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a])}return n},d.apply(this,arguments)}const v={},b="wrapper";function h({components:n,...e}){return o(b,d({},v,e,{components:n,mdxType:"MDXLayout"}),o(m,{title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Can be used to programmatically control whether dropdown is open",control:{type:"boolean"}}},mdxType:"Meta"}),o("h1",null,"Dropdown"),o("p",null,"Gives target element the ability to open a dropdown below itself"),o(i,{mdxType:"Canvas"},o(s,{name:"Dropdown with text content",args:{match:!1,content:"This is the dropdown content",open:!1},mdxType:"Story"},({content:t,match:a,open:r})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${a?"match":""} ${r?"open":""}>
          <v-button label="Click me" slot="target"></v-button>
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
    `)))}h.isMDXComponent=!0;const p=({content:n,match:e,open:t})=>`
      <div style="padding: 50px 0px">
        <v-dropdown ${e?"match":""} ${t?"open":""}>
          <v-button label="Click me" slot="target"></v-button>
          <div 
            slot="content"
            style="background-color: black; color: white; padding: 10px;"
          >
            ${n}
          </div>
        </v-dropdown>
      </div>
    `;p.storyName="Dropdown with text content";p.args={match:!1,content:"This is the dropdown content",open:!1};p.parameters={storySource:{source:`({
  content,
  match,
  open
}) => \`
      <div style="padding: 50px 0px">
        <v-dropdown \${match ? "match" : ""} \${open ? "open" : ""}>
          <v-button label="Click me" slot="target"></v-button>
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
    \``}};const l={title:"Elements/Dropdown",parameters:{actions:{handles:["toggle"]}},argTypes:{match:{description:"Force dropdown width to match target width",control:{type:"boolean"},table:{defaultValue:{summary:!1}}},content:{description:"Dropdown content. Receives text and HTML",control:{type:"text"},table:{defaultValue:{summary:""}}},"on:toggle":{description:"Event fired when dropdown is toggled"},open:{description:"Can be used to programmatically control whether dropdown is open",control:{type:"boolean"}}},includeStories:["dropdownWithTextContent","dropdownWithHtmlContent"]},x={"Dropdown with text content":"dropdownWithTextContent","Dropdown with HTML content":"dropdownWithHtmlContent"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>o(w,{mdxStoryNameToKey:x,mdxComponentAnnotations:l},o(h,null))};const T=["dropdownWithTextContent","dropdownWithHtmlContent"];export{T as __namedExportsOrder,l as default,c as dropdownWithHtmlContent,p as dropdownWithTextContent};
//# sourceMappingURL=dropdown.stories.d992f901.js.map
