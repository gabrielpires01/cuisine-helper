import { Router } from "express";
import { create } from "../controllers/recipeController.js";

const recipeRouter = Router();

recipeRouter.post("/recipe", create)

export default recipeRouter