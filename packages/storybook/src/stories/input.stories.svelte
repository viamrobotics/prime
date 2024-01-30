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
  inputValue.replaceAll(/[^a-zA-Z0-9]/gu, '');
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
  <Label>
    Username
    <div
      slot="input"
      class="mb-2 max-w-[200px]"
    >
      <RestrictedTextInput
        value=""
        {restrictInput}
        tooltipDescription="Valid characters: letters, numbers"
        placeholder="funkymonkey89"
      />
    </div>
  </Label>
</Story>

<Story name="Numeric">
  <NumericInput cx="max-w-[80px]" />
</Story>

<Story name="Slider">
  <SliderInput cx="max-w-[80px]" />
</Story>

<Story name="Range">
  <RangeInput cx="max-w-[300px]" />
</Story>
