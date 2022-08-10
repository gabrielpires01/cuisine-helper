import ingredientRepository from "../repositories/ingredientRepository.js"
import recipeService from "./recipeService.js"

const handleIngredients = async (ingredients: object, recipeId: number) => {
	await recipeService.getRecipeById(recipeId)

	for (const [ key, value ] of Object.entries(ingredients)) {
		let ingredient = await ingredientRepository.getOne(key)
		if(!ingredient) {
			ingredient = await ingredientRepository.create(key)
		}

		await ingredientRepository.addIngredientAndMeasure(ingredient.id, value, recipeId)
	}

	return
}

export default {
	handleIngredients
}