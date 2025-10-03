import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import type { Env } from "./utils/env";

export interface SdkOptions {
    baseURL: string;
    username: string;
    password: string;
    timeoutMs?: number;
    userAgent?: string;
}

export class TimocomHttp {
    readonly ax: AxiosInstance;

    constructor(opts: SdkOptions) {
        this.ax = axios.create({
            baseURL: opts.baseURL,
            timeout: opts.timeoutMs ?? 15000,
            headers: {
                "User-Agent": opts.userAgent ?? "timocom-sdk/1.0",
                "Accept": "application/json",
            },
            auth: {
                username: opts.username,
                password: opts.password,
            },
        });

        axiosRetry(this.ax, {
            retries: 3,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (err) => {
                const status = err.response?.status;
                return !status || (status >= 500 && status <= 599);
            },
        });

        this.ax.interceptors.response.use(
            r => r,
            err => {
                const data = err.response?.data;
                const status = err.response?.status;
                err.message = `[TIMOCOM] HTTP ${status ?? "ERR"}: ${JSON.stringify(data ?? err.message)}`;

                return Promise.reject(err);
            }
        );
    }
}
