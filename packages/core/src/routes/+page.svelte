<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Label from '$lib/label.svelte';
import Pill from '$lib/pill.svelte';
import Switch from '$lib/switch.svelte';
import Tooltip from '$lib/tooltip.svelte';

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
    // eslint-disable-next-line no-console
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

<!-- Label -->
<Label
  >Name:
  <input
    slot="input"
    name="name"
    class="border border-black"
  />
</Label>

<Label required>
  Name:
  <input
    slot="input"
    name="name"
    class="border border-black"
    required
  />
</Label>

<Label disabled>
  Name:
  <input
    slot="input"
    name="name"
    class="border border-black"
    disabled
  />
</Label>

<!-- Switch -->
<Switch
  enabled
  variant="annotated"
/>

<Switch
  enabled
  label="Lunchtime"
/>

<Switch
  enabled
  disabled
  label="disabled"
/>

<Switch
  enabled
  variant="annotated"
  readonly
  label="readonly"
/>

<!-- Pill -->
<Pill />
<Pill value="Foo" />
<Pill
  readonly
  value="Bar"
/>
<Pill
  disabled
  value="Baz"
/>

<!-- Tooltip -->
<Tooltip>
  This element has a top tooltip.
  <!-- TODO (APP-2290): Uncomment this when Icon is added -->
  <!-- <Icon
    slot="icon"
    name="information-outline"
  /> -->
  <div slot="text">This is the tooltip text!</div>
</Tooltip>

<Tooltip location="left">
  This element has a left tooltip.
  <!-- TODO (APP-2290): Uncomment this when Icon is added -->
  <!-- <Icon
    slot="icon"
    name="information-outline"
  /> -->
  <div slot="text">This is the tooltip text!</div>
</Tooltip>

<Tooltip location="right">
  This element has a right tooltip.
  <!-- TODO (APP-2290): Uncomment this when Icon is added -->
  <!-- <Icon
    slot="icon"
    name="information-outline"
  /> -->
  <div slot="text">This is the tooltip text!</div>
</Tooltip>

<Tooltip location="bottom">
  This element has a bottom tooltip.
  <!-- TODO (APP-2290): Uncomment this when Icon is added -->
  <!-- <Icon
    slot="icon"
    name="information-outline"
  /> -->
  <div slot="text">This is the tooltip text!</div>
</Tooltip>
