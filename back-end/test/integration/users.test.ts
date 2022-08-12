import supertest from 'supertest';
import app from '../../src/app.js';
import { prisma } from '../../src/database.js';
import userFactory from '../factory/userFactory.js'

beforeEach(async() => {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE`
})

describe('Users test', () => {
	it("Should create user", async() => {
		const user = userFactory.createUser();

		const res = await supertest(app).post("/signUp").send(user)

		expect(res.status).toBe(201)
	})

	it("Should signIn user", async() => {
		const {email , password} = await userFactory.addUser();

		const res = await supertest(app).post("/signIn").send({email , password})

		expect(res.status).toBe(201)
		expect(res.body).toBeTruthy()
	})
})

afterAll(async () => {
	await prisma.$disconnect()
})