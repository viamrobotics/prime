<script lang="ts">
import CodeSnippet from '$lib/code-snippet.svelte';
</script>

<CodeSnippet
  language="json"
  code={`{ myThing: true }`}
>
  <svelte:fragment slot="caption">This is the caption text.</svelte:fragment>
</CodeSnippet>
