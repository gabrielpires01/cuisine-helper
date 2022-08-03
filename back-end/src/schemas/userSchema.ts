import { users } from "@prisma/client";
import Joi from "joi";

export type User = Omit<users, "id" | "createdAt" >

const signUpSchema = Joi.object<User>({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required()
})

export default {
	signUpSchema,
}