<script lang="ts">
  import { Collapse, Badge, Breadcrumbs } from '@viamrobotics/prime-core';
  export let open = false;
  export let title = '';
  export let content = '';
</script>


<Collapse open={open} title={title}>
  <Breadcrumbs slot='title' crumbs={['Robot', 'Motor']}></Breadcrumbs>
  <Badge slot='header' label='Inactive'></Badge>
  <div class="text-sm p-4 border border-t-0 border-light">{content}</div>
</Collapse>
