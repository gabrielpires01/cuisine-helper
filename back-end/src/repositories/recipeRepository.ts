import { prisma } from "../database.js";
import { Recipe } from "../schemas/recipeSchema.js";

const addRecipe =async (recipe: Recipe) => {
	await prisma.recipes.create({
		data:recipe
	})
	return
}

export default {
	addRecipe
}