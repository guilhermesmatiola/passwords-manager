import { Router } from "express";
import authRoute from "./authRouter.js";
import credentialROute from "./credentialRouter.js";

const router = Router();

router.use(authRoute);
router.use(credentialROute)

export default router;