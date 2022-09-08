import prisma from "../databases/database.js";
import { users } from "@prisma/client";

export type TypeNewUser = Omit<users, "id">;

export async function findUserByEmail(email: string): Promise<users> {
	return await prisma.users.findUnique({ where: { email } });
}

export async function addNewUser(newUser: TypeNewUser) {
	await prisma.users.create({ data: newUser });
}