import { TimocomSDK } from "../index.js";

(async () => {
  const timocomId = Number(process.env.TIMOCOM_ID);
  const id = process.env.PUBLIC_OFFER_ID; // pass via env
  if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");
  if (!id) throw new Error("Set PUBLIC_OFFER_ID in env or before the command");

  const sdk = new TimocomSDK();
  const res = await sdk.freight.getOwnById(id, timocomId);
  console.log(JSON.stringify(res, null, 2));
})();
