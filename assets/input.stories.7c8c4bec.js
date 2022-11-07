var p=Object.defineProperty;var i=(e,t)=>p(e,"name",{value:t,configurable:!0});import"./jsx-runtime.f768d5c3.js";import{c as r,A as u,M as m,C as d,S as y}from"./Props.6910a015.js";import"./iframe.950c7dd3.js";import"./es.map.constructor.8723e3cf.js";import"./es.number.to-fixed.8bfc6979.js";function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var l in o)Object.prototype.hasOwnProperty.call(o,l)&&(e[l]=o[l])}return e},s.apply(this,arguments)}i(s,"_extends");const g={},v="wrapper";function a({components:e,...t}){return r(v,s({},g,t,{components:e,mdxType:"MDXLayout"}),r(m,{title:"Examples/Input",mdxType:"Meta"}),r(d,{mdxType:"Canvas"},r(y,{name:"Input",mdxType:"Story"},()=>`
      <div style="display: flex; gap: 0.5rem; align-items: center; width: 50%; margin: 50px 25%; height: 80px;">
        <v-input
          type="number"
          value="0"
          oninput="
            console.log(event.detail.value)
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
          oninput="
            console.log(event.detail.value)
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
          oninput="
            console.log(event.detail.value)
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
    \``}};const n={title:"Examples/Input",includeStories:["input"]},x={Input:"input"};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:()=>r(u,{mdxStoryNameToKey:x,mdxComponentAnnotations:n},r(a,null))};const M=["input"];export{M as __namedExportsOrder,n as default,c as input};
//# sourceMappingURL=input.stories.7c8c4bec.js.map
