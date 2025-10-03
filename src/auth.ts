/**
 * BasicAuth helpers for TIMOCOM
 *
 * - If you use axios's `auth: { username, password }`, you technically don't need this file.
 * - Keep it if you want to construct the Authorization header yourself (e.g., custom fetch, logging, or proxies).
 */

export interface BasicCredentials {
    username: string;
    password: string;
}

/** Base64 "username:password" */
export const encodeBasic = ({ username, password }: BasicCredentials): string => {
    const raw = `${username}:${password}`;

    return Buffer.from(raw, "utf8").toString("base64");
};

/** Returns the Authorization header value: "Basic <token>" */
export const buildBasicAuthHeader = (creds: BasicCredentials): string =>
    `Basic ${encodeBasic(creds)}`;

/** Convenience helper to attach Authorization header without mutating input headers */
export const withBasicAuthHeader = (
    headers: Record<string, string | number | boolean | undefined> | undefined,
    creds: BasicCredentials
): Record<string, string> => {
    const out: Record<string, string> = {};

    if (headers) {
        for (const [k, v] of Object.entries(headers)) {
            if (v !== undefined && v !== null) out[k] = String(v);
        }
    }

    out["Authorization"] = buildBasicAuthHeader(creds);

    return out;
};
