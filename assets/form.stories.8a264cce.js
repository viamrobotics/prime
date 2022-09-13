import"./jsx-runtime.9bd372df.js";import{c as e,A as v,M as c,C as i,S as r}from"./Props.fa366eda.js";import"./iframe.fb1d1e64.js";import"./es.map.constructor.3305660c.js";import"./es.number.to-fixed.79c9486b.js";function s(){return s=Object.assign?Object.assign.bind():function(n){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(n[o]=a[o])}return n},s.apply(this,arguments)}const f=n=>function(a){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),e("div",a)},b=f("Form"),y={},d="wrapper";function m({components:n,...t}){return e(d,s({},y,t,{components:n,mdxType:"MDXLayout"}),e(c,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}},mdxType:"Meta"}),e("h1",null,"Form"),e("p",null,"This examples shows a form built using PRIME elements."),e(b,{mdxType:"Form"}),e(i,{mdxType:"Canvas"},e(r,{name:"Vertical",mdxType:"Story"},()=>`
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
    `)),e(i,{mdxType:"Canvas"},e(r,{name:"Horizontal",mdxType:"Story"},()=>`
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
    `)))}m.isMDXComponent=!0;const u=()=>`
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
    `;u.storyName="Vertical";u.parameters={storySource:{source:`() => \`
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
    \``}};const p=()=>`
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
    `;p.storyName="Horizontal";p.parameters={storySource:{source:`() => \`
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
    \``}};const l={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},includeStories:["vertical","horizontal"]},g={Vertical:"vertical",Horizontal:"horizontal"};l.parameters=l.parameters||{};l.parameters.docs={...l.parameters.docs||{},page:()=>e(v,{mdxStoryNameToKey:g,mdxComponentAnnotations:l},e(m,null))};const S=["vertical","horizontal"];export{S as __namedExportsOrder,l as default,p as horizontal,u as vertical};
//# sourceMappingURL=form.stories.8a264cce.js.map
