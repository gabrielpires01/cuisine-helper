import { prisma } from "../database.js";
import { Recipe } from "../schemas/recipeSchema.js";

const addRecipe =async (recipe: Recipe) => {
	const {id} = await prisma.recipes.create({
		data:recipe
	})
	return id
}

const getOneById =async (id:number) => {
	const recipe = await prisma.recipes.findUnique({
		where: {
			id
		}
	})
	return recipe
}

const getDetailedRecipeById =async (id:number) => {
	const recipe = await prisma.recipes.findUnique({
		where:{
			id
		},
		select: {
			name: true,
			image: true,
			users: {
				select: {
					name: true
				}
			},
			recipesIngredients: {
				select: {
					measure: true,
					ingredients: {
						select: { 
							name: true
						}
					}
				}
			}
		}
	})

	return recipe
}

export default {
	addRecipe,
	getOneById,
	getDetailedRecipeById
}