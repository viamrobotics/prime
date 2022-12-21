import{M as u,C as s,S as i}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as r}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function v(t={}){const{wrapper:l}=Object.assign({},r(),t.components);return l?e.exports.jsx(l,{...t,children:e.exports.jsx(a,{})}):a();function a(){const o=Object.assign({h1:"h1",p:"p"},r(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(u,{title:"Examples/Form",parameters:{actions:{handles:["submit"]}}}),`
`,e.exports.jsx(o.h1,{children:"Form"}),`
`,e.exports.jsx(o.p,{children:"This examples shows a form built using PRIME elements."}),`
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Vertical",children:()=>`
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
`,e.exports.jsx(s,{children:e.exports.jsx(i,{name:"Horizontal",children:()=>`
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
    \``}};const n={title:"Examples/Form",parameters:{actions:{handles:["submit"]}},tags:["mdx"],includeStories:["vertical","horizontal"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:v};const C=["vertical","horizontal"];export{C as __namedExportsOrder,n as default,p as horizontal,m as vertical};
//# sourceMappingURL=form.stories-0f49a5d1.js.map
