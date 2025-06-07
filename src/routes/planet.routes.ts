import PlanetController from '@controllers/planet.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import planetSchema from 'validations/planet.schema';

/**
 * @swagger
 * tags:
 *   name: Planets
 *   description: Endpoints para o gerenciamento de planetas
 */

/**
 * @swagger
 * /planets:
 *   post:
 *     tags: [Planets]
 *     summary: Cria um novo planeta
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
 *                 example: "Tatooine"
 *               climate:
 *                 type: string
 *                 example: "arid"
 *               terrain:
 *                 type: string
 *                 example: "desert"
 *               population:
 *                 type: number
 *                 example: 200000
 *               systemId:
 *                 type: number
 *                 example: 1
 *   get:
 *     tags: [Planets]
 *     summary: Lista todos os planetas
 *     security:
 *       - cookieAuth: []
 *
 * /planets/{id}:
 *   get:
 *     tags: [Planets]
 *     summary: Busca um planeta passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   put:
 *     tags: [Planets]
 *     summary: Atualiza um planeta passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               climate:
 *                 type: string
 *               terrain:
 *                 type: string
 *               population:
 *                 type: number
 *   delete:
 *     tags: [Planets]
 *     summary: Remove um planeta passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

const planetRouter = Router();

planetRouter.post('/', ValidationMiddleware.validate(planetSchema.validateSchema),AuthMiddleware.authenticateUser, PlanetController.create);
planetRouter.get('/', AuthMiddleware.authenticateUser, PlanetController.list);
planetRouter.get('/:id', AuthMiddleware.authenticateUser, PlanetController.view);
planetRouter.put('/:id', ValidationMiddleware.validate(planetSchema.validateSchema), AuthMiddleware.authenticateUser, PlanetController.update);
planetRouter.delete('/:id', AuthMiddleware.authenticateUser, PlanetController.delete);

export default planetRouter;