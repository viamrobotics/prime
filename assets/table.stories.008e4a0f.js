import"./jsx-runtime.43511af8.js";import{c as t,A as s,M as c,C as i,S as p}from"./Props.57047784.js";import"./iframe.a5cfd064.js";import"./es.map.constructor.97246cdb.js";import"./es.number.to-fixed.74667566.js";function r(){return r=Object.assign?Object.assign.bind():function(e){for(var v=1;v<arguments.length;v++){var a=arguments[v];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r.apply(this,arguments)}const h={},y="wrapper";function l({components:e,...v}){return t(y,r({},h,v,{components:e,mdxType:"MDXLayout"}),t(c,{title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),t("h1",null,"Table"),t("p",null,"Used to tabular data."),t(i,{mdxType:"Canvas"},t(p,{name:"Table",args:{variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"},mdxType:"Story"},({variant:a,cols:n})=>`
      <v-table class='table' variant="${a}" cols="${n}">
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
    `)))}l.isMDXComponent=!0;const o=({variant:e,cols:v})=>`
      <v-table class='table' variant="${e}" cols="${v}">
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
    `;o.storyName="Table";o.args={variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"};o.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["table"]},m={Table:"table"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>t(s,{mdxStoryNameToKey:m,mdxComponentAnnotations:d},t(l,null))};const W=["table"];export{W as __namedExportsOrder,d as default,o as table};
//# sourceMappingURL=table.stories.008e4a0f.js.map
