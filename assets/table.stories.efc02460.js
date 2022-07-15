import"./jsx-runtime.1040ad7c.js";import{c as t,A as h,M as s,C as m,S as b}from"./Props.b5960e0b.js";import"./iframe.8f1c9df5.js";function r(){return r=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&(n[d]=a[d])}return n},r.apply(this,arguments)}const y={},p="wrapper";function o({components:n,...e}){return t(p,r({},y,e,{components:n,mdxType:"MDXLayout"}),t(s,{title:"Elements/Table",mdxType:"Meta"}),t("h1",null,"Table"),t("p",null,"Used to tabular data."),t(m,{mdxType:"Canvas"},t(b,{name:"Table",mdxType:"Story"},({headers:a,data:d})=>`
      <v-table>
        <v-thead>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody>
          <v-tr>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    `)))}o.isMDXComponent=!0;const l=({headers:n,data:e})=>`
      <v-table>
        <v-thead>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody>
          <v-tr>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    `;l.storyName="Table";l.parameters={storySource:{source:`({
  headers,
  data
}) => \`
      <v-table>
        <v-thead>
          <v-th>Name</v-th>
          <v-th>Address</v-th>
          <v-th>Overlylongunbrokenheader</v-th>
          <v-th>Phone</v-th>
        </v-thead>
        <v-tbody>
          <v-tr>
            <v-td>John Connor</v-td>
            <v-td>42 Terminal Ave</v-td>
            <v-td>Someunbrokenlongtextthingamajig</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
          <v-tr>
            <v-td>P Sherman</v-td>
            <v-td>42 Wallaby Way</v-td>
            <v-td>x</v-td>
            <v-td>555-555-5555</v-td>
          </v-tr>
        </v-tbody>
      </v-table>
    \``}};const v={title:"Elements/Table",includeStories:["table"]},i={Table:"table"};v.parameters=v.parameters||{};v.parameters.docs={...v.parameters.docs||{},page:()=>t(h,{mdxStoryNameToKey:i,mdxComponentAnnotations:v},t(o,null))};const x=["table"];export{x as __namedExportsOrder,v as default,l as table};
//# sourceMappingURL=table.stories.efc02460.js.map
