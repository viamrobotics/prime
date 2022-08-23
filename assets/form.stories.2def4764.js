import"./jsx-runtime.c0d303d7.js";import{c as e,A as i,M as p,C as u,S as c}from"./Props.41dab331.js";import"./iframe.de3f4ce1.js";import"./es.map.constructor.bb84b5b5.js";import"./es.number.to-fixed.4910efe3.js";function m(){return m=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s])}return t},m.apply(this,arguments)}const f=t=>function(o){return console.warn("Component "+t+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",o)},d=f("Form"),v={},b="wrapper";function r({components:t,...n}){return e(b,m({},v,n,{components:t,mdxType:"MDXLayout"}),e(p,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}},mdxType:"Meta"}),e("h1",null,"Form"),e("p",null,"This examples shows a form built using PRIME elements."),e(d,{mdxType:"Form"}),e(u,{mdxType:"Canvas"},e(c,{name:"Form",mdxType:"Story"},()=>`
      <form
        onsubmit="
          console.log(this.elements)
          console.log([...this.elements].map(e => e.value))
          for (const [key, value] of new FormData(this)) {
            console.log(key, ':', value)
          }
          return false
        "
        style="
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 200px;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        ></v-input>
        <v-input
          name="last_name"
          label="Last name"
        ></v-input>
        <v-button
          type="submit"
          label="Submit"
        ></v-button>
      </form>
    `)))}r.isMDXComponent=!0;const l=()=>`
      <form
        onsubmit="
          console.log(this.elements)
          console.log([...this.elements].map(e => e.value))
          for (const [key, value] of new FormData(this)) {
            console.log(key, ':', value)
          }
          return false
        "
        style="
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 200px;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        ></v-input>
        <v-input
          name="last_name"
          label="Last name"
        ></v-input>
        <v-button
          type="submit"
          label="Submit"
        ></v-button>
      </form>
    `;l.storyName="Form";l.parameters={storySource:{source:`() => \`
      <form
        onsubmit="
          console.log(this.elements)
          console.log([...this.elements].map(e => e.value))
          for (const [key, value] of new FormData(this)) {
            console.log(key, ':', value)
          }
          return false
        "
        style="
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 200px;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        ></v-input>
        <v-input
          name="last_name"
          label="Last name"
        ></v-input>
        <v-button
          type="submit"
          label="Submit"
        ></v-button>
      </form>
    \``}};const a={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},includeStories:["form"]},y={Form:"form"};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:()=>e(i,{mdxStoryNameToKey:y,mdxComponentAnnotations:a},e(r,null))};const w=["form"];export{w as __namedExportsOrder,a as default,l as form};
//# sourceMappingURL=form.stories.2def4764.js.map
