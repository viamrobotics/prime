<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Modal, Button } from '@viamrobotics/prime-core';

let defaultModalOpen = false;
let smallModalOpen = false;
</script>

<Meta title="Elements/Modal" />

<Story name="Small">
  <div class="h-[200px]">
    <Button on:click={() => (smallModalOpen = true)}>Open</Button>
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
  </div>
</Story>

<Story name="Default">
  <div class="h-[500px]">
    <Button on:click={() => (defaultModalOpen = true)}>Open</Button>
    <Modal
      isOpen={defaultModalOpen}
      on:close={() => (defaultModalOpen = false)}
    >
      <svelte:fragment slot="title">Default title</svelte:fragment>
      <div
        slot="message"
        class="h-full border border-dashed border-light"
      >
        This is a large modal.
      </div>
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
  </div>
</Story>
