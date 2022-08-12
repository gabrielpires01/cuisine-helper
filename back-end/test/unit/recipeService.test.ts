import {jest} from '@jest/globals';
import { prisma } from '../../src/database.js';
import recipeRepository from '../../src/repositories/recipeRepository.js';
import recipeService from '../../src/sercvices/recipeService.js';
import recipeFactory from '../factory/recipeFactory.js';

beforeEach(async() => {
	await prisma.$executeRaw`TRUNCATE TABLE recipes CASCADE`
})

describe("Test Recipe Service", () => {
	it("Should throw error if recipe doesnt exist",async () => {
		jest.spyOn(recipeRepository, "getOneById")
			.mockResolvedValueOnce(null)
		
		await recipeService.getRecipeById(1)
			.catch(err => expect(err.status).toBe(404))
	})

	it("Should throw error if user has recipe with name",async () => {
		const recipe = recipeFactory.createRecipe()

		jest.spyOn(recipeRepository, "getOneByName")
			.mockResolvedValueOnce([recipe])

		await recipeService.create(recipe)
			.catch(err => expect(err.status).toBe(409))
	})

	it("Should return organized recipe",async () => {
		const recipe = recipeFactory.createRecipe()

		jest.spyOn(recipeRepository, "getAll")
			.mockResolvedValueOnce([
				{
					id: recipe.id, 
					image: recipe.image,
					name: recipe.name,
					users: {
						name: "teste"
					}
				}
			])
		
		const organized = await recipeService.getAllRecipes()

		expect(organized).toStrictEqual([
			{
				Id: recipe.id, 
				Image: recipe.image,
				Name: recipe.name,
				AuthorName: "teste"
			}
		])
		
	})
})

afterAll(async () => {
	await prisma.$disconnect()
})