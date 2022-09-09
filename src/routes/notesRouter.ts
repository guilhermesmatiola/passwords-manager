import { Router } from "express";
import verifyToken from "../middlewares/validators/verifyToken.js";
import * as noteController from "../controllers/notesController.js";
import { validateSchema } from "../middlewares/validators/schemasValidator.js";
import notesSchema from "../middlewares/schemas/notesSchema.js";

const noteRoute = Router();

noteRoute.post("/notes",verifyToken,validateSchema(notesSchema),noteController.createNote);
noteRoute.get("/notes", verifyToken, noteController.getNotesFromUser);
noteRoute.get("/notes/:id", verifyToken, noteController.getNotesById);
noteRoute.delete("/notes/:id", verifyToken, noteController.deleteNote);

export default noteRoute;