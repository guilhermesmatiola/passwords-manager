import prisma from "../databases/database.js";
import { cards } from "@prisma/client";

export type TypeNewCard = Omit<cards, "id">;

export async function insert(newCard: TypeNewCard) {
	await prisma.cards.create({ data: newCard });
}

export async function getAllCards(id: number) {
	return await prisma.cards.findMany({ where: { owner_id: id } });
}

export async function getCardById(id: number) {
	return await prisma.cards.findUnique({ where: { id } });
}

export async function deleteCard(id: number) {
	await prisma.cards.delete({ where: { id } });
}

export async function getCardsByTitle(owner_id: number, name: string) {
	return await prisma.cards.findMany({ where: { name, owner_id } });
}
