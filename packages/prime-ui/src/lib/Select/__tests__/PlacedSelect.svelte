<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '../select.ts';

	const { placement = {} }: { placement?: ComponentProps<typeof Select.Content> } = $props();

	const items = [{ value: 'sm', label: 'Small' }];
</script>

<div style="padding: 300px 0">
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
		<Select.Portal>
			<Select.Content {...placement}>
				<Select.Viewport>
					{#each items as item (item.value)}
						<Select.Item value={item.value} label={item.label} />
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select>
</div>
