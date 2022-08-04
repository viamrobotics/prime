import"./jsx-runtime.d53715e5.js";import{c as t,A as l,M as i,C as c,S as p}from"./Props.a5dbd648.js";import"./iframe.a6e3752b.js";import"./es.map.constructor.3901915a.js";import"./es.number.to-fixed.5152783c.js";function r(){return r=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var v in n)Object.prototype.hasOwnProperty.call(n,v)&&(a[v]=n[v])}return a},r.apply(this,arguments)}const m={},h="wrapper";function s({components:a,...e}){return t(h,r({},m,e,{components:a,mdxType:"MDXLayout"}),t(i,{title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Table"),t("p",null,"Used to tabular data."),t(c,{mdxType:"Canvas"},t(p,{name:"Table",args:{variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"},mdxType:"Story"},({variant:n,cols:v})=>`
      <v-table variant="${n}" cols="${v}">
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
        </v-tbody>
      </v-table>
    `)))}s.isMDXComponent=!0;const d=({variant:a,cols:e})=>`
      <v-table variant="${a}" cols="${e}">
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
        </v-tbody>
      </v-table>
    `;d.storyName="Table";d.args={variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"};d.parameters={storySource:{source:`({
  variant,
  cols
}) => \`
      <v-table variant="\${variant}" cols="\${cols}">
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
        </v-tbody>
      </v-table>
    \``}};const o={title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["table"]},u={Table:"table"};o.parameters=o.parameters||{};o.parameters.docs={...o.parameters.docs||{},page:()=>t(l,{mdxStoryNameToKey:u,mdxComponentAnnotations:o},t(s,null))};const f=["table"];export{f as __namedExportsOrder,o as default,d as table};
//# sourceMappingURL=table.stories.34cb4e9b.js.map
