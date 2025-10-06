import { TimocomSDK } from "../index.js";

(async () => {
    const timocomId = Number(process.env.TIMOCOM_ID);
    if (!timocomId) throw new Error("Set TIMOCOM_ID in env/.env");

    const id = process.argv[2] || process.env.VEHICLE_PUBLIC_ID;
    if (!id) throw new Error("Pass public id as argv or set VEHICLE_PUBLIC_ID env");

    const sdk = new TimocomSDK();
    await sdk.vehicle.withdrawOwn(id, { timocom_id: timocomId });
    console.log("Withdrawn:", id);
})();
