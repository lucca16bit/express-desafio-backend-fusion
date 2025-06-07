import SpaceShipsController from '@controllers/spaceships.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import spaceShipsSchema from 'validations/spaceships.schema';

const spaceshipRouter = Router();

spaceshipRouter.post('/', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(spaceShipsSchema.validateSchema),SpaceShipsController.create);
spaceshipRouter.get('/', AuthMiddleware.authenticateUser, SpaceShipsController.list);
spaceshipRouter.get('/:id', AuthMiddleware.authenticateUser, SpaceShipsController.view);
spaceshipRouter.put('/:id', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(spaceShipsSchema.validateSchema), SpaceShipsController.update);
spaceshipRouter.delete('/:id', AuthMiddleware.authenticateUser, SpaceShipsController.delete);

export default spaceshipRouter;