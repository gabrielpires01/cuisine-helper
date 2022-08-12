import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';
import recipeRepository from '../../src/repositories/recipeRepository.js';
import ingredientsFactory from '../factory/ingredientsFactory.js';
import recipeFactory from '../factory/recipeFactory.js';
import sessionFactory from '../factory/sessionFactory.js';

beforeEach(async() => {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE recipes CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE ingredients CASCADE`
})

describe("Recipes test", () => {
	it("Should create Recipe", async () => {
		const {authorization, user} = await sessionFactory.addSession()
		const recipe = recipeFactory.createRecipeWithRealId(user.id);
		const ingredients = ingredientsFactory.ingredientsFactory();

		const res = await supertest(app).post("/recipe")
			.send(
				{
					description: recipe.description,
					name: recipe.name,
					image: recipe.image,
					ingredients
				}
			)
			.set({authorization})

		const recipeExist = await recipeRepository.getOneByName(user.id, recipe.name)

		expect(res.status).toBe(201)
		expect(recipeExist.length).toBeTruthy()
	})

	it("Should update Recipe", async () => {
		const { user, authorization } = await sessionFactory.addSession()
		const recipe = await recipeFactory.addRecipe(user)

		const toUdpate = {
			description: "teste",
			ingredients: {
				teste: "2 teste"
			}
		}

		const res = await supertest(app).put(`/recipe/${recipe.recipeId}`)
			.send(toUdpate)
			.set({authorization})
		
		const recipeUpdated = await prisma.recipes.findUnique({
			where: {
				id: recipe.recipeId
			},
			select: {
				description: true,
				recipesIngredients: {
					select: {
						measure: true,
						ingredients: {
							select: {
								name:true
							}
						}
					}
				}
			}
		})

		expect(res.status).toBe(201)
		expect(recipeUpdated.description).toBe("teste")
		expect(recipeUpdated.recipesIngredients.length).toBe(3)
	})

	it("Get recipe",async () => {
		const { user } = await sessionFactory.addSession()
		const recipe = await recipeFactory.addRecipe(user)

		const res = await supertest(app).get(`/recipe/${recipe.recipeId}`)

		expect(res.status).toBe(200)
		expect(res.body).toBeTruthy()
	})
})

afterAll(async () => {
	await prisma.$disconnect()
})