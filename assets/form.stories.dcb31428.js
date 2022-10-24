var c=Object.defineProperty;var a=(n,t)=>c(n,"name",{value:t,configurable:!0});import"./jsx-runtime.9dd36407.js";import{c as e,A as f,M as b,C as r,S as m}from"./Props.e98a796d.js";import"./iframe.de1ee27b.js";import"./es.map.constructor.072e7749.js";import"./es.number.to-fixed.35387cab.js";function i(){return i=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var s in l)Object.prototype.hasOwnProperty.call(l,s)&&(n[s]=l[s])}return n},i.apply(this,arguments)}a(i,"_extends");const y=a(n=>a(function(l){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",l)},"MDXDefaultShortcode"),"makeShortcode"),d=y("Form"),g={},x="wrapper";function u({components:n,...t}){return e(x,i({},g,t,{components:n,mdxType:"MDXLayout"}),e(b,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}},mdxType:"Meta"}),e("h1",null,"Form"),e("p",null,"This examples shows a form built using PRIME elements."),e(d,{mdxType:"Form"}),e(r,{mdxType:"Canvas"},e(m,{name:"Vertical",mdxType:"Story"},()=>`
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
    \``}};const o={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},includeStories:["vertical","horizontal"]},h={Vertical:"vertical",Horizontal:"horizontal"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>e(f,{mdxStoryNameToKey:h,mdxComponentAnnotations:o},e(u,null))};const M=["vertical","horizontal"];export{M as __namedExportsOrder,o as default,v as horizontal,p as vertical};
//# sourceMappingURL=form.stories.dcb31428.js.map
