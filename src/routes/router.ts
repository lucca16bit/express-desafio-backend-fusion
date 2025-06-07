import { Router } from 'express';

import authRouter from './auth.routes';
import characterRouter from './characters.routes';
import planetRouter from './planet.routes';
import spaceshipRouter from './spaceship.routes';
import systemRouter from './system.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/planet', planetRouter);
router.use('/star-systems', systemRouter);
router.use('/characters', characterRouter);
router.use('/spaceships', spaceshipRouter);

export default router;