<script lang="ts">
import Badge from '$lib/badge.svelte';
import Breadcrumbs from '$lib/breadcrumbs.svelte';
import Button from '$lib/button/button.svelte';
import IconButton from '$lib/button/icon-button.svelte';
import Collapse from '$lib/collapse.svelte';
import ContextMenu from '$lib/context-menu/context-menu.svelte';
import ContextMenuItem from '$lib/context-menu/context-menu-item.svelte';
import ContextMenuSeparator from '$lib/context-menu/context-menu-separator.svelte';
import Icon from '$lib/icon/icon.svelte';
import Label from '$lib/label.svelte';
import Notify from '$lib/notify.svelte';
import Input from '$lib/input/input.svelte';
import Pill from '$lib/pill.svelte';
import Switch from '$lib/switch.svelte';
import Radio from '$lib/radio.svelte';
import Tabs from '$lib/tabs.svelte';
import Tooltip from '$lib/tooltip.svelte';
import TextInput from '$lib/input/text-input.svelte';
import NumericInput from '$lib/input/numeric-input.svelte';
import SliderInput from '$lib/input/slider-input.svelte';
import Table from '$lib/table/table.svelte';
import TableBody from '$lib/table/table-body.svelte';
import TableCell from '$lib/table/table-cell.svelte';
import TableHeaderCell from '$lib/table/table-header-cell.svelte';
import TableHeader from '$lib/table/table-header.svelte';
import TableRow from '$lib/table/table-row.svelte';
import Select from '$lib/select/select.svelte';

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
    <Button on:click={() => (buttonClickedTimes += 1)}>
      Clicked {buttonClickedTimes} times!
    </Button>
  </div>

  <div class="flex gap-4">
    <Button>Primary</Button>
    <Button
      disabled
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('Uh oh, should not be called!');
      }}
    >
      Disabled
    </Button>

    <Button variant="dark">Dark</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="success">Success</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline-danger">Outline Danger</Button>
  </div>

  <Button width="full">Full Width</Button>

  <div class="flex-start gap-4">
    <!-- IconButton -->
    <IconButton
      label="close"
      icon="close"
    />
    <IconButton
      icon="close"
      variant="danger"
      label="Click me"
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('closed!');
      }}
    />
    <IconButton
      icon="close"
      label="Click me"
      disabled
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('Uh oh, should not be called!');
      }}
    />
  </div>

  <!-- Collapse -->
  <Collapse title="Motor 1">
    <div
      slot="content"
      class="border-light border border-t-0 p-4 text-sm"
    >
      Motor one was conceived and executed at Bell Labs in 1972 under the
      guidance of lead director Dennis Richie and Supervisor Wallace Breen.
    </div>
  </Collapse>

  <Collapse title="Motor 1">
    <Badge
      slot="header"
      label="Inactive"
    />
    <div
      slot="content"
      class="border-light border border-t-0 p-4 text-sm"
    >
      Motor one was conceived and executed at Bell Labs in 1972 under the
      guidance of lead director Dennis Richie and Supervisor Wallace Breen.
    </div>
  </Collapse>

  <Collapse title="Motor 1">
    <Breadcrumbs
      slot="title"
      crumbs={['Robot', 'Motor']}
    />
    <Badge
      slot="header"
      label="Inactive"
    />
    <div
      slot="content"
      class="border-light border border-t-0 p-4 text-sm"
    >
      Motor one was conceived and executed at Bell Labs in 1972 under the
      guidance of lead director Dennis Richie and Supervisor Wallace Breen.
    </div>
  </Collapse>

  <Collapse title="Motor 1">
    <Breadcrumbs
      slot="title"
      crumbs={['Robot', 'Motor']}
    />
    <Badge
      slot="header"
      label="Inactive"
    />
    <div
      slot="content"
      class="p-4 text-sm"
    >
      Motor one was conceived and executed at Bell Labs in 1972 under the
      guidance of lead director Dennis Richie and Supervisor Wallace Breen.
    </div>
  </Collapse>

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
      name="readonly"
      value="Readonly Input"
      readonly
    />

    <Input
      name="disabled"
      value="Disabled Input"
      disabled
    />
  </div>

  <div class="flex gap-4">
    <Input
      name="info"
      value="Info State"
      state="info"
    />
    <Input
      name="warn"
      value="Warn State"
      state="warn"
    />
    <Input
      name="error"
      value="Error State"
      state="error"
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

    <NumericInput
      name="number"
      placeholder="Enter a number"
    />

    <NumericInput
      type="integer"
      name="integer"
      placeholder="Enter an integer"
    />
  </div>

  <div class="flex gap-4">
    <SliderInput
      placeholder="Slide to select a number"
      name="slider"
    />

    <SliderInput
      placeholder="Slide to select a number"
      name="slider"
    />

    <SliderInput
      placeholder="Slide to select a number"
      name="slider"
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
    <!-- Select -->
    <Select>
      <option>This thing</option>
      <option>That thing</option>
      <option>The other thing</option>
      <optgroup label="The other things">
        <option>This other thing</option>
        <option>That other thing</option>
        <option>The other other thing</option>
      </optgroup>
    </Select>

    <Select disabled>
      <option selected>Disabled select</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>
  </div>

  <div class="flex gap-4">
    <!-- Select -->
    <Select state="info">
      <option selected>Info state</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>

    <Select state="warn">
      <option selected>Warn state</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>

    <Select state="error">
      <option selected>Error state</option>
      <option>That thing</option>
      <option>The other thing</option>
    </Select>
  </div>

  <div class="flex gap-4">
    <!-- Label -->
    <Label>
      Default
      <Input
        slot="input"
        name="name"
      />
    </Label>

    <Label required>
      Required
      <Input
        slot="input"
        name="name"
        required
      />
    </Label>

    <Label disabled>
      Disabled
      <Input
        slot="input"
        name="name"
        disabled
      />
    </Label>

    <Label detail="(detail)">
      With Detail
      <Input
        slot="input"
        name="name"
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

    <Icon
      name="package-variant-closed"
      size="4xl"
    />
    <div class="hover:animate-spin">
      <Icon
        name="lock"
        size="4xl"
      />
    </div>
    <Icon
      name="earth"
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

  <div class="flex gap-4">
    <!-- Tabs -->
    <Tabs
      tabs={['Tab 1', 'Tab 2', 'Tab 3']}
      selected="Tab 1"
    />

    <Tabs
      tabs={['Tab 1', 'Tab 2', 'Tab 3']}
      selected="Tab 2"
    />

    <Tabs
      tabs={['Tab 1', 'Tab 2']}
      selected="Tab 2"
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
  <!-- Context menu -->
  <ContextMenu>
    <ContextMenuItem label="label 1" />
    <ContextMenuSeparator />
    <ContextMenuItem
      label="label 2"
      variant="primary"
    />
    <ContextMenuItem
      icon="trash-can-outline"
      label="label 3"
    />
    <ContextMenuItem
      icon="close"
      label="danger"
      variant="danger"
    />
  </ContextMenu>

  <!-- Table -->
  <Table cols={['10%', '90%']}>
    <TableHeader>
      <TableHeaderCell
        >headerheaderheader (mario underwater theme)</TableHeaderCell
      >
      <TableHeaderCell>Another header</TableHeaderCell>
    </TableHeader>
    <TableBody cx="text-center">
      <TableRow>
        <TableCell
          >the mitochondria is the powerhouse of the tablecell</TableCell
        >
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="success">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="error">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
      <TableRow variant="disabled">
        <TableCell>stuff</TableCell>
        <TableCell>stuffs</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
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

<div>
  <Notify
    variant="info"
    title="This is the info title"
    message="This is the message."
  />
  <Notify
    variant="success"
    title="This is the success title"
    message="This is the message."
  />

  <Notify
    variant="warning"
    title="This is the warning title"
    message="This is the message."
  />

  <Notify
    variant="danger"
    title="This is the danger title"
    message="This is the message."
  />
  <Notify
    exitable={true}
    variant="danger"
    title="This is the danger title"
    message="This is the message."
  />
  <Notify
    exitable={true}
    variant="danger"
    title="This is the danger title"
    message="This is the message."
  />
</div>
