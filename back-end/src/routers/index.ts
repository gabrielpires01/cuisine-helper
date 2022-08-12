import { Router } from 'express';
import recipeRouter from './recipeRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(userRouter);
router.use(recipeRouter);

export default router;
