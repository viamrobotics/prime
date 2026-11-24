import { tick } from 'svelte';

interface RefusableValueOptions<TOwned, THanded> {
	owner: { get: () => TOwned; set: (next: TOwned) => void };
	copy: (value: TOwned) => THanded;
	holds: (held: TOwned, next: TOwned) => boolean;
}

interface RefusableValue<TOwned, THanded> {
	readonly current: THanded;
	write: (next: TOwned) => void;
}

// bits-ui keeps edited dates in its own state and re-reads the bound value only when its identity changes, so a refused write hands it a fresh copy.
export const refusableValue = <TOwned, THanded>({
	owner,
	copy,
	holds
}: RefusableValueOptions<TOwned, THanded>): RefusableValue<TOwned, THanded> => {
	let refusedWrites = $state(0);
	let bounced = $state.raw<{ value: THanded }>();

	const current = $derived.by(() => {
		void refusedWrites;
		if (bounced) return bounced.value;
		return copy(owner.get());
	});

	return {
		get current() {
			return current;
		},
		write(next) {
			if (holds(owner.get(), next)) return;
			owner.set(next);
			if (holds(owner.get(), next)) return;
			// A copy of `undefined` is still `undefined`, so bits-ui would see no change and keep the typed digits. It gets the refused value for one tick and then the owner's.
			if (copy(owner.get()) === current) bounced = { value: copy(next) };
			refusedWrites += 1;
			// bits-ui's first re-read still prefers the digits just typed and then drops them, so a second copy shows the owner's date.
			void tick().then(() => {
				bounced = undefined;
				refusedWrites += 1;
			});
		}
	};
};
