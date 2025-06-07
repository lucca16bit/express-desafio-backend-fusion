import StarSystemController from '@controllers/system.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import systemSchema from 'validations/system.schema';

/**
 * @swagger
 * tags:
 *   name: Systems
 *   description: Endpoints para o gerenciamento dos sistemas estelares
 */

/**
 * @swagger
 * /systems:
 *   post:
 *     tags: [Systems]
 *     summary: Cria um novo sistema estelar
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
 *                 example: "Tatooine System"
 *               description:
 *                 type: string
 *                 example: "Sistema binário localizado no Setor Arkanis"
 *   get:
 *     tags: [Systems]
 *     summary: Lista todos os sistemas
 *     security:
 *       - cookieAuth: []
 *
 * /systems/{id}:
 *   get:
 *     tags: [Systems]
 *     summary: Busca um sistema passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *   put:
 *     tags: [Systems]
 *     summary: Atualiza um sistema passando o ID pelo parâmetro
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
 *               description:
 *                 type: string
 *   delete:
 *     tags: [Systems]
 *     summary: Remove um sistema passando o ID pelo parâmetro
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */

const systemRouter = Router();

systemRouter.post('/', ValidationMiddleware.validate(systemSchema.validateSchema),AuthMiddleware.authenticateUser, StarSystemController.create);
systemRouter.get('/', AuthMiddleware.authenticateUser, StarSystemController.list);
systemRouter.get('/:id', AuthMiddleware.authenticateUser, StarSystemController.view);
systemRouter.put('/:id', ValidationMiddleware.validate(systemSchema.validateSchema), AuthMiddleware.authenticateUser, StarSystemController.update);
systemRouter.delete('/:id', AuthMiddleware.authenticateUser, StarSystemController.delete);

export default systemRouter;