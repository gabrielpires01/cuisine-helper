import { Field, OrderBy, RecipeUpdate } from "../controllers/recipeController.js";
import recipeRepository from "../repositories/recipeRepository.js";
import { Recipe } from "../schemas/recipeSchema.js";
const create =async (recipe: Recipe) => {
	await checkExistingUserRecipeName(recipe.userId, recipe.name)

	return await recipeRepository.addRecipe(recipe)
}

const update =async (recipeId: number ,recipe: Omit<RecipeUpdate, "ingredients">, userId: number) => {
	const { userId: recipeUserId } = await getRecipeById(recipeId)

	checkIfUserIdIsRecipeUser(recipeUserId, userId)

	await recipeRepository.updateRecipe(recipeId, recipe)

	return
}

const deleteRecipe =async (recipeId: number, userId: number) => {
	const { userId: recipeUserId } = await getRecipeById(recipeId)

	checkIfUserIdIsRecipeUser(recipeUserId, userId)

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
		Method: recipe.method,
		Description: recipe.description,
		Ingredients: recipe.recipesIngredients.map(item => `${item.ingredients.name}: ${item.measure}`)
	}

	return organizedRecipe
}

const getRecipeById =async (id:number) => {
	const recipe = await recipeRepository.getOneById(id)
	if(!recipe) throw {message: "Recipe doesnt exist", status: 404}

	return recipe
}

const getAllRecipes =async (field?: Field, orderBy?: OrderBy, id?: number) => {
	
	const recipes = await recipeRepository.getAll(field, orderBy, id)

	const organizedRecipes = organizeRecipes(recipes)

	return organizedRecipes
}

const checkExistingUserRecipeName =async (userId: number, name:string) => {
	const recipes = await recipeRepository.getOneByName(userId, name)
	if(recipes.length) throw {message: "Already created recipe with this name", status: 409}

	return recipes
}

const checkIfUserIdIsRecipeUser = (recipeUserId: number, userId: number) => {
	if(recipeUserId !== userId) throw {message: "Not Allowed", status: 401}
	return
}

const organizeRecipes = (recipes) => {

	const organizedRecipes = recipes.map(recipe => ({
		Id: recipe.id,
		Name: recipe.name,
		Image: recipe.image,
		AuthorName: recipe.users.name,
		Description: recipe.description,
	}))

	return organizedRecipes
}

export default {
	create,
	update,
	getRecipeById,
	getDetailedRecipeById,
	getAllRecipes,
	deleteRecipe
}