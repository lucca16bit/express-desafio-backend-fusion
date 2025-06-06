import { Router } from 'express';

import authRouter from './auth.routes';
import planetRouter from './planet.routes';
import systemRouter from './system.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/planet', planetRouter);
router.use('/star-systems', systemRouter);

export default router;