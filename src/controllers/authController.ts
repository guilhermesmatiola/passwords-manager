import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function signin(req: Request, res: Response) {
	const data = req.body;

	const userInformation = await authService.login(data.email, data.password);

	res.status(200).send(userInformation);
}

export async function signup(req: Request, res: Response) {
	const data = req.body;

	await authService.signup(data);

	res.sendStatus(201);
}