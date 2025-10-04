import { loadEnv, resolveBaseUrl } from "./utils/env";
import { TimocomHttp } from "./client";
import { FreightApi } from "./endpoints/freight";

export interface TimocomSdkConfig {
    env?: "sandbox" | "staging";
    username?: string;
    password?: string;
    baseURL?: string;
    timeoutMs?: number;
}

export class TimocomSDK {
    readonly freight: FreightApi;

    constructor(cfg?: TimocomSdkConfig) {
        const env = loadEnv();
        const baseURL = cfg?.baseURL ?? resolveBaseUrl(env);

        const http = new TimocomHttp({
            baseURL,
            username: cfg?.username ?? env.TIMOCOM_USERNAME,
            password: cfg?.password ?? env.TIMOCOM_PASSWORD,
            timeoutMs: cfg?.timeoutMs ?? (env.TIMOCOM_TIMEOUT_MS ? +env.TIMOCOM_TIMEOUT_MS : undefined),
        });

        this.freight = new FreightApi(http);
    }
}
