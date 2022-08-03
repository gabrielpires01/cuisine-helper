import supertest from 'supertest';
import app from '../../src/app.js';
import { signUp } from '../../src/controllers/userController.js';
import userFactory from '../factory/userFactory.js'

describe('Users test', () => {
	it("Should create user", async() => {
		const user = userFactory.createUser();

		const res = await supertest(app).post("/signUp").send(user)

		expect(res.status).toBe(201)
	})
})