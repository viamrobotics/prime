var f=Object.defineProperty;var a=(t,n)=>f(t,"name",{value:n,configurable:!0});import"./jsx-runtime.62a5b3b9.js";import{c as e,A as c,M as b,C as r,S as m}from"./Props.c70c1159.js";import"./iframe.955807a8.js";import"./es.map.constructor.e721a4f2.js";import"./es.number.to-fixed.d6275c24.js";function i(){return i=Object.assign?Object.assign.bind():function(t){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s])}return t},i.apply(this,arguments)}a(i,"_extends");const y={},g="wrapper";function u({components:t,...n}){return e(g,i({},y,n,{components:t,mdxType:"MDXLayout"}),e(b,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}},mdxType:"Meta"}),e("h1",null,"Form"),e("p",null,"This examples shows a form built using PRIME elements."),e(r,{mdxType:"Canvas"},e(m,{name:"Vertical",mdxType:"Story"},()=>`
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
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    `)),e(r,{mdxType:"Canvas"},e(m,{name:"Horizontal",mdxType:"Story"},()=>`
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
          align-items: flex-end;
          flex-wrap: wrap;
          width: 100%;
          gap: 0.5rem;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-select
          label="Guilty pleasures"
          name="favorite_feeling"
          variant='multiple'
          options="Model trains, My little pony, Taco Bell, Abrasive textures, Seinfeld cosplay"
        >
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    `)))}a(u,"MDXContent");u.isMDXComponent=!0;const p=a(()=>`
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
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    `,"vertical");p.storyName="Vertical";p.parameters={storySource:{source:`() => \`
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
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    \``}};const v=a(()=>`
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
          align-items: flex-end;
          flex-wrap: wrap;
          width: 100%;
          gap: 0.5rem;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-select
          label="Guilty pleasures"
          name="favorite_feeling"
          variant='multiple'
          options="Model trains, My little pony, Taco Bell, Abrasive textures, Seinfeld cosplay"
        >
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    `,"horizontal");v.storyName="Horizontal";v.parameters={storySource:{source:`() => \`
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
          align-items: flex-end;
          flex-wrap: wrap;
          width: 100%;
          gap: 0.5rem;
        "
      >
        <v-input
          name="first_name"
          label="First name"
        >
        </v-input>
        <v-input
          name="last_name"
          label="Last name"
        >
        </v-input>
        <v-select
          label="Favorite feeling"
          name="favorite_feeling"
          options="Fear, Dread, Angst, Existential Ennui"
        >
        </v-select>
        <v-select
          label="Guilty pleasures"
          name="favorite_feeling"
          variant='multiple'
          options="Model trains, My little pony, Taco Bell, Abrasive textures, Seinfeld cosplay"
        >
        <v-button
          type="submit"
          label="Submit"
        >
        </v-button>
      </form>
    \``}};const l={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},includeStories:["vertical","horizontal"]},d={Vertical:"vertical",Horizontal:"horizontal"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(c,{mdxStoryNameToKey:d,mdxComponentAnnotations:l},e(u,null))};const E=["vertical","horizontal"];export{E as __namedExportsOrder,l as default,v as horizontal,p as vertical};
//# sourceMappingURL=form.stories.9085b0dc.js.map
