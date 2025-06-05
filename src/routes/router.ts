import { Router } from 'express';

import authRouter from './auth.routes';
import planetRouter from './planet.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/planet', planetRouter);

export default router;