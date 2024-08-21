<script lang="ts">
  import { Modal, Button } from '@viamrobotics/prime-core';

  let defaultModalOpen = false;
  let smallModalOpen = false;
</script>

<Button on:click={() => (smallModalOpen = true)}>Open small modal</Button>
<Modal
  isOpen={smallModalOpen}
  variant="small"
  on:close={() => (smallModalOpen = false)}
>
  <svelte:fragment slot="title">Small modal title</svelte:fragment>
  <svelte:fragment slot="message">This is a small modal.</svelte:fragment>
  <Button
    slot="primary"
    variant="dark"
    on:click={() => console.log('Primary button clicked')}
  >
    Primary
  </Button>
  <Button
    slot="secondary"
    on:click={() => console.log('Secondary button clicked')}
  >
    Secondary
  </Button>
</Modal>

<Button on:click={() => (defaultModalOpen = true)}>Open default modal</Button>
<Modal
  isOpen={defaultModalOpen}
  on:close={() => (defaultModalOpen = false)}
>
  <svelte:fragment slot="title">Default title</svelte:fragment>
  <div slot="message">This is the default modal.</div>
  <Button
    slot="primary"
    on:click={() => console.log('Primary button clicked')}
  >
    Primary
  </Button>
  <Button
    slot="secondary"
    variant="dark"
    on:click={() => console.log('Secondary button clicked')}
  >
    Secondary
  </Button>
</Modal>
