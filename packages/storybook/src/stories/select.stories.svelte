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
  <div class="h-[200px] max-w-[200px]">
    <Label>
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
  </div>
</Story>

<Story name="Searchable with arbitrary text">
  <div class="h-[200px] max-w-[200px]">
    <Label>
      Searchable select with create
      <SearchableSelect
        slot="input"
        placeholder="Type to find or create..."
        otherOptionPrefix="Other:"
        options={['Hello', 'From', 'The other side']}
        sort={SortOptions.REDUCE}
      />
    </Label>
  </div>
</Story>

<Story name="Searchable OS/Platform list ">
  <div class="h-[200px] max-w-[200px]">
    <Label>
      Searchable OS/Platform list
      <SearchableSelect
        slot="input"
        exclusive
        placeholder="Type to find or create..."
        options={[
          {
            value: 'linux-aarch64',
            label: 'Linux (Aarch64)',
            icon: 'linux',
          },
          {
            value: 'linux-x86',
            label: 'Linux (x86_64)',
            icon: 'linux',
          },
          {
            value: 'linux-arm7l',
            label: 'Linux (Arm7l)',
            icon: 'linux',
          },
          {
            value: 'macos',
            label: 'Mac',
            icon: 'apple',
          },
          {
            value: 'windows',
            label: 'Windows',
            icon: 'windows',
          },
        ]}
      />
    </Label>
  </div>
</Story>

<Story name="Searchable MlModel list ">
  <div class="h-[200px] max-w-[200px]">
    <Label>
      Searchable MlModel list
      <SearchableSelect
        slot="input"
        exclusive
        placeholder="Type to find or create..."
        options={[
          {
            value: 'uuid-1',
            label: 'viam:catdetector',
            description: 'tflite',
          },
          {
            value: 'uuid-2',
            label: 'nasa:asteroid-classifer',
            description: 'pytorch',
          },
          {
            value: 'uuid-3',
            label: 'viam:plate-reader',
            description: 'tflite',
          },
          {
            value: 'uuid-4',
            label: 'apple:face-detection',
            description: 'metal',
          },
          {
            value: 'uuid-5',
            label: 'mug-detector',
            description: 'tflite',
          },
        ]}
      />
    </Label>
  </div>
</Story>

<Story name="Searchable with multiple">
  <div class="h-[200px] max-w-[200px]">
    <Label>
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
  </div>
</Story>
