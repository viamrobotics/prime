<!--
@component
A set of [`Menu.RadioItem`](./MenuRadioItem.svelte)s sharing one `value`. Bind `value` two-way, or as a getter
and setter to veto or transform a change.

```svelte
<Menu.RadioGroup bind:value={size}>
	<Menu.RadioItem value="small">Small</Menu.RadioItem>
	<Menu.RadioItem value="large">Large</Menu.RadioItem>
</Menu.RadioGroup>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The selected `Menu.RadioItem`'s value. Two-way bindable. */
		value?: string;
	}

	let { value = $bindable(), children, ...restProps }: Props = $props();
</script>

<DropdownMenu.RadioGroup bind:value={() => value ?? '', (next) => (value = next)} {...restProps}>
	{@render children?.()}
</DropdownMenu.RadioGroup>
