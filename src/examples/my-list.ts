import { TimocomSDK } from "../index.js";

(async () => {
  const timocomId = Number(process.env.TIMOCOM_ID);
  if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");

  const sdk = new TimocomSDK();
  const res = await sdk.freight.listOwn(timocomId);
  console.log(JSON.stringify(res, null, 2));
})();
