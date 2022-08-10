import { Request, Response } from "express";
import ingredientService from "../sercvices/ingredientService.js";
import recipeService from "../sercvices/recipeService.js";

export type Field = "createdAt";
export type OrderBy = "asc" | "desc";

const create = async(req: Request, res: Response) => {
	const {description, name, image, ingredients} = req.body
	const { id: userId } = res.locals.user

	const recipeId = await recipeService.create({userId, description, name, image})

	await ingredientService.handleIngredients(ingredients, recipeId)

	return res.sendStatus(201)
}

const getOne =async (req:Request, res: Response) => {
	const id = req.params.id;

	const recipe = await recipeService.getDetailedRecipeById(Number(id));

	return res.status(200).send(recipe)
}

const getAll =async (req:Request, res:Response) => {
	const field = req.query?.field as Field
	const orderBy = req.query?.orderBy as OrderBy

	const recipes = await recipeService.getAllRecipes(field, orderBy);

	return res.status(200).send(recipes)
}

export {
	create,
	getOne,
	getAll
}