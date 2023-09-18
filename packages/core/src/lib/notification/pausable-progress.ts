import {
  get,
  derived,
  writable,
  type Readable,
  type Unsubscriber,
} from 'svelte/store';

import { tweened } from 'svelte/motion';

export interface ProgressOptions {
  totalDuration: number;
  isPaused: Readable<boolean>;
  onComplete: () => unknown;
}

export interface PausableProgress {
  progress: Readable<number>;
  unsubscribe: Unsubscriber;
}

export const pausableProgress = ({
  totalDuration,
  isPaused,
  onComplete,
}: ProgressOptions): PausableProgress => {
  const isPauseSet = writable(true);
  const progress = tweened(1, { duration: 0 });

  const remainingDuration = derived(progress, ($progress) =>
    Math.max($progress * totalDuration, 0)
  );

  const pause = () => {
    if (!get(isPauseSet)) {
      isPauseSet.set(true);
      const currentProgress = get(progress);

      void progress.set(currentProgress, { duration: 0 });
    }
  };

  const resume = () => {
    if (get(isPauseSet)) {
      isPauseSet.set(false);
      const duration = get(remainingDuration);
      void progress.set(0, { duration });
    }
  };

  const unsubscribeFromIsPaused = isPaused.subscribe(($isPaused) => {
    if ($isPaused) {
      pause();
    } else {
      resume();
    }
  });

  const unsubscribeFromProgress = progress.subscribe(($progress) => {
    if ($progress === 0) {
      onComplete();
      unsubscribe();
    }
  });

  const unsubscribe = () => {
    unsubscribeFromProgress();
    unsubscribeFromIsPaused();
  };

  return { progress, unsubscribe };
};
