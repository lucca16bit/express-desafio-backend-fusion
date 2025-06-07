import CharactersController from '@controllers/characters.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import ValidationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';
import characterSchema from 'validations/character.schema';

const characterRouter = Router();

characterRouter.post('/', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(characterSchema.validateSchema), CharactersController.create);
characterRouter.get('/', AuthMiddleware.authenticateUser,CharactersController.list);
characterRouter.get('/:id', AuthMiddleware.authenticateUser, CharactersController.view);
characterRouter.put('/:id', AuthMiddleware.authenticateUser, ValidationMiddleware.validate(characterSchema.validateSchema), CharactersController.update);
characterRouter.delete('/:id', AuthMiddleware.authenticateUser, CharactersController.delete);

export default characterRouter;