<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Input,
  Label,
  NumericInput,
  RestrictedTextInput,
  SliderInput,
  TextInput,
} from '@viamrobotics/prime-core';

const restrictInput = (inputValue: string) =>
  inputValue.replaceAll(/[^a-n]/gu, '');
</script>

<Meta title="Elements/Input" />

<Story name="Basic">
  <Input />
</Story>

<Story name="Labeled">
  <Label>
    Name:
    <Input slot="input" />
  </Label>
</Story>

<Story name="Text">
  <TextInput />
</Story>

<Story name="Restricted Text">
  <div class="mb-2">
    <RestrictedTextInput
      value=""
      {restrictInput}
      tooltipDescription="Only lowercase a-n allowed"
    />
  </div>
</Story>

<Story name="Numeric">
  <NumericInput />
</Story>

<Story name="Slider">
  <SliderInput />
</Story>
