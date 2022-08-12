import { prisma } from '../database.js';
import { User } from '../schemas/userSchema.js';

const create =async (data:User) => {
	await prisma.users.create({
		data
	})
	return
}

const getUserByEmail =async (email:string)=> {
	return await prisma.users.findUnique({
		where: {
			email
		}
	})
}

const getUserById =async (id: number)=> {
	return await prisma.users.findUnique({
		where: {
			id
		}
	})
}

export default {
	create,
	getUserByEmail,
	getUserById
}