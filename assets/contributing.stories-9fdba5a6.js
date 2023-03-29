import{M as i}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as p}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function l(n={}){const{wrapper:r}=Object.assign({},p(),n.components);return r?e.exports.jsx(r,Object.assign({},n,{children:e.exports.jsx(s,{})})):s();function s(){const t=Object.assign({h1:"h1",p:"p",code:"code",h2:"h2",pre:"pre",a:"a",ol:"ol",li:"li",h3:"h3",ul:"ul"},p(),n.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(t.h1,{children:"Contributing to P.R.I.M.E"}),`
`,e.exports.jsxs(t.p,{children:["Please follow these instructions for contributing to ",e.exports.jsx(t.code,{children:"PRIME"}),"."]}),`
`,e.exports.jsx(t.h2,{children:"Getting started"}),`
`,e.exports.jsxs(t.p,{children:["To run the ",e.exports.jsx(t.code,{children:"Storybook"})," page locally, pull down the project and run:"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-bash",children:`npm install
npm run storybook
`})}),`
`,e.exports.jsx(t.h2,{children:"Playground"}),`
`,e.exports.jsx(t.p,{children:"To use the Vue playground"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-bash",children:`npm start
`})}),`
`,e.exports.jsxs(t.p,{children:["Then navigate to ",e.exports.jsx(t.a,{href:"http://localhost:5173/playground/index.html",children:"http://localhost:5173/playground/index.html"})]}),`
`,e.exports.jsxs(t.p,{children:["More detailed docs exist on ",e.exports.jsx(t.a,{href:"https://www.viam.com/prime",children:"the storybook"}),"."]}),`
`,e.exports.jsx(t.h2,{children:"Creating a component"}),`
`,e.exports.jsxs(t.ol,{children:[`
`,e.exports.jsxs(t.li,{children:["Create a new component directory and index.svelte file in ",e.exports.jsx(t.code,{children:"/elements"})]}),`
`,e.exports.jsxs(t.li,{children:["Create a new ",e.exports.jsx(t.code,{children:"[component].stories.mdx"})," file in ",e.exports.jsx(t.code,{children:"/stories"})]}),`
`,e.exports.jsxs(t.li,{children:["Import the component in ",e.exports.jsx(t.code,{children:"main.ts"})]}),`
`,e.exports.jsxs(t.li,{children:["Import the ",e.exports.jsx(t.code,{children:"addStyles()"})," helper in ",e.exports.jsx(t.code,{children:"lib/"})," to the component to add the shared component stylesheet"]}),`
`]}),`
`,e.exports.jsx(t.h3,{children:"Further Reading"}),`
`,e.exports.jsx(t.p,{children:"Linked below are some articles that provide knowledge for how to best build reusable, generic web components."}),`
`,e.exports.jsxs(t.ul,{children:[`
`,e.exports.jsx(t.li,{children:e.exports.jsx(t.a,{href:"https://web.dev/custom-elements-best-practices/",children:"Custom Elements Best Practices"})}),`
`]}),`
`,e.exports.jsx(t.h2,{children:"Development tasks"}),`
`,e.exports.jsx(t.p,{children:"To verify that static assets build correctly:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-shell",children:`npm run build-storybook
npm run build
`})}),`
`,e.exports.jsxs(t.p,{children:["To run tests locally, you must first install the ",e.exports.jsx(t.code,{children:"playground"})," development dependencies and playwright. From there, you can run tests"]}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-shell",children:`# set up playground
npm --prefix=playground install
npx playwright install --with-deps

# run tests, with optional debugging
npm run test
npm run test-dev
`})}),`
`,e.exports.jsx(t.p,{children:"You can typecheck and lint using:"}),`
`,e.exports.jsx(t.pre,{children:e.exports.jsx(t.code,{className:"language-shell",children:`# check types, a11y, and other component quality
npm run check

# autoformat code and other files
npm run format

# lint for formatting and correctness issues
npm run lint
`})})]})}}function c(n={}){const{wrapper:r}=Object.assign({},p(),n.components);return r?e.exports.jsx(r,{...n,children:e.exports.jsx(s,{})}):s();function s(){return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Contributing"}),`
`,e.exports.jsx(l,{})]})}}const a=()=>{throw new Error("Docs-only story")};a.parameters={docsOnly:!0};const o={title:"Docs/Contributing",tags:["mdx"],includeStories:["__page"]};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:c};const P=["__page"];export{P as __namedExportsOrder,a as __page,o as default};
//# sourceMappingURL=contributing.stories-9fdba5a6.js.map
