export type DistributiveOmit<TProps, TKey extends PropertyKey> = TProps extends unknown
	? Omit<TProps, TKey>
	: never;
