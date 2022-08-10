import { Field, OrderBy } from "../controllers/recipeController.js";
import recipeRepository from "../repositories/recipeRepository.js";
import { Recipe } from "../schemas/recipeSchema.js";

const create =async (recipe: Recipe) => {
	// TO-DO : User can create only unique recipes
	return await recipeRepository.addRecipe(recipe)
}

const getDetailedRecipeById =async (id:number) => {
	await getRecipeById(id)

	const recipe = await recipeRepository.getDetailedRecipeById(id);

	const organizedRecipe = {
		Id: recipe.id,
		Name: recipe.name,
		Image: recipe.image,
		AuthorName: recipe.users.name,
		Ingredients: recipe.recipesIngredients.map(item => `${item.ingredients.name}: ${item.measure}`)
	}

	return organizedRecipe
}

const getRecipeById =async (id:number) => {
	const recipe = await recipeRepository.getOneById(id)
	if(!recipe) throw {message: "Recipe doesnt exist", status: 404}

	return recipe
}

const getAllRecipes =async (field: Field, orderBy: OrderBy) => {
	
	const recipes = await recipeRepository.getAll(field, orderBy)

	const organizedRecipes = recipes.map(recipe => ({
		Id: recipe.id,
		Name: recipe.name,
		Image: recipe.image,
		AuthorName: recipe.users.name,
	}))

	return organizedRecipes
}

export default {
	create,
	getRecipeById,
	getDetailedRecipeById,
	getAllRecipes
}