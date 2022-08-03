import { Router } from 'express';
import { signUp } from '../controllers/userController.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import userSchema from '../schemas/userSchema.js';

const userRouter = Router();

userRouter.post("/signUp", validateSchema(userSchema.signUpSchema), signUp)

export default userRouter;
