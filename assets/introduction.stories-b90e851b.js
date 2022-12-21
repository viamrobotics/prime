import{M as p}from"./chunk-MA2MUXQN-bbbbfbe5.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as e}from"./jsx-runtime-c27a426b.js";import{u as i}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./index-55ae201a.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-3392a817.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./index-014c75af.js";import"./chunk-XHUUYXNA-40ecb194.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./chunk-BVZGY62N-610dc239.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-842d733b.js";function a(r={}){const{wrapper:t}=Object.assign({},i(),r.components);return t?e.exports.jsx(t,Object.assign({},r,{children:e.exports.jsx(o,{})})):o();function o(){const s=Object.assign({h1:"h1",p:"p",h2:"h2",ul:"ul",li:"li",code:"code",pre:"pre",h3:"h3",img:"img",a:"a"},i(),r.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(s.h1,{children:"P.R.I.M.E."}),`
`,e.exports.jsx(s.p,{children:"Pretty Rad Interactive Modular Elements."}),`
`,e.exports.jsx(s.p,{children:"Made with ❤️ at Viam."}),`
`,e.exports.jsx(s.h2,{children:"Getting started"}),`
`,e.exports.jsx(s.p,{children:'PRIME is a collection of atomic UI elements, designed to "just work" in any HTML-based environment, regardless of framework or lack thereof. It is a web component library.'}),`
`,e.exports.jsx(s.h2,{children:"Installation"}),`
`,e.exports.jsx(s.p,{children:"The PRIME NPM package contains the following necessary exports for usage:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"prime.es.js"})," or ",e.exports.jsx(s.code,{children:"prime.umd.js"})," - JS that defines custom elements. ES modules are recommended over UMD."]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"prime.css"})," - stylesheet shared by all elements."]}),`
`]}),`
`,e.exports.jsx(s.p,{children:"If using ES modules, import Prime's JS file into your code:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-ts",children:`import '@viamrobotics/prime'
`})}),`
`,e.exports.jsxs(s.p,{children:["You must host ",e.exports.jsx(s.code,{children:"prime.css"})," in a static file server. This is every prime element loads it as a shared stylesheet."]}),`
`,e.exports.jsxs(s.p,{children:["If you are not hosting ",e.exports.jsx(s.code,{children:"prime.css"})," at the root directory of your domain, you will need to add a PRIME_CONFIG global variable before loading the JS file:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<script type="module">
window.PRIME_CONFIG = {
  base: '/path/to/static/folder',
  query: '?v=someCacheBustingHashIfNeeded',
}
<\/script>
`})}),`
`,e.exports.jsxs(s.p,{children:["If the necessary ",e.exports.jsx(s.code,{children:".css"})," and ",e.exports.jsx(s.code,{children:".js"}),` files have been added, then no additional imports are needed!
You can immediately start adding PRIME elements to your app, since prime elements are simply custom HTML elements:`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<v-button label='Hello world!' />
`})}),`
`,e.exports.jsxs(s.p,{children:["All elements are prefixed with ",e.exports.jsx(s.code,{children:"v-"}),". This stands for Viam, the cool company where these elements are made."]}),`
`,e.exports.jsx(s.h2,{children:"Playground"}),`
`,e.exports.jsxs(s.p,{children:["To use the playground, go to the ",e.exports.jsx(s.code,{children:"playground"})," directory, and:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-bash",children:`npm install
npm start
`})}),`
`,e.exports.jsx(s.p,{children:"Or to run in production mode:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`npm run build
npm run serve
`})}),`
`,e.exports.jsx(s.h2,{children:"Linting / Testing"}),`
`,e.exports.jsx(s.p,{children:"To lint and typecheck:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-bash",children:`npm run lint
npm run check
`})}),`
`,e.exports.jsx(s.p,{children:"To test:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-bash",children:`npm run test-dev # to test with the playwright debug UI
# or
npm run test # to test in headless mode
`})}),`
`,e.exports.jsx(s.h3,{children:"Browser Compatibility"}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.code,{children:"PRIME"})," supports the following browsers:"]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.img,{src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png",alt:"Chrome"})," | ",e.exports.jsx(s.img,{src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png",alt:"Firefox"})," | ",e.exports.jsx(s.img,{src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png",alt:"Edge"})," | ",e.exports.jsx(s.img,{src:"https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png",alt:"Safari"}),`
--- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |`]}),`
`,e.exports.jsx(s.h2,{children:"License"}),`
`,e.exports.jsx(s.p,{children:"Copyright 2021-2022 Viam Inc."}),`
`,e.exports.jsxs(s.p,{children:["Apache 2.0 - See ",e.exports.jsx(s.a,{href:"https://github.com/viamrobotics/prime/blob/main/LICENSE",children:"LICENSE"})," file"]})]})}}function c(r={}){const{wrapper:t}=Object.assign({},i(),r.components);return t?e.exports.jsx(t,{...r,children:e.exports.jsx(o,{})}):o();function o(){return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(p,{title:"Docs/Introduction"}),`
`,e.exports.jsx(a,{})]})}}const l=()=>{throw new Error("Docs-only story")};l.parameters={docsOnly:!0};const n={title:"Docs/Introduction",tags:["mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:c};const S=["__page"];export{S as __namedExportsOrder,l as __page,n as default};
//# sourceMappingURL=introduction.stories-b90e851b.js.map
