<script lang="ts">
	import { Menu } from '../../menu.ts';

	let checked = $state(true);
	let size = $state('Small');
</script>

<Menu>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.CheckboxItem bind:checked>
			{#snippet indicator({ checked })}
				<span data-testid="check-indicator">{checked ? 'on' : 'off'}</span>
			{/snippet}
			Show hidden
		</Menu.CheckboxItem>
		<Menu.RadioGroup bind:value={size}>
			<Menu.RadioItem value="Small">
				{#snippet indicator({ checked })}
					<span data-testid="radio-indicator">{checked ? 'on' : 'off'}</span>
				{/snippet}
				Small
			</Menu.RadioItem>
		</Menu.RadioGroup>
		<Menu.Sub>
			<Menu.SubTrigger>
				Export
				{#snippet chevron()}
					<span data-testid="chevron">more</span>
				{/snippet}
			</Menu.SubTrigger>
			<Menu.SubContent>
				<Menu.Item>PDF</Menu.Item>
			</Menu.SubContent>
		</Menu.Sub>
	</Menu.Content>
</Menu>
