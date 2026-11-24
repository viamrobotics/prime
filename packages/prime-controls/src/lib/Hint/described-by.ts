export function joinDescribedBy(
	ids: readonly (string | false | null | undefined)[]
): string | undefined {
	return ids.filter(Boolean).join(' ') || undefined;
}
