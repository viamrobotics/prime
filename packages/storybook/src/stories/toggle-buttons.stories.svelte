<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Label, ToggleButtons } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/ToggleButtons" />

<Story name="Basic">
  <Label>
    Favorite animal
    <div
      class="w-fit"
      slot="input"
    >
      <ToggleButtons
        options={['Fan lizard', 'Mountain banshee', 'Buzzard wasp']}
        selected="Fan lizard"
      />
    </div>
  </Label>
</Story>

<Story name="Disabled">
  <Label>
    Favorite animal
    <div
      class="w-fit"
      slot="input"
    >
      <ToggleButtons
        options={['Fan lizard', 'Mountain banshee', 'Buzzard wasp']}
        selected="Fan lizard"
        disabled
      />
    </div>
  </Label>
</Story>
