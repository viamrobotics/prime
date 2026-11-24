const DEFAULT_LOCALE = 'en-US';

export const monthButtonName = (step: -1 | 1, locale: string | undefined): string => {
	const resolvedLocale = locale ?? DEFAULT_LOCALE;
	const name = new Intl.RelativeTimeFormat(resolvedLocale, { numeric: 'auto' }).format(
		step,
		'month'
	);
	return name.charAt(0).toLocaleUpperCase(resolvedLocale) + name.slice(1);
};
