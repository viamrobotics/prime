<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Button, Banner } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Banner" />

<Story name="Info">
  <Banner
    variant="info"
    cx="max-w-[600px]"
  >
    <svelte:fragment slot="title">Info message</svelte:fragment>
    <svelte:fragment slot="subtitle">
      Here is some helpful information. This message should be no longer than
      three lines of text.
    </svelte:fragment>
    <svelte:fragment slot="action">
      <a href="https://prime.viam.com/">View details</a>
    </svelte:fragment>
  </Banner>
</Story>

<Story name="Success">
  <Banner
    variant="success"
    cx="max-w-[600px]"
  >
    <svelte:fragment slot="title">Success message</svelte:fragment>
    <svelte:fragment slot="subtitle">
      Here is some helpful information. This message should be no longer than
      three lines of text.
    </svelte:fragment>
  </Banner>
</Story>

<Story name="Warning">
  <Banner
    variant="warning"
    cx="max-w-[600px]"
  >
    <svelte:fragment slot="title">Warning message</svelte:fragment>
    <svelte:fragment slot="subtitle">
      Here is some helpful information. This message should be no longer than
      three lines of text.
    </svelte:fragment>
  </Banner>
</Story>

<Story name="Danger">
  <Banner
    variant="danger"
    cx="max-w-[600px]"
  >
    <svelte:fragment slot="title">Danger message</svelte:fragment>
    <svelte:fragment slot="subtitle">
      Here is some helpful information. This message should be no longer than
      three lines of text.
    </svelte:fragment>
  </Banner>
</Story>

<Story name="DangerWithEmphasizedAction">
  <Banner
    variant="danger"
    cx="max-w-[600px]"
  >
    <svelte:fragment slot="title">Danger message</svelte:fragment>
    <svelte:fragment slot="subtitle">
      Here is some helpful information. This message should be no longer than
      three lines of text.
    </svelte:fragment>
    <svelte:fragment slot="actionEmphasize">
      <Button variant="dark">Abandon ship</Button>
    </svelte:fragment>
  </Banner>
</Story>
