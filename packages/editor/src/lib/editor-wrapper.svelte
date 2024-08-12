<!--
  Wrap a CodeMirror instance with custom styling.
  @component
-->
<script lang="ts">
/* eslint-disable tailwindcss/no-custom-classname */
import classnames from 'classnames';

export let element: HTMLElement | undefined;
export let cx: classnames.Argument = undefined;
</script>

<div
  class={classnames('cm-wrapper', cx)}
  bind:this={element}
/>

<style lang="postcss">
.cm-wrapper :global(.cm-editor) {
  @apply min-h-full;
  outline: none;
}

.cm-wrapper :global(.cm-scroller) {
  @apply grow font-roboto-mono text-xs;
}

.cm-wrapper :global(.cm-gutters) {
  @apply border-0 bg-white text-[#3d7690];
}

.cm-wrapper :global(.cm-gutterElement) {
  @apply pl-6;
}

.cm-wrapper :global(.cm-foldGutter .cm-gutterElement) {
  @apply pl-3.5;
}
</style>
