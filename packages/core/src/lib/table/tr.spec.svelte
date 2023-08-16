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
import TR from './tr.svelte';
import TD from './td.svelte';
</script>

<TR>
  <TD>data</TD>
</TR>
