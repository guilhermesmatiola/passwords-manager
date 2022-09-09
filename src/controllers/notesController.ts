import { Request, Response } from "express";
import * as notesService from "../services/notesService.js";

export async function createNote(req: Request, res: Response) {
	const data = req.body;
	const { id: owner_id } = res.locals.tokenDecoded;

	await notesService.createNote({ ...data, owner_id });

	res.sendStatus(201);
}

export async function getNotesFromUser(req: Request, res: Response) {
	const { id } = res.locals.tokenDecoded;

	const notes = await notesService.sendNotesFromUser(id);

	res.status(200).send(notes);
}

export async function getNotesById(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	const note = await notesService.getNoteById(Number(id),	owner_id);

	res.status(200).send(note);
}

export async function deleteNote(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	await notesService.deleteNote(Number(id), owner_id);

    //res.sendStatus(204);
	res.sendStatus(202);
}