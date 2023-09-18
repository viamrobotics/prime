<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Input,
  Label,
  NumericInput,
  SliderInput,
  TextInput,
} from '@viamrobotics/prime-core';
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

<Story name="Numeric">
  <NumericInput />
</Story>

<Story name="Slider">
  <SliderInput />
</Story>
