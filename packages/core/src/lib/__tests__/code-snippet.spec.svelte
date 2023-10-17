<!-- 
  @component

  This component allows us to render a Notify with its slotted
  children, due to limitations with rendering slots using
  `@testing-library`.

  See:
  - https://sveltesociety.dev/recipes/testing-and-debugging/unit-testing-svelte-component
  - https://github.com/testing-library/svelte-testing-library/issues/48
 -->
<script lang="ts">
import CodeSnippet from '$lib/code-snippet.svelte';
</script>

<CodeSnippet
  language="json"
  code={`{ myThing: true }`}
>
  This is the caption text.
</CodeSnippet>
