<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Table" />

<Story name="Basic">
  <Table
    variant="auto"
    cols={['10%', '10%', '60%', '10%', '10%']}
  >
    <TableHeader>
      <TableHeaderCell><input type="checkbox" /></TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Address</TableHeaderCell>
      <TableHeaderCell>Overlylongunbrokenheader</TableHeaderCell>
      <TableHeaderCell>Phone</TableHeaderCell>
    </TableHeader>
    <TableBody cx="text-center">
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
</Story>
