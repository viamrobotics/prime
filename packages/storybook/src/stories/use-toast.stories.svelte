<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Button, ToastContainer, provideToast } from '@viamrobotics/prime-core';

const toast = provideToast();
</script>

<Meta title="APIs/useToast" />

<Story name="Basic">
  <div class="flex flex-col">
    <ToastContainer />

    <div class="flex gap-4 pt-80">
      <Button
        on:click={() =>
          toast({
            message: 'Success message',
          })}
      >
        Success
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Success message',
            action: {
              text: 'action',
              handler: () => {
                console.log('Clicked action');
              },
            },
          })}
      >
        Success with action
      </Button>
    </div>
  </div>
</Story>
