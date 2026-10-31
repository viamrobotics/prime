/**
 * A keyboard shortcut: the press that fires it and how a listing shows it.
 *
 * `key` is `KeyboardEvent.key`, lowercased. `shift` and `mod` are part of the press when set,
 * so `h` and `Shift+H` stay separate shortcuts. Option is never part of a shortcut, because
 * macOS rewrites the character it reports.
 */
export interface Keybinding {
	/** Unique among the shortcuts present at once. */
	id: string;
	/** What the shortcut does, for the listing. */
	description: string;
	/** The heading a listing files the shortcut under. Any string. */
	group: string;
	/** `KeyboardEvent.key`, lowercased. */
	key: string;
	/** Whether held Shift is part of the press. */
	shift?: boolean;
	/** Whether the platform's command key is part of the press: Command on Apple devices, Control elsewhere. */
	mod?: boolean;
	/** Whether to cancel the browser's own response to the press, such as the save dialog on Command+S. */
	preventDefault?: boolean;
}

/** A keydown reduced to the parts a shortcut matches on. */
export interface Press {
	key: string;
	shift: boolean;
	mod: boolean;
}

/** What a shortcut does when pressed. */
export interface HotkeyHandler {
	/**
	 * Whether the shortcut applies right now. Read when the key is pressed, so it can close
	 * over reactive state. Omitted means it applies whenever the registrant is mounted.
	 */
	when?: () => boolean;
	run: () => void;
}

/** What `useHotkey` takes: the shortcut and its behavior in one object. */
export interface HotkeyDefinition extends HotkeyHandler, Keybinding {}

/** A registered shortcut a press matched, with the handler to run. */
export interface MatchedHotkey {
	binding: Keybinding;
	handler: HotkeyHandler;
}

/** What `provideKeybindings` creates and `useKeybindings` returns. */
export interface KeybindingsContext {
	/** Every shortcut present right now, in registration order. */
	readonly bindings: readonly Keybinding[];
	/** The shortcuts a press should run, in registration order. Skips those registered without a handler. */
	matching: (press: Press) => MatchedHotkey[];
	/** Adds a shortcut and returns the function that removes it. Without a handler it is listed and never run. */
	register: (binding: Keybinding, handler?: HotkeyHandler) => () => void;
}
