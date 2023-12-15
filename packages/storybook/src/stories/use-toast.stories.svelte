<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Button,
  ToastContainer,
  ToastVariant,
  provideToast,
  useToast,
} from '@viamrobotics/prime-core';

provideToast();

const toast = useToast();
</script>

<Meta title="APIs/useToast" />

<Story name="Basic">
  <div class="flex flex-col">
    <ToastContainer />

    <div class="flex gap-4 pt-80">
      <Button
        variant="success"
        on:click={() =>
          toast({
            message: 'Success message',
            variant: ToastVariant.Success,
          })}
      >
        Success Toast without action button
      </Button>
      <Button
        variant="success"
        on:click={() =>
          toast({
            message: 'Success message',
            variant: ToastVariant.Success,
            action: {
              text: 'Action',
              handler: () => {},
            },
          })}
      >
        Success Toast with action button
      </Button>
    </div>
  </div>
</Story>
