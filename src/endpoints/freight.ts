import { TimocomHttp } from "../client";
import type {
    GetFreightOffersRequest,
    GetFreightOffersResponse,
    PublishFreightOfferRequest,
    PublishFreightOfferResponse,
    GetMyFreightOfferResponse,
    ListMyFreightOffersResponse,
    WithdrawOwnParams,
} from "../types/freight";

export class FreightApi {
    constructor(private http: TimocomHttp) {}

    /**
     * External lookup by IDs (kept exactly as you had it)
     * GET /freight-exchange/3/freight-offers?ids=1,2,3
     */
    async getByIds(req: GetFreightOffersRequest): Promise<GetFreightOffersResponse> {
        if (!req.ids?.length) return { offers: [] };

        const idsParam = req.ids.join(",");
        const { data } = await this.http.ax.get(`/freight-exchange/3/freight-offers`, {
            params: { ids: idsParam },
            headers: { Accept: "application/json, application/problem+json" },
        });

        return data as GetFreightOffersResponse;
    }

    /**
     * Lookup Your Own Freight Offer
     * GET /freight-exchange/3/my-freight-offers/{publicOfferId}?timocom_id=...
     */
    async getOwnById(publicOfferId: string, timocom_id: number): Promise<GetMyFreightOfferResponse> {
        const { data } = await this.http.ax.get(
            `/freight-exchange/3/my-freight-offers/${encodeURIComponent(publicOfferId)}`,
            {
                params: { timocom_id },
                headers: { Accept: "application/json, application/problem+json" },
            }
        );
        return data as GetMyFreightOfferResponse;
    }

    /**
     * Withdraw Your Freight Offer
     * DELETE /freight-exchange/3/my-freight-offers/{publicOfferId}
     * - 204 No Content on success
     * - optional accepted_freight_quote_id
     */
    async withdrawOwn(publicOfferId: string, params: WithdrawOwnParams): Promise<void> {
        await this.http.ax.delete(
            `/freight-exchange/3/my-freight-offers/${encodeURIComponent(publicOfferId)}`,
            {
                params,
                headers: { Accept: "application/json" },
            }
        );
    }

    /**
     * Lookup Your Own Freight Offers (all currently published for the authorized timocom_id)
     * GET /freight-exchange/3/my-freight-offers?timocom_id=...
     */
    async listOwn(timocom_id: number): Promise<ListMyFreightOffersResponse> {
        const { data } = await this.http.ax.get(`/freight-exchange/3/my-freight-offers`, {
            params: { timocom_id },
            headers: { Accept: "application/json, application/problem+json" },
        });

        return data as ListMyFreightOffersResponse;
    }

    /**
     * Publish Freight Offer
     * POST /freight-exchange/3/my-freight-offers
     */
    async publish(body: PublishFreightOfferRequest,   params?: { timocom_id?: number }): Promise<PublishFreightOfferResponse> {
        const { data } = await this.http.ax.post(
            `/freight-exchange/3/my-freight-offers`,
            body,
            {
                params,
                headers: {
                    Accept: "application/vnd.freight-exchange.v3+json, application/json, application/problem+json",
                    "Content-Type": "application/json",
                },
            }
        );

        return data as PublishFreightOfferResponse;
    }
}
