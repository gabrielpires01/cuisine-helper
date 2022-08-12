import { Field, OrderBy, RecipeUpdate } from "../controllers/recipeController.js";
import recipeRepository from "../repositories/recipeRepository.js";
import { Recipe } from "../schemas/recipeSchema.js";
import userService from "./userService.js";

const create =async (recipe: Recipe) => {
	// TO-DO : User can create only unique recipes
	return await recipeRepository.addRecipe(recipe)
}

const update =async (recipeId: number ,recipe: Omit<RecipeUpdate, "ingredients">) => {
	await getRecipeById(recipeId)
	await recipeRepository.updateRecipe(recipeId, recipe)

	return
}

const deleteRecipe =async (recipeId: number) => {
	await getRecipeById(recipeId)
	await recipeRepository.deleteRecipe(recipeId)

	return 
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

	const organizedRecipes = organizeRecipes(recipes)

	return organizedRecipes
}

const getAllRecipesByUserId =async(id: number) => {
	await userService.checkUserById(id)

	const recipes = await recipeRepository.getAllByUserId(id)

	const organizedRecipes = organizeRecipes(recipes)

	return organizedRecipes
}


const organizeRecipes = (recipes) => {

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
	update,
	getRecipeById,
	getDetailedRecipeById,
	getAllRecipes,
	getAllRecipesByUserId,
	deleteRecipe
}