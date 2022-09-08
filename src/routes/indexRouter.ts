import { Router } from "express";
import authRoute from "./authRouter.js";

const router = Router();

router.use(authRoute);

export default router;