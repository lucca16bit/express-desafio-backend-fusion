import PlanetController from '@controllers/planet.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import planetSchema from 'validations/planet.schema';

const planetRouter = Router();

planetRouter.post('/', ValidationMiddleware.validate(planetSchema.validateSchema),AuthMiddleware.authenticateUser, PlanetController.create);
planetRouter.get('/', AuthMiddleware.authenticateUser, PlanetController.list);
planetRouter.get('/:id', AuthMiddleware.authenticateUser, PlanetController.view);
planetRouter.put('/:id', ValidationMiddleware.validate(planetSchema.validateSchema), AuthMiddleware.authenticateUser, PlanetController.update);
planetRouter.delete('/:id', AuthMiddleware.authenticateUser, PlanetController.delete);

export default planetRouter;