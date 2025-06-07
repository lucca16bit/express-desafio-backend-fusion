import UserController from '@controllers/user.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import authSchema from 'validations/auth.schema';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para o gerenciamento do usuário
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Retorna dados do usuário logado
 *     security:
 *       - cookieAuth: []
 *   put:
 *     tags: [Users]
 *     summary: Atualiza dados do usuário
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "LukeSkywalker"
 *               email:
 *                 type: string
 *                 example: "luke@rebels.com"
 *               affiliation:
 *                 type: string
 *                 enum: [NEUTRAL, REBEL_ALLIANCE, GALACTIC_EMPIRE]
 *   delete:
 *     tags: [Users]
 *     summary: Deleta o usuário
 *     security:
 *       - cookieAuth: []
 */

const userRouter = Router();

userRouter.get('/me', AuthMiddleware.authenticateUser, UserController.view);
userRouter.put('/me', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(authSchema.register), UserController.update);
userRouter.delete('/me', AuthMiddleware.authenticateUser, UserController.delete);

export default userRouter;