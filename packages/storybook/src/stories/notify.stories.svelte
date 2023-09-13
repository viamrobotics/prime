<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Button,
  NotificationContainer,
  notify,
} from '@viamrobotics/prime-core';
</script>

<Meta title="APIs/notify" />

<Story name="Basic">
  <div class="flex flex-col">
    <NotificationContainer />
  
    <div class="flex gap-4 pt-80">
      <Button on:click={() => notify.info('Info', 'Info message')}>
        Info Notify
      </Button>
      <Button on:click={() => notify.warn('Warn', 'Warn message')}>
        Warn Notify
      </Button>
      <Button
        variant="success"
        on:click={() => notify.success('Success', 'Success message')}
      >
        Success Notify
      </Button>
      <Button
        variant="danger"
        on:click={() => notify.danger('Danger', 'Danger message')}
      >
        Danger Notify
      </Button>
    </div>
  </div>
</Story>

