<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Label,
  Multiselect,
  SearchableSelect,
  Select,
  SortOptions,
} from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Select" />

<Story name="Basic">
  <Select>
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
  <Label cx="h-[200px]">
    Searchable select with limited options
    <SearchableSelect
      slot="input"
      placeholder="Search options"
      options={[
        'First Option',
        'Option 2',
        'C.) Option',
        'Something Else',
        'With A Whole Lot Of Parts',
      ]}
      exclusive
    />
  </Label>
</Story>

<Story name="Searchable with arbitrary text">
  <Label cx="h-[200px]">
    Select with arbitrary text
    <SearchableSelect
      slot="input"
      placeholder="Search lyrics or invent your own"
      otherOptionPrefix="Other:"
      options={['Hello', 'From', 'The other side']}
      sort={SortOptions.REDUCE}
    />
  </Label>
</Story>

<Story name="Multi">
  <div class="h-[200px]">
    <Multiselect
      options={[
        'First Option',
        'Option 2',
        'C.) Option',
        'Something Else',
        'With A Whole Lot Of Parts',
      ]}
    />
  </div>
</Story>
