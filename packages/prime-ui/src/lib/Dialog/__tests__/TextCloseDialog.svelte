<script lang="ts">
	import { Dialog } from '../dialog.ts';
</script>

<Dialog>
	<Dialog.Trigger class="button">Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<Dialog.Close class="button">Cancel</Dialog.Close>
	</Dialog.Content>
</Dialog>
