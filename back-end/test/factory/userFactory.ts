import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt';
import { prisma } from '../../src/database.js';

const createUser = () => {
	const user = {
		name: faker.name.firstName(),
		email: faker.internet.email(),
		password: "12345678"
	}

	return user
}

const addUser =async () => {
	const user = createUser()

	const hashPass = bcrypt.hashSync(user.password, 10);

	await prisma.users.create({
		data: {...user, password: hashPass}
	})

	return user
}

export default {
	createUser,
	addUser
}