import { Request, Response } from "express";
import recipeService from "../sercvices/recipeService.js";

const create = async(req: Request, res: Response) => {
	const {userId, description, name, image, ingredients} = req.body

	await recipeService.create({userId, description, name, image})

	return res.sendStatus(201)
}

export {
	create
}