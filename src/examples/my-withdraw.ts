import { TimocomSDK } from "../index.js";

(async () => {
  const timocomId = Number(process.env.TIMOCOM_ID);
  const id = process.env.PUBLIC_OFFER_ID; // pass via env
  const acceptedQuote = process.env.ACCEPTED_FREIGHT_QUOTE_ID; // optional
  if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");
  if (!id) throw new Error("Set PUBLIC_OFFER_ID in env");

  const sdk = new TimocomSDK();
  await sdk.freight.withdrawOwn(id, {
    timocom_id: timocomId,
    accepted_freight_quote_id: acceptedQuote || undefined,
  });
  console.log("Withdrawn:", id);
})();
