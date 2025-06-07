import SpaceShipsController from '@controllers/spaceships.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import spaceShipsSchema from 'validations/spaceships.schema';

/**
 * @swagger
 * tags:
 *   name: Spaceships
 *   description: Endpoints para o gerenciamento de naves espaciais
 */

/**
 * @swagger
 * /spaceships:
 *   post:
 *     tags: [Spaceships]
 *     summary: Cria uma nova nave espacial
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
 *                 example: "Millennium Falcon"
 *               model:
 *                 type: string
 *                 example: "YT-1300 Light Freighter"
 *               manufacturer:
 *                 type: string
 *                 example: "Corellian Engineering Corporation"
 *               passengerCapacity:
 *                 type: number
 *                 example: 6
 *   get:
 *     tags: [Spaceships]
 *     summary: Lista todas as naves espaciais
 *     security:
 *       - cookieAuth: []
 *
 * /spaceships/{id}:
 *   get:
 *     tags: [Spaceships]
 *     summary: Busca uma nave espacial passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   put:
 *     tags: [Spaceships]
 *     summary: Atualiza uma nave espacial passando o ID pelo parâmetro
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
 *               model:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               passengerCapacity:
 *                 type: number
 *   delete:
 *     tags: [Spaceships]
 *     summary: Remove uma nave espacial passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

const spaceshipRouter = Router();

spaceshipRouter.post('/', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(spaceShipsSchema.validateSchema),SpaceShipsController.create);
spaceshipRouter.get('/', AuthMiddleware.authenticateUser, SpaceShipsController.list);
spaceshipRouter.get('/:id', AuthMiddleware.authenticateUser, SpaceShipsController.view);
spaceshipRouter.put('/:id', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(spaceShipsSchema.validateSchema), SpaceShipsController.update);
spaceshipRouter.delete('/:id', AuthMiddleware.authenticateUser, SpaceShipsController.delete);

export default spaceshipRouter;