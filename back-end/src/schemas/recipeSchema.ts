import { recipes } from "@prisma/client";
import Joi from "joi";

export type Recipe = Omit<recipes, "id" | "createdAt">

const recipeSchema = Joi.object({
	name: Joi.string().required(),
	image: Joi.string().uri().required(),
	description: Joi.string().required(),
	userId: Joi.number().integer().required(),
	ingredients: Joi.object().required()
})

export default {
	recipeSchema
}