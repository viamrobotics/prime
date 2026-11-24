<!--
@component
A [`Progress`](../Progress/Progress.svelte) pinned to the bottom edge of a
[`Banner`](./Banner.svelte), inside the border. It takes `Progress`'s props, so it requires a name the same way.

```svelte
<Banner.Progress value={elapsed} max={duration} label="Time until dismissed" />
```
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import type { AccessibleName } from '../accessible-name.ts';

	import Progress from '../Progress/Progress.svelte';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends Omit<
		ComponentProps<typeof Progress>,
		'label' | 'aria-label' | 'aria-labelledby'
	> {}

	const { class: extraClasses, ...restProps }: Props & AccessibleName = $props();
</script>

<Progress {...restProps} class={['banner-progress', extraClasses]} />
