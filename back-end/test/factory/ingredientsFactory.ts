import { faker } from '@faker-js/faker'

const ingredientsFactory = () => {
	const ingredients = {
		[faker.commerce.product()]: faker.datatype.string(),
		[faker.commerce.product()]: faker.datatype.string(),
	}

	return ingredients
}

export default {
	ingredientsFactory
}