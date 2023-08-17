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
import Table from './table.svelte';
import TableBody from './table-body.svelte';
import TableRow from './table-row.svelte';
import TableCell from './table-cell.svelte';

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
