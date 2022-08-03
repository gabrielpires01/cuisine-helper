import { users } from "@prisma/client";
import Joi from "joi";

export type User = Omit<users, "id" | "createdAt" >
export type UserLog = Omit<User, "name">;


const signUpSchema = Joi.object<User>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required()
})

const signInSchema = Joi.object<UserLog>({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required()
})

export default {
	signUpSchema,
	signInSchema
}