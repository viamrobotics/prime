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
import { writable } from 'svelte/store';
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
      value={writable('')}
      restrictInput={(inputValue) => inputValue.replaceAll(/[^a-n]/gu, '')}
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
