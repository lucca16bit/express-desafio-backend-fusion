import { IAffiliation } from '@interfaces/affiliation.interface';
import { AuthenticatedRequest } from '@interfaces/auth.request.interface';
import Send from '@utils/response.utils';
import { prisma } from 'db';
import { Request, Response } from 'express';
import authSchema from 'validations/auth.schema';
import z from 'zod';

class UserController {
    static view = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId;

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    affiliation: true,
                    createdAt: true
                }
            });

            if (!user) {
                return Send.notFound(res, null, 'Usuário não encontrado');
            }

            return Send.success(res, {user});
        } catch (error) {
            console.error('Erro ao buscar informações do usuário: ', error);
            return Send.error(res, null, 'Erro ao buscar informações do usuário');
        }
    };

    static update = async (req: Request, res: Response) => {
            const { name, email, affiliation } = req.body as z.infer<typeof authSchema.register> & IAffiliation;

        try {
            const userId = (req as AuthenticatedRequest).userId;

            const updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    name,
                    email,
                    affiliation
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    affiliation: true,
                }
            });

            if (!updatedUser) {
                return Send.notFound(res, null, 'Usuário não encontrado');
            }

            return Send.success(res, {user: updatedUser});
        } catch (error) {
            console.error('Erro ao atualizar informações do usuário: ', error);
            return Send.error(res, null, 'Erro ao atualizar informações do usuário');
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const userId = (req as AuthenticatedRequest).userId;
            
            const userExists = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            });

            if (!userExists) {
                return Send.notFound(res, null, 'Usuário não encontrado');
            }

            await prisma.user.delete({
                where: { id: userId }
            });

            return Send.success(res, null, 'Usuário deletado com sucesso');
        } catch (error) {
            console.error('Erro ao deletar o usuário: ', error);
            return Send.error(res, null, 'Erro ao deletar o usuário');
        }
    };
};

export default UserController;