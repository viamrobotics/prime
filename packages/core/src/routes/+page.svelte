<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Switch from '$lib/switch.svelte';

let buttonClickedTimes = 0;
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

<!-- Button -->
<Button
  variant="success"
  label="Console log"
  on:click={() => {
    buttonClickedTimes += 1;
    // eslint:disable-next-line no-console
    console.log(`button clicked ${buttonClickedTimes} times!`);
  }}
/>
<Button
  variant="success"
  disabled
  label="testing 2"
/>
<Button
  label="testing 3"
  width="full"
/>

<!-- Switch -->
<Switch value="off" />

<Switch
  value="off"
  variant="annotated"
/>

<Switch
  value="off"
  label="Lunchtime"
/>

<Switch
  value="off"
  disabled="true"
  label="disabled"
/>

<Switch
  value="on"
  variant="annotated"
  readonly="true"
  label="readonly"
/>
