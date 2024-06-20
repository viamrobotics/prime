/**
 * Add a callback to `requestAnimationFrame`, with cleanup.
 */
import { onDestroy } from 'svelte';

export type OnNextFrame = (callback: FrameRequestCallback) => void;

export const useNextFrame = (): OnNextFrame => {
  const frameIDs = new Set<number>();

  const onNextFrame = (callback: FrameRequestCallback) => {
    const frameID = requestAnimationFrame((time) => {
      callback(time);
      frameIDs.delete(frameID);
    });

    frameIDs.add(frameID);
  };

  onDestroy(() => {
    for (const frameID of frameIDs) {
      cancelAnimationFrame(frameID);
    }
  });

  return onNextFrame;
};
