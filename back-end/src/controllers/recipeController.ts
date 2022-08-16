import { Request, Response } from "express";
import ingredientService from "../sercvices/ingredientService.js";
import recipeService from "../sercvices/recipeService.js";

export type Field = "createdAt";
export type OrderBy = "asc" | "desc";

export interface RecipeUpdate {
	image?: string
	name?: string
	description?: string
	method?: string
	ingredients?: object
}

const create =async (req: Request, res: Response) => {
	const {description, name, image, ingredients, method} = req.body
	const { id: userId } = res.locals.user

	const recipeId = await recipeService.create({userId, description, name, image, method})

	await ingredientService.handleIngredients(ingredients, recipeId)

	return res.sendStatus(201)
}

const update =async (req: Request, res: Response) => {
	const id = req.params.id
	const {id : userId} = res.locals.user
	const recipe: RecipeUpdate = req.body

	if(recipe.image || recipe.description || recipe.name) {
		await recipeService.update(Number(id), {image: recipe.image, description: recipe.description, name: recipe.name, method: recipe.method}, Number(userId))
	} 

	if(recipe.ingredients) {
		await ingredientService.updateIngredientMeasure(recipe.ingredients, Number(id))
	}

	return res.sendStatus(201)
}

const deleteRecipe =async (req: Request, res: Response) => {
	const id = req.params.id
	const {id : userId} = res.locals.user
	await recipeService.deleteRecipe(Number(id), Number(userId))

	return res.sendStatus(204)
}

const getOne =async (req: Request, res: Response) => {
	const id = req.params.id;

	const recipe = await recipeService.getDetailedRecipeById(Number(id));

	return res.status(200).send(recipe)
}

const getAll =async (req: Request, res:Response) => {
	const id = req.params?.id
	const field = req.query?.field as Field
	const orderBy = req.query?.orderBy as OrderBy

	const recipes = await recipeService.getAllRecipes(field, orderBy, Number(id));

	return res.status(200).send(recipes)
}

export {
	create,
	update,
	getOne,
	getAll,
	deleteRecipe
}