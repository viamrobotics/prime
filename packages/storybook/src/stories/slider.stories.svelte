<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Slider } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Slider" />

<Story name="Default">
  <Slider
    min="0"
    max="100"
    step="10"
  />
</Story>

<Story name="Range">
  <Slider
    range="range"
    min="0"
    max="100"
    step="10"
    start="10"
    end="90"
  />
</Story>

<Story name="Min range">
  <Slider
    range="min"
    min="0"
    max="100"
    value="30"
    step="10"
  />
</Story>

<Story name="Max range">
  <Slider
    range="max"
    min="0"
    max="100"
    value="70"
    step="10"
  />
</Story>

<Story name="With suffix">
  <Slider
    min="0"
    max="100"
    step="10"
    suffix="ml"
  />
</Story>

<Story name="With value">
  <Slider
    min="0"
    max="100"
    value="0"
    step="10"
  />
</Story>

<Story name="With label">
  <Slider
    min="0"
    max="100"
    step="10"
    label="Soups eaten per day"
  />
</Story>

<Story name="Disabled">
  <Slider
    min="0"
    max="100"
    step="10"
    disabled
  />
</Story>

<Story name="Readonly">
  <Slider
    range="min"
    max="100"
    value="30"
    step="10"
    readonly
    label="readonly"
  />
</Story>
