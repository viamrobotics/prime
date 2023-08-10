<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button.svelte';
import Icon from '$lib/icon/icon.svelte';
import Label from '$lib/label.svelte';
import Input from '$lib/input/input.svelte';
import Pill from '$lib/pill.svelte';
import Switch from '$lib/switch.svelte';
import Radio from '$lib/radio.svelte';
import Tooltip from '$lib/tooltip.svelte';
import TextInput from '$lib/input/text-input.svelte';

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
    <!-- Input -->

    <Input
      name="name"
      placeholder="Enter your name"
    />

    <Input
      name="name"
      value="Phillip J. Fry"
      readonly
    />

    <Input
      name="name"
      value="Phillip J. Fry"
      disabled
    />

    <Input
      name="name"
      placeholder="Enter your name"
      required
    />

    <Input
      name="name"
      placeholder="Enter your name (autocomplete)"
      autocomplete="on"
    />
  </div>

  <div class="flex gap-4">
    <!-- Text Input -->

    <TextInput
      name="name"
      placeholder="Enter your name"
    />

    <TextInput
      type="email"
      name="email"
      placeholder="Enter your email"
    />

    <TextInput
      type="password"
      name="password"
      placeholder="Enter your password"
    />
  </div>

  <div class="flex gap-4">
    <!-- Numeric Input -->

    <Input
      type="number"
      name="number"
      placeholder="Enter a number"
    />

    <Input
      type="integer"
      name="integer"
      placeholder="Enter an integer"
    />
  </div>

  <div class="flex gap-4">
    <!-- Datetime Input -->

    <Input
      type="time"
      name="time"
      placeholder="Enter a time"
    />

    <Input
      type="date"
      name="date"
      placeholder="Enter a date"
    />

    <Input
      type="datetime-local"
      name="datetime-local"
      placeholder="Enter a date and time"
    />
  </div>

  <div class="flex gap-4">
    <!-- Label -->
    <Label
      >Name:
      <Input
        slot="input"
        name="name"
      />
    </Label>

    <Label required>
      Name:
      <Input
        slot="input"
        name="name"
        required
      />
    </Label>

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
    <Label disabled>
      Name:
      <Input
        slot="input"
        name="name"
        disabled
      />
    </Label>
  </div>

  <div class="flex gap-4">
    <!-- Tooltip -->
    <Tooltip>
      This element has a top tooltip.
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="left">
      This element has a left tooltip.
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="right">
      This element has a right tooltip.
      <div slot="text">This is the tooltip text!</div>
    </Tooltip>

    <Tooltip location="bottom">
      This element has a bottom tooltip and an icon!
      <span class="ml-0.5"> <Icon name="information-outline" /></span>
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

    <div class="text-yellow-800">
      <Icon
        name="package-variant-closed"
        size="4xl"
      />
    </div>
    <div class="text-gray-500 hover:animate-spin">
      <Icon
        name="lock"
        size="4xl"
      />
    </div>
    <div class="text-blue-300">
      <Icon
        name="earth"
        size="4xl"
      />
    </div>
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

  <div class="flex gap-4">
    <!-- Switch -->
    <Switch
      on
      variant="annotated"
    />

    <Switch
      on
      label="Lunchtime"
    />

    <Switch
      on
      variant="annotated"
      tooltip="I'm a tooltip message"
      label="Switch Label"
    />

    <Switch
      on
      disabled
      label="disabled"
    />

    <Switch
      on
      variant="annotated"
      readonly
      label="readonly"
    />
  </div>
</div>
