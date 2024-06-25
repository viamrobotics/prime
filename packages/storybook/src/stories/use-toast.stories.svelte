<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Button,
  ToastContainer,
  ToastVariant,
  provideToast,
} from '@viamrobotics/prime-core';

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
            variant: ToastVariant.Success,
          })}
      >
        Success
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Info message',
            variant: ToastVariant.Info,
          })}
      >
        Info
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Danger message',
            variant: ToastVariant.Danger,
          })}
      >
        Danger
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Warning message',
            variant: ToastVariant.Warning,
          })}
      >
        Warning
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Neutral message',
            variant: ToastVariant.Neutral,
          })}
      >
        Neutral
      </Button>
      <Button
        on:click={() =>
          toast({
            message: 'Success message',
            variant: ToastVariant.Success,
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
            variant: ToastVariant.Info,
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
            variant: ToastVariant.Danger,
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
            variant: ToastVariant.Warning,
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
            variant: ToastVariant.Neutral,
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
