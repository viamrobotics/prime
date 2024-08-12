<script lang="ts">
import { JSONDiff, JSONEditor } from '$lib';
/* eslint-disable id-length */
</script>

<div class="container mx-auto my-4 flex flex-col gap-8 p-4">
  <h1 class="text-2xl">@viamrobotics/prime-editor Playground</h1>
  <h2 class="text-lg text-subtle-1">JSONDiff</h2>
  <JSONDiff
    beforeValue={JSON.stringify({ a: 'foo' }, undefined, 2)}
    afterValue={JSON.stringify({ a: 'baz', b: 2 }, undefined, 2)}
    labelPrefix="playground"
    cx="w-full"
  />
  <div>
    <h2 class="text-lg text-subtle-1">JSONEditor (0 sec debounce)</h2>
    <p class="text-xs text-subtle-1">Prints change events to the console</p>
  </div>
  <JSONEditor
    initialValue={JSON.stringify({ a: 'foo' }, undefined, 2)}
    debouncePeriodMS={0}
    label="playground"
    cx="w-full border border-slate-100"
    onChange={(e) => console.log(e)}
  />
  <div>
    <h2 class="text-lg text-subtle-1">JSONEditor (5 sec debounce)</h2>
    <p class="text-xs text-subtle-1">Prints change events to the console</p>
  </div>
  <JSONEditor
    initialValue={JSON.stringify({ a: 'foo' }, undefined, 2)}
    debouncePeriodMS={5000}
    label="playground"
    cx="w-full border border-slate-100"
    onChange={(e) => console.log(e)}
  />
  <h2 class="text-lg text-subtle-1">JSONEditor (diff original)</h2>
  <JSONEditor
    initialValue={JSON.stringify({ a: 'foo' }, undefined, 2)}
    debouncePeriodMS={0}
    diffOriginal={JSON.stringify({ a: 'original' }, undefined, 2)}
    label="playground"
    cx="w-full border border-slate-100"
  />
</div>
