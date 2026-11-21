<script lang="ts">
	import { Menu } from '../menu.ts';

	let open = $state<boolean>();
	let isShowingHidden = $state<boolean>();
	let size = $state<string>();
</script>

<Menu bind:open>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.CheckboxItem bind:checked={isShowingHidden}>Show hidden</Menu.CheckboxItem>
		<Menu.RadioGroup bind:value={size}>
			<Menu.RadioItem value="Small">Small</Menu.RadioItem>
			<Menu.RadioItem value="Large">Large</Menu.RadioItem>
		</Menu.RadioGroup>
	</Menu.Content>
</Menu>
<span data-testid="open">{String(open)}</span>
<span data-testid="hidden">{String(isShowingHidden)}</span>
<span data-testid="size">{String(size)}</span>
