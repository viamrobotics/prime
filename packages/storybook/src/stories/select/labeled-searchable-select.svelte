<script lang="ts">
import {
  Label,
  SearchableSelect,
  type SelectState,
  type SortOptions,
} from '@viamrobotics/prime-core';

export let options: string[] = [];
export let value: string | undefined = undefined;
export let disabled = false;
export let state: SelectState = 'none';
export let sort: SortOptions = 'default';
export let button: { text: string; icon: string } | undefined = undefined;
export let heading = '';
</script>

<Label>
  Options:
  <SearchableSelect
    slot="input"
    {options}
    {value}
    {disabled}
    {state}
    {sort}
    {button}
    {heading}
  />
</Label>
