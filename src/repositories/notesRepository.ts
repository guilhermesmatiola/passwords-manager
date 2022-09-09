import prisma from "../databases/database.js";
import { secure_notes } from "@prisma/client";

export type TypeNewNote = Omit<secure_notes, "id">;

export async function insert(newNote: TypeNewNote) {
	await prisma.secure_notes.create({ data: newNote });
}

export async function getAllNotes(id: number) {
	return await prisma.secure_notes.findMany({ where: { owner_id: id } });
}

export async function getNoteById(id: number) {
	return await prisma.secure_notes.findUnique({ where: { id } });
}

export async function deleteNote(id: number) {
	await prisma.secure_notes.delete({ where: { id } });
}

export async function getNoteByTitle(owner_id: number, title: string) {
	return await prisma.secure_notes.findMany({ where: { title, owner_id } });
}