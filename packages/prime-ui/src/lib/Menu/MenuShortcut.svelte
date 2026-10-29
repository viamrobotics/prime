<!--
@component
A keyboard shortcut hint at the end of a [`Menu.Item`](./MenuItem.svelte). It is decorative and hidden from
assistive technology, so the item's accessible name is its text alone. Binding the key is the app's job.

```svelte
<Menu.Item onclick={save}>
	Save
	<Menu.Shortcut>⌘S</Menu.Shortcut>
</Menu.Item>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement>;

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<kbd class={['kbd ml-auto', extraClasses]} aria-hidden="true" {...restProps}>
	{@render children?.()}
</kbd>
