<script lang="ts">
	import { Dialog } from '../dialog.ts';

	let open = $state<boolean>();
</script>

<Dialog bind:open>
	<Dialog.Trigger class="button">Open</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-md">
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<label>First <input name="first" /></label>
		<label>Last <input name="last" /></label>
		<Dialog.Close />
	</Dialog.Content>
</Dialog>
<span data-testid="owner">{String(open)}</span>
