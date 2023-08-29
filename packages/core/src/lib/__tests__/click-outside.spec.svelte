<script lang="ts">
import { clickOutside } from '$lib';

export let onClickOutside: () => void;
</script>

<button data-testid="outside" />
<div
  data-testid="subject"
  use:clickOutside={onClickOutside}
>
  <button data-testid="inside" />
</div>
