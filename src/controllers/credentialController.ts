import { Request, Response } from "express";
import * as credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response) {
	const data = req.body;
	const { id: owner_id } = res.locals.tokenDecoded;

	await credentialService.createCredential({ ...data, owner_id });

	res.sendStatus(201);
}

export async function getCredentialsFromUser(req: Request, res: Response) {
	const { id } = res.locals.tokenDecoded;

	const credentials = await credentialService.sendCredentialsFromUser(id);

	res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	const credentials = await credentialService.findCredentialById(	Number(id),	owner_id);

	res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
	const { id: owner_id } = res.locals.tokenDecoded;
	const { id } = req.params;

	await credentialService.deleteCredential(Number(id), owner_id);

    //res.sendStatus(204);
	res.sendStatus(202);
}