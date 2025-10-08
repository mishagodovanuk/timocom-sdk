export interface TimocomMeta {
    requestId?: string;
    responseTimestamp?: string;
    [k: string]: unknown;
}
export interface TimocomEnvelope<T> {
    objectType?: string;
    meta?: TimocomMeta;
    payload: T;
}

export interface Money {
    amount: number; // >= 0.01, 2 decimals
    currency:
        | "ALL" | "AMD" | "AZN" | "BAM" | "BGN" | "BYN" | "CHF" | "CZK" | "DKK"
        | "EUR" | "GBP" | "GEL" | "HRK" | "HUF" | "ISK" | "KZT" | "MDL" | "MKD"
        | "NOK" | "PLN" | "RON" | "RSD" | "RUB" | "SEK" | "TRY" | "UAH" | "USD";
}

export interface Address {
  objectType: string;
  country: string; // ISO-3166-1 alpha-2
  city: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
}

export type LoadingType = "LOADING" | "UNLOADING";

export interface LoadingPlace {
    loadingType: LoadingType;
    address: Address;
    /** HH:mm */
    startTime?: string;
    /** HH:mm */
    endTime?: string;
    /** YYYY-MM-DD */
    earliestLoadingDate: string;
    /** YYYY-MM-DD */
    latestLoadingDate: string;
}

export interface ContactPerson {
    title: string; // e.g. MR | MRS
    firstName: string;
    lastName: string;
    email: string;
    languages: string[]; // ISO-639
    businessPhone?: string;
    mobilePhone?: string;
    fax?: string;
}

export interface CustomerRef {
    /** TIMOCOM customer ID (required for publish) */
    id: number;
}

export interface VehicleProperties {

    body: string[];
    /** Optional arrays */
    bodyProperty?: string[];
    equipment?: string[];
    loadSecuring?: string[];
    swapBody?: string[];
    /** For freight: at least one; for vehicle space: exactly one */
    type: string[];
}

export interface GetFreightOffersRequest {
    ids: string[];
}

export interface FreightOffer {
    id: string;
}
export interface GetFreightOffersResponse {
    offers: FreightOffer[];
}

export interface PublishFreightOfferRequest {
    objectType: string;
    customer?: CustomerRef;
    contactPerson: ContactPerson;
    vehicleProperties: VehicleProperties;
    /** True/false per spec */
    trackable?: boolean;
    /** True/false per spec */
    acceptQuotes?: boolean;

    freightDescription?: string; // 3..50 chars
    length_m?: number;           // 0..99.99, step 0.01
    weight_t?: number;           // 0..99.99, step 0.01
    loadingPlaces: LoadingPlace[]; // LOADING first, UNLOADING last

    /** Optional fields */
    price?: Money;
    paymentDueWithinDays?: number; // 0..999
    additionalInformation?: string[];
    publicRemark?: string;         // <=500
    internalRemark?: string;       // <=50
    logisticsDocumentTypes?: string[];

    /** Closed Freight Exchange settings (optional) */
    closedFreightExchangeSetting?: {
        closedFreightExchangeId: number;
        publicationType: "INTERNAL_ONLY" | "EXTERNAL_LATER";
        remark?: string; // <=150
        retentionDurationInMinutes?: number;
        /** server-calculated publicationDateTime is returned in responses */
        publicationDateTime?: string;
    };
}

export interface PublishFreightOfferResponsePayload {
    /** TIMOCOM public id of created offer, etc. */
    id: string;
    /** Echo of relevant data; TIMOCOM often responds with the full offer */
    [k: string]: unknown;
}
export type PublishFreightOfferResponse = TimocomEnvelope<PublishFreightOfferResponsePayload>;

export interface MyFreightOfferPayload {
    id: string;
    [k: string]: unknown;
}
export type GetMyFreightOfferResponse = TimocomEnvelope<MyFreightOfferPayload>;

export type ListMyFreightOffersResponse = TimocomEnvelope<MyFreightOfferPayload[]>;

/** Withdraw (DELETE) returns 204 No Content — we don’t expect a body. */
export interface WithdrawOwnParams {
    timocom_id: number;
    accepted_freight_quote_id?: string;
}
