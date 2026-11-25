import { addProtocol, type GetResourceResponse, type RequestParameters } from 'maplibre-gl';

const sessions = new Map<string, Promise<string>>();

let registration: Promise<boolean> | undefined;

const hasSession = (value: unknown): value is { session: string } =>
	typeof value === 'object' &&
	value !== null &&
	'session' in value &&
	typeof value.session === 'string';

const getSession = async (mapType: string, key: string): Promise<string> => {
	const sessionRequest: Record<string, unknown> = {
		mapType,
		language: 'en-US',
		region: 'US',
		overlay: true
	};

	const response = await fetch(`https://tile.googleapis.com/v1/createSession?key=${key}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(sessionRequest)
	});

	if (!response.ok) {
		throw new Error('Failed to create Google Maps session');
	}

	const result: unknown = await response.json();
	if (!hasSession(result)) {
		throw new Error('Google Maps session response has no session');
	}

	return result.session;
};

const getTile = async (url: URL, session: string, key: string) => {
	const tile = await fetch(
		`https://tile.googleapis.com/v1/2dtiles${url.pathname}?session=${session}&key=${key}`
	);

	if (!tile.ok) {
		throw new Error('Failed to get Google Maps tile');
	}

	const data = await tile.arrayBuffer();
	return { data };
};

// A failed session leaves the cache, so the next tile asks for a new one.
const getCachedSession = (mapType: string, key: string, sessionKey: string): Promise<string> => {
	const cached = sessions.get(sessionKey);
	if (cached) {
		return cached;
	}

	const session = getSession(mapType, key);
	sessions.set(sessionKey, session);
	session.catch(() => sessions.delete(sessionKey));
	return session;
};

const googleProtocol = async (
	params: RequestParameters
): Promise<GetResourceResponse<ArrayBuffer>> => {
	const url = new URL(params.url.replace('google://', 'https://'));
	const key = url.searchParams.get('key') ?? '';
	const session = await getCachedSession(url.hostname, key, `${url.hostname}?${url.searchParams}`);

	return getTile(url, session, key);
};

const testGoogleMapsApi = async (apiKey: string): Promise<boolean> => {
	try {
		await getSession('roadmap', apiKey);
		return true;
	} catch {
		return false;
	}
};

/**
 * Registers the `google://` tile protocol with maplibre-gl, once a test session with `apiKey`
 * succeeds. Resolves `false` when the key cannot open a session, and a later call tries again.
 * Calls during or after a success share it, without a new session.
 */
export const registerGoogleMapsProtocol = (apiKey: string): Promise<boolean> => {
	registration ??= testGoogleMapsApi(apiKey).then((passed) => {
		if (passed) {
			addProtocol('google', googleProtocol);
		} else {
			registration = undefined;
		}
		return passed;
	});

	return registration;
};
