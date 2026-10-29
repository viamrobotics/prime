<!--
@component
The item in a [`Menu.Content`](./MenuContent.svelte) that opens a [`Menu.Sub`](./MenuSub.svelte). It opens on hover, Enter, Space, and ArrowRight.
A trailing chevron marks it as a submenu.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronRight } from '@mdi/js';
	import { DropdownMenu } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Prevent the submenu from opening. @default false */
		disabled?: boolean;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.SubTrigger
	class={[
		'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark',
		'text-default data-highlighted:bg-light',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
	<Icon icon={mdiChevronRight} size="sm" class="ml-auto shrink-0" />
</DropdownMenu.SubTrigger>
