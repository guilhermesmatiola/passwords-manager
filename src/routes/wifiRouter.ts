import { Router } from "express";
import verifyToken from "../middlewares/validators/verifyToken.js";
import * as wifiController from "../controllers/wifiController.js";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import wifiSchema from "../middlewares/schemas/wifiSchema.js";

const wifiRoute = Router();

wifiRoute.get("/wifis", verifyToken, wifiController.getWifisFromUser);
wifiRoute.get("/wifis/:id",	verifyToken,wifiController.getWifiById);
wifiRoute.post("/wifis", verifyToken,validateSchema(wifiSchema),wifiController.createWifi);
wifiRoute.delete("/wifis/:id", verifyToken,wifiController.deleteWifi);

export default wifiRoute;