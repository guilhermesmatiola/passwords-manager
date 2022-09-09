import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialROute from "./credentialRouter.js";
import noteRoute from "./notesRouter.js";
import wifiRoute from "./wifiRouter.js";
import cardRoute from "./cardsRouter.js";

const router = Router();

router.use(authRoute);
router.use(credentialROute);
router.use(noteRoute);
router.use(wifiRoute);
router.use(cardRoute)

export default router;