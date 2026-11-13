<script lang="ts">
	import { Breadcrumbs } from '../breadcrumbs.ts';

	interface Props {
		class?: string;
		label?: string;
		ellipsisLabel?: string;
		hasEllipsisChildren?: boolean;
	}

	const { class: extraClasses, label, ellipsisLabel, hasEllipsisChildren }: Props = $props();
</script>

<Breadcrumbs class={extraClasses} aria-label={label}>
	<Breadcrumbs.Item><Breadcrumbs.Link href="/">Home</Breadcrumbs.Link></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item>
		{#if hasEllipsisChildren}
			<Breadcrumbs.Ellipsis><b data-custom>hidden</b></Breadcrumbs.Ellipsis>
		{:else}
			<Breadcrumbs.Ellipsis aria-label={ellipsisLabel} />
		{/if}
	</Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
</Breadcrumbs>
