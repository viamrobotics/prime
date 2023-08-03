<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Pill from '$lib/pill.svelte';
import Radio from '$lib/radio.svelte';
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

<!-- Radio -->
<Radio
  options={['Opt 1', 'Opt 2', 'Opt 3']}
  selected="Opt 1"
/>

<Radio
  label="These are your options"
  labelposition="top"
  options={['Opt 1', 'Opt 2']}
  selected="Opt 1"
/>

<Radio
  label="Your options"
  labelposition="top"
  selected="Option 1"
  options={['Opt 1', 'Opt 2', 'Opt 3']}
  tooltip="Warning: these options may not be your only options."
  state="warn"
/>

<Radio
  options={['Opt 1', 'Opt 2', 'Opt 3']}
  selected="Opt 1"
  readonly="{true}"
/>

<Radio
  options={['Opt 1', 'Opt 2', 'Opt 3']}
  selected="Opt 1"
  width="full"
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
