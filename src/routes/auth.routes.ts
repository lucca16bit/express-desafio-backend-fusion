import AuthController from '@controllers/auth.controller';
import ValidationMiddlware from '@middlewares/validation.middleware';
import { Router } from 'express';
import authSchema from 'validations/auth.schema';

const authRouter = Router();

authRouter.post('/register', ValidationMiddlware.validate(authSchema.register), AuthController.register);
authRouter.post('/login', ValidationMiddlware.validate(authSchema.login), AuthController.login);

export default authRouter;