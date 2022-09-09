import prisma from "../databases/database.js";
import { wifis } from "@prisma/client";

export type TypeNewWifi = Omit<wifis, "id">;

export async function insert(newWifi: TypeNewWifi) {
	await prisma.wifis.create({ data: newWifi });
}

export async function getAllWifis(id: number) {
	return await prisma.wifis.findMany({ where: { owner_id: id } });
}

export async function getWifiById(id: number) {
	return await prisma.wifis.findUnique({ where: { id } });
}

export async function deleteWifi(id: number) {
	await prisma.wifis.delete({ where: { id } });
}

export async function getWifiByTitle(owner_id: number, name: string) {
	return await prisma.wifis.findMany({ where: { name, owner_id } });
}
