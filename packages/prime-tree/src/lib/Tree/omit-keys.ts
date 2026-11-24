export function omitKeys<TProps extends object, TKey extends keyof TProps>(
	props: TProps,
	keys: readonly TKey[]
): Omit<TProps, TKey> {
	const result = { ...props };
	for (const key of keys) delete result[key];
	return result;
}
