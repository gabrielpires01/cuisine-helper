import { prisma } from "../database.js"

const getOne =async (name:string) => {
	const ingredient = await prisma.ingredients.findUnique({
		where: {
			name
		}
	})
	return ingredient
}

const getOneWithRecipe =async (name:string, recipeId:number) => {
	const ingredient = await prisma.ingredients.findUnique({
		where: {
			name
		},
		select: {
			id:true,
			name: true,
			recipesIngredients: {
				where: {
					recipeId
				},
				select: {
					id: true
				}

			}
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

export default {
	getOne,
	create,
	getOneWithRecipe,
}