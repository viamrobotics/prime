import{M as s,a}from"./chunk-PCJTTTQV-fce66135.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-cb192941.js";import{u as i}from"./index-a3bb37b7.js";import"./iframe-3e97d2e3.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";const l=`# Contributing to P.R.I.M.E

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
`;function p(e={}){const{wrapper:o}=Object.assign({},i(),e.components);return o?n.jsx(o,{...e,children:n.jsx(r,{})}):r();function r(){return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Docs/Contributing"}),`
`,n.jsx(a,{children:l})]})}}const m=()=>{throw new Error("Docs-only story")};m.parameters={docsOnly:!0};const t={title:"Docs/Contributing",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:p};const C=["__page"];export{C as __namedExportsOrder,m as __page,t as default};
//# sourceMappingURL=contributing.stories-65b8f5d1.js.map
