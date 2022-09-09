import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialROute from "./credentialRouter.js";
import noteRoute from "./notesRouter.js";

const router = Router();

router.use(authRoute);
router.use(credentialROute)
router.use(noteRoute)

export default router;