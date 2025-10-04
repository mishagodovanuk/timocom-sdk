import { TimocomSDK } from "../index.js";

(async () => {
    const sdk = new TimocomSDK();
    const res = await sdk.freight.getByIds({ ids: ["1","2"] });
    console.log(JSON.stringify(res, null, 2));
})();