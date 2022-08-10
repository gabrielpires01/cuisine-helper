import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as authRepository from "../repositories/authRepository.js"

const validateToken =async (req:Request, res: Response, next: NextFunction) => {
	let data;
	const auth = (req.headers["authorization"] || req.headers["authorization"]) as string;
	const token = auth?.replace("Bearer ", "")

	if(!token) throw {message: "Token was not provided", status: 403}

	try {
		data = jwt.verify(token, process.env.JWT_SECRET)
	} catch (err) {
		throw {message: "Token does not exist", status: 403}
	}

	const session = await authRepository.getSession(token);
	if (!session) throw {message: "User not logged", status: 403}
	
	res.locals.user = data;
	next();
}

export default validateToken