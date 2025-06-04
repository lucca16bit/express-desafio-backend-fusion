import config from '@config/config';
import { IAffiliation } from '@interfaces/affiliation.interface';
import Send from '@utils/response.utils';
import bcrypt from 'bcryptjs';
import { prisma } from 'db';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authSchema from 'validations/auth.schema';
import { z } from 'zod';

class AuthController {
    static register = async (req: Request, res: Response) => {
        const {name, email, affiliation, password, confirm_password} = req.body as z.infer<typeof authSchema.register> & IAffiliation;
        
        try {
            const emailExists = await prisma.user.findUnique({
                where: { email }
            });

            if (emailExists) {
                return Send.error(res, null, 'O email já está sendo utilizado.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    affiliation,
                    password: hashedPassword
                }
            });

            return Send.success(res, {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }, 'Usuário registrado com sucesso!');
        } catch (error) {
            console.error('Registro do usuário falhou:', error);
            return Send.error(res, null, 'Registro do usuário falhou.');
        }
    };

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body as z.infer<typeof authSchema.login>;

        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return Send.error(res, null, 'Usuário inválido');
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return Send.error(res, null, 'Senha inválida');
            }

            const accessToken = jwt.sign(
                {userId: user.id},
                config.auth.secret,
                {expiresIn: config.auth.secretExpiresIn as any}
            );

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 15 * 60 * 1000, // 15m em milissegundos
                sameSite: 'strict'
            });

            return Send.success(res, {
                id: user.id,
                name: user.name,
                email: user.email
            });
        } catch (error) {
            console.error('Falha de login: ', error);
            return Send.error(res, null, 'Falha de login');
        }
    };
};

export default AuthController;