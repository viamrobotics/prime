var c=Object.defineProperty;var r=(v,t)=>c(v,"name",{value:t,configurable:!0});import"./jsx-runtime.2a0d5656.js";import{c as e,A as i,M as p,C as h,S as y}from"./Props.06a6d236.js";import"./iframe.bcbaf75e.js";import"./es.map.constructor.74a0c4f7.js";import"./es.number.to-fixed.2f96c83f.js";function o(){return o=Object.assign?Object.assign.bind():function(v){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(v[n]=a[n])}return v},o.apply(this,arguments)}r(o,"_extends");const m={},b="wrapper";function s({components:v,...t}){return e(b,o({},m,t,{components:v,mdxType:"MDXLayout"}),e(p,{title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},mdxType:"Meta"}),e("h1",null,"Table"),e("p",null,"Used to tabular data."),e(h,{mdxType:"Canvas"},e(y,{name:"Table",args:{variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"},mdxType:"Story"},({variant:a,cols:n})=>`
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
    `)))}r(s,"MDXContent");s.isMDXComponent=!0;const l=r(({variant:v,cols:t})=>`
      <v-table class='table' variant="${v}" cols="${t}">
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
    `,"table");l.storyName="Table";l.args={variant:"auto",cols:"10%, 10%, 60%, 10%, 10%"};l.parameters={storySource:{source:`({
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
    \``}};const d={title:"Elements/Table",argTypes:{variant:{description:"Determines table sizing",control:{type:"select"},options:["fixed","auto"],table:{defaultValue:{summary:"auto"}}},cols:{description:"Can force columns into certain sizes. Use a comma separated list, leaving an empty space if you wish to skip a column. Takes px and % values.",control:{type:"text"},table:{defaultValue:{summary:""}}}},includeStories:["table"]},u={Table:"table"};d.parameters=d.parameters||{};d.parameters.docs={...d.parameters.docs||{},page:()=>e(i,{mdxStoryNameToKey:u,mdxComponentAnnotations:d},e(s,null))};const f=["table"];export{f as __namedExportsOrder,d as default,l as table};
//# sourceMappingURL=table.stories.c1684e46.js.map
