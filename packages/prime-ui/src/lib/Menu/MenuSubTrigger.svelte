<!--
@component
The item in a [`Menu.Content`](./MenuContent.svelte) that opens a [`Menu.Sub`](./MenuSub.svelte). It opens on hover, Enter, Space, and ArrowRight.
A trailing chevron marks it as a submenu, and a `chevron` snippet replaces it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronRight } from '@mdi/js';
	import { DropdownMenu } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Prevent the submenu from opening. @default false */
		disabled?: boolean;

		/** Replaces the trailing chevron. */
		chevron?: Snippet;
	}

	const { class: extraClasses, chevron, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.SubTrigger class={['listbox-option', extraClasses]} {...restProps}>
	{@render children?.()}
	{#if chevron}
		{@render chevron()}
	{:else}
		<Icon icon={mdiChevronRight} size="sm" class="ml-auto shrink-0" />
	{/if}
</DropdownMenu.SubTrigger>
