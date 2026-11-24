export const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

export const settleFrames = async (count: number) => {
	for (let frame = 0; frame < count; frame++) await nextFrame();
};
