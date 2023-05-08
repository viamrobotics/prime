import{M as p,C as o,S as i}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-a482d093.js";import{u as r}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";function v(t={}){const{wrapper:l}=Object.assign({},r(),t.components);return l?e.jsx(l,{...t,children:e.jsx(a,{})}):a();function a(){const s=Object.assign({h1:"h1",p:"p"},r(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(p,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}}}),`
`,e.jsx(s.h1,{id:"form",children:"Form"}),`
`,e.jsx(s.p,{children:"This examples shows a form built using PRIME elements."}),`
`,e.jsx(o,{children:e.jsx(i,{name:"Vertical",children:()=>`
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
    `})}),`
`,e.jsx(o,{children:e.jsx(i,{name:"Horizontal",children:()=>`
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
    `})})]})}}const m=()=>`
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
    `;m.storyName="Vertical";m.parameters={storySource:{source:`() => \`
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
    \``}};const u=()=>`
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
    `;u.storyName="Horizontal";u.parameters={storySource:{source:`() => \`
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
    \``}};const n={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},tags:["stories-mdx"],includeStories:["vertical","horizontal"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:v};const E=["vertical","horizontal"];export{E as __namedExportsOrder,n as default,u as horizontal,m as vertical};
//# sourceMappingURL=form.stories-9335e7d2.js.map
