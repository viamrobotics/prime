<svelte:options immutable />

<script lang="ts">
import { Button } from '@viamrobotics/prime-core';

export let label: string;
export let disabled = false;
export let type: 'button' | 'submit' | 'reset' = 'button';
export let variant:
  | 'primary'
  | 'dark'
  | 'ghost'
  | 'danger'
  | 'outline-danger'
  | 'success' = 'primary';

export let title = '';
export let icon = '';
export let width: 'full' | 'default' = 'default';
</script>

<Button
  {type}
  {variant}
  {disabled}
  {title}
  {icon}
  {width}
  on:click
>
  {label}
</Button>
