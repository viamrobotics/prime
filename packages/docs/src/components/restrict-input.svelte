<script lang="ts">
  import { Label, RestrictedTextInput } from '@viamrobotics/prime-core';

  const restrictInput = (inputValue: string) => inputValue.replaceAll(/[^a-zA-Z0-9]/gu, '');
</script>

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
