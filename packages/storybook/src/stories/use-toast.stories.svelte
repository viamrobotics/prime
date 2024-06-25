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
            variant: 'success',
          })}
      >
        Success
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Info message',
            variant: 'info',
          })}
      >
        Info
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Danger message',
            variant: 'danger',
          })}
      >
        Danger
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Warning message',
            variant: 'warning',
          })}
      >
        Warning
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Neutral message',
            variant: 'neutral',
          })}
      >
        Neutral
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Success message',
            variant: 'success',
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
      <Button
        on:click={() =>
          toast({
            message: 'Info message',
            variant: 'info',
            action: {
              text: 'action',
              handler: () => {
                console.log('Clicked action');
              },
            },
          })}
      >
        Info with action
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Danger message',
            variant: 'danger',
            action: {
              text: 'action',
              handler: () => {
                console.log('Clicked action');
              },
            },
          })}
      >
        Danger with action
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Warning message',
            variant: 'warning',
            action: {
              text: 'action',
              handler: () => {
                console.log('Clicked action');
              },
            },
          })}
      >
        Warning with action
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Neutral message',
            variant: 'neutral',
            action: {
              text: 'action',
              handler: () => {
                console.log('Clicked action');
              },
            },
          })}
      >
        Neutral with action
      </Button>
    </div>
  </div>
</Story>
