import Send from '@utils/response.utils';
import { prisma } from 'db';
import { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
    userId: number;
}

class PlanetController {
    static create = async (req: Request, res: Response) => {
        const {name, climate, terrain, population } = req.body;

        try {
            const userId = (req as AuthenticatedRequest).userId;

            const planetExists = await prisma.planet.findFirst({
                where: {
                    name,
                    userId
                }
            });
            if (planetExists) {
                return Send.error(res, null, 'O planeta já existe!');
            };

            const newPlanet = await prisma.planet.create({
                data: {
                    name,
                    climate,
                    terrain,
                    population: population ? BigInt(population) : null,
                    userId
                },
                select: {
                    id: true,
                    name: true,
                    climate: true,
                    terrain: true,
                    population: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            affiliation: true
                        }
                    }
                }
            });

            // parsear do bigint para string 
            const planetResponse = {
                ...newPlanet,
                population: newPlanet.population ? newPlanet.population.toString() : null
            };

            return Send.success(res, { planet: planetResponse }, 'Um novo planeta foi criado com sucesso');
        } catch (error) {
            console.error('Criação do planeta falhou: ', error);
            return Send.error(res, null, 'Criação do planeta falhou.');
        }
    };

    static list = async (req: Request, res: Response) => {
        try {
            const planets = await prisma.planet.findMany({
                select: {
                    id: true,
                    name: true,
                    climate: true,
                    terrain: true,
                    population: true
                }
            });

            if (!planets) {
                return Send.notFound(res, null, 'Nenhum planeta não encontrado');
            };

            // parsear do bigint para string para a serialização do json
            const planetsResponse = planets.map(planet => ({
                ...planet,
                population: planet.population ? planet.population.toString() : null
            }));

            return Send.success(res, { planets: planetsResponse });
        } catch (error) {
            console.error('Falha ao mostrar todos os planetas: ', error);
            return Send.error(res, null, 'Falha ao mostrar todos os planetas.');
        }
    };

    
    static view = async (req: Request, res: Response) => {
        try {
            const planetId = Number(req.params.id);

            const planet = await prisma.planet.findUnique({
                where: {
                    id: planetId
                },
                select: {
                    id: true,
                    name: true,
                    climate: true,
                    terrain: true,
                    population: true
                }
            });

            if (!planet) {
                return Send.notFound(res, null, 'Planeta não encontrado');
            };

            const planetResponse = {
                ...planet,
                population: planet.population ? planet.population.toString() : null
            };

            return Send.success(res, { planet: planetResponse });
        } catch (error) {
            console.error('Falha ao buscar informações do planeta: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do planeta.');
        }
    };

    static update = async (req: Request, res: Response) => {
        const {name, climate, terrain, population } = req.body;
        
        try {
            const planetId = Number(req.params.id);

            const planet = await prisma.planet.update({
                where: {
                    id: planetId
                },
                data: {
                    name,
                    climate,
                    terrain,
                    population
                },
                select: {
                    id: true,
                    name: true,
                    climate: true,
                    terrain: true,
                    population: true
                }
            });

            if (!planet) {
                return Send.notFound(res, null, 'Planeta não encontrado');
            };

            const planetResponse = {
                ...planet,
                population: planet.population ? planet.population.toString() : null
            };

            return Send.success(res, { planet: planetResponse });
        } catch (error) {
            console.error('Falha ao buscar informações do planeta: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do planeta.');
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const planetId = Number(req.params.id);

            const planet = await prisma.planet.delete({
                where: {
                    id: planetId
                }
            });

            if (!planet) {
                return Send.notFound(res, null, 'Planeta não encontrado');
            };

            return Send.success(res, null, 'Planeta deletado com sucesso');
        } catch (error) {
            console.error('Falha ao buscar informações do planeta: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do planeta.');
        }
    };
};

export default PlanetController;