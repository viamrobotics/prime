<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Label, ToggleButtons } from '@viamrobotics/prime-core';

let basicSelected = 'Fan lizard';
const onBasicSelected = (event: CustomEvent<string>) => {
  basicSelected = event.detail;
};
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
        selected={basicSelected}
        on:input={onBasicSelected}
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
