<!--
@component
The button that toggles a [`Popover`](./Popover.svelte). Add `button` or `icon-button` to style it.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Popover } from 'bits-ui';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Popover.Trigger class={['focus-ring', extraClasses]} {...restProps}>
	{@render children?.()}
</Popover.Trigger>
