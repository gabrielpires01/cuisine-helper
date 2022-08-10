import { Router } from "express";
import { create, getAll, getAllByUserId, getOne } from "../controllers/recipeController.js";
import validateToken from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import recipeSchema from "../schemas/recipeSchema.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", validateToken, validateSchema(recipeSchema.recipeSchema), create)
recipeRouter.get("/recipe/:id", getOne)
recipeRouter.get("/recipes", getAll)
recipeRouter.get("/recipes/:id", getAllByUserId)

export default recipeRouter