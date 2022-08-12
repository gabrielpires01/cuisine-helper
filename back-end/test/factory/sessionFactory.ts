import { prisma } from "../../src/database.js"
import tokenFactory from "./tokenFactory.js"
import userFactory from "./userFactory.js"

const addSession = async () => {
	const user = await userFactory.addUser()
	const token = await tokenFactory.createToken(user.id)

	await prisma.sessions.create({
		data: {
			token,
			userId: user.id
		}
	})

	return {authorization: `Bearer ${token}`, user}
}

export default {
	addSession
}