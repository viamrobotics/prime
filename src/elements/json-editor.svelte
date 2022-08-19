<svelte:options immutable tag='v-json-editor' />

<script lang='ts'>

import type { MonacoSupportedThemes } from '../lib/monaco/types';

export let theme: MonacoSupportedThemes = 'vs';
export let schema = '';
export let value: string;
export let minimap: string;

</script>

<v-code-editor
  {value}
  {theme}
  {schema}
  {minimap}
  language='json'
/>
