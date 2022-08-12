import userRepository from '../../src/repositories/userRepository.js'
import userService from '../../src/sercvices/userService.js'
import userFactory from '../factory/userFactory.js'
import {jest} from '@jest/globals';
import { prisma } from '../../src/database.js';
import bcrypt from 'bcrypt';

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
	it("SignUp Throw error 409 if user exists", async () => {
		const user = userFactory.createUser()
		jest.spyOn(userRepository, "getUserByEmail")
			.mockResolvedValueOnce(test)
		
		await userService.signUp(user)
			.catch(err => expect(err.status).toBe(409))
	})

	it("SignIn Throw error 400 if user doesnt exist", async () => {
		const user = await userFactory.addUser()
		jest.spyOn(userRepository, "getUserByEmail")
			.mockResolvedValueOnce(null)
		
		await userService.signIn(user)
			.catch(err => expect(err.status).toBe(400))
	})

	it("SignIn Throw error 400 if password is wrong", async () => {
		const user = await userFactory.addUser()
		jest.spyOn(userRepository, "getUserByEmail")
			.mockResolvedValueOnce(test)

		jest.spyOn(bcrypt, "compareSync")
			.mockImplementationOnce(() => false)
		
		await userService.signIn(user)
			.catch(err => expect(err.status).toBe(400))
	})

	it("Check user Throw error 400 if user doesnt exist",async () => {
		jest.spyOn(userRepository, "getUserById")
			.mockResolvedValueOnce(null)
		
		await userService.checkUserById(1)
			.catch(err => expect(err.status).toBe(400))
	})
})

afterAll(async () => {
	await prisma.$disconnect()
})