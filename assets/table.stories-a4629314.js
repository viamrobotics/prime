import{M as l,C as c,S as p}from"./chunk-PCJTTTQV-c7fe23c0.js";import"./chunk-R4NKYYJA-96bb58e6.js";import{j as t}from"./jsx-runtime-c27a426b.js";import{u as o}from"./index-0e5a60ed.js";import"./preload-helper-101896b7.js";import"./index-c4c77e71.js";import"./_commonjsHelpers-725317a4.js";import"./chunk-7KVP4ZAY-c250f305.js";import"./chunk-FD4M6EBV-8d27da22.js";import"./chunk-NNAAFZ4U-67fa674f.js";import"./index-52e7183d.js";import"./index-d475d2ea.js";import"./memoizerific-cab73ecf.js";import"./chunk-GWAJ4KRU-d69fdc61.js";import"./index-deb16bc8.js";import"./chunk-RDJSMFWU-7060e855.js";import"./index-10d4cb7f.js";import"./_getTag-25edba2d.js";import"./index-aeece16e.js";import"./index-356e4a49.js";function h(v={}){const{wrapper:e}=Object.assign({},o(),v.components);return e?t.exports.jsx(e,{...v,children:t.exports.jsx(d,{})}):d();function d(){const r=Object.assign({h1:"h1",p:"p"},o(),v.components);return t.exports.jsxs(t.exports.Fragment,{children:[t.exports.jsx(l,{title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}}}),`
`,t.exports.jsx(r.h1,{children:"Table"}),`
`,t.exports.jsx(r.p,{children:"Used to tabular data."}),`
`,t.exports.jsx(c,{children:t.exports.jsx(p,{name:"Table",args:{variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"},children:({variant:s,cols:i})=>`
      <v-table class='table' variant="${s}" cols="${i}">
        <v-thead>
          <v-th><input type="checkbox"></v-th>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody class="text-center">
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='success'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='disabled'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='error'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    `})})]})}}const n=({variant:v,cols:e})=>`
      <v-table class='table' variant="${v}" cols="${e}">
        <v-thead>
          <v-th><input type="checkbox"></v-th>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody class="text-center">
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='success'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='disabled'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='error'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    `;n.storyName="Table";n.args={variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"};n.parameters={storySource:{source:`({
  variant,
  cols
}) => \`
      <v-table class='table' variant="\${variant}" cols="\${cols}">
        <v-thead>
          <v-th><input type="checkbox"></v-th>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody class="text-center">
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='success'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='disabled'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr variant='error'>
            <v-td><input type="checkbox"></v-td>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    \``}};const a={title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},tags:["mdx"],includeStories:["table"]};a.parameters=a.parameters||{};a.parameters.docs={...a.parameters.docs||{},page:h};const N=["table"];export{N as __namedExportsOrder,a as default,n as table};
//# sourceMappingURL=table.stories-a4629314.js.map
