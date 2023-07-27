<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
</script>

<!-- Badge -->
<Badge
  variant="gray"
  label="Inactive"
/>
<Badge
  variant="green"
  label="Active"
/>
<Badge
  variant="orange"
  label="Danger"
/>
<Badge
  variant="red"
  label="Unhealthy"
/>
<Badge
  variant="blue"
  label="Info"
/>

<!-- Breadcrumbs -->
<Breadcrumbs crumbs={['Chocolate Chip', 'Oatmeal Raisin']} />
