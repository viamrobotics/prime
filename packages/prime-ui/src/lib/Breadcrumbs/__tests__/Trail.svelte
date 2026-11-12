<script lang="ts">
	import { Breadcrumbs } from '../breadcrumbs.ts';

	interface Props {
		class?: string;
		label?: string;
		ellipsisLabel?: string;
	}

	const { class: extraClasses, label, ellipsisLabel }: Props = $props();
</script>

<Breadcrumbs class={extraClasses} aria-label={label}>
	<Breadcrumbs.Item><Breadcrumbs.Link href="/">Home</Breadcrumbs.Link></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Ellipsis aria-label={ellipsisLabel} /></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
</Breadcrumbs>
