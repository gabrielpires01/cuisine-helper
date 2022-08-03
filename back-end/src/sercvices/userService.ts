import { users } from '@prisma/client';
import userRepository from '../repositories/userRepository.js';
import { User } from  '../schemas/userSchema.js';
import bcrypt from 'bcrypt';

const signUp =async (user:User) => {
	await checkExistingUser(user.email)

	const hashPass = bcrypt.hashSync(user.password, 10);

	await userRepository.create({...user, password: hashPass})

	return
}

const checkExistingUser = async (email: string) => {
	const user:users = await userRepository.getUserByEmail(email)
	
	if (user) throw {message: "Email already in use", status: 409}
	return 
}

export default {
	signUp,
}