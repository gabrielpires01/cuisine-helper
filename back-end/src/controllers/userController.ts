import { Request, Response } from 'express';
import { User, UserLog } from '../schemas/userSchema.js';
import userService  from '../sercvices/userService.js';

const signUp =async (req:Request, res: Response) => {
	const user: User = req.body;

	await userService.signUp(user)

	return res.sendStatus(201)
}

const signIn =async (req:Request, res: Response) => {
	const user:UserLog = req.body;

	const token = await userService.signIn(user);

	return res.status(201).send(token)
}

export {
	signUp,
	signIn
}