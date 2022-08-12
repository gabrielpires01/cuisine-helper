import { faker } from '@faker-js/faker'

const ingredientsFactory = () => {
	const ingredients = {
		[faker.lorem.word()]: faker.datatype.string(),
		[faker.lorem.word()]: faker.datatype.string(),
	}

	return ingredients
}

export default {
	ingredientsFactory
}