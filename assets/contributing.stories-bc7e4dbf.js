import{M as s,a as i}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-c27a426b.js";import{u as a}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";const p=`# Contributing to P.R.I.M.E

Please follow these instructions for contributing to \`PRIME\`.

## Getting started

To run the \`Storybook\` page locally, pull down the project and run:

\`\`\`bash
npm install
npm run storybook
\`\`\`

## Playground

To use the Vue playground

\`\`\`bash
npm start
\`\`\`

Then navigate to [http://localhost:5173/playground/index.html](http://localhost:5173/playground/index.html)

More detailed docs exist on [the storybook](https://www.viam.com/prime).

## Creating a component

1. Create a new component directory and index.svelte file in \`/elements\`
2. Create a new \`[component].stories.mdx\` file in \`/stories\`
3. Import the component in \`main.ts\`
4. Import the \`addStyles()\` helper in \`lib/\` to the component to add the shared component stylesheet

### Further Reading

Linked below are some articles that provide knowledge for how to best build reusable, generic web components.

- [Custom Elements Best Practices](https://web.dev/custom-elements-best-practices/)

## Development tasks

To verify that static assets build correctly:

\`\`\`shell
npm run build-storybook
npm run build
\`\`\`

To run tests locally, you must first install the \`playground\` development dependencies and playwright. From there, you can run tests

\`\`\`shell
# set up playground
npm --prefix=playground install
npx playwright install --with-deps

# run tests, with optional debugging
npm run test
npm run test-dev
\`\`\`

You can typecheck and lint using:

\`\`\`shell
# check types, a11y, and other component quality
npm run check

# autoformat code and other files
npm run format

# lint for formatting and correctness issues
npm run lint
\`\`\`
`;function l(e={}){const{wrapper:o}=Object.assign({},a(),e.components);return o?n.exports.jsx(o,{...e,children:n.exports.jsx(r,{})}):r();function r(){return n.exports.jsxs(n.exports.Fragment,{children:[n.exports.jsx(s,{title:"Docs/Contributing"}),`
`,n.exports.jsx(i,{children:p})]})}}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const t={title:"Docs/Contributing",tags:["mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:l};const I=["__page"];export{I as __namedExportsOrder,m as __page,t as default};
//# sourceMappingURL=contributing.stories-bc7e4dbf.js.map
