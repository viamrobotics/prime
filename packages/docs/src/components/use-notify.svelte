<script lang="ts">
  import {
    Button,
    NotificationContainer,
    provideNotify,
    useNotify
  } from '@viamrobotics/prime-core';

  provideNotify();

  const notify = useNotify();
</script>

<div class="flex flex-col">
  <NotificationContainer />

  <div class="flex gap-4">
    <Button
      cx="mt-4"
      on:click={() => notify.info('Info', 'Info message')}>Info</Button
    >
    <Button
      cx="mt-4"
      on:click={() => notify.warn('Warn', 'Warn message')}>Warn</Button
    >
    <Button
      cx="mt-4"
      on:click={() => notify.success('Success', 'Success message')}>Success</Button
    >
    <Button
      cx="mt-4"
      on:click={() => notify.danger('Danger', 'Danger message')}>Danger</Button
    >
  </div>
</div>
