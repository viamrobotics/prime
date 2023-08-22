<!-- 
  @component

  This component allows us to render a Table with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import { Table, TableBody, TableRow, TableCell } from '$lib';

export let cols: string[] = [];
</script>

<Table {cols}>
  <TableBody>
    <TableRow>
      <TableCell>stuff</TableCell>
      <TableCell>stuffs</TableCell>
      <TableCell>stufffss</TableCell>
    </TableRow>
  </TableBody>
</Table>
