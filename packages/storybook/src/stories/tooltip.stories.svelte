<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { Tooltip, Icon, IconButton } from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Tooltip" />

<Story name="Plain Text">
  <div class="flex pt-5">
    <Tooltip let:tooltipID>
      <Icon
        aria-describedby={tooltipID}
        name="information-outline"
        cx="cursor-pointer text-gray-6"
      />
      <p slot="description">
        This is some helpful but not critical information
      </p>
    </Tooltip>
  </div>
</Story>

<Story name="More actions">
  <div class="flex pt-5">
    <Tooltip
      let:tooltipID
      hoverDelayMS={1000}
    >
      <IconButton
        aria-describedby={tooltipID}
        icon="dots-horizontal"
        label="More actions"
      />
      <p slot="description">More actions</p>
    </Tooltip>
  </div>
</Story>
