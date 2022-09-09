import prisma from "../databases/database.js";
import { credentials } from "@prisma/client";

export type TypeNewCredential = Omit<credentials, "id">;

export async function insert(newCredential: TypeNewCredential) {
	await prisma.credentials.create({ data: newCredential });
}

export async function getAllCredentials(id: number) {
	return await prisma.credentials.findMany({ where: { owner_id: id } });
}

export async function getCredentialById(id: number) {
	return await prisma.credentials.findUnique({ where: { id } });
}

export async function deleteCredential(id: number) {
	await prisma.credentials.delete({ where: { id } });
}

export async function getCredentialByTitle(owner_id: number, name: string) {
	return await prisma.credentials.findMany({ where: { name, owner_id } });
}
