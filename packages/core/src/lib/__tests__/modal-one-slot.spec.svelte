<script lang="ts">
import Modal from '../modal.svelte'

/** Whether the modal is open. */
export let isOpen: boolean;

/** The variant of the modal. */
export let variant: 'small' | '' = '';

export let focusPrimaryElement = false;
</script>


<Modal
{isOpen}
{variant}
{focusPrimaryElement}
>
<button slot="primary">Primary button</button>
</Modal>