import { getContext, setContext, untrack } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';

import type {
	HotkeyDefinition,
	HotkeyHandler,
	Keybinding,
	KeybindingsContext,
	MatchedHotkey,
	Press
} from './keybinding.ts';

import { isEditableTarget } from './editable-target.ts';

const key = Symbol('Keybindings');

interface Registration {
	binding: Keybinding;
	handler?: HotkeyHandler;
}

const matchesPress = (binding: Keybinding, press: Press): boolean =>
	binding.key === press.key.toLowerCase() &&
	(binding.shift ?? false) === press.shift &&
	(binding.mod ?? false) === press.mod;

/** Creates a shortcut registry without sharing it through context. */
export const createKeybindings = (): KeybindingsContext => {
	const registrations = new SvelteSet<Registration>();

	const warnOnCollision = (binding: Keybinding) => {
		const press: Press = {
			key: binding.key,
			shift: binding.shift ?? false,
			mod: binding.mod ?? false
		};

		for (const existing of registrations) {
			if (matchesPress(existing.binding, press)) {
				console.warn(
					`[keybindings] "${binding.id}" and "${existing.binding.id}" both claim the same press`
				);
			}
		}
	};

	return {
		get bindings() {
			return [...registrations].map((registration) => registration.binding);
		},
		matching(press) {
			const matched: MatchedHotkey[] = [];

			for (const { binding, handler } of registrations) {
				if (handler !== undefined && matchesPress(binding, press)) {
					matched.push({ binding, handler });
				}
			}

			return matched;
		},
		register(binding, handler) {
			warnOnCollision(binding);

			const registration: Registration = { binding, handler };
			registrations.add(registration);

			return () => registrations.delete(registration);
		}
	};
};

/**
 * Creates the shortcut registry, shares it with everything below, and owns the one window
 * listener that runs the registered shortcuts. Repeats and Option presses are ignored, and an
 * unmodified press typed into a field belongs to the field.
 */
export const provideKeybindings = (): KeybindingsContext => {
	const context = createKeybindings();

	$effect(() => {
		const onkeydown = (event: KeyboardEvent) => {
			if (event.repeat || event.altKey) return;

			const mod = event.metaKey || event.ctrlKey;

			if (!mod && isEditableTarget(event.target)) return;

			const matched = context.matching({ key: event.key, shift: event.shiftKey, mod });

			for (const { binding, handler } of matched) {
				if (!(handler.when?.() ?? true)) continue;

				if (binding.preventDefault) {
					event.preventDefault();
				}

				handler.run();
			}
		};

		window.addEventListener('keydown', onkeydown, { capture: true });
		return () => window.removeEventListener('keydown', onkeydown, { capture: true });
	});

	return setContext<KeybindingsContext>(key, context);
};

/** The shortcut registry from the nearest `provideKeybindings`. Throws outside one. */
export const useKeybindings = (): KeybindingsContext => {
	const context = getContext<KeybindingsContext | undefined>(key);
	if (!context) throw new Error('useKeybindings() needs a provideKeybindings() above it');
	return context;
};

/**
 * Declares a shortcut and its behavior for as long as the calling component is mounted.
 *
 * @returns The shortcut, so a button's label and its key cannot drift.
 */
export const useHotkey = ({ when, run, ...binding }: HotkeyDefinition): Keybinding => {
	const keybindings = useKeybindings();

	// Untracked so registering does not depend on, and re-run for, every other registration.
	$effect(() => untrack(() => keybindings.register(binding, { when, run })));

	return binding;
};

/**
 * Lists a shortcut without a handler, for a key something else acts on.
 *
 * @returns The shortcut.
 */
export const useKeybinding = (binding: Keybinding): Keybinding => {
	const keybindings = useKeybindings();

	$effect(() => untrack(() => keybindings.register(binding)));

	return binding;
};
