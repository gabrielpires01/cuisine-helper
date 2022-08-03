import userRepository from '../../src/repositories/userRepository.js'
import userService from '../../src/sercvices/userService.js'
import userFactory from '../factory/userFactory.js'
import {jest} from '@jest/globals';
import { prisma } from '../../src/database.js';

beforeEach(async() => {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
})

const test = {
	id: 1,
	name: 'test',
	email: 'test',
	password: 'test',
	createdAt: undefined
}

describe('Test user Service', () => {
	it("Throw error 409 if user exists", async () => {
		const user = userFactory.createUser()
		jest.spyOn(userRepository, "getUserByEmail")
			.mockResolvedValueOnce(test)
		
		await userService.signUp(user)
			.catch(err => expect(err.status).toBe(409))
	})
})

afterAll(async () => {
	await prisma.$disconnect()
})