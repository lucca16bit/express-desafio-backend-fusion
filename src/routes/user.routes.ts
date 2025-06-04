import UserController from '@controllers/user.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/me', AuthMiddleware.authenticateUser, UserController.view);
userRouter.put('/me', AuthMiddleware.authenticateUser, UserController.update);
userRouter.delete('/me', AuthMiddleware.authenticateUser, UserController.delete);

export default userRouter;