<svelte:options immutable tag='v-json-editor' />

<script lang='ts'>

import { onMount } from 'svelte';
import type { MonacoSupportedThemes } from '../lib/monaco/types';

export let theme: MonacoSupportedThemes = 'vs';
export let schema = '';
export let value: string;
export let minimap: string

let element: HTMLElement

onMount(() => {
  console.log(element)
})

</script>

<v-code-editor
  bind:this={element}
  {value}
  {theme}
  {schema}
  {minimap}
  language='json'
/>
