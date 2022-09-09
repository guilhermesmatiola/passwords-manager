import { Request, Response } from "express";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
	const data = req.body;
	const { id: owner_id } = res.locals.tokenDecoded;

	await wifiService.createWifi({ ...data, owner_id });

	res.sendStatus(201);
}

export async function getWifisFromUser(req: Request, res: Response) {
	const { id } = res.locals.tokenDecoded;

	const wifis = await wifiService.sendWifisFromUser(id);

	res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	const wifi = await wifiService.findWifiById(Number(id),	owner_id);

	res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	await wifiService.deleteWifi(Number(id), owner_id);

	res.sendStatus(202);
}