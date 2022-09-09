import { Router } from "express";
import verifyToken from "../middlewares/validators/verifyToken.js";
import * as cardsController from "../controllers/cardsController.js";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import cardsSchema from "../middlewares/schemas/cardsSchema.js";

const cardRoute = Router();

cardRoute.post("/cards",verifyToken,validateSchema(cardsSchema),cardsController.createCards);
cardRoute.get("/cards", verifyToken, cardsController.getCardsFromUser);
cardRoute.get("/cards/:id", verifyToken, cardsController.getCardById);
cardRoute.delete("/cards/:id", verifyToken, cardsController.deleteCard);

export default cardRoute;