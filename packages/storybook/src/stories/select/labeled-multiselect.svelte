<script lang="ts">
import {
  Label,
  Multiselect,
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
export let clearable = false;
export let showPills = false;
</script>

<Label>
  Options:
  <Multiselect
    slot="input"
    {options}
    {value}
    {disabled}
    {state}
    {sort}
    {button}
    {heading}
    {clearable}
    {showPills}
  />
</Label>
