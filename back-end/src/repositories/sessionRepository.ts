import { prisma } from '../database.js'

const create =async (userId:number, token: string) => {
	await prisma.sessions.create({
		data: {
			userId,
			token
		}
	})
	return
}

export default {
	create
}