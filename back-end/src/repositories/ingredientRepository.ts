import { prisma } from "../database.js"

const getOne =async (name:string) => {
	const ingredient = await prisma.ingredients.findUnique({
		where: {
			name
		}
	})
	return ingredient
}

const create=async (name:string) => {
	const ingredient = await prisma.ingredients.create({
		data: {
			name
		}
	})
	return ingredient
}

const addIngredientAndMeasure=async (ingredientId: number, measure: string, recipeId) => {
	await prisma.recipesIgredient.create({
		data: {
			recipeId,
  			measure,
  			ingredientId
		}
	})

	return
}

export default {
	getOne,
	create,
	addIngredientAndMeasure
}