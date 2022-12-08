var p=Object.defineProperty;var i=(e,t)=>p(e,"name",{value:t,configurable:!0});import"./jsx-runtime.b2017726.js";import{c as r,A as m,M as u,C as d,S as y}from"./Props.b5df9e21.js";import"./iframe.1b5a8018.js";import"./es.map.constructor.78c74c86.js";import"./es.number.to-fixed.476b9d29.js";function l(){return l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var s=arguments[t];for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o])}return e},l.apply(this,arguments)}i(l,"_extends");const g={},x="wrapper";function a({components:e,...t}){return r(x,l({},g,t,{components:e,mdxType:"MDXLayout"}),r(u,{title:"Examples/Input",mdxType:"Meta"}),r(d,{mdxType:"Canvas"},r(y,{name:"Input",mdxType:"Story"},()=>`
      <div style="display: flex; gap: 0.5rem; align-items: center; width: 50%; margin: 50px 25%; height: 80px;">
        <v-input
          type="number"
          value="0"
          step="10"
          oninput="
            document.querySelector('#illustration').style.transform = 'rotate(' + event.detail.value + 'deg)'
          "
        >
        </v-input>
        <svg id="illustration" style="height:100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="12.5"></circle>
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="10"></circle>
          <line stroke-width="0.5" x1="25" y1="25" x2="25" y2="15" stroke="black" style="transform-origin: center"></line>
        </svg>
      </div>
    `)))}i(a,"MDXContent");a.isMDXComponent=!0;const c=i(()=>`
      <div style="display: flex; gap: 0.5rem; align-items: center; width: 50%; margin: 50px 25%; height: 80px;">
        <v-input
          type="number"
          value="0"
          step="10"
          oninput="
            document.querySelector('#illustration').style.transform = 'rotate(' + event.detail.value + 'deg)'
          "
        >
        </v-input>
        <svg id="illustration" style="height:100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="12.5"></circle>
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="10"></circle>
          <line stroke-width="0.5" x1="25" y1="25" x2="25" y2="15" stroke="black" style="transform-origin: center"></line>
        </svg>
      </div>
    `,"input");c.storyName="Input";c.parameters={storySource:{source:`() => \`
      <div style="display: flex; gap: 0.5rem; align-items: center; width: 50%; margin: 50px 25%; height: 80px;">
        <v-input
          type="number"
          value="0"
          step="10"
          oninput="
            document.querySelector('#illustration').style.transform = 'rotate(' + event.detail.value + 'deg)'
          "
        >
        </v-input>
        <svg id="illustration" style="height:100%" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="12.5"></circle>
          <circle stroke-width="0.5" stroke="#111" fill="rgba(0,0,0,0)" cx="25" cy="25" r="10"></circle>
          <line stroke-width="0.5" x1="25" y1="25" x2="25" y2="15" stroke="black" style="transform-origin: center"></line>
        </svg>
      </div>
    \``}};const n={title:"Examples/Input",includeStories:["input"]},v={Input:"input"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>r(m,{mdxStoryNameToKey:v,mdxComponentAnnotations:n},r(a,null))};const M=["input"];export{M as __namedExportsOrder,n as default,c as input};
//# sourceMappingURL=input.stories.b3d52576.js.map
