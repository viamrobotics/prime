<script lang="ts">
	import { Combobox } from '../combobox.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'lg', label: 'Large' }
	];
</script>

<Combobox {items} value="sm">
	<Combobox.Input aria-label="Size" />
	<Combobox.Content>
		<Combobox.Viewport>
			<Combobox.Items>
				{#snippet children({ item, selected })}
					<span
						>{selected ? `${item.label.toUpperCase()} (selected)` : item.label.toUpperCase()}</span
					>
				{/snippet}
			</Combobox.Items>
		</Combobox.Viewport>
	</Combobox.Content>
</Combobox>
