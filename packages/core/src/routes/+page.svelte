<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Icon from '$lib/icon/icon.svelte';
import Label from '$lib/label.svelte';
import Pill from '$lib/pill.svelte';
import Radio from '$lib/radio.svelte';
import Tooltip from '$lib/tooltip.svelte';

let buttonClickedTimes = 0;
</script>

<div class="container mx-auto my-4 flex flex-col gap-8 p-4">
  <div>
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
  </div>

  <!-- Breadcrumbs -->
  <Breadcrumbs crumbs={['Chocolate Chip', 'Oatmeal Raisin']} />

  <div class="flex gap-4">
    <!-- Button -->
    <Button
      variant="success"
      label="Click me"
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
  </div>

  <div class="flex gap-4">
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
  </div>

  <div class="flex gap-4">
    <!-- Label -->
    <Label
      >Name:
      <input
        slot="input"
        name="name"
        class="border border-black"
      />
    </Label>

<!-- Tooltip -->
<Tooltip>
  This element has a top tooltip.
  <Icon
    slot="icon"
    name="information-outline"
  />
  <div slot="text">This is the tooltip text!</div>
</Tooltip>
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
  </div>

  <div>
    <!-- Tooltip -->
    <Tooltip>
      This element has a top tooltip.
      <Icon
        slot="icon"
        name="information-outline"
      />
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="left">
      This element has a left tooltip.
      <Icon
        slot="icon"
        name="information-outline"
      />
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="right">
      This element has a right tooltip.
      <Icon
        slot="icon"
        name="information-outline"
      />
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="bottom">
      This element has a bottom tooltip.
      <Icon
        slot="icon"
        name="information-outline"
      />
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>
  </div>

  <div class="flex gap-4">
    <!-- Icons -->
    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="xs"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="sm"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="base"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="lg"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="xl"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="2xl"
      />
    </p>

    <p class="text-danger-dark">
      <Icon
        name="cog"
        size="3xl"
      />
    </p>

    <p class="text-warning-bright">
      <Icon
        name="cog"
        size="4xl"
      />
    </p>

    <Icon
      name="package-closed"
      size="4xl"
    />
    <Icon
      name="lock"
      size="4xl"
    />
    <Icon
      name="public"
      size="4xl"
    />
  </div>

  <div class="flex flex-col gap-4">
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
readonly={true}
/>

<Radio
options={['Opt 1', 'Opt 2', 'Opt 3']}
selected="Opt 1"
width="full"
/>
  </div>
</div>
