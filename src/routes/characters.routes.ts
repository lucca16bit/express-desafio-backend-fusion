import CharactersController from '@controllers/characters.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import characterSchema from 'validations/character.schema';

/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Endpoints para o gerenciamento de personagens
 */

/**
 * @swagger
 * /characters:
 *   post:
 *     tags: [Characters]
 *     summary: Cria um novo personagem
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
 *                 example: "Luke Skywalker"
 *               race:
 *                 type: string
 *                 enum: [HUMAN, WOOKIEE, TWILEK, RODIAN, ZABRAK]
 *               affiliation:
 *                 type: string
 *                 enum: [NEUTRAL, REBEL_ALLIANCE, GALACTIC_EMPIRE]
 *               homePlanetId:
 *                 type: number
 *                 example: 1
 *   get:
 *     tags: [Characters]
 *     summary: Lista todos os personagens
 *     security:
 *       - cookieAuth: []
 *
 * /characters/{id}:
 *   get:
 *     tags: [Characters]
 *     summary: Busca um personagem passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   put:
 *     tags: [Characters]
 *     summary: Atualiza um personagem passando o ID pelo parâmetro
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
 *               race:
 *                 type: string
 *               affiliation:
 *                 type: string
 *               homePlanetId:
 *                 type: number
 *   delete:
 *     tags: [Characters]
 *     summary: Remove um personagem passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

const characterRouter = Router();

characterRouter.post('/', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(characterSchema.validateSchema), CharactersController.create);
characterRouter.get('/', AuthMiddleware.authenticateUser,CharactersController.list);
characterRouter.get('/:id', AuthMiddleware.authenticateUser, CharactersController.view);
characterRouter.put('/:id', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(characterSchema.validateSchema), CharactersController.update);
characterRouter.delete('/:id', AuthMiddleware.authenticateUser, CharactersController.delete);

export default characterRouter;