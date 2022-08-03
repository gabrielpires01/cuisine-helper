import { Request, Response } from 'express';
import { User } from '../schemas/userSchema.js';
import userService from '../sercvices/userService.js';

const signUp =async (req:Request, res: Response) => {
	const user: User = req.body;

	await userService.signUp(user)

	return res.send(201)
}

export {
	signUp
}