import { prisma } from "../database.js"

const addIngredientAndMeasure =async (ingredientId: number, measure: string, recipeId: number) => {
	await prisma.recipesIngredient.create({
		data: {
			recipeId,
  			measure,
  			ingredientId
		}
	})

	return
}

const updateIngredientAndMeasure =async (ingredientId: number, measure: string, recipeId: number, tableId: number = 0) => {
	await prisma.recipes.update({
		where: {
			id: recipeId
		},
		data: {
			recipesIngredients: {
				upsert: {
					where: {
						id:tableId
					},
					update: {
						ingredientId,
						measure	
					},
					create: {
						ingredientId,
						measure
					}
				}
			}
		}
		
	})
}


export default {
	addIngredientAndMeasure,
	updateIngredientAndMeasure,
}