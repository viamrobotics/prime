<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ToastBanner, ToastVariant } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ToastBanner" />

<Story name="Success">
  <ToastBanner
    variant={ ToastVariant.Success }
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Info">
  <ToastBanner
    variant={ ToastVariant.Info }
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Danger">
  <ToastBanner
    variant={ ToastVariant.Danger }
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Warning">
  <ToastBanner
    variant={ ToastVariant.Warning }
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="Neutral">
  <ToastBanner
    variant={ ToastVariant.Neutral }
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
  />
</Story>

<Story name="SuccessWithEmphasizedAction">
  <ToastBanner
    message={`Deleted "my-arm"`}
    variant={ ToastVariant.Success }
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
