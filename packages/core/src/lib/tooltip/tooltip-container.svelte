<!--
  @component

  A wrapper component to contain a tooltip and the element it describes.

  Used alongside <TooltipTarget> and <TooltipText> to create more
  customized tooltips when the regular <Tooltip> can't be used.

  For example, you may want to attach the tooltip of an input control
  to an icon, even though the tooltip describes the input, not the icon.

  ```svelte
  <TooltipContainer let:tooltipID>
    <Label>
      Name
      <TooltipTarget>
        <Icon
          tabindex="0"
          cx="cursor-pointer"
          name="information-outline"
        />
      </TooltipTarget>
      <TextInput
        slot="input"
        aria-describedby={tooltipID}
      />
    </Label>
    <TooltipText>Cool name you got there!</TooltipText>
  </TooltipContainer>
  ```
-->
<svelte:options immutable />

<script lang="ts">
import { provideTooltipContext } from './tooltip-styles';

export let hoverDelayMS = 0;

const { id, setHoverDelayMS } = provideTooltipContext();

$: setHoverDelayMS(hoverDelayMS);
</script>

<slot tooltipID={id} />
