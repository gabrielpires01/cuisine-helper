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

export default {
	create,
	getUserByEmail,
}