<!-- 
  @component

  This component allows us to render a TR with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import TableRow from './table-row.svelte';
import TableCell from './table-cell.svelte';
</script>

<TableRow>
  <TableCell>data</TableCell>
</TableRow>
