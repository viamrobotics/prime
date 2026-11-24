<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Combobox } from '../../combobox.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'lg', label: 'Large' }
	];
</script>

<Field aria-label="Size">
	<Combobox {items} value="sm">
		<Combobox.Input />
		<Combobox.Content>
			<Combobox.Viewport>
				<Combobox.Items>
					{#snippet children({ item, selected })}
						<span
							>{selected
								? `${item.label.toUpperCase()} (selected)`
								: item.label.toUpperCase()}</span
						>
					{/snippet}
				</Combobox.Items>
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox>
</Field>
