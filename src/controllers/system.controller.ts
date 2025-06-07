import { AuthenticatedRequest } from '@interfaces/auth.request.interface';
import Send from '@utils/response.utils';
import { prisma } from 'db';
import { Request, Response } from 'express';
import systemSchema from 'validations/system.schema';
import z from 'zod';

class StarSystemController {
    static create = async (req: Request, res: Response) => {
        const {name, description} = req.body as z.infer<typeof systemSchema.validateSchema>;
        try {
            const userId = (req as AuthenticatedRequest).userId;

            const systemExists = await prisma.starSystem.findFirst({
                where: {
                    name,
                    userId
                }
            });

            if (systemExists) {
                return Send.error(res, null, 'O sistema já existe!');
            };

            const system = await prisma.starSystem.create({
                data: {
                    name,
                    description,
                    userId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            affiliation: true
                        }
                    }
                }
            });

            return Send.success(res, {system}, 'O sistema foi criado com sucesso!');
        } catch (error) {
            console.error('A criação do sistema estelar falhou: ', error);
            return Send.error(res, null, 'A criação do sistema estelar falhou');
        }
    };

    static list = async (req: Request, res: Response) => {
        try {
            const systems = await prisma.starSystem.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    planets: {
                        select: {
                            id: true,
                            name: true,
                            climate: true,
                            terrain: true,
                            population: true
                        }
                    }
                }
            });

            if(!systems) {
                return Send.notFound(res, null, 'Nenhum sistema estelar foi encontrado');
            }

            const parsePopulation = systems.map(system => ({
                ...system,
                planets: system.planets.map(planet => ({
                    ...planet,
                    population: planet.population ? planet.population.toString() : null
                }))
            }));

            return Send.success(res, {systems: parsePopulation});
        } catch (error) {
            console.error('Falha ao listar sistemas estelares: ', error);
            return Send.error(res, null, 'Falha ao listar sistemas estelares');
        }
    };

    static view = async (req: Request, res: Response) => {
        try {
            const systemId = Number(req.params.id);

            const system = await prisma.starSystem.findUnique({
                where: {
                    id: systemId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    planets: {
                        select: {
                            id: true,
                            name: true,
                            climate: true,
                            terrain: true,
                            population: true
                        }
                    }
                }
            });

            if(!system) {
                return Send.notFound(res, null, 'Nenhum sistema estelar foi encontrado');
            }

            const parsePopulation = {
                ...system,
                planets: system.planets.map(planet => ({
                    ...planet,
                    population: planet.population ? planet.population.toString() : null
                }))
            };

            return Send.success(res, { system: parsePopulation });
        } catch (error) {
            console.error('Erro ao buscar informações do sistema estelar: ', error);
            return Send.error(res, null, 'Erro ao buscar informações do sistema estelar');
        }
    };

    static update = async (req: Request, res: Response) => {
        const {name, description} = req.body as z.infer<typeof systemSchema.validateSchema>;

        try {
            const systemId = Number(req.params.id);

            const system = await prisma.starSystem.update({
                where: {
                    id: systemId
                },
                data: {
                    name,
                    description
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    planets: {
                        select: {
                            id: true,
                            name: true,
                            climate: true,
                            terrain: true,
                            population: true
                        }
                    }
                }
            });

            if(!system) {
                return Send.notFound(res, null, 'Nenhum sistema estelar foi encontrado');
            }

            const parsePopulation = {
                ...system,
                planets: system.planets.map(planet => ({
                    ...planet,
                    population: planet.population ? planet.population.toString() : null
                }))
            };

            return Send.success(res, {system: parsePopulation});
        } catch (error) {
            console.error('Erro ao buscar informações do sistema estelar: ', error);
            return Send.error(res, null, 'Erro ao buscar informações do sistema estelar');
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const systemId = Number(req.params.id);

            const systemExists = await prisma.starSystem.findFirst({
                where: {
                    id: systemId
                }
            });

            if (!systemExists) {
                return Send.error(res, null, 'Nenhum sistema estelar foi encontrado.');
            };
            
            const system = await prisma.starSystem.delete({
                where: {
                    id: systemId
                }
            });

            return Send.success(res, null, 'Sistema estelar deletado com sucesso');
        } catch (error) {
            console.error('Erro ao buscar informações do sistema estelar: ', error);
            return Send.error(res, null, 'Erro ao buscar informações do sistema estelar');
        }
    };
}

export default StarSystemController;