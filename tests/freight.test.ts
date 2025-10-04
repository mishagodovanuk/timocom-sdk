import { describe, it, expect, vi } from "vitest";
import { TimocomSDK } from "../src";
import nock from "nock";

describe("Freight API", () => {
    it("getByIds returns offers", async () => {
        const base = "https://api.timocom.com";
        nock(base)
            .get("/freight-exchange/3/freight-offers")
            .query({ ids: "1,2" })
            .reply(200, { offers: [{ id: "1" }, { id: "2" }] });

        const sdk = new TimocomSDK({ baseURL: base, username: "u", password: "p" });
        const res = await sdk.freight.getByIds({ ids: ["1", "2"] });
        expect(res.offers.length).toBe(2);
    });
});