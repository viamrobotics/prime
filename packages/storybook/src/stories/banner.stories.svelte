<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Banner } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Banner" />

<Story name="Info">
  <Banner variant="info">
    <svelte:fragment slot="title">Just so you know.</svelte:fragment>
    <svelte:fragment slot="message">Here's some relevant info.</svelte:fragment>
    <svelte:fragment slot="action"
      >You can do something about it.</svelte:fragment
    >
  </Banner>
</Story>

<Story name="Success">
  <Banner variant="success">
    <svelte:fragment slot="title">You did it!</svelte:fragment>
    <svelte:fragment slot="message">You should be proud.</svelte:fragment>
    <svelte:fragment slot="action">Go celebrate.</svelte:fragment>
  </Banner>
</Story>

<Story name="Warning">
  <Banner variant="warning">
    <svelte:fragment slot="title">Something is fishy.</svelte:fragment>
    <svelte:fragment slot="message">Proceed with caution.</svelte:fragment>
    <svelte:fragment slot="action">Or not?</svelte:fragment>
  </Banner>
</Story>

<Story name="Danger">
  <Banner variant="danger">
    <svelte:fragment slot="title">Something went wrong.</svelte:fragment>
    <svelte:fragment slot="message">Everything is broken.</svelte:fragment>
    <svelte:fragment slot="action"
      >Try turning it off and on again.</svelte:fragment
    >
  </Banner>
</Story>
