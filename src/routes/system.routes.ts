import StarSystemController from '@controllers/system.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import systemSchema from 'validations/system.schema';

const systemRouter = Router();

systemRouter.post('/', ValidationMiddleware.validate(systemSchema.validateSchema),AuthMiddleware.authenticateUser, StarSystemController.create);
systemRouter.get('/', AuthMiddleware.authenticateUser, StarSystemController.list);
systemRouter.get('/:id', AuthMiddleware.authenticateUser, StarSystemController.view);
systemRouter.put('/:id', ValidationMiddleware.validate(systemSchema.validateSchema), AuthMiddleware.authenticateUser, StarSystemController.update);
systemRouter.delete('/:id', AuthMiddleware.authenticateUser, StarSystemController.delete);

export default systemRouter;