<!--
@component
A [`Progress`](../Progress/Progress.svelte) pinned to the bottom edge of a
[`Banner`](./Banner.svelte), inside the border. It takes `Progress`'s props.

```svelte
<Banner.Progress value={elapsed} max={duration} label="Time until dismissed" />
```
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Progress from '../Progress/Progress.svelte';

	type Props = ComponentProps<typeof Progress>;

	const { class: extraClasses, ...restProps }: Props = $props();
</script>

<Progress {...restProps} class={['banner-progress', extraClasses]} />
