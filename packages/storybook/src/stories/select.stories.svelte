<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Multiselect,
  SearchableSelect,
  Select,
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
  <div class="h-[200px]">
    <SearchableSelect
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
