<!--
@component
A non-interactive heading that labels the [`Menu.Group`](./MenuGroup.svelte) or
[`Menu.RadioGroup`](./MenuRadioGroup.svelte) it sits in. It must be a child of one of those, and
rendering it directly in the content throws when the menu opens.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.GroupHeading
	class={['px-2 py-1.5 text-xs font-medium text-subtle-2', extraClasses]}
	{...restProps}
>
	{@render children?.()}
</DropdownMenu.GroupHeading>
