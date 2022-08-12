import { Router } from "express";
import { create, deleteRecipe, getAll, getOne, update } from "../controllers/recipeController.js";
import validateToken from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import recipeSchema from "../schemas/recipeSchema.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", validateToken, validateSchema(recipeSchema.recipeSchema), create)
recipeRouter.get("/recipe/:id", getOne)
recipeRouter.get("/recipes", getAll)
recipeRouter.get("/recipes/:id", getAll)
recipeRouter.put("/recipe/:id", validateToken, update)
recipeRouter.delete("/recipe/:id", validateToken, deleteRecipe)

export default recipeRouter