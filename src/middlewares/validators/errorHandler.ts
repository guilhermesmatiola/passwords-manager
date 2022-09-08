import { Request, Response, NextFunction } from "express";

export default async function errorHandler(
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (error.code === "BadRequest") return res.status(400).send(error.message);
	if (error.code === "WrongType") return res.status(422).send(error.message);
	if (error.code === "Anauthorized") return res.status(401).send(error.message);
	if (error.code === "NotFound") return res.status(404).send(error.message);
	if (error.code === "Conflict") return res.status(409).send(error.message);

	console.log(error);

	return res.sendStatus(500);
}