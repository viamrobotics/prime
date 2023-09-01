export type IntervalCanceller = () => void;

export const scheduleInterval = (
  callback: () => void,
  interval: number
): IntervalCanceller => {
  let cancelled = false;
  let timeoutId = -1;

  const timeout = () => {
    timeoutId = window.setTimeout(refreshAndScheduleNext, interval);
  };

  const refreshAndScheduleNext = () => {
    callback();

    if (cancelled) {
      return;
    }

    timeout();
  };

  const cancel = () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };

  timeout();
  return cancel;
};

export const scheduleAsyncInterval = (
  callback: () => Promise<void>,
  interval: number
): IntervalCanceller => {
  let cancelled = false;
  let timeoutId = -1;

  const timeout = () => {
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line no-void
      void refreshAndScheduleNext();
    }, interval);
  };

  const refreshAndScheduleNext = async () => {
    await callback();

    if (cancelled) {
      return;
    }

    timeout();
  };

  const cancel = () => {
    cancelled = true;
    window.clearTimeout(timeoutId);
  };

  timeout();

  return cancel;
};
