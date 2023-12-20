<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Input,
  Label,
  NumericInput,
  RangeInput,
  RestrictedTextInput,
  SliderInput,
} from '@viamrobotics/prime-core';

const restrictInput = (inputValue: string) =>
  inputValue.replaceAll(/[^a-n]/gu, '');
</script>

<Meta title="Elements/Input" />

<Story name="Basic">
  <Input
    cx="max-w-[200px]"
    placeholder="Placeholder"
  />
</Story>

<Story name="Labeled">
  <Label>
    Full name
    <Input
      slot="input"
      cx="max-w-[200px]"
      placeholder="Eliot Horowitz"
    />
  </Label>
</Story>

<Story name="Restricted Text">
  <div class="mb-2 max-w-[200px]">
    <RestrictedTextInput
      value=""
      {restrictInput}
      tooltipDescription="Only lowercase a-n allowed"
    />
  </div>
</Story>

<Story name="Numeric">
  <NumericInput cx="max-w-[200px]" />
</Story>

<Story name="Slider">
  <SliderInput cx="max-w-[200px]" />
</Story>

<Story name="Range">
  <RangeInput cx="max-w-[300px]" />
</Story>
