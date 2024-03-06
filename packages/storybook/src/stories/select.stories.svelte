<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Label,
  SearchableSelect,
  Select,
  SortOptions,
} from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Select" />

<Story name="Basic">
  <Select cx="max-w-[200px]">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
    <optgroup label="More options">
      <option>Option 4</option>
      <option>Option 5</option>
      <option>Option 6</option>
    </optgroup>
  </Select>
</Story>

<Story name="Searchable">
  <Label cx="h-[200px] max-w-[200px]">
    Searchable select
    <SearchableSelect
      slot="input"
      placeholder="Search options"
      options={[
        'First option',
        'Second option',
        'Third option',
        'Something else',
        'With a whole lot of parts',
      ]}
      exclusive
    />
  </Label>
</Story>

<Story name="Searchable with arbitrary text">
  <Label cx="h-[200px] max-w-[200px]">
    Searchable select with create
    <SearchableSelect
      slot="input"
      placeholder="Type to find or create..."
      otherOptionPrefix="Other:"
      options={['Hello', 'From', 'The other side']}
      sort={SortOptions.REDUCE}
    />
  </Label>
</Story>

<Story name="Searchable with descriptions ">
  <Label cx="h-[200px] max-w-[200px]">
    Searchable select with description
    <SearchableSelect
      slot="input"
      exclusive
      placeholder="Type to find or create..."
      options={[
        {
          value: 'a',
          label: 'app.viam.com',
          description: 'Website',
          icon: 'earth',
        },
        {
          value: 'b',
          label: 'viam',
          description: 'Command Line Interface',
          icon: 'tools',
        },
        {
          value: 'c',
          label: 'Viam app',
          description: 'Mobile App',
          icon: 'apple',
        },
      ]}
    />
  </Label>
</Story>

<Story name="Searchable with multiple">
  <Label cx="h-[200px] max-w-[200px]">
    Select multiple options
    <SearchableSelect
      slot="input"
      options={[
        'First option',
        'Second option',
        'Third option',
        'Something else',
        'With a whole lot of parts',
      ]}
      sort={SortOptions.REDUCE}
      exclusive
      multiple
    />
  </Label>
</Story>

<Story name="Searchable with multiple and descriptions">
  <Label cx="h-[200px] max-w-[200px]">
    Searchable select with description
    <SearchableSelect
      slot="input"
      placeholder="Type to find or create..."
      options={[
        { value: 'a', label: 'app.viam', description: 'website' },
        { value: 'b', label: 'viam', description: 'cli' },
      ]}
      exclusive
      multiple
    />
  </Label>
</Story>
