import { TimocomSDK } from "../index.js";

(async () => {
  const sdk = new TimocomSDK();
  const res = await sdk.freight.getByIds({ ids: ["1","2"] }); // TODO: replace with real IDs
  console.log(JSON.stringify(res, null, 2));
})();
