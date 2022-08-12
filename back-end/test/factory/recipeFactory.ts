import { faker } from '@faker-js/faker'

const createRecipe = () => {
	const recipe = {
		id: faker.datatype.number(),
		userId:  faker.datatype.number(),
		image: faker.image.food(),
		name: faker.name.middleName(),
		description: faker.lorem.sentence(),
		createdAt: faker.date.past()
	}

	return recipe
}

export default {
	createRecipe
}