import { Router } from "express";
import { create, getOne } from "../controllers/recipeController.js";
import validateToken from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import recipeSchema from "../schemas/recipeSchema.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", validateToken, validateSchema(recipeSchema.recipeSchema), create)
recipeRouter.get("/recipe/:id", getOne)

export default recipeRouter