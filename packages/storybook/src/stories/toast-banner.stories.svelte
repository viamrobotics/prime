<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { ToastBanner } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ToastBanner" />

<Story name="Success">
  <ToastBanner
    message="Saved configuration"
    dismiss={() => {
      console.log('Clicked close button');
    }}
    cx="max-w-[240px]"
  />
</Story>

<Story name="SuccessWithEmphasizedAction">
  <ToastBanner
    message={`Deleted "my-arm"`}
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
