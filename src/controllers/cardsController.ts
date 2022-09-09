import { Request, Response } from "express";
import * as cardsService from "../services/cardsService.js";

export async function createCards(req: Request, res: Response) {
	const data = req.body;
	const { id: owner_id } = res.locals.tokenDecoded;

	await cardsService.createCard({ ...data, owner_id });

	res.sendStatus(201);
}

export async function getCardsFromUser(req: Request, res: Response) {
	const { id } = res.locals.tokenDecoded;

	const cards = await cardsService.sendCardsFromUser(id);

	res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	const card = await cardsService.findCardById(Number(id),	owner_id);

	res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	await cardsService.deleteCard(Number(id), owner_id);

	res.sendStatus(202);
}