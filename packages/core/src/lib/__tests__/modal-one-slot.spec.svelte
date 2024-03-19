<script lang="ts">
import Modal from '../modal.svelte';

export let isOpen: boolean;
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
