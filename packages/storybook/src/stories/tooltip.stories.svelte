<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import {
  Tooltip,
  TooltipContainer,
  TooltipTarget,
  TooltipText,
  Icon,
} from '@viamrobotics/prime-core';
</script>

<Meta title="Elements/Tooltip" />

<Story name="Plain Text">
  <div class="flex pt-5">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>This element has a tooltip.</p>
      <p slot="description">This is the tooltip text!</p>
    </Tooltip>
  </div>
</Story>

<Story name="Rich HTML">
  <div class="flex pt-5">
    <Tooltip let:tooltipID>
      <p aria-describedby={tooltipID}>
        This <b>element</b> has a <em>tooltip</em>.
      </p>
      <p slot="description">
        This is the <b class="underline">tooltip text!</b>
      </p>
    </Tooltip>
  </div>
</Story>

<Story name="Custom Target">
  <div class="flex">
    <TooltipContainer let:tooltipID>
      <p
        aria-describedby={tooltipID}
        class="flex items-center gap-1"
      >
        This element has a tooltip on the icon.
        <TooltipTarget>
          <Icon
            name="information-outline"
            label="information"
            cx="cursor-pointer"
          />
        </TooltipTarget>
      </p>

      <TooltipText location="right">
        This is the <b class="underline">tooltip text!</b>
      </TooltipText>
    </TooltipContainer>
  </div>
</Story>
