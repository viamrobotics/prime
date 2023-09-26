<script lang="ts">
import { preventHandler, preventKeyboardHandler } from '$lib/prevent-handler';

export let prevent = false;
export let allowedCodes = ['Tab'];

$: handleClick = preventHandler(prevent);
$: handleKeydown = preventKeyboardHandler(prevent, allowedCodes);
</script>

<button
  on:click
  on:click|capture={handleClick}
  on:keydown
  on:keydown|capture={handleKeydown}
>
  Prevented
</button>

<button
  on:click={() => {
    prevent = !prevent;
  }}
>
  Toggle prevent
</button>
