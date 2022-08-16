import { faker } from '@faker-js/faker'
import { prisma } from '../../src/database.js'
import ingredientsFactory from './ingredientsFactory.js'

type User = {
	email: string
	password: string
	id: number
}

const createRecipe = () => {
	const recipe = {
		id: faker.datatype.number(),
		userId: faker.datatype.number(),
		image: faker.image.food(),
		name: faker.name.middleName(),
		description: faker.lorem.sentence(),
		createdAt: faker.date.past(),
		method: faker.lorem.paragraphs()
	}

	return recipe
}

const createRecipeWithRealId = (userId: number) => {
	const recipe = {
		id: faker.datatype.number(),
		userId,
		image: faker.image.food(),
		name: faker.name.middleName(),
		description: faker.lorem.sentence(),
		createdAt: faker.date.past(),
		method: faker.lorem.paragraphs()
	}

	return recipe
}

const addRecipe = async(user: User) => {
	const recipe = createRecipeWithRealId(user.id)
	const ingredients = ingredientsFactory.ingredientsFactory();

	const { id: recipeId } = await prisma.recipes.create({
		data: {
			name: recipe.name,
			description: recipe.description,
			userId: user.id,
			image: recipe.image,
			method: recipe.method
		}
	})

	for(const [key, value] of Object.entries(ingredients)) {
		const { id: ingredientId } = await prisma.ingredients.create({
			data: {name: key}
		})

		await prisma.recipesIngredient.create({
			data: {
				recipeId,
				measure: value,
				ingredientId
			}
		})
	}
	return {recipeId, ingredients}
}

export default {
	createRecipeWithRealId,
	createRecipe,
	addRecipe
}