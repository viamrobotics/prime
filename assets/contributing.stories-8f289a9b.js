import{M as r,a}from"./chunk-PCJTTTQV-9a8406e9.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as n}from"./jsx-runtime-a482d093.js";import{u as i}from"./index-4637868d.js";import"./iframe-643cdfa4.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers-725317a4.js";import"./index-d475d2ea.js";import"./index-d37d4223.js";import"./index-1193f533.js";import"./index-356e4a49.js";const l=`# Contributing to P.R.I.M.E

Please follow these instructions for contributing to \`PRIME\`.

## Getting started

To run the \`Storybook\` page locally, pull down the project and run:

\`\`\`bash
npm install
npm run storybook
\`\`\`

More detailed docs exist on [the storybook](https://www.viam.com/prime).

## Playground

To use the component playground, run:

\`\`\`bash
npm start
\`\`\`

The playground will open in your browser automatically. End-to-end tests run against the playground.

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

You can typecheck and lint using:

\`\`\`shell
# check types, a11y, and other component quality
npm run check

# autoformat code and other files
npm run format

# lint for formatting and correctness issues
npm run lint
\`\`\`

### Tests

To run tests locally:

\`\`\`shell
# set up playground
npx playwright install --with-deps

# run tests, with optional debugging
npm run test
npm run test-dev
\`\`\`

When adding a test, look for the following files:

- \`tests/\${component}.spec.ts\`
- \`playground/\${component}-test.html\`

If any of the files do not exist, create them by copying an already existing test.

New component functionality should always be accompanied by new tests for that functionality. Add tests by adding new instances of the component to the \`.html\` file and querying the page via playright in the \`.spec.ts\` file.
`;function p(e={}){const{wrapper:o}=Object.assign({},i(),e.components);return o?n.jsx(o,{...e,children:n.jsx(s,{})}):s();function s(){return n.jsxs(n.Fragment,{children:[n.jsx(r,{title:"Docs/Contributing"}),`
`,n.jsx(a,{children:l})]})}}const c=()=>{throw new Error("Docs-only story")};c.parameters={docsOnly:!0};const t={title:"Docs/Contributing",tags:["stories-mdx"],includeStories:["__page"]};t.parameters=t.parameters||{};t.parameters.docs={...t.parameters.docs||{},page:p};const C=["__page"];export{C as __namedExportsOrder,c as __page,t as default};
//# sourceMappingURL=contributing.stories-8f289a9b.js.map
