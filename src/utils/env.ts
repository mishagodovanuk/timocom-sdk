import { z } from "zod";

const EnvSchema = z.object({
    TIMOCOM_ENV: z.enum(["sandbox", "staging"]).default("sandbox"),
    TIMOCOM_USERNAME: z.string().min(1),
    TIMOCOM_PASSWORD: z.string().min(1),
    TIMOCOM_TIMEOUT_MS: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

export const loadEnv = (): Env => {
    const parsed = EnvSchema.safeParse(process.env);

    if (!parsed.success) {
        throw new Error(
            `Invalid env: ${parsed.error.issues.map(i => `${i.path.join(".")}: ${i.message}`).join(", ")}`
        );
    }

    return parsed.data;
};

export const resolveBaseUrl = (env: Env) =>
    env.TIMOCOM_ENV === "sandbox"
        ? "https://sandbox.timocom.com"
        : "https://api.timocom.com";