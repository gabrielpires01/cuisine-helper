import ingredientMeasureRepository from "../repositories/ingredientMeasureRepository.js"
import ingredientRepository from "../repositories/ingredientRepository.js"
import recipeService from "./recipeService.js"

const handleIngredients = async (ingredients: object, recipeId: number) => {
	await recipeService.getRecipeById(recipeId)

	for (const [ key, value ] of Object.entries(ingredients)) {
		let ingredient = await ingredientRepository.getOne(key)
		if(!ingredient) {
			ingredient = await ingredientRepository.create(key)
		}

		await ingredientMeasureRepository.addIngredientAndMeasure(ingredient.id, value, recipeId)
	}

	return
}

const updateIngredientMeasure =async (ingredients: object, recipeId: number) => {
	for (const [ key, value ] of Object.entries(ingredients)) {
		let ingredient = await ingredientRepository.getOne(key)
		if(!ingredient) {
			ingredient = await ingredientRepository.create(key)	
		}
		const { recipesIngredients } = await ingredientRepository.getOneWithRecipe(key, recipeId);

		await ingredientMeasureRepository.updateIngredientAndMeasure(ingredient.id, value, recipeId, recipesIngredients[0]?.id)
		
	}
}

export default {
	handleIngredients,
	updateIngredientMeasure,
}