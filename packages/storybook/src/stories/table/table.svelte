<script
  lang="ts"
  context="module"
>
import {
  Table,
  THead,
  TH,
  TBody,
  TR,
  TD,
  type TableVariant,
} from '@viamrobotics/prime-core';

export let variant: TableVariant = 'hi';
export let cols: string[] = [];
</script>

<Table
  {variant}
  {cols}
>
  <THead>
    <TH><input type="checkbox" /></TH>
    <TH>Name</TH>
    <TH>Address</TH>
    <TH>Overlylongunbrokenheader</TH>
    <TH>Phone</TH>
  </THead>
  <TBody style="text-align:center">
    <TR>
      <TD><input type="checkbox" /></TD>
      <TD>John Connor</TD>
      <TD>42 Terminal Ave</TD>
      <TD>Someunbrokenlongtextthingamajig</TD>
      <TD>555-555-5555</TD>
    </TR>
    <TR>
      <TD><input type="checkbox" /></TD>
      <TD>P Sherman</TD>
      <TD>42 Wallaby Way</TD>
      <TD>x</TD>
      <TD>555-555-5555</TD>
    </TR>
    <TR variant="success">
      <TD><input type="checkbox" /></TD>
      <TD>John Connor</TD>
      <TD>42 Terminal Ave</TD>
      <TD>Someunbrokenlongtextthingamajig</TD>
      <TD>555-555-5555</TD>
    </TR>
    <TR variant="disabled">
      <TD><input type="checkbox" /></TD>
      <TD>John Connor</TD>
      <TD>42 Terminal Ave</TD>
      <TD>Someunbrokenlongtextthingamajig</TD>
      <TD>555-555-5555</TD>
    </TR>
    <TR variant="error">
      <TD><input type="checkbox" /></TD>
      <TD>John Connor</TD>
      <TD>42 Terminal Ave</TD>
      <TD>Someunbrokenlongtextthingamajig</TD>
      <TD>555-555-5555</TD>
    </TR>
  </TBody>
</Table>
