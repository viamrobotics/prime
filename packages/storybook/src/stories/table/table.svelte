<script
  lang="ts"
  context="module"
>
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  type TableVariant,
} from '@viamrobotics/prime-core';

export let variant: TableVariant = 'hi';
export let cols: string[] = [];
</script>

<Table
  {variant}
  {cols}
>
  <TableHeader>
    <TableHeaderCell><input type="checkbox" /></TableHeaderCell>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Address</TableHeaderCell>
    <TableHeaderCell>Overlylongunbrokenheader</TableHeaderCell>
    <TableHeaderCell>Phone</TableHeaderCell>
  </TableHeader>
  <TableBody style="text-align:center">
    <TableRow>
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>John Connor</TableCell>
      <TableCell>42 Terminal Ave</TableCell>
      <TableCell>Someunbrokenlongtextthingamajig</TableCell>
      <TableCell>555-555-5555</TableCell>
    </TableRow>
    <TableRow>
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>P Sherman</TableCell>
      <TableCell>42 Wallaby Way</TableCell>
      <TableCell>x</TableCell>
      <TableCell>555-555-5555</TableCell>
    </TableRow>
    <TableRow variant="success">
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>John Connor</TableCell>
      <TableCell>42 Terminal Ave</TableCell>
      <TableCell>Someunbrokenlongtextthingamajig</TableCell>
      <TableCell>555-555-5555</TableCell>
    </TableRow>
    <TableRow variant="disabled">
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>John Connor</TableCell>
      <TableCell>42 Terminal Ave</TableCell>
      <TableCell>Someunbrokenlongtextthingamajig</TableCell>
      <TableCell>555-555-5555</TableCell>
    </TableRow>
    <TableRow variant="error">
      <TableCell><input type="checkbox" /></TableCell>
      <TableCell>John Connor</TableCell>
      <TableCell>42 Terminal Ave</TableCell>
      <TableCell>Someunbrokenlongtextthingamajig</TableCell>
      <TableCell>555-555-5555</TableCell>
    </TableRow>
  </TableBody>
</Table>
