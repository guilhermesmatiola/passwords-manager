import { Request, Response, NextFunction } from "express";

export function validateSchema(schema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) throw { code: "WrongType", message: "Dados incorretos." };

		next();
	};
}