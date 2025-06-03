import AuthController from '@controllers/auth.controller';
import express, { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
    return res.send("Hello World");
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;