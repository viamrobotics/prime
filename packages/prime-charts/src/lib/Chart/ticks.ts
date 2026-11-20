const X_TICK_SPACING = 80;
const Y_TICK_SPACING = 40;
const MIN_TICK_COUNT = 2;

export const xTickCount = (width: number) =>
	Math.max(MIN_TICK_COUNT, Math.floor(width / X_TICK_SPACING));

export const yTickCount = (height: number) =>
	Math.max(MIN_TICK_COUNT, Math.floor(height / Y_TICK_SPACING));
