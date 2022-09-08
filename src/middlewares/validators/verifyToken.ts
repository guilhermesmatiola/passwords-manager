import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function verifyToken(req: Request, res: Response, next: NextFunction) {
	const getToken = req.headers["authorization"];
	const token = getToken?.replace("Bearer ", "");

	if (!token) {
		throw {	code: "Anauthorized", message: "Um token é necessario para autenticação",};
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

		res.locals.tokenDecoded = decoded;

		next();
		
	} catch (err) {
		return res.status(401).send("Token inválido");
	}
}

export default verifyToken;