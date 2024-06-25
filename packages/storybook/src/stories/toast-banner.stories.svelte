<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ToastBanner } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ToastBanner" />

<Story name="Success">
  <ToastBanner
    variant="success"
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Info">
  <ToastBanner
    variant="info"
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Danger">
  <ToastBanner
    variant="danger"
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Warning">
  <ToastBanner
    variant="warning"
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Neutral">
  <ToastBanner
    variant="neutral"
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="SuccessWithEmphasizedAction">
  <ToastBanner
    message={`Deleted "my-arm"`}
    variant="success"
    dismiss={() => {
      console.log('Clicked close button');
    }}
    action={{
      text: 'Undo',
      handler: () => {
        console.log('Clicked action');
      },
    }}
    cx="max-w-[280px]"
  />
</Story>
