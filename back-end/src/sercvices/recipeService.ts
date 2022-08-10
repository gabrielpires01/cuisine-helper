import recipeRepository from "../repositories/recipeRepository.js";
import { Recipe } from "../schemas/recipeSchema.js";

const create =async (recipe: Recipe) => {
	
	await recipeRepository.addRecipe(recipe)
}

export default {
	create
}