import recipeRepository from "../repositories/recipeRepository.js";
import { Recipe } from "../schemas/recipeSchema.js";

const create =async (recipe: Recipe) => {
	// TO-DO : User can create only unique recipes
	return await recipeRepository.addRecipe(recipe)
}

const getRecipeById =async (id:number) => {
	const recipe = await recipeRepository.getOneById(id)
	if(!recipe) throw {message: "Recipe doesnt exist", status: 404}

	return recipe
}

export default {
	create,
	getRecipeById
}