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
import Banner from '$lib/banner.svelte';
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
import SearchableSelect from '$lib/select/searchable-select.svelte';
import Multiselect from '$lib/select/multiselect.svelte';
import NotificationContainer from '$lib/notification/notification-container.svelte';
import { notify } from '$lib/notification/notify';

let buttonClickedTimes = 0;
</script>

<NotificationContainer />

<div class="container mx-auto my-4 flex flex-col gap-8 p-4">
  <!-- Badge -->
  <h1 class="text-2xl">Badge</h1>
  <div>
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

  <!-- Banner -->
  <h1 class="text-2xl">Banner</h1>
  <div class="flex flex-col gap-4">
    <Banner variant="info">
      <svelte:fragment slot="title">This is the info title.</svelte:fragment>
    </Banner>

    <Banner variant="success">
      <svelte:fragment slot="title">This is the success title.</svelte:fragment>
      <svelte:fragment slot="message">This is the message.</svelte:fragment>
    </Banner>

    <Banner
      variant="warning"
      exitable={true}
    >
      <svelte:fragment slot="title">This is the warning title.</svelte:fragment>

      <svelte:fragment slot="message">
        This is <strong>the</strong> message.
      </svelte:fragment>

      <svelte:fragment slot="action">
        <a
          href="/"
          class="text-link">This is the action.</a
        >
      </svelte:fragment>
    </Banner>

    <Banner
      variant="danger"
      progress={0.5}
    >
      <svelte:fragment slot="title">
        This is the <em>danger</em> title.
      </svelte:fragment>
      <svelte:fragment slot="action">
        <Button variant="danger">This is the action.</Button>
      </svelte:fragment>
    </Banner>
  </div>

  <!-- Breadcrumbs -->
  <h1 class="text-2xl">Breadcrumbs</h1>
  <Breadcrumbs crumbs={['Chocolate Chip', 'Oatmeal Raisin']} />

  <!-- Button -->
  <h1 class="text-2xl">Button</h1>

  <div class="flex gap-4">
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

  <!-- IconButton -->
  <h2 class="text-xl">IconButton</h2>

  <div class="flex-start gap-4">
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
  <h1 class="text-2xl">Collapse</h1>

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

  <!-- Context Menu -->
  <h1 class="text-2xl">Context Menu</h1>
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

  <!-- Icon -->
  <h1 class="text-2xl">Icon</h1>
  <div class="flex gap-4">
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

  <!-- Input -->
  <h1 class="text-2xl">Input</h1>

  <div class="flex gap-4">
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

  <!-- Text Input -->
  <h2 class="text-xl">Text Input</h2>

  <div class="flex gap-4">
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

  <!-- Numeric Input -->
  <h2 class="text-xl">Numeric Input</h2>
  <div class="flex gap-4">
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

  <!-- Slider Input -->
  <h2 class="text-xl">Slider Input</h2>
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

  <!-- Datetime Input -->
  <h2 class="text-xl">Datetime Input</h2>
  <div class="flex gap-4">
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

  <!-- Label -->
  <h1 class="text-2xl">Label</h1>
  <div class="flex gap-4">
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

  <!-- Notify -->
  <h1 class="text-2xl">Notify</h1>
  <div class="flex gap-4">
    <Button on:click={() => notify.info('Info', 'Info message')}>
      Info Notify
    </Button>
    <Button on:click={() => notify.warn('Warn', 'Warn message')}>
      Warn Notify
    </Button>
    <Button
      variant="success"
      on:click={() => notify.success('Success', 'Success message')}
    >
      Success Notify
    </Button>
    <Button
      variant="danger"
      on:click={() => notify.danger('Danger', 'Danger message')}
    >
      Danger Notify
    </Button>
  </div>

  <!-- Pill -->
  <h1 class="text-2xl">Pill</h1>
  <div class="flex gap-4">
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

  <!-- Radio -->
  <h1 class="text-2xl">Radio</h1>

  <div class="flex flex-col gap-4">
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

  <!-- Select -->
  <h1 class="text-2xl">Select</h1>

  <div class="flex gap-4">
    <Select
      on:change={(event) => {
        // eslint-disable-next-line no-console
        console.log('Select input', event);
      }}
    >
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

  <!-- Searchable Select -->
  <h2 class="text-xl">Searchable Select</h2>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Select an option"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('SearchableSelect input', event);
      }}
    />
    <SearchableSelect
      options={['First Option', 'Disabled select', 'C.) Option']}
      value="Disabled select"
      disabled
    />
    <SearchableSelect
      options={[
        'First Option',
        'Option 2',
        'C.) Option',
        'So',
        'Many',
        'More',
        'Options',
        'With A Whole Lot Of Spaces',
      ]}
      placeholder="Reducing Select"
      sort="reduce"
    />
  </div>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Warn state"
      state="warn"
    />
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Error state"
      state="error"
    />
  </div>

  <div class="flex gap-4">
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a button"
      button={{ text: 'Other', icon: 'information-outline' }}
    />
    <SearchableSelect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a heading"
      heading="Some heading text"
    />
  </div>

  <!-- Multiselect -->
  <h2>Multiselect</h2>
  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Select an option"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Multiselect input', event);
      }}
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      selected={['Option 2']}
      placeholder="Disabled select"
      disabled
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      selected={['Option 2']}
      placeholder="Preselected option"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Warn state"
      state="warn"
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Error state"
      state="error"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a button"
      button={{ text: 'Other', icon: 'information-outline' }}
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="With a heading"
      heading="Some heading text"
    />
  </div>

  <div class="flex gap-4">
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="Clearable"
      clearable
    />
    <Multiselect
      options={['First Option', 'Option 2', 'C.) Option']}
      placeholder="No pills"
      showPills={false}
    />
  </div>

  <!-- Switch -->
  <h1 class="text-2xl">Switch</h1>
  <div class="flex gap-4">
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

  <!-- Table -->
  <h1 class="text-2xl">Table</h1>
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
  <!-- Tabs -->
  <h1 class="text-2xl">Tabs</h1>
  <div class="flex gap-4">
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

  <!-- Tooltip -->
  <h1 class="text-2xl">Tooltip</h1>
  <div class="flex gap-4">
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
</div>
