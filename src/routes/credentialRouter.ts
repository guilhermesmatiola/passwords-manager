import { Router } from "express";
import verifyToken from "../middlewares/validators/verifyToken.js";
import * as credentialController from "../controllers/credentialController.js";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import credentialSchema from "../middlewares/schemas/credentialSchema.js";

const credentialROute = Router();

credentialROute.get("/credentials", verifyToken, credentialController.getCredentialsFromUser);
credentialROute.get("/credentials/:id",	verifyToken,credentialController.getCredentialById);
credentialROute.post("/credentials", verifyToken,validateSchema(credentialSchema),credentialController.createCredential);
credentialROute.delete("/credentials/:id", verifyToken,credentialController.deleteCredential);

export default credentialROute;