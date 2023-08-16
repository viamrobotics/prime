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
import TBody from './tbody.svelte';
import TR from './tr.svelte';
import TD from './td.svelte';

export let cols: string[] = [];
</script>

<Table {cols}>
  <TBody>
    <TR>
      <TD>stuff</TD>
      <TD>stuffs</TD>
      <TD>stufffss</TD>
    </TR>
  </TBody>
</Table>
