<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { VectorInput } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/VectorInput" />

<Story name="ThreeDimension">
  <VectorInput
    labels={['x', 'y', 'z']}
    type="number"
    readonly={false}
    step={1}
    placeholders={{ x: '0', y: '0', z: '0' }}
    values={{ x: 0, y: 0, z: 0 }}
  />
</Story>
