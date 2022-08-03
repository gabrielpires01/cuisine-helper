import { users } from '@prisma/client';
import userRepository from '../repositories/userRepository.js';
import { User, UserLog } from  '../schemas/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sessionRepository from '../repositories/sessionRepository.js';

const signUp =async (user:User) => {
	await checkExistingUser(user.email, 'signUp')

	const hashPass = bcrypt.hashSync(user.password, 10);

	await userRepository.create({...user, password: hashPass})

	return
}

const signIn =async (user: UserLog) => {
	const {id, password: hashPass} = await checkExistingUser(user.email, 'signIn')

	await verifyPassword(user.password, hashPass);

	const token = await createToken(id)

	await sessionRepository.create(id, token)

	return token
}

const checkExistingUser = async (email: string, type: 'signIn' | 'signUp') => {
	const user:users = await userRepository.getUserByEmail(email)
	
	if (user && type === 'signUp') throw {message: "Email already in use", status: 409}
	if (!user && type === 'signIn') throw {message: "Email or password are wrong", status: 400}
	
	return user
}

const verifyPassword =async (password:string, hashPass: string) => {
	const verify = bcrypt.compareSync(password, hashPass)
	if(!verify) throw {message: "Email or password are wrong", status: 400}
	return
}

const createToken =async (id:number) => {
	const data = {id};
    const jwtKey = process.env.JWT_SECRET

    const token = jwt.sign(data, jwtKey)
    return token
}

export default {
	signUp,
	signIn,
}