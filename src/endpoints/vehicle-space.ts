import { TimocomHttp } from "../client";
import type {
    PublishVehicleSpaceOfferRequest,
    PublishVehicleSpaceOfferResponse,
    GetMyVehicleSpaceOfferResponse,
    ListMyVehicleSpaceOffersResponse,
    WithdrawVehicleSpaceParams,
} from "../types/vehicle-space";

const BASE = "/freight-exchange/3/my-vehicle-space-offers";

export class VehicleSpaceApi {
    constructor(private http: TimocomHttp) {}

    async getOwnById(publicOfferId: string, timocom_id: number): Promise<GetMyVehicleSpaceOfferResponse> {
        const { data } = await this.http.ax.get(
            `${BASE}/${encodeURIComponent(publicOfferId)}`,
            { params: { timocom_id }, headers: { Accept: "application/json, application/problem+json" } }
        );
        return data as GetMyVehicleSpaceOfferResponse;
    }

    async listOwn(timocom_id: number): Promise<ListMyVehicleSpaceOffersResponse> {
        const { data } = await this.http.ax.get(
            BASE,
            { params: { timocom_id }, headers: { Accept: "application/json, application/problem+json" } }
        );
        return data as ListMyVehicleSpaceOffersResponse;
    }

    async publish(body: PublishVehicleSpaceOfferRequest): Promise<PublishVehicleSpaceOfferResponse> {
        const { data } = await this.http.ax.post(
            BASE,
            body,
            { headers: { Accept: "application/json, application/problem+json", "Content-Type": "application/json" } }
        );
        return data as PublishVehicleSpaceOfferResponse;
    }

    async withdrawOwn(publicOfferId: string, params: WithdrawVehicleSpaceParams): Promise<void> {
        const query: Record<string, any> = { timocom_id: params.timocom_id };
        if (params.accepted_quote_id) query.accepted_quote_id = params.accepted_quote_id;

        await this.http.ax.delete(
            `${BASE}/${encodeURIComponent(publicOfferId)}`,
            { params: query, headers: { Accept: "application/json" } }
        );
    }
}
