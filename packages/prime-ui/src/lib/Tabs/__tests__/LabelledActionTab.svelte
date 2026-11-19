<script lang="ts">
	import { Tabs } from '../tabs.ts';

	const { isLabelledByOutside }: { isLabelledByOutside?: boolean } = $props();
</script>

<span id="outside-name">Outside name</span>
<Tabs value="one">
	<Tabs.List aria-label="Details">
		<Tabs.Trigger
			value="one"
			aria-label={isLabelledByOutside ? undefined : 'Custom name'}
			aria-labelledby={isLabelledByOutside ? 'outside-name' : undefined}
		>
			Visible
			{#snippet actions()}
				<button type="button">Close</button>
			{/snippet}
		</Tabs.Trigger>
	</Tabs.List>
</Tabs>
