<script lang="ts">
  import { Collapse } from '@viamrobotics/prime-core';
  export let title = '';
  export let content = '';
</script>



<Collapse title={title}>
  <div slot="content" style="font-size: 12px; padding: 1rem; border: 1px solid #e4e4e6; border-top: none;">
    {content}
  </div>
</Collapse>