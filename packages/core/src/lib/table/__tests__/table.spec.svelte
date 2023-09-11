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
import type cx from 'classnames';
import { Table, TableBody, TableRow, TableCell } from '$lib';

export let cols: string[] = [];
export let cx: cx.Argument = '';
</script>

<Table
  {cols}
  {cx}
>
  <TableBody {cx}>
    <TableRow {cx}>
      <TableCell {cx}>stuff</TableCell>
      <TableCell>stuffs</TableCell>
      <TableCell>stufffss</TableCell>
    </TableRow>
  </TableBody>
</Table>
