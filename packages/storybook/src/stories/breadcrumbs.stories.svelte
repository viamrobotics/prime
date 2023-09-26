<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Breadcrumbs } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Breadcrumbs" />

<Story name="Basic">
  <Breadcrumbs crumbs={['Crumb 1', 'Crumb 2']} />
</Story>
