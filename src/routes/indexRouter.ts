import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialROute from "./credentialRouter.js";
import noteRoute from "./notesRouter.js";
import wifiRoute from "./wifiRouter.js";

const router = Router();

router.use(authRoute);
router.use(credentialROute);
router.use(noteRoute);
router.use(wifiRoute)

export default router;