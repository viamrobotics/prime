import{M as a}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as s}from"./jsx-runtime-c27a426b.js";import{u as i}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";const p="/assets/code-brackets-9ef6443e.svg",c="/assets/colors-ac9401f3.svg",l="/assets/comments-f15a6837.svg",d="/assets/direction-94a9917f.svg",x="/assets/flow-275142c6.svg",m="/assets/plugin-57148314.svg",g="/assets/repo-fb4ece47.svg",h="/assets/stackalt-2ad81543.svg";function j(r={}){const{wrapper:o}=Object.assign({},i(),r.components);return o?s.exports.jsx(o,{...r,children:s.exports.jsx(n,{})}):n();function n(){const t=Object.assign({h1:"h1",p:"p",strong:"strong",code:"code",a:"a"},i(),r.components);return s.exports.jsxs(s.exports.Fragment,{children:[s.exports.jsx(a,{title:"Docs/Storybook"}),`
`,s.exports.jsx("style",{children:`
    .subheading {
      --mediumdark: '#999999';
      font-weight: 900;
      font-size: 13px;
      color: #999;
      letter-spacing: 6px;
      line-height: 24px;
      text-transform: uppercase;
      margin-bottom: 12px;
      margin-top: 40px;
    }

    .link-list {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      row-gap: 10px;
    }

    @media (min-width: 620px) {
      .link-list {
        row-gap: 20px;
        column-gap: 20px;
        grid-template-columns: 1fr 1fr;
      }
    }

    @media all and (-ms-high-contrast:none) {
    .link-list {
        display: -ms-grid;
        -ms-grid-columns: 1fr 1fr;
        -ms-grid-rows: 1fr 1fr;
      }
    }

    .link-item {
      display: block;
      padding: 20px 30px 20px 15px;
      border: 1px solid #00000010;
      border-radius: 5px;
      transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
      color: #333333;
      display: flex;
      align-items: flex-start;
    }

    .link-item:hover {
      border-color: #1EA7FD50;
      transform: translate3d(0, -3px, 0);
      box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
    }

    .link-item:active {
      border-color: #1EA7FD;
      transform: translate3d(0, 0, 0);
    }

    .link-item strong {
      font-weight: 700;
      display: block;
      margin-bottom: 2px;
    }

    .link-item img {
      height: 40px;
      width: 40px;
      margin-right: 15px;
      flex: none;
    }

    .link-item span {
      font-size: 14px;
      line-height: 20px;
    }

    .tip {
      display: inline-block;
      border-radius: 1em;
      font-size: 11px;
      line-height: 12px;
      font-weight: 700;
      background: #E7FDD8;
      color: #66BF3C;
      padding: 4px 12px;
      margin-right: 10px;
      vertical-align: top;
    }

    .tip-wrapper {
      font-size: 13px;
      line-height: 20px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .tip-wrapper code {
      font-size: 12px;
      display: inline-block;
    }
  `}),`
`,s.exports.jsx(t.h1,{children:"Welcome to Storybook"}),`
`,s.exports.jsxs(t.p,{children:[`Storybook helps you build UI components in isolation from your app's business logic, data, and context.
That makes it easy to develop hard-to-reach states. Save these UI states as `,s.exports.jsx(t.strong,{children:"stories"})," to revisit during development, testing, or QA."]}),`
`,s.exports.jsxs(t.p,{children:[`Browse example stories now by navigating to them in the sidebar.
View their code in the `,s.exports.jsx(t.code,{children:"stories"}),` directory to learn how they work.
We recommend building UIs with a `,s.exports.jsx(t.a,{href:"https://componentdriven.org",children:s.exports.jsx(t.strong,{children:"component-driven"})})," process starting with atomic components and ending with pages."]}),`
`,s.exports.jsx("div",{className:"subheading",children:"Configure"}),`
`,s.exports.jsxs("div",{className:"link-list",children:[s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/docs/react/addons/addon-types",target:"_blank",children:[s.exports.jsx("img",{src:m,alt:"plugin"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Presets for popular tools"}),`
Easy setup for TypeScript, SCSS and more.`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/webpack",target:"_blank",children:[s.exports.jsx("img",{src:h,alt:"Build"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Build configuration"}),`
How to customize webpack and Babel`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/docs/react/configure/styling-and-css",target:"_blank",children:[s.exports.jsx("img",{src:c,alt:"colors"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Styling"}),`
How to load and configure CSS libraries`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack",target:"_blank",children:[s.exports.jsx("img",{src:x,alt:"flow"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Data"}),`
Providers and mocking for data libraries`]})})]})]}),`
`,s.exports.jsx("div",{className:"subheading",children:"Learn"}),`
`,s.exports.jsxs("div",{className:"link-list",children:[s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/docs",target:"_blank",children:[s.exports.jsx("img",{src:g,alt:"repo"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Storybook documentation"}),`
Configure, customize, and extend`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://storybook.js.org/tutorials/",target:"_blank",children:[s.exports.jsx("img",{src:d,alt:"direction"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"In-depth guides"}),`
Best practices from leading teams`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://github.com/storybookjs/storybook",target:"_blank",children:[s.exports.jsx("img",{src:p,alt:"code"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"GitHub project"}),`
View the source and add issues`]})})]}),s.exports.jsxs("a",{className:"link-item",href:"https://discord.gg/storybook",target:"_blank",children:[s.exports.jsx("img",{src:l,alt:"comments"}),s.exports.jsx("span",{children:s.exports.jsxs(t.p,{children:[s.exports.jsx("strong",{children:"Discord chat"}),`
Chat with maintainers and the community`]})})]})]}),`
`,s.exports.jsx("div",{className:"tip-wrapper",children:s.exports.jsxs(t.p,{children:[s.exports.jsx("span",{className:"tip",children:"Tip"}),"Edit the Markdown in"," ",`
`,s.exports.jsx("code",{children:"stories/Introduction.stories.mdx"})]})})]})}}const u=()=>{throw new Error("Docs-only story")};u.parameters={docsOnly:!0};const e={title:"Docs/Storybook",tags:["mdx"],includeStories:["__page"]};e.parameters=e.parameters||{};e.parameters.docs={...e.parameters.docs||{},page:j};const P=["__page"];export{P as __namedExportsOrder,u as __page,e as default};
//# sourceMappingURL=storybook.stories-767d2025.js.map
