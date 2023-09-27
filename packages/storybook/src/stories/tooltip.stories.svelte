<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Tooltip, Icon } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Tooltip" />

<Story name="Plain Text">
  <div class="pt-5">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>This element has a tooltip.</p>
      <Icon name="information-outline" />
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>
  </div>
</Story>

<Story name="Rich HTML">
  <div class="pt-5">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>
        This <b>element</b> has a <em>tooltip</em>.
      </p>
      <Icon name="information-outline" />
      <p slot="description">
        This is the <b class="underline">tooltip text!</b>
      </p>
    </Tooltip>
  </div>
</Story>
