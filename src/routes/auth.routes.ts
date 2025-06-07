import AuthController from '@controllers/auth.controller';
import ValidationMiddlware from '@middlewares/validation.middleware';
import { Router } from 'express';
import authSchema from 'validations/auth.schema';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para a autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirm_password
 *               - affiliation
 *             properties:
 *               name:
 *                 type: string
 *                 example: "LukeSkywalker"
 *               email:
 *                 type: string
 *                 example: "luke@rebels.com"
 *               password:
 *                 type: string
 *                 example: "Example@123"
 *               confirm_password:
 *                 type: string
 *                 example: "Example@123"
 *               affiliation:
 *                 type: string
 *                 enum: [NEUTRAL, REBEL_ALLIANCE, GALACTIC_EMPIRE]
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "luke@rebels.com"
 *               password:
 *                 type: string
 *                 example: "Example@123"
 */

const authRouter = Router();

authRouter.post('/register', ValidationMiddlware.validate(authSchema.register), AuthController.register);
authRouter.post('/login', ValidationMiddlware.validate(authSchema.login), AuthController.login);

export default authRouter;