<script lang="ts">
import type cx from 'classnames';
import { Table, TableBody, TableRow, TableCell } from '$lib';

export let cols: string[] = [];
export let extraClasses: cx.Argument = '';
</script>

<Table
  {cols}
  cx={extraClasses}
>
  <TableBody cx={extraClasses}>
    <TableRow cx={extraClasses}>
      <TableCell cx={extraClasses}>stuff</TableCell>
      <TableCell>stuffs</TableCell>
      <TableCell>stufffss</TableCell>
    </TableRow>
  </TableBody>
</Table>
