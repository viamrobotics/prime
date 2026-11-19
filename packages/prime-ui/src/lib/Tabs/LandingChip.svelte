<script lang="ts">
	interface Props {
		label: string;
	}

	const { label }: Props = $props();
</script>

<span
	data-tab-landing
	aria-hidden="true"
	inert
	class="mx-1 flex-none self-center rounded-sm bg-info-light px-2 py-0.5 text-xs whitespace-nowrap text-info-dark"
>
	{label}
</span>
