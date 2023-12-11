<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Button,
  ToastContainer,
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
      <Button on:click={() => toast.neutral('Neutral message')}>
        Neutral Toast
      </Button>
      <Button on:click={() => toast.upload('Upload message')}>
        Upload Toast
      </Button>
      <Button
        variant="success"
        on:click={() => toast.success('Success message')}
      >
        Success Toast
      </Button>
      <Button
        variant="success"
        on:click={() => toast.success('Success message', true)}
      >
        Success Toast with close Button
      </Button>
    </div>
  </div>
</Story>
