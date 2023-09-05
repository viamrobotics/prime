<script lang="ts">
import { onMount, onDestroy } from 'svelte';
import { tweened } from 'svelte/motion';
import { linear } from 'svelte/easing';
import Banner from '$lib/banner.svelte';
import { notification } from './stores';
import { type NotificationOptions, defaults } from './stores';

export let item: NotificationOptions;

let next = item.initial;
let prev = next;
let paused = false;
let lastReset: number | undefined;

const progress = tweened(item.initial, {
  duration: item.duration ?? defaults.duration!,
  easing: linear,
});

const pause = async () => {
  if (!paused && $progress !== next) {
    paused = true;
    await progress.set($progress, { duration: 0 });
  }
};

const resume = async () => {
  if (paused) {
    const current = item.duration!;
    const duration = current - current * (($progress - prev) / (next - prev));
    paused = false;
    await progress.set(next, { duration });
  }
};

const reset = async () => {
  await pause();
  await resume();
  lastReset = item.reset;
};

const nextItem = async () => {
  next = item.next!;
  prev = $progress;
  paused = false;
  await progress.set(next);
};

const handleVisibilityChange = () => {
  // eslint-disable-next-line no-void
  void (document.hidden ? pause() : resume());
};

const close = () => notification.pop(item.id!);
const autoclose = () => ($progress === 1 || $progress === 0) && close();

$: if (item.reset !== lastReset) {
  // eslint-disable-next-line no-void
  void reset();
}

$: if ($progress === 0) {
  autoclose();
}

$: if (next !== item.next) {
  // eslint-disable-next-line no-void
  void nextItem();
}

onMount(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
  handleVisibilityChange();
});

onDestroy(() => {
  item.onpop?.(item.id!);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<Banner
  exitable={item.dismissable ?? false}
  cx={['pointer-events-auto relative mb-2 w-[360px]', { pe: item.pausable }]}
  variant={item.variant ?? 'info'}
  progress={$progress}
  on:mouseenter={async () => item.pausable && (await pause())}
  on:mouseleave={resume}
  on:close={close}
>
  <svelte:fragment slot="title">{item.title}</svelte:fragment>
  <svelte:fragment slot="message">
    {item.message ?? ''}
  </svelte:fragment>
</Banner>
