<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Progress } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Progress" />

<Story name="Default">
  <Progress />
</Story>

<Story name="Light">
  <div class="-m-10 bg-gray-9 p-10">
    <Progress variant="light" />
  </div>
</Story>

<Story name="Medium">
  <Progress size="medium" />
</Story>

<Story name="Large">
  <Progress size="large" />
</Story>
