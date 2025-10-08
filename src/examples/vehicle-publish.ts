import { TimocomSDK } from "../index.js";
import type { PublishVehicleSpaceOfferRequest } from "../types/vehicle-space";

const fmt = (d: Date) => d.toISOString().slice(0, 10);

(async () => {
    const timocomId = Number(process.env.TIMOCOM_ID);
    if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");

    const sdk = new TimocomSDK();

    const d1 = new Date(); d1.setDate(d1.getDate() + 7);
    const d2 = new Date(d1);
    const d3 = new Date(d1); d3.setDate(d3.getDate() + 1);
    const d4 = new Date(d3);

    const body: PublishVehicleSpaceOfferRequest = {
        customer: { id: timocomId },
        objectType: "freightOffer",
        contactPerson: {
            title: "MR",
            firstName: "Jorge",
            lastName: "Hernández",
            email: "schnittstellen@timocom.com",
            languages: ["de"],
        },
        vehicleProperties: {
            body: ["BOX"],
            type: ["VEHICLE_UP_TO_3_5_T"],
        },
        trackable: false,
        acceptQuotes: true,
        internalRemark: "This remark is visible to users of your company, only",
        publicRemark: "This remark is visible to all",
        logisticsDocumentTypes: [
            "string"
        ],
        loadingPlaces: [
            {
                loadingType: "LOADING",
                address: { objectType: "address", city: "Valencia", country: "ES", postalCode: "46001" },
                earliestLoadingDate: fmt(d1),
                latestLoadingDate:   fmt(d2),
            },
            {
                loadingType: "UNLOADING",
                address: { objectType: "address", city: "Solingen", country: "DE", postalCode: "42697" },
                earliestLoadingDate: fmt(d3),
                latestLoadingDate:   fmt(d4),
            },
        ],
        // price: { amount: 500, currency: "EUR" },
    };

    const created = await sdk.vehicle.publish(body);
    console.log(JSON.stringify(created, null, 2));
    const id = (created?.payload as any)?.id;
    if (id) console.log("PUBLIC_ID:", id);
})();
