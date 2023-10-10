<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Modal, Button } from '@viamrobotics/prime-core';
import { writable } from 'svelte/store';
</script>

<Meta title="Elements/Modal" />

<Story name="Default">
  <Modal isOpen={writable(true)}>
    <svelte:fragment slot="title">Default title</svelte:fragment>
    <svelte:fragment slot="message">This is the default modal.</svelte:fragment>
    <svelte:fragment slot="primary">
      <Button
        on:click={() => {
          /* eslint-disable-next-line no-console */
          console.log('Primary button clicked');
        }}
      >
        Primary
      </Button>
    </svelte:fragment>
    <svelte:fragment slot="secondary">
      <Button
        variant="dark"
        on:click={() => {
          /* eslint-disable-next-line no-console */
          console.log('Secondary button clicked');
        }}
      >
        Secondary
      </Button>
    </svelte:fragment>
  </Modal>
</Story>

<Story name="Small">
  <Modal
    isOpen={writable(true)}
    variant="small"
  >
    <svelte:fragment slot="title">Small modal title</svelte:fragment>
    <svelte:fragment slot="message">This is a small modal.</svelte:fragment>
    <svelte:fragment slot="primary">
      <Button
        on:click={() => {
          /* eslint-disable-next-line no-console */
          console.log('Primary button clicked');
        }}
      >
        Primary
      </Button>
    </svelte:fragment>
    <svelte:fragment slot="secondary">
      <Button
        variant="dark"
        on:click={() => {
          /* eslint-disable-next-line no-console */
          console.log('Secondary button clicked');
        }}
      >
        Secondary
      </Button>
    </svelte:fragment>
  </Modal>
</Story>
