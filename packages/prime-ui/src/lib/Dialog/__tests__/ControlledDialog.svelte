<script lang="ts">
	import { Dialog } from '../dialog.ts';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let open = $state(false);
</script>

<Dialog
	bind:open={
		() => open,
		(next) => {
			if (accept) open = next;
		}
	}
>
	<Dialog.Trigger class="button">Open</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-md">
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<label>First <input name="first" /></label>
		<label>Last <input name="last" /></label>
		<Dialog.Close />
	</Dialog.Content>
</Dialog>
<span data-testid="owner">{open}</span>
