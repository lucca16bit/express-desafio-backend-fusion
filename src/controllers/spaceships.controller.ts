import { AuthenticatedRequest } from '@interfaces/auth.request.interface';
import Send from '@utils/response.utils';
import { prisma } from 'db';
import { Request, Response } from 'express';
import spaceShipsSchema from 'validations/spaceships.schema';
import { z } from 'zod';


class SpaceShipsController {
    static create = async (req: Request, res: Response) => {
        const {name, model, manufacturer, passengerCapacity} = req.body as z.infer<typeof spaceShipsSchema.validateSchema>;

        try {
            const userId = (req as AuthenticatedRequest).userId;
            
            const spaceShipsExists = await prisma.spaceShips.findFirst({
                where: {
                    name,
                    userId
                }                
            });

            if (spaceShipsExists) {
                return Send.error(res, null, 'Espaço nave já existe!');
            }

            const spaceShips = await prisma.spaceShips.create({
                data: {
                    name,
                    model,
                    manufacturer,
                    passengerCapacity,
                    userId
                },
                select: {
                    id: true,
                    name: true,
                    model: true,
                    manufacturer: true,
                    passengerCapacity: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            affiliation: true
                        }
                    }
                }
            });

            return Send.success(res, {spaceShips}, 'Nave espacial registrado com sucesso!');
        } catch (error) {
            console.error('Falha ao registrar uma nave espacial: ', error);
            return Send.error(res, null, 'Falha ao registrar uma nave espacial.');
        }
    };

    static list = async (req: Request, res: Response) => {
        try {
            const spaceShips = await prisma.spaceShips.findMany({
                select: {
                    id: true,
                    name: true,
                    model: true,
                    manufacturer: true,
                    passengerCapacity: true,
                    pilots: {
                        select: {
                            id: true,
                            name: true,
                            race: true,
                            affiliation: true
                        }
                    }
                }
            });

            if(!spaceShips) {
                return Send.notFound(res, null, 'Nenhuma nave espacial foi encontrada');
            }

            return Send.success(res, {spaceShips});
        } catch (error) {
            console.error('Falha na busca das naves espaciais: ', error);
            return Send.error(res, null, 'Falha na busca das naves espaciais');
        }
    };

    static view = async (req: Request, res: Response) => {
        try {
            const spaceShipId = Number(req.params.id);

            const spaceShip = await prisma.spaceShips.findFirst({
                where: {
                    id: spaceShipId
                },
                select: {
                    id: true,
                    name: true,
                    model: true,
                    manufacturer: true,
                    passengerCapacity: true,
                    pilots: {
                        select: {
                            id: true,
                            name: true,
                            race: true,
                            affiliation: true
                        }
                    }
                }
            });

            if(!spaceShip) {
                return Send.notFound(res, null, 'A nave espacial não foi encontrada');
            }

            return Send.success(res, {spaceShip});
        } catch (error) {
            console.error('Falha na busca da nave espacial: ', error);
            return Send.error(res, null, 'Falha na busca da nave espacial');
        }
    };

    static update = async (req: Request, res: Response) => {
       const {name, model, manufacturer, passengerCapacity} = req.body as z.infer<typeof spaceShipsSchema.validateSchema>;

        try {
            const spaceShipId = Number(req.params.id);
            
            const spaceShipsExists = await prisma.spaceShips.findFirst({
                where: {
                    id: spaceShipId
                }                
            });

            if (!spaceShipsExists) {
                return Send.notFound(res, null, 'A nave espacial não foi encontrada');
            }

            const spaceShips = await prisma.spaceShips.update({
                where: {
                    id: spaceShipId
                },
                data: {
                    name,
                    model,
                    manufacturer,
                    passengerCapacity
                },
                select: {
                    id: true,
                    name: true,
                    model: true,
                    manufacturer: true,
                    passengerCapacity: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            affiliation: true
                        }
                    }
                }
            });

            return Send.success(res, {spaceShips}, 'Nave espacial atualizado com sucesso!');  
        } catch (error) {
            console.error('Falha na busca da nave espacial: ', error);
            return Send.error(res, null, 'Falha na busca da nave espacial');
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const spaceShipId = Number(req.params.id);
            
            const spaceShipsExists = await prisma.spaceShips.findFirst({
                where: {
                    id: spaceShipId
                }                
            });

            if (!spaceShipsExists) {
                return Send.notFound(res, null, 'A nave espacial não foi encontrada');
            }
            
            const spaceShip = await prisma.spaceShips.delete({
                where: {
                    id: spaceShipId
                }
            });

            return Send.success(res, null, 'Nave espacial deletado com sucesso!');
        } catch (error) {
            console.error('Falha na busca da nave espacial: ', error);
            return Send.error(res, null, 'Falha na busca da nave espacial');
        }
    };
}

export default SpaceShipsController;