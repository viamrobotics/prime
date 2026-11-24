<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import { Breadcrumbs } from '../../breadcrumbs.ts';

	interface Props {
		class?: ClassValue;
		label?: string;
		ellipsisLabel?: string;
		hasEllipsisChildren?: boolean;
		hasCustomSeparator?: boolean;
	}

	const {
		class: extraClasses,
		label,
		ellipsisLabel,
		hasEllipsisChildren,
		hasCustomSeparator
	}: Props = $props();
</script>

<Breadcrumbs class={extraClasses} aria-label={label}>
	<Breadcrumbs.Item><Breadcrumbs.Link href="/">Home</Breadcrumbs.Link></Breadcrumbs.Item>
	{#if hasCustomSeparator}
		<Breadcrumbs.Separator>/</Breadcrumbs.Separator>
	{:else}
		<Breadcrumbs.Separator />
	{/if}
	<Breadcrumbs.Item>
		{#if hasEllipsisChildren}
			<Breadcrumbs.Ellipsis aria-label={ellipsisLabel}
				><b data-custom>hidden</b></Breadcrumbs.Ellipsis
			>
		{:else}
			<Breadcrumbs.Ellipsis aria-label={ellipsisLabel} />
		{/if}
	</Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
</Breadcrumbs>
