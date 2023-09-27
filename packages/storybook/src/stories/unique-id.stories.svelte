<script lang="ts">
import { Meta, Story } from '@storybook/addon-svelte-csf';
import { uniqueId } from '@viamrobotics/prime-core';

const club = uniqueId();
const door = uniqueId();
const bouncer = uniqueId();
const first = uniqueId();
const second = uniqueId('real');
const third = uniqueId('fake');
</script>

<Meta title="APIs/uniqueId" />

<Story name="Example">
  <div class="flex gap-0.5">
    <div
      id={club}
      title={club}
      class="w-40 h-80 flex items-center justify-center bg-slate-700 text-white"
    >
      Club PRIME
    </div>

    <div
      id={door}
      title={door}
      class="w-4 h-20 bg-red-900"
    />

    <div class="flex flex-col gap-2">
      <div
        id={bouncer}
        title={bouncer}
        class="w-20 h-20 bg-black text-white flex items-center justify-center"
      >
        Bouncer
      </div>
      <div
        id={first}
        title={first}
        class="w-20 h-20 bg-red-300 flex items-center justify-center"
      >
        Patron
      </div>
      <div
        id={second}
        title={second}
        class="w-20 h-20 bg-blue-300 flex items-center justify-center"
      >
        Patron
      </div>
      <div
        id={third}
        title={third}
        class="w-20 h-20 bg-yellow-300 flex items-center justify-center"
      >
        Patron
      </div>
    </div>
  </div>
</Story>
