import { Field, OrderBy, RecipeUpdate } from "../controllers/recipeController.js";
import { prisma } from "../database.js";
import { Recipe } from "../schemas/recipeSchema.js";

const addRecipe =async (recipe: Recipe) => {
	const {id} = await prisma.recipes.create({
		data:recipe
	})
	
	return id
}

const updateRecipe =async (recipeId:number, recipe: Omit<RecipeUpdate, "ingredients">) => {
	await prisma.recipes.update({
		where: {
			id: recipeId
		},
		data: recipe
	})
	return
}

const deleteRecipe =async (recipeId:number) => {
	await prisma.recipes.delete({
		where: {
			id: recipeId
		}
	})
	return 
}

const getOneById =async (id:number) => {
	const recipe = await prisma.recipes.findUnique({
		where: {
			id
		}
	})
	return recipe
}

const getOneByName =async (userId: number, name:string) => {
	const recipe = await prisma.recipes.findMany({
		where: {
			userId,
			name
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
			id: true,
			name: true,
			image: true,
			description:true,
			method: true,
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

const getAll =async (field: Field = "createdAt", orderBy: OrderBy = "desc", userId?: number) => {
	const recipes = await prisma.recipes.findMany({
		where: {
			...(userId ? {userId} : {})
		},
		select: {
			id: true,
			name: true,
			image: true,
			description: true,
			users: {
				select: {
					name: true
				}
			}
		},
		orderBy: {
			[field]: orderBy
		}
	})

	return recipes
}

export default {
	addRecipe,
	getOneById,
	getOneByName,
	getDetailedRecipeById,
	getAll,
	updateRecipe,
	deleteRecipe,
}