import { TimocomSDK } from "../index.js";
import type { PublishFreightOfferRequest } from "../types/freight.js";

(async () => {
  const timocomId = Number(process.env.TIMOCOM_ID);

  if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");

  const sdk = new TimocomSDK();

  const body: PublishFreightOfferRequest = {
    customer: { id: timocomId },
    objectType: "freightOffer",
    contactPerson: {
      title: "MR",
      firstName: "Fernández",
      lastName: "Hernández",
      email: "schnittstellen@timocom.com",
      languages: ["de"],
      businessPhone: "+49 211 88 26 88 26",
    },
    vehicleProperties: {
      body: ["MOVING_FLOOR"],
      type: ["VEHICLE_UP_TO_12_T"],
    },
    trackable: false,
    acceptQuotes: false,
    freightDescription: "SDK sandbox test",
    length_m: 12.31,
    weight_t: 5.55,
    loadingPlaces: [
      {
        loadingType: "LOADING",
        address: { objectType: "address", city: "Gerona", country: "ES", postalCode: "17001" },
        startTime: "2025-11-25"
      },
      {
        loadingType: "UNLOADING",
        address: { objectType: "address", city: "Gerona", country: "ES", postalCode: "17001" },
        startTime: "2025-11-25"
      },
    ],
    price: { amount: 500, currency: "EUR" },
  };

  const res = await sdk.freight.publish(body, { timocom_id: timocomId });
  console.log(JSON.stringify(res, null, 2));
  const createdId = (res?.payload as any)?.id;

  if (createdId) {
    console.log("Created offer public ID:", createdId);
  } else {
    console.warn("Publish succeeded but no public ID found in payload.");
  }
})();
