<!--
@component
An action in a [`Menu.Content`](./MenuContent.svelte). Activation is the native `onclick`, which fires for a click, Enter, and Space.
The menu closes after the item is activated. A leading icon is part of the children.

```svelte
<Menu.Item onclick={rename}>
	<Icon icon={mdiPencil} size="sm" />
	Rename
</Menu.Item>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Visual treatment. `danger` marks a destructive action. @default 'default' */
		variant?: 'default' | 'danger';

		/** Prevent the item from being activated. @default false */
		disabled?: boolean;
	}

	const variantClasses = {
		default: 'text-default data-highlighted:bg-light',
		danger: 'text-danger-dark data-highlighted:bg-danger-light'
	};

	const { class: extraClasses, children, variant = 'default', ...restProps }: Props = $props();
</script>

<DropdownMenu.Item
	class={[
		'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark',
		variantClasses[variant],
		extraClasses
	]}
	data-variant={variant}
	{...restProps}
>
	{@render children?.()}
</DropdownMenu.Item>
