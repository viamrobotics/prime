<script lang="ts">
import {
  Badge,
  Breadcrumbs,
  Button,
  IconButton,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  FloatingMenu,
  Icon,
  Label,
  Banner,
  Input,
  Pill,
  Switch,
  Radio,
  Tabs,
  Tooltip,
  TooltipContainer,
  TooltipTarget,
  TooltipText,
  TextInput,
  NumericInput,
  RestrictedTextInput,
  SliderInput,
  VectorInput,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHeader,
  TableRow,
  ToggleButtons,
  Select,
  SearchableSelect,
  Multiselect,
  NotificationContainer,
  provideNotify,
  useNotify,
  Modal,
} from '$lib';
import { uniqueId } from 'lodash';

import { writable } from 'svelte/store';

provideNotify();

let buttonClickedTimes = 0;
let preventHandlerDisabled = true;
const modalOpen = writable(false);

const handleTogglePreventHandler = (event: CustomEvent<boolean>) => {
  preventHandlerDisabled = event.detail;
};

const handleCloseModal = () => {
  modalOpen.set(false);
};

const handleOpenModal = () => {
  modalOpen.set(true);
};
const notify = useNotify();

let restrictedValue = '';
$: console.log(restrictedValue);

const restrictInput = (inputValue: string) =>
  inputValue
    .replaceAll(/\s/gu, '-')
    .replaceAll('%', '$')
    .replaceAll(/[^a-z0-9-$]/gu, '');
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
      <svelte:fragment slot="subtitle">This is the subtitle.</svelte:fragment>

      <svelte:fragment slot="message">
        This is <strong>the</strong> message.
      </svelte:fragment>
    </Banner>

    <Banner
      variant="danger"
      progress={0.5}
    >
      <svelte:fragment slot="title">
        This is the <em>danger</em> title.
      </svelte:fragment>
      <svelte:fragment slot="subtitle">This is the subtitle.</svelte:fragment>
      <svelte:fragment slot="message">
        This is <strong>the</strong> message.
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

  <div class="flex gap-4">
    <Button icon="camera-outline">Primary</Button>
    <Button
      disabled
      icon="cog"
      on:click={() => {
        // eslint-disable-next-line no-console
        console.log('Uh oh, should not be called!');
      }}
    >
      Disabled
    </Button>

    <Button
      variant="dark"
      icon="magnify">Dark</Button
    >
    <Button
      variant="ghost"
      icon="credit-card-outline">Ghost</Button
    >
    <Button
      variant="success"
      icon="earth">Success</Button
    >
    <Button
      variant="danger"
      icon="download">Danger</Button
    >
    <Button
      variant="outline-danger"
      icon="broadcast">Outline Danger</Button
    >
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

  <!-- Context Menu -->
  <h1 class="text-2xl">Context Menu</h1>
  <div class="flex items-start gap-4">
    <ContextMenu id={uniqueId('context-menu')}>
      <ContextMenuItem>label 1</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="primary">label 2</ContextMenuItem>
      <ContextMenuItem icon="trash-can-outline">label 3</ContextMenuItem>
      <ContextMenuItem
        icon="close"
        variant="danger"
        on:click={() => console.log('oh no')}
      >
        danger
      </ContextMenuItem>
    </ContextMenu>

    <FloatingMenu
      placement="top-start"
      offset={4}
    >
      <svelte:fragment
        slot="control"
        let:isOpen
      >
        {isOpen ? 'Close menu' : 'Open menu'}
      </svelte:fragment>
      <svelte:fragment slot="items">
        <ContextMenuItem>label 1</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="primary">label 2</ContextMenuItem>
        <ContextMenuItem icon="trash-can-outline">label 3</ContextMenuItem>
        <ContextMenuItem
          icon="close"
          variant="danger"
          on:click={() => console.log('oh no')}
        >
          danger
        </ContextMenuItem>
      </svelte:fragment>
    </FloatingMenu>
  </div>

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
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Input input', event);
      }}
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
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('TextInput input', event);
      }}
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

  <!-- Restricted Text Input -->
  <h2 class="text-xl">Restricted Text Input</h2>

  <div class="flex gap-4">
    <RestrictedTextInput
      name="namespace"
      placeholder="Enter your money namespace"
      bind:value={restrictedValue}
      tooltipDescription="Valid characters: numbers, lowercase letters, dashes, dolla $ign"
      {restrictInput}
      inputCX="min-w-[300px]"
    />
  </div>

  <!-- Numeric Input -->
  <h2 class="text-xl">Numeric Input</h2>
  <div class="flex gap-4">
    <NumericInput
      name="number"
      placeholder="Enter a number"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('NumericInput input', event);
      }}
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
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('SliderInput input', event);
      }}
      on:change={(event) => {
        // eslint-disable-next-line no-console
        console.log('SliderInput change', event);
      }}
      placeholder="Slide to select a number"
      name="slider"
    />

    <SliderInput
      placeholder="Readonly"
      readonly
      name="slider"
    />

    <SliderInput
      placeholder="Disabled"
      name="slider"
      disabled
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

  <!-- Modal -->
  <h1 class="text-2xl">Modal</h1>

  <div>
    <Button on:click={handleOpenModal}>Open Modal</Button>
    <Modal isOpen={modalOpen}>
      <span slot="title">This is the modal demo</span>
      <span slot="message"
        >Are you sure you want to kick off a notify toast?</span
      >
      <Button
        slot="primary"
        on:click={() => notify.success('Howdy Message', 'Howdy Partner')}
      >
        Notify howdy
      </Button>
      <Button
        slot="secondary"
        variant="dark"
        on:click={handleCloseModal}
      >
        Cancel
      </Button>
    </Modal>
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

  <!-- Prevent Handler -->

  <h1 class="text-2xl">Prevent Handler</h1>
  <div class="flex flex-col gap-4">
    <Input
      placeholder="Disable Me"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Prevent Handler input', event);
      }}
      disabled={preventHandlerDisabled}
    />
    <Switch
      on={preventHandlerDisabled}
      annotated
      on:change={handleTogglePreventHandler}
    >
      <svelte:fragment slot="on">Enabled</svelte:fragment>
      <svelte:fragment slot="off">Disabled</svelte:fragment>
    </Switch>
  </div>

  <!-- Radio -->
  <h1 class="text-2xl">Radio</h1>

  <div class="flex gap-4">
    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      name="radio"
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('Radio input', event);
      }}
    />

    <Radio
      options={['Opt 1', 'Opt 2']}
      selected="Opt 1"
      name="preselected-radio"
    >
      <svelte:fragment slot="legend">Preselected Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="required-radio"
      required
    >
      <svelte:fragment slot="legend">Required Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="disabled-radio"
      disabled
    >
      <svelte:fragment slot="legend">Disabled Radio</svelte:fragment>
    </Radio>

    <Radio
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      name="row-radio"
      direction="row"
    >
      <svelte:fragment slot="legend">Row Radio</svelte:fragment>
    </Radio>
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

    <Select disabled={preventHandlerDisabled}>
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
      on:toggle={(event) => {
        // eslint-disable-next-line no-console
        console.log('Switch toggle', event);
      }}
    />

    <Switch on />

    <Switch
      on
      annotated
    />

    <Switch
      on
      annotated
      disabled
    />

    <Switch on>
      <svelte:fragment slot="on">Enabled</svelte:fragment>
      <svelte:fragment slot="off">Disabled</svelte:fragment>
    </Switch>
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

  <!-- Toggle Buttons -->
  <h1 class="text-2xl">Toggle Buttons</h1>

  <div class="flex items-end gap-4">
    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      on:input={(event) => {
        // eslint-disable-next-line no-console
        console.log('ToggleButtons input', event);
      }}
    />

    <ToggleButtons
      options={['Opt 1', 'Opt 2']}
      selected="Opt 1"
    >
      <svelte:fragment slot="legend">Preselected toggle</svelte:fragment>
    </ToggleButtons>

    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      disabled
    >
      <svelte:fragment slot="legend">Disabled toggle</svelte:fragment>
    </ToggleButtons>

    <ToggleButtons
      options={['Opt 1', 'Opt 2', 'Opt 3']}
      selected="Opt 1"
      cx="w-full"
    >
      <svelte:fragment slot="legend">Full width</svelte:fragment>
    </ToggleButtons>
  </div>

  <!-- Tooltip -->
  <h1 class="text-2xl">Tooltip</h1>
  <div class="flex flex-wrap items-start gap-4">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>This element has a top tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="left"
    >
      <p aria-describedby={tooltipID}>This element has a left tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="right"
    >
      <p aria-describedby={tooltipID}>This element has a right tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <Tooltip
      let:tooltipID
      location="bottom"
      state="visible"
    >
      <p aria-describedby={tooltipID}>
        This element has visible bottom tooltip.
      </p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>

    <div>
      <TooltipContainer let:tooltipID>
        <Label>
          This element has a tooltip on an icon!
          <TooltipTarget>
            <Icon
              tabindex="0"
              cx="cursor-pointer"
              name="information-outline"
            />
          </TooltipTarget>
          <TextInput
            slot="input"
            aria-describedby={tooltipID}
          />
        </Label>
        <TooltipText>This is the tooltip text!</TooltipText>
      </TooltipContainer>
    </div>
  </div>

  <!-- Vector Input -->
  <h1 class="text-2xl">Vector Input</h1>
  <VectorInput
    on:input={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput input', event);
    }}
    on:change={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput change', event);
    }}
  />

  <VectorInput
    type="number"
    step={10}
    labels={['x', 'y', 'z', 'w']}
    placeholders={{
      x: '0',
      y: '0',
      z: '0',
      w: '0',
    }}
    values={{
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    }}
    on:input={(event) => {
      // eslint-disable-next-line no-console
      console.log('VectorInput input', event);
    }}
  />
</div>
