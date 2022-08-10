import { Request, Response } from "express";
import recipeService from "../sercvices/recipeService.js";

const create = async(req: Request, res: Response) => {
	const {description, name, image, ingredients} = req.body
	const { id: userId } = res.locals.user
	
	await recipeService.create({userId, description, name, image})

	return res.sendStatus(201)
}

export {
	create
}